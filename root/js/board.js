let boards = [];
let defaultBoardId = "Mango-PicoX2";

let addBoard = (board) => {
    boards.push(board);
};

$("#board-see-more-btn").click(function() {
    $("#project-create-dialog #hardware-select ul > li").removeClass("show-when-click-see-more");
    $(this).hide();
});

$("#project-create-dialog .close-btn").click(() => $("#project-create-dialog").hide())

let loadBoard = async () => {
    if (!settings.boardId) {
        settings.boardId = defaultBoardId;
        //return;
    }  
    setBoardCoverImage();  
    let board = boards.find(board => board.id === settings.boardId);
    if(!board) {
        NotifyW(MSG.error_load_board);
        return;
    }
    settings.chipId = board.chip;
    settings.uploadMode = board.uploadMode;
    settings.runMode = board.runMode;
    settings.programId = board.programId;
    // set status bar
    statusbar.board(board.name);
    statusbar.firmware(board.firmware[0].name);
    statusbar.level(board.level);
    // buttons setting
    if(settings.runMode === "Y") {
        updateStatusButton();
    }
    else {
        $("#btn-run").hide();
        $("#btn-stop").hide();
    }
    (settings.uploadMode === "REPL" || settings.uploadMode === "BURN")? $("#upload-program").show():$("#upload-program").hide();
    (settings.programId === "python")? $("#switch-to-python").show():$("#switch-to-python").hide();
    (settings.programId === "arduino")? $("#switch-to-arduino").show():$("#switch-to-arduino").hide();
    (settings.programId === "javascript")? $("#switch-to-javascript").show():$("#switch-to-javascript").hide();

    // load js and exec
    let scripts = [ ];
    scripts = scripts.concat(board.script);
    for (let fPath of scripts) {        
        let script;
        let s = '';
        if(fPath[0] === '/') {
            s = `${rootPath}${fPath}`;
        }
        else {
            s = `${rootPath}/boards/${board.id}/${fPath}`;
        }
        // load js
        try {
            script = await fetch(s);
        } catch (e) {
            console.warn(e);
            continue;
        }
        if (script.status === 200) {
            try {
                eval(await script.text());
            } catch (e) {
                console.warn(e);
            }
        } else {
            console.warn(script);
        }
    }
    // load css
    for (let fPath of board.css) {
        let link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = `${rootPath}/boards/${board.id}/${fPath}`;
        document.head.appendChild(link);
    }

    autoCompletionDictionary = board.autoCompletion;
    statusbar.board(board.name);

    //
    if (terminalShowFlag) {
        $("#close-terminal").click();
        setTimeout(_ => {
            terminalShowFlag = true;
        }, 100);
    }
    if (terminalShowFlag) {
        $("#open-terminal").click();
    }
    Blockly.triggleResize();
    if (editor) editor.layout();
    if (fitAddon) {
        setTimeout(() => {
            try {
                fitAddon.fit();
            } catch (e) {
                console.warn(e);
            }
        }, 10);
    }

    selectDeviceMode(deviceMode);
    // load board information
    $("#board-info-name").text(board.name);
    $("#board-info-author").text(`${Blockly.Msg.UI_AUTHOR}: ${board.author}`);
    $("#board-info-desc").text(board.description);
    let board_html;
    try {
        let s = `${rootPath}/boards/${board.id}/info/info.html`;
        board_html = await fetch(s);
    } catch (e) {
        console.warn(e);
    }
    if (board_html.status === 200) {
        try {
            let newPath = `${rootPath}/boards/${board.id}/info`;
            let _html = await board_html.text();
            _html = _html.replace(/src=['"](?:[^"'\/]*\/)*([^'"]+)['"]/g, "src='" + newPath + "/$1'");
            $('#board-info-list').html(_html);
        } catch (e) {
            console.warn(e);
        }
    } else {
        console.warn(board_html);
    }
}

$("#create-project-btn").click(async () => {
    let projectName = $("#project-name-input").val();
    settings.boardId = $("#project-create-dialog #hardware-select ul > li > div.active").attr("data-board-id");
    
    await loadBoard();

    blocklyWorkspace.clear();
    if (editor) editor.setValue("");
    // vFSTree = "";
    // vFSTree = { };
    if (settings.useMode === "block") {
        fs.write("/main.xml", "");
        await updataWorkspaceAndCategory();
        blocklyWorkspace.setScale(1);
        blocklyWorkspace.scrollCenter();
    }
    else {
        if(settings.programId === Blockly.constants.LANG_PYTHON) {
            fs.write("/main.py", "");
        }
        else if(settings.programId === Blockly.constants.LANG_ARDUINO) {
            fs.write("/main.ino", "");
        }
        else if(settings.programId === Blockly.constants.LANG_JAVASCRIPT) {
            fs.write("/main.js", "");
        }
    }

    $("#project-name").val(projectName);

    $("#project-create-dialog").hide();
    NotifyS("New project " + projectName);
    statusbar.log("New project " + projectName);
    settings.projectName = projectName;
});

let setBoardCoverImage = function() {
    let srcUrl = `boards/${settings.boardId}/images/cover.png`;
    $("#board-image").attr("src", srcUrl);
}