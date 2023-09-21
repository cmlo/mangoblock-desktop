const blocklyDivExampleCode = document.querySelector("#blocklyDivExampleCode");
Blockly.Themes.Classic.setStartHats(true);
blocklyWorkspaceExampleCode = Blockly.inject(blocklyDivExampleCode, {
    media: 'blockly/media/',
    toolbox: "",
    grid : {
		spacing : 25, 
		length : 1, 
		colour : '#888', 
		snap : true
    },
    trashcan : true,
    themes : Blockly.Themes.Classic,
    zoom: {
        controls: true,
        wheel: true,
        startScale: 1,
        maxScale: Infinity,
        minScale: 0.3,
        scaleSpeed: 1.2
    },
    scrollbars : true,
    comments : true, 
	disable : true, 
    maxBlocks : Infinity, 
    rtl : false, 
    oneBasedIndex : false, 
    sounds : true, 
    readOnly: true,
    renderer: getRenderer() || "geras",
});

const codeEditorExampleCode = document.querySelector("#codeEditorExampleCode");
editorCodeExample = monaco.editor.create(codeEditorExampleCode, {
    language: 'python',
    readOnly: true,
    automaticLayout: true
});

$("#mode-switch")[0].checked = false;
$("#mode-switch").change(async function () {
    let value = $("#mode-switch")[0].checked;
    if (value == false) { // Block mode
        $("#blocklyDivExampleCode").show();
        $("#codeEditorExampleCode").hide();
        Blockly.svgResize(blocklyWorkspaceExampleCode);
        blocklyWorkspaceExampleCode.scrollCenter();
    } else { // Code mode
        $("#blocklyDivExampleCode").hide();
        $("#codeEditorExampleCode").show();
        let code = Blockly.Python.workspaceToCode(blocklyWorkspaceExampleCode);
        editorCodeExample.setValue(code);
        editorCodeExample.layout();
    }
    $(this).addClass("active");
});

const openExampleDialog = () => {
    $("#example-list-item").html("");
    // Get board example
    const board = boards.find(board => board.id === settings.boardId);
    //$("#example-list-item").append(`<li class="sub-header">Board Example</li>`);
    (board?.examples || []).forEach((item, index) => {
        if (typeof item === "string") {
            $("#example-list-item").append(`<li class="sub-header">${item}</li>`);
        } else {
            $("#example-list-item").append(`
                    <li>
                        <a href="#" data-index="${index}" data-type="board" data-files="${item?.files || ""}" >${item.name}</a>
                    </li>
                `);
        }
    });
    blocklyWorkspaceExampleCode.clear();

    $("#example-list-item > li > a").click(async function(e) {
        e.preventDefault();
        const rawFileData = await (await fetch(`boards/${settings.boardId}/examples/${$(this).attr("data-files")}.mb`)).text();
        const local_vFSTree = JSON.parse(rawFileData);
        const xmlCode = local_vFSTree["main.xml"];
        blocklyWorkspaceExampleCode.clear();
        try {
            Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xmlCode), blocklyWorkspaceExampleCode);
        } catch (e) {
            console.log(e);
        }
        blocklyWorkspaceExampleCode.scrollCenter();
        $("#example-list-item > li").removeClass("active");
        $(this).parent().addClass("active");
        $("#noSelectExampleFile").hide();
        $("#mode-switch").change();
    });
    ShowDialog($("#code-example-dialog"));
    Blockly.svgResize(blocklyWorkspaceExampleCode);
}

const addExampleCodeToMain = async () => {
    const fileMby = $("#example-list-item > li.active > a").attr("data-files");
    if (!fileMby) {
        return;
    }
    const rawFileData = await (await fetch(`boards/${settings.boardId}/examples/${fileMby}.mb`)).text();
    const local_vFSTree = JSON.parse(rawFileData);
    const xmlCode = local_vFSTree["main.xml"];

    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xmlCode), blocklyWorkspace);
    $("#code-example-dialog .close-dialog").click();
};

$("#add-example-code-to-workspace").click(addExampleCodeToMain);
$("#open-example").click(openExampleDialog);
