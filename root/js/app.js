let projectFilePath = null;
let saveAsFlag = false;


Blockly.Themes.Classic.setStartHats(true);

/********** begin of blockly ********************************************************************/
let blocklyWorkspace;
let categoryIconList = [];


let updateBlockCategory = async () => {
    if (isEmbed) return;
    categoryIconList = [];
    
    let toolboxTextXML = `<xml xmlns="https://developers.google.com/blockly/xml">`;

    let toolboxTree = null;
    if (settings.boardId) {
        let board = boards.find(board => board.id === settings.boardId);
        toolboxTree = board.blocks;
    }
    if (!toolboxTree) {
        //toolboxTree = blocksDefault;
    }
    // begin of board blocks *********************************************
    for (let category of toolboxTree) {
        if(category.name === "sep") {
            toolboxTextXML += category.blocks;
        }
        else {
            if(category.role === "category") {
                toolboxTextXML += getCategoryXML(category);
                categoryIconList.push(category.icon.startsWith("/") ? rootPath + tools.themeIcon(category.icon) : `${rootPath}/boards/${settings.boardId}/${category.icon}`);
            }
            else {
                toolboxTextXML += `<category name="${category.name}" expanded="false">`;
                categoryIconList.push(rootPath + "/images/toolbox/empty.png");
                if (typeof category.blocks === "object") {
                    for (let subcategory of category.blocks) {  
                        toolboxTextXML += getCategoryXML(subcategory);
                        categoryIconList.push(subcategory.icon.startsWith("/") ? rootPath + tools.themeIcon(subcategory.icon) : `${rootPath}/boards/${settings.boardId}/${subcategory.icon}`);
                    }
                }                
                toolboxTextXML += `</category>`;
            }
        }        
    }
    // end of board blocks *********************************************

    // begin of extension blocks *********************************************
    let extenstionTree = [];
    let tempIconList = [];
    for (const extensionId of fs.ls("/extension")) {
        let extension = fs.read(`/extension/${extensionId}/extension.js`);
        extension = eval(extension);
        extenstionTree.push(extension);
        tempIconList.push(fs.read(`/extension/${extensionId}/${extension.icon}`));
        let extensionLocalPath = `/extension/${extensionId}`;
        await updateExtensionScripts(extensionLocalPath);
    }
    if(extenstionTree.length > 0)
    {
        toolboxTextXML += "<sep></sep>";
        toolboxTextXML += `<category name="${Blockly.Msg["CAT_EXTENSION"]}" expanded="false">`;
        for (let category of extenstionTree) {
            toolboxTextXML += `<category name="${category.name}" colour="${category.color}"${typeof category.blocks === "string" ? ` custom="${category.blocks}"` : ''}>`;
            if (typeof category.blocks === "object") {
                for (let block of category.blocks) {
                    if (typeof block === "object") {
                        toolboxTextXML += block.xml;
                    } else {
                        if (typeof Blockly.Blocks[block] !== "undefined") {
                            if (typeof Blockly.Blocks[block].xml !== "undefined") {
                                toolboxTextXML += Blockly.Blocks[block].xml;
                            } else {
                                toolboxTextXML += `<block type="${block}"></block>`;
                            }
                        } else {
                            console.warn(block, "undefined, forget add blocks_xxx.js ?");
                        }
                    }
                }
            } else if (typeof category.blocks === "function") {
                let xmlList = category.blocks(blocklyWorkspace);
                for (let xml of xmlList) {
                    toolboxTextXML += Blockly.Xml.domToText(xml);
                }
            }
            toolboxTextXML += `</category>`;
        }
        toolboxTextXML += `</category>`;
        categoryIconList.push(rootPath + "/images/toolbox/empty.png");
        for(let icon of tempIconList)
        {
            categoryIconList.push(icon);
        }
    }
    // end of extension  *********************************************
    toolboxTextXML += `</xml>`;
    let toolboxXML = Blockly.Xml.textToDom(toolboxTextXML);
    blocklyWorkspace.updateToolbox(toolboxXML);
    /* blocklyWorkspace.scrollbar.resize(); */
    setCategoryIcon();
};

let setCategoryIcon = function () {
    for (const [index, element] of Object.entries($("span.blocklyTreeIcon"))) {
        if (typeof element === "object" && element.nodeType !== undefined) {
            $(element).append(`<img src="${categoryIconList[index]}" alt="">`);
        }
    }
}

let getLabelXML = function (text) {
    return  '<label text="' + text + '" web-class="myLabelStyle"></label>';
}

let getCategoryXML = function(category){
    let xmlCategory = "";

    if(category.color && category.color !== "") {
        xmlCategory = `<category name="${category.name}" colour="${category.color}" ${typeof category.blocks === "string" ? ` custom="${category.blocks}"` : ''}>`;
    }
    else {
        xmlCategory = `<category name="${category.name}" categorystyle="${category.type}" ${typeof category.blocks === "string" ? ` custom="${category.blocks}"` : ''}>`;
    }

    if (typeof category.blocks === "object") {
        for (let block of category.blocks) {
            if (typeof block === "string") {
                xmlCategory += getLabelXML(block);
            }
            else if (typeof block === "object") {
                xmlCategory += block.xml;
            }
            else {
                if (typeof Blockly.Blocks[block] !== "undefined") {
                    if (typeof Blockly.Blocks[block].xml !== "undefined") {
                        xmlCategory += Blockly.Blocks[block].xml;
                    }
                    else {
                        xmlCategory += `<block type="${block}"></block>`;
                    }
                }
                else {
                    console.warn(block, "undefined, forget add blocks_xxx.js ?");
                }
            }
        }
    }
    else if (typeof category.blocks === "function") {
        let xmlList = category.blocks(blocklyWorkspace);
        for (let xml of xmlList) {
            xmlCategory += Blockly.Xml.domToText(xml);
        }
    }
    xmlCategory += `</category>`;

    return xmlCategory;
};

Blockly.triggleResize = function(e) {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    let element = blocklyArea;
    let x = 0;
    let y = 0;
    do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
    // add module button
    //addModuleDiv.style.left = x + 'px';
    //addModuleDiv.style.top = y + 'px';
    // resize
    Blockly.svgResize(blocklyWorkspace);
};


let embedOption = {
    id: "",
    width: 0,
    height: 0,
    blockOnly: 0,
    fit: 0
};

if (isEmbed) {
    $(".page").addClass("embed");
    $(".page > .main > footer").hide();
    $(".top-bar-button").hide();
    $(".blocklyToolboxDiv").hide();
    $(".embed-only").show();

    $("#embed-edit").click(() => {
        window.open(`https://mangoblock.tw/?open=${pageParams.get("open") || ""}`, "_blank");
    });

    let allParams = { };
    for (let p of pageParams) {
        allParams[p[0]] = ((v) => {
            if (v.indexOf("%") > 0) return v;
            return parseInt(v) || 0;
        })(p[1]);
    }
    embedOption = Object.assign(embedOption, allParams);

    if (embedOption.blockOnly == 1) {
        $(".page > .main > header").hide();
        // blocklyWorkspace.scrollbar.dispose();
        // blocklyWorkspace.zoomControls_.dispose();
        // blocklyWorkspace.zoomControls_.svgGroup_.remove();
    }

    // Blockly.triggleResize();
}

let blocklyArea = document.getElementById('blocklyArea');
let blocklyDiv = document.getElementById('blocklyDiv');
//let addModuleDiv = document.getElementById('addModule');

blocklyWorkspace = Blockly.inject(blocklyDiv, {
    media: 'blockly/media/',
    toolbox: document.getElementById('toolbox'),
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
        wheel: settings.zoomWheel,
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
    readOnly: false,    
    /* Option */
    renderer: getRenderer() || "geras",
});

blocklyWorkspace.addChangeListener(Blockly.Events.disableOrphans);
MangoBlock.WORKSPACE = blocklyWorkspace;
/******** end of blockly ************************************************************************/

window.addEventListener('resize', Blockly.triggleResize, false);
Blockly.triggleResize();

/** Override Blockly.alert() with custom implementation. */
Blockly.alert = function(message, callback) {
    Notiflix.Report.Info("Alert", message, "OK", callback);
};

/** Override Blockly.confirm() with custom implementation. */
Blockly.confirm = function(message, callback) {
    Notiflix.Confirm.Show(Blockly.Msg.UI_CONFIRM, message, 'Yes', 'No', function() {
        callback(true);
    },
    function() {
        callback(false);
    });
};

Notiflix.Confirm.Init({
    plainText: false
});

/** Override Blockly.prompt() with custom implementation. */
Blockly.prompt = function(message, defaultValue, callback) {
    Notiflix.Confirm.Show("Prompt", `${message}<br><br><input type="text" id="prompt-input" value="${defaultValue}">`, 'OK', 'Cancle', function() {
        callback($("#prompt-input").val());
    },
    function() {
        callback(null);
    });
};

if (isElectron) {
    nodeFS.walk = (dir) => {
        console.log('test:'+dir)
        return new Promise((resolve, reject) => {
            let files = [ ];
            dive(dir, (err, file) => {
                files.push(file);
            }, () => {
                resolve(files);
            });
        });
    };    
    nodeFS.ls = (dir) => nodeFS.readdirSync(dir).filter(f => nodeFS.statSync(path.join(dir, f)).isDirectory());    
}

/* update category */
let updataWorkspaceAndCategory = async () => {
    if (!vFSTree) {
        vFSTree = { };
    }
    await updateBlockCategory();
    // load old code from local storage
    let oldCode = fs.read("/main.xml");
    if (typeof oldCode === "string") {
        blocklyWorkspace.clear();
        try {
            Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(oldCode), blocklyWorkspace);
        } catch (e) {
            console.log(e);
        }
        blocklyWorkspace.scrollCenter();
    }
}

/* -------- save working block code to local storage. -------- */
let saveCodeToLocal = () => {
    if (settings.useMode === "block") {
        try {
            const xmlText = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(blocklyWorkspace));
            fs.write("/main.xml", xmlText);
        } catch (e) {
            console.log(e);
        }
    }
    else if (settings.useMode === "code") {
        if(settings.programId === Blockly.constants.LANG_PYTHON) {
            fs.write("/main.py", editor.getValue());
        }
        else if(settings.programId === Blockly.constants.LANG_ARDUINO) {
            fs.write("/main.ino", editor.getValue());
        }
        else if(settings.programId === Blockly.constants.LANG_JAVASCRIPT) {
            fs.write("/main.js", editor.getValue());
        }
    }

    fs.write("/config.json", JSON.stringify({
        mode: settings.useMode,
        github: github_project_repo,
        board: settings.boardId
    }));

    localStorage.setItem("mango_AutoSave", JSON.stringify(vFSTree));
};

let hotUpdate = async () => {
    if (!vFSTree) {
        vFSTree = { };        
    }
    let configFileContent = fs.read("/config.json");
    if (configFileContent) {
        let projectConfig = JSON.parse(configFileContent);
        if (projectConfig) {
            settings.useMode = projectConfig?.mode || "block";
            settings.boardId = projectConfig?.board || "Mango-PicoX2";
        }
    }
    else {
        // save initial config
        settings.useMode = "block";
        settings.boardId = "Mango-PicoX2";
        saveCodeToLocal();
    }

    if (!settings.useMode) {
        settings.useMode = "block";
    }

    if (!settings.boardId) {
        settings.boardId = boards[0].id;
    }

    await loadBoard();
    if (settings.useMode === "block") {
        await updataWorkspaceAndCategory();
    } 
    else if (settings.useMode === "code") {
        $("#open-code").click();
        $(async () => {
            while(!editor) {
                await sleep(100);
            }
            let code = null;
            if(settings.useMode === Blockly.constants.LANG_PYTHON) {
                code = fs.read("main.py");
            }
            else if(settings.useMode === Blockly.constants.LANG_ARDUINO) {
                code = fs.read("main.ino");
            }
            else if(settings.useMode === Blockly.constants.LANG_JAVASCRIPT) {
                code = fs.read("main.js");
            }
            if (code) {
                editor.setValue(code);
            }
            editor.updateOptions({ readOnly: false });
        });
    }
}


let loadCodeAlready = false;
let callHotUpdate = true;

if (isElectron) {
    for (let arg of sharedObj.argv) {
        if (arg.endsWith(".mb")) {
            let filePath = arg;
            if (nodeFS.existsSync(filePath)) {
                vFSTree = JSON.parse(nodeFS.readFileSync(filePath));
                loadCodeAlready = true;
                sharedObj.argv = [ ];
            }
            break;
        }
    }
}

let openArg = pageParams.get("open");
if (openArg) {
    (async (fileName) => {
        Notiflix.Block.Standard("body", 'Loading...');

        let fileContent = await fetch(`https://us-central1-ublock-c0a08.cloudfunctions.net/share/files/${fileName}`, {
            method: "get",
            redirect: "follow"
        });

        fileContent = await fileContent.text();

        await openProjectFromData(fileContent, fileName);

        Notiflix.Block.Remove("body");

        if (isEmbed) {
            if (embedOption.blockOnly == 1) {
                blocklyWorkspace.zoomControls_.svgGroup_.remove();
            }
            let { width, height } = blocklyWorkspace.getCanvas().getBBox();
            let updateFrameSize = window.parent.mangoBlock.updateFrameSize;
            if (updateFrameSize) {
                let fSizeW = embedOption.width;
                let fSizeH = embedOption.height;
                if (fSizeW === 0) fSizeW = `${width + 20 + (embedOption.blockOnly != 1 ? 20 : 0)}px`;
                if (fSizeH === 0) fSizeH = `${height + 20 + (embedOption.blockOnly != 1 ? 60 : 0)}px`;
                updateFrameSize(embedOption.id, fSizeW, fSizeH);
                setTimeout(() => {
                    blocklyWorkspace.scrollCenter();
                    if (embedOption.fit == 1) {
                        blocklyWorkspace.zoomToFit();
                    }
                }, 10);
            }
        }

    })(openArg);
    callHotUpdate = false;
}

if (!loadCodeAlready) {
    vFSTree = JSON.parse(localStorage.getItem("mango_AutoSave"));
}

if (callHotUpdate) {
    hotUpdate();
}


/* ******************* block workspace event controls ************************************************** */

let saveCode = (event) => {
    if(event.type == "viewport_change" || event.type == "finished_loading") {
        return;
    }
    if (event.type == Blockly.Events.CREATE || event.type == Blockly.Events.DELETE
        || event.type == Blockly.Events.MOVE || Blockly.Events.BLOCK_CHANGE) {
        saveCodeToLocal();
    }
}
blocklyWorkspace.addChangeListener(saveCode);

/* -------- languages list -------- */
showLangSelect = () => {
    return (new Promise(async (resolve, reject) => {
        $("#lang-list").html("");
        for (let l of lang) {
            $("#lang-list").append(`<li data-port="${l.code}"><i class="fab fa-pen-alt"></i> ${l.name}</li>`);
        }
        $("#lang-list > li").click(function() {
            $("#lang-list > li").removeClass("active");
            $(this).addClass("active");
        });
        $("#lang-select-button").click(function () {
            let lang = $("#lang-list > li.active").attr("data-port");
            if (lang) {
                resolve(lang);
            } else {
                reject("not_select");
            }
            $("#lang-select-dialog").hide();
        });
        $("#lang-select-dialog .close-btn").click(() => {
            reject("cancle");
            $("#lang-select-dialog").hide();
        });
        $("#lang-select-dialog").show();
    }));
}
selectLanguage = async  () => {
    try {
        let langCode = await this.showLangSelect();
        settings.language = langCode;
        localStorage.setItem("mango_language", langCode);
        //reload
        //loadLanguageScripts();
        //init();
    } catch(e) {
        console.log(e);
        return false;
    }
}
$("#language-setting").click(async () => {
    await selectLanguage();
});

let openProjectFromData = async (data, path) => {
    vFSTree = JSON.parse(data);
    await hotUpdate();
    if (!isEmbed) NotifyS(Blockly.Msg.UI_OPEN_PROJECT + path)
    statusLog(Blockly.Msg.UI_OPEN_PROJECT + path);
    $("#project-name").val(path.split(/[\\\/]/).pop().replace(".mb", ""));
}

let openProject = async (filePath) => {
    if (!await NotifyConfirm(Blockly.Msg.UI_CONFIRM_LOST_BLOCKS)) {
        return;
    }
    if (!isElectron) {
        let input = document.createElement("input");
        input.type = "file";
        input.accept = ".mb";
        input.addEventListener("change", function() {
            // console.log(this.files);
            let fileName = this.files[0].name.replace(".mb", "");
            let fr = new FileReader();
            fr.onload = async () => {
                openProjectFromData(fr.result, fileName);
            };
            fr.readAsText(this.files[0]);
        }, false); 
        input.click();
    } else {
        let OpenFilePath = null;
        if (!filePath) {
            let result = await dialog.showOpenDialogSync({
                properties: [
                'openFile'
                ],
                filters: [{ 
                    name: 'mangoblock', 
                    extensions: ['mb'] 
                }]
            });

            if (result == undefined) {
                return;
            }

            OpenFilePath = result[0];
        } else {
            OpenFilePath = filePath;
        }
        
        nodeFS.readFile(OpenFilePath, async (err, data) => {
            if (err) {
                NotifyE("Open project fail: " + err.toString());
                return;
            }

            projectFilePath = OpenFilePath;
            openProjectFromData(data, OpenFilePath);
        });
    }
};

let imageSelectUpdate = (sel) => {
    $(sel).find("li > div").click(function() {
        $(sel).find("li > div").removeClass("active");
        $(this).addClass("active");
    });
};

$(() => {
    for (let sel of $(".image-select")) {
        imageSelectUpdate(sel);
    }
});

$(document).keydown(function(event) {
    // console.log(event)
    if (event.ctrlKey) {
        let key = event.key;
        if (key === 's') { // Ctrl + S -> Save
            event.preventDefault();
            $("#save-project").click();
        } else if (key === 'n') { // Ctrl + N -> New
            event.preventDefault();
            $("#new-project").click();
        } else if (key === 'o') { // Ctrl + O -> Open
            event.preventDefault();
            $("#open-project").click();
        } else if (key === 'h') { // Ctrl + H -> Help
            event.preventDefault();
            $("#open-help").click();
        } else if (key === 't') { // Ctrl + T -> Terminal
            event.preventDefault();
            $("#open-terminal").click();
        } else if (key === 'u') { // Ctrl + U -> Upload
            event.preventDefault();
            $("#upload-program").click();
        } else if (key === 'c') { // Ctrl + C -> Code
            event.preventDefault();
            $("#open-code").click();
        }
    }

    return true;
});

$("body")[0].addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.items.length > 0) {
        let fPath = e.dataTransfer.items[0].getAsFile().path;
    
        // console.log(fPath);
        if (fPath.endsWith(".mb")) {
            openProject(fPath).then();
        }
    }
});

$("body")[0].addEventListener("dragover", (e) => {
    e.preventDefault();
});

// Auto Port connect (only on Electron)
let autoConnectFlag = true;
let timerAutoConnect = null;

let autoConnectCheck = async () => {
    if (autoConnectFlag && settings.boardId && isElectron && !serial.port) {
        let board = boards.find(board => board.id === settings.boardId);

        let usbInfo = board.usb[0];
        let portList = await serialAPI.list();
        if (portList) {
            let port = portList.find(info => info.productId === usbInfo.productId && info.vendorId === usbInfo.vendorId);
            if (port) {
                await serial.electronConnect(port.path, true);
            }
        }
    }
    if (timerAutoConnect) clearTimeout(timerAutoConnect);
    timerAutoConnect = setTimeout(autoConnectCheck, autoConnectFlag ? 500 : 5000);
};

if (isElectron) {
    autoConnectCheck().then();
    // Update Check
    checkUpdate = async () => {
        let lastPackageFile = await fetch("https://api.github.com/repos/cmlo/mangoblock-desktop/contents/package.json");
        if (lastPackageFile.status !== 200) {
            console.error("Get package.json fail");
            return;
        }
        lastPackageFile = await lastPackageFile.json();
        lastPackageFile = Base64.decode(lastPackageFile.content);
        lastPackageFile = JSON.parse(lastPackageFile);
        if (typeof lastPackageFile.version !== "undefined") {
            if (lastPackageFile.version !== pjson.version) {
                let msgText = Blockly.Msg["UI_APP_NEW_VERSION"];
                console.log(msgText, lastPackageFile.version, pjson.version);
                NotifyI(msgText);
            } else {
                console.log("mangoblock desktop now is last version", lastPackageFile.version, pjson.version);
            }
        } else {
            console.error("package.json error", lastPackageFile);
        }
    }
    checkUpdate().then();
}

// Flyout auto close
let flyoutAutoCloseToggle = function () {
    settings.flyoutAutoClose = (settings.flyoutAutoClose==="1")? "0":"1";
    localStorage.setItem("mango_flyout", settings.flyoutAutoClose);
    flyoutAutoClose();
}
let flyoutAutoClose = function () {
    blocklyWorkspace.toolbox_.flyout_.autoClose = (settings.flyoutAutoClose==="1")? true:false;
}
flyoutAutoClose();



/* ******************* binding ************************************************************************* */
$("#new-project").click(async () => {
    if (!(await NotifyConfirm(Blockly.Msg.UI_CONFIRM_LOST_BLOCKS))) {
        return;
    }
    $("#project-create-dialog #hardware-select ul").html("");
    (() => {
        let board = boards.find(board => board.id === settings.boardId);
        $("#project-create-dialog #hardware-select ul").append(`
            <li>
                <div data-board-id="${board.id}">
                    <div class="image"><img src="${rootPath}/boards/${board.id}/${board.image}" alt=""></div>
                    <div class="name">${board.name}</div>
                    <div class="name">${Blockly.Msg.UI_USER_LEVEL}: ${board.level}</div>
                    <div class="name">${Blockly.Msg.UI_PROGRAM_LANGUAGE}: ${board.programId}</div>
                </div>
            </li>
        `);
    })();
    let index = 1;
    for (let board of boards) {
        if (board.id === settings.boardId) {
            continue;
        }
        $("#project-create-dialog #hardware-select ul").append(`
            <li class="${index > 4 ? "show-when-click-see-more" : ""}">
                <div data-board-id="${board.id}">
                    <div class="image"><img src="${rootPath}/boards/${board.id}/${board.image}" alt=""></div>
                    <div class="name">${board.name}</div>
                    <div class="name">${Blockly.Msg.UI_USER_LEVEL}: ${board.level}</div>
                    <div class="name">${Blockly.Msg.UI_PROGRAM_LANGUAGE}: ${board.programId}</div>
                </div>
            </li>
        `);
        index++;
    }
    $("#board-see-more-btn").show();

    $("#project-create-dialog #hardware-select ul > li > div").click(function() {
        settings.boardId = $(this).attr("data-board-id");
        let board = boards.find(board => board.id === settings.boardId);
        // console.log(board);
    });

    imageSelectUpdate("#hardware-select");
    $(`#hardware-select ul > li > div[data-board-id='${settings.boardId}']`).click();
    $("#project-create-dialog").show();
});

$("#save-project").click(async () => {
    if (!github_project_repo) { // Save to local
        if (!isElectron) {
            let data = JSON.stringify(vFSTree);
            let blob = new Blob([data], { type: "application/json" });
            let url = window.URL.createObjectURL(blob);
            let link = document.createElement("a");
            link.download = $("#project-name").val() + ".mb";
            link.href = url;
            link.click();
            window.URL.revokeObjectURL(url);
            statusLog("Save project");
        }
        else {
            let OpenFilePath = "";
            if ((!projectFilePath) || saveAsFlag) {
                let result = await dialog.showSaveDialog({
                    filters: [{
                        name: 'mangoblock',
                        extensions: ['mb']
                    }],
                    defaultPath: $("#project-name").val() + ".mb"
                });
                if (result.canceled) {
                    return;
                }
                projectFilePath = result.filePath;
                saveAsFlag = false;
            }

            nodeFS.writeFile(projectFilePath, JSON.stringify(vFSTree), err => {
                if (err) {
                    NotifyE("Save project fail: " + err.toString());
                    return;
                }
                NotifyS("Save project at " + projectFilePath);
                statusLog("Save project at " + projectFilePath);
            });
        }
    } else { // Save to GitHub
        saveCodeToGitHub();
    }
});
$("#open-project").click(async () => {
    await openProject();
});
$("#open-help").click(() => {
    if (!isElectron) {
        window.open("https://mangoblock.tw/", "_blank");
    } else {
        shell.openExternal("https://mangoblock.tw/");
    }
});
$("#port-select").click(async () => {
    await serial.selectPortType();
});
$("#port-connect").click(async () => {
    await serial.connect();
});
$("#connect-device").click(async () => {
    //await connectDevice();
    await serial.connect();
});
$("#disconnect-device").click(async () => {
    //await disconnectDevice();
    await serial.disconnect();
});
$("#btn-run").click(async function() {
    tools.run();
});
$("#btn-stop").click(async function() {
    tools.stop();
});
$("#upload-program").click(async function() {
    await tools.upload();
});
$("#remove-program").click(async function() {
    await tools.remove();
});
$("#update-firmware").click(async function() {
    await firmwareUpgradeFlow();
});


// ******************  start page  *******************************************
$(() => $("#full-loading").fadeOut());
switchMode(1);

