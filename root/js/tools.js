'use strict';

/*** Toolbox ***/
let getToolboxIcon = function (iconFile) {
    let icon = "/images/toolbox/{theme}/"+iconFile;
    return icon;
}

let getExtensionIcon = function (id, iconFile) {
    let icon = id + "/static/{theme}/"+iconFile;
    return icon;
}

let getToolboxEmptyIcon = function () {
    let icon = "/images/toolbox/empty.png";
    return icon;
}

let themeToolboxIcon = function (iconPath) {
    return iconPath.replace("{theme}", settings.uiTheme);
}


/*** run program or upload ***/
let RawREPLMode = false;
let moduleBuiltIn = [
    "framebuf", "ucryptolib", "urandom",
    "_boot", "gc", "uctypes", "ure",
    "_onewire", "inisetup", "uerrno",
    "_thread", "machine", "uhashlib", "uselect",
    "_webrepl", "math", "uhashlib", "usocket",
    "apa106", "micropython", "uheapq", "ussl",
    "btree", "uio", "ustruct",
    "builtins", "network", "ujson", "utime",
    "cmath", "ntptime", "umqtt/robust", "utimeq",
    "dht", "onewire", "umqtt/simple", "uwebsocket",
    "ds18x20", "sys", "uos", "uzlib",
    "esp", "uarray", "upip", "webrepl",
    "esp32", "ubinascii", "upip_utarfile", "webrepl_setup",
    "flashbdev", "ucollections", "upysh", "websocket_helper",
    "time",
];
let mx = null;
let isProgramRunning = false;
let lastDataCount = 0;

let microPythonIsReadyNextCommand = () => {
    return Serial.lastData.endsWith((!RawREPLMode) ? ">>> " : ">");
}

let findIncludeModuleNameInCode = (code) => {
    const regex = /^\s*?(?:import|from)\s+([^\s]+)/mg;
    let moduleList = [];
    let m;
    while ((m = regex.exec(code)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        let moduleName = m[1];
        if (moduleList.indexOf(moduleName) < 0) {
            moduleList.push(moduleName);
        }
    }
    moduleList = moduleList.filter((moduleName) => moduleBuiltIn.indexOf(moduleName) < 0);

    return moduleList;
}

let uploadFiles = async (code, mode=1) => {
    $("#uploading").show();
    statusbar.log("Start Upload");
    let t0 = (new Date()).getTime();

    let mainFile = (mode==1)? "main.py" : "temp.py";
    // prepare files
    let filesToUpload = [];
    // delete main.py
    //let mx = new RunPython();
    //mx.removeMainFile();
    // get main file program code
    if(!code) {
        if (settings.useMode === "block") {
            if(settings.programId === "python") {
                code = Blockly.Python.workspaceToCode(blocklyWorkspace);
            }
            else if(settings.programId === "arduino") {
                // arduino
            }
            else if(settings.programId === "javascript") {
                // javascript
            }
        }
        else {
            code = editor.getValue();
        }
    }
    let moduleList = findIncludeModuleNameInCode(code);
    if (moduleList.length > 0) {
        for (const extensionId of fs.ls("/extension")) {
            for (const filePath of fs.walk(`/extension/${extensionId}/modules`)) {
                let fileName = filePath.replace(/^\//gm, "");
                if (fileName.endsWith(".py") || fileName.endsWith(".mpy")) {
                    if (moduleList.indexOf(fileName.replace(/\..+$/, "")) >= 0) {
                        filesToUpload.push({
                            file: filePath.replace(/^.*[\\\/]/, ''),
                            content: fs.read(`/extension/${extensionId}/modules/${fileName}`)
                        });
                    }
                }
            }
        }
    }
    // push main file to upload list
    filesToUpload.push({
        file: mainFile,
        content: code
    });

    let method;
    if(settings.uploadMode === "REPL") {
        method = new UploadViaREPL(mainFile);
    }
    else {
        method = new UploadOnBoot();
    }
    // start to upload
    if(method) {
        await method.start();
        for (let a of filesToUpload) {
            statusbar.log(`Uploading ${a.file}`);
            await method.upload(a.file, a.content);
        }
        statusbar.log(`Upload completed`);
        await method.end();
    }
    $("#uploading").hide();
}

let pythonUploadFlow = async (code) => {
    // check connection
    if (!serial.port) {
        if (!await serial.connect()) {
            $("#upload-program").removeClass("loading");
            return;
        }
        await sleep(300);
    }

    let filesUpload = [];

    // upload include files
    let uploadModuleList = findIncludeModuleNameInCode(code);
    if (uploadModuleList.length > 0) {
        for (const extensionId of fs.ls("/extension")) {
            for (const filePath of fs.walk(`/extension/${extensionId}/modules`)) {
                let fileName = filePath.replace(/^\//gm, "");
                if (fileName.endsWith(".py") || fileName.endsWith(".mpy")) {
                    if (uploadModuleList.indexOf(fileName.replace(/\..+$/, "")) >= 0) {
                        filesUpload.push({
                            file: filePath.replace(/^.*[\\\/]/, ''),
                            content: fs.read(`/extension/${extensionId}/modules/${fileName}`)
                        });
                    }
                }
            }
        }

        if (isElectron) {
            let extensionDir = sharedObj.extensionDir;
            for (const extensionId of nodeFS.ls(extensionDir)) {
                for (const filePath of (await nodeFS.walk(`${extensionDir}/${extensionId}/modules`))) {
                    let fileName = path.basename(filePath);
                    if (fileName.endsWith(".py") || fileName.endsWith(".mpy")) {
                        if (uploadModuleList.indexOf(fileName.replace(/\..+$/, "")) >= 0) {
                            filesUpload.push({
                                file: filePath.replace(/^.*[\\\/]/, ''),
                                content: (await readFileAsync(filePath)).toString()
                            });
                        }
                    }
                }
            }
        }
    }

    // push main program file to upload file list
    filesUpload.push({
        file: "mangoblock.py",
        content: code
    });

    // upload and exec method
    try {
        let method = null;
        const enterToREPL = async () => {
            method = new UploadViaREPL();
            try {
                await method.start();
            } catch (e) {
                await firmwareUpgradeFlow();
                throw e;
            }
        };
        if (settings.uploadMode === "REPL") {
            await enterToREPL();
        } else {
            method = new UploadOnBoot();
            try {
                await method.start();
            } catch (e) {
                NotifyW("Switch to upload via RawREPL [RECOMMENDED Upgrade fireware]");
                await enterToREPL();
            }
        }

        if (typeof skipFirmwareUpgrade === "undefined") {
            skipFirmwareUpgrade = false;
        }

        // Check MicroPython version
        if (settings.boardId && !skipFirmwareUpgrade) {
            let info = await method.getFirmwareInfo();
            let board = boards.find(board => board.id === settings.boardId);
            if (typeof board.firmware[0].version !== "undefined") {
                if (board.firmware[0].version !== info.version) {
                    if (typeof board.firmware[0].date !== "undefined") {
                        let dbFwDate = new Date(board.firmware[0].date).getTime();
                        let currentFwDate = new Date(info.date).getTime();
                        if (currentFwDate < dbFwDate) {
                            if (isElectron) {
                                await firmwareUpgradeFlow();
                            }
                            throw "Upload fail: MicroPython fireware is out of date";
                        }
                    }
                }
            }
        }

        // upload files from list
        for (let a of filesUpload) {
            statusbar.log(`Uploading ${a.file}`);
            await method.upload(a.file, a.content);
        }

        await method.end();
    }
    catch(e) {
        throw e;
    }
}

let runProgram = function () {
    if(settings.uploadMode === "REPL") {
        $("#uploading").show();
        let code;
        if(settings.useMode == "code") {
            code = editor.getValue();
        }
        else {
            code = Blockly.Python.workspaceToCode(blocklyWorkspace);
        }
        mx = new RunPython();
        mx.run(code).then(r => {
            NotifyI(MSG.runCodeEnd);
        });
        $("#uploading").hide();
    }
    else if(settings.uploadMode === "BURN") {
        //...
    }
    else if(settings.uploadMode === "VM") {
        if(settings.programId === "mBot") {
            mx = new mBot();
            mx.sendCommand().then(value => {
            });
        }
    }
}

let stopProgram = function () {
    if(settings.uploadMode === "REPL") {
        mx = new RunPython();
        mx.stop();
        NotifyI("程式已停止運行");
    }
    else if(settings.uploadMode === "VM") {
        if(settings.programId === "mBot") {
        }
    }
}

let uploadMainProgram = function () {
    dialog.showMessageBox({
        type: 'question',
        title: Blockly.Msg.UI_TITLE_CONFIRM_DIALOG,
        message: `${Blockly.Msg.UI_UPLOAD_MAIN} \n\n${Blockly.Msg.UI_CONFIRM}`,
        buttons: ['OK','CANCEL']
    }).then((r) => {
        if(r['response']==0) {
            let code;
            if (settings.useMode === "block") {
                if(settings.programId === "python") {
                    code = Blockly.Python.workspaceToCode(blocklyWorkspace);
                }
                else if(settings.programId === "arduino") {
                    // arduino
                }
                else if(settings.programId === "javascript") {
                    // javascript
                }
            }
            else {
                code = editor.getValue();
            }
            uploadFiles(code);
        }
    });
}

let removeProgram = function () {
    if(settings.uploadMode === "REPL") {
        dialog.showMessageBox({
                type: 'question',
                title: Blockly.Msg.UI_TITLE_CONFIRM_DIALOG,
                message: `${Blockly.Msg.UI_REMOVE_MAIN} \n\n${Blockly.Msg.UI_CONFIRM}`,
                buttons: ['OK','CANCEL']
            }).then((r) => {
                console.log(r['response']);
                if(r['response']==0) {
                    mx = new RunPython();
                    if(mx.removeMainFile()) {
                        NotifyI(Blockly.Msg.UI_REMOVE_MAIN_SUCCESS);
                    } else {
                        NotifyE(Blockly.Msg.UI_REMOVE_MAIN_FAIL);
                    }
                }
            });

    }
}

let resetProgram = function () {
    if(settings.uploadMode === "REPL") {
        mx = new RunPython();
        mx.reset();
        NotifyI("重新啟動主板完成");
    }
}

let checkMicroPythonFirmware = function () {
    let checkVersion = /MicroPython\s+([^\s]+)\s+on\s+([0-9\-]+);\s?(.+)\s+with\s+([^\s]+)$/m.exec(serial.lastData);
    if (checkVersion) {
        let firmwareInfo = {
            version: checkVersion[1],
            date: checkVersion[2],
            board: checkVersion[3],
            cpu: checkVersion[4]
        };
        return firmwareInfo;
    }
}

let tools = {
    toolboxIcon: getToolboxIcon,
    toolboxEmptyIcon: getToolboxEmptyIcon,
    themeIcon: themeToolboxIcon,
    extensionIcon: getExtensionIcon,
    run: runProgram,
    stop: stopProgram,
    upload: uploadMainProgram,
    remove: removeProgram,
    reset: resetProgram,
    checkFirmware: checkMicroPythonFirmware
};


/*** upload class ***/
class UploadOnBoot {
    constructor() {
    }

    async start() {
        serial.lastData = "";
        await serial.boardReset();
        if (!await this.checkEndWith("wait upload\r\n", 50, 50)) {
            throw "wait upload keyword timeout, only can use old method ?";
        }

        serial.lastData = "";
        await serial.writeSerialBytes([ 0x1F, 0xF1, 0xFF ]); // Sync bytes
        if (!await this.checkEndWith("upload mode\r\n", 100, 30)) {
            throw "Send sync bytes fail";
        }
    }

    async getFirmwareInfo() {
        serial.lastData = "";
        await this.sendCmd(0x01);
        if (!await this.checkEndWith("\r\n", 50, 30)) {
            throw "Device not respond";
        }

        let checkVersion = /MicroPython\s+([^\s]+)\s+on\s+([0-9\-]+);\s?(.+)\s+with\s+([^\s]+)$/m.exec(serialLastData);
        if (!checkVersion) {
            throw "Check version fail";
        }

        return {
            version: checkVersion[1],
            date: checkVersion[2],
            board: checkVersion[3],
            cpu: checkVersion[4]
        };
    }

    async upload(fileName, content) {
        if (content.length === 0) {
            content = "#No Code";
        }

        serial.lastData = "";
        await this.sendCmd(0x10, fileName);
        if (!await this.checkEndWith(`set path to ${fileName}\r\n`, 50, 20)) {
            throw "Set path fail !";
        }

        for (const chunkContent of content.match(/.{1,10000}/gs)) {
            serial.lastData = "";
            await this.sendCmd(0x11, chunkContent);
            if (!await this.checkEndWith("write end\r\n", 50, 100)) {
                throw "Error, write file fail !";
            }
        }
    }

    async end() {
        serial.lastData = "";
        await this.sendCmd(0xFF);
        if (!await this.checkIndexOf("exit upload mode\r\n", 50, 50)) {
            throw "exit upload mode fail";
        }
    }

    async sendCmd(cmd, data) {
        let encodeData = new TextEncoder("utf-8").encode(data);
        let content = [];
        content.push(cmd);
        if (typeof data !== "undefined") {
            content.push((encodeData.length >> 8) & 0xFF);
            content.push(encodeData.length & 0xFF);
            content = content.concat(Array.from(encodeData));
            let dataSum = 0;
            for (let index=0;index<encodeData.length;index++) {
                dataSum += encodeData[index];
                dataSum = dataSum & 0xFF;
            }
            content.push(dataSum);
        }
        await serial.writeSerialBytes(content);
    }

    async checkEndWith(str, delay=100, max_try=10) {
        let okFlag = false;
        for (let i=0;i<max_try;i++) {
            await sleep(delay);
            if (serial.lastData.endsWith(str)) {
                okFlag = true;
                break;
            }
        }
        return okFlag;
    }

    async checkIndexOf(str, stop=100, max_try=10) {
        let okFlag = false;
        for (let i=0;i<max_try;i++) {
            await sleep(stop);
            if (serial.lastData.indexOf(str) >= 0) {
                okFlag = true;
                break;
            }
        }
        return okFlag;
    }
}


class UploadViaREPL {
    constructor(programName = "") {
        RawREPLMode = false;
        this.mainFile = programName;
    }

    async getFirmwareInfo() {
        return this.firmwareInfo;
    }

    async start() {
        if (!Serial.lastData.endsWith(">>>") && Serial.lastData.endsWith(">")) { // Raw REPL mode ?
            Serial.lastData = "";
            RawREPLMode = true;
            await this.sendByteLoopWaitNextCommand(2, 100, 5); // Ctrl + B, Exit Raw REPL
        }
        RawREPLMode = false;
        Serial.lastData = "";
        if (!await this.sendByteLoopWaitNextCommand(3, 100, 100)) { // Ctrl + C
            throw "Access to MicroPython error.";
        }

        Serial.lastData = "";
        await serial.writeSerialByte(4); // Soft reset
        await sleep(300);

        // serialLastData = "";
        if (!await this.sendByteLoopWaitNextCommand(3, 100, 100)) { // Ctrl + C
            throw "Exit main program error";
        }

        let checkVersion = /MicroPython\s+([^\s]+)\s+on\s+([0-9\-]+);\s?(.+)\s+with\s+([^\s]+)$/m.exec(Serial.lastData);
        if (checkVersion) {
            this.firmwareInfo = {
                version: checkVersion[1],
                date: checkVersion[2],
                board: checkVersion[3],
                cpu: checkVersion[4]
            };
        }

        RawREPLMode = true;
        if (!await this.sendByteLoopWaitNextCommand(1, 50, 100)) { // Ctrl + A, Enter to Raw REPL
            throw "Enter to Raw REPL fail";
        }
    }

    async upload(fileName, content) {
        if (content.length === 0) {
            content = "#No Code";
        }

        let firstWriteFlag = true;
        Serial.lastData = "";
        let chunkContent1Array = [];
        if (settings.chipId === "ESP32") {
            chunkContent1Array = content.match(/.{1,500}/gs);
        } else if (settings.chipId === "RP2") {
            chunkContent1Array = content.match(/.{1,2048}/gs);
        }
        for (const chunkContent1 of chunkContent1Array) {
            Serial.lastData = "";
            if (!await this.sendLineLoopWaitMatch(`f=open("${fileName}", "${firstWriteFlag ? 'w' : 'a'}");w=f.write;p=print`, /OK[^>]*>$/gm, isElectron ? 50 : 100, 20)) {
                throw `open file ${fileName} fail !`;
            }

            if (settings.chipId === "ESP32") {
                for (const chunkContent2 of chunkContent1.match(/.{1,100}/gs)) {
                    Serial.lastData = "";
                    if (!await this.sendLineLoopWaitMatch(`p(w(${JSON.stringify(chunkContent2).replace(/[\u007F-\uFFFF]/g, chr => "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4))}))`, /OK[0-9]{1,3}[^>]*>/gm, isElectron ? 50 : 100, 20)) {
                        throw `write ${chunkContent2.length} fail !`
                    }

                    let n = /OK([0-9]{1,3})[^>]*>/gm.exec(Serial.lastData);
                    if (!n) {
                        throw "Match fail";
                    }

                    let cUTF8 = chunkContent2.match(/[\u007F-\uFFFF]/g);
                    let sendN = chunkContent2.length + (cUTF8 ? cUTF8.length * 2 : 0);
                    if (+n[1] !== sendN) {
                        throw `Data lost ? Send: ${sendN}, Ros: ${+n[1]}`;
                    }
                }
            }
            else if (settings.chipId === "RP2") {
                Serial.lastData = "";
                if (!await this.sendLineLoopWaitMatch(`p(w(${JSON.stringify(chunkContent1).replace(/[\u007F-\uFFFF]/g, chr => "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4))}))`, /OK[0-9]{1,3}[^>]*>/gm, isElectron ? 50 : 100, 20)) {
                    throw `write ${chunkContent1.length} fail !`
                }

                let n = /OK([0-9]{1,4})[^>]*>/gm.exec(Serial.lastData);
                if (!n) {
                    throw "Match fail";
                }

                let cUTF8 = chunkContent1.match(/[\u007F-\uFFFF]/g);
                let sendN = chunkContent1.length + (cUTF8 ? cUTF8.length * 2 : 0);
                if (+n[1] !== sendN) {
                    throw `Data lost ? Send: ${sendN}, Ros: ${+n[1]}`;
                }
            }

            Serial.lastData = "";
            if (!await this.sendLineLoopWaitMatch(`f.close()`, /OK[^>]*>$/gm, isElectron ? 300 : 500, 20)) {
                throw `close file ${fileName} fail !`;
            }

            firstWriteFlag = false;
        }
    }

    async end() {
        await serial.writeSerialByte(2); // Ctrl + B, Exit from Raw REPL
        RawREPLMode = false;
        if(this.mainFile != "") {
            if (settings.chipId === "RP2") {
                //await serial.writeSerialByte(4); // Soft reset
                //await sleep(300);
                await this.writeSerialNewLine(`exec(open("${this.mainFile}", "r").read(),globals())`);
            } else {
                await this.writeSerialNewLine(`exec(open("${this.mainFile}", "r").read(),globals())`);
            }
        }        
    }

    async sendByteLoopWaitNextCommand(data, delay=100, max_try=5) {
        let okFlag = false;
        for (let i=0;i<max_try;i++) {
            await serial.writeSerialByte(data);
            await sleep(delay);
            if (microPythonIsReadyNextCommand()) {
                okFlag = true;
                break;
            }
        }
        return okFlag;
    }

    async sendLineLoopWaitMatch(line, regex, delay=100, max_try=5) {
        await this.writeSerialNewLine(line);
        let okFlag = false;
        for (let i=0;i<max_try;i++) {
            await sleep(delay);
            if (Serial.lastData.match(regex)) {
                okFlag = true;
                break;
            }
        }
        return okFlag;
    }

    writeSerialNewLine(text) {
        serial.writeSerial(text + ((!RawREPLMode) ? "\r\n" : "\x04")).then(r => { });
    }
}


class RunPython {
    constructor() {
        RawREPLMode = false;
        this.encoder = new TextEncoder();
    }

    async run(code) {
        if (code) {
            //code += "print('OK')";
            code += '\r\r';
        }
        return this.serialWrite(`\x05${code}\x04`);
    }

    removeMainFile() {
        if(this.reset()) {
            let code = "import os\n";
            code += "os.remove('/mangoblock.py')\n";
            return this.run(code);
        }
        return false;
    }

    stop() {
        return this.serialWrite('\x03');
    }

    reset() {
        return this.serialWrite('\x04');
    }

    async serialWrite (data) {
        let dataArrayBuffer = undefined;
        switch (data.constructor.name) {
            case 'Uint8Array':
                dataArrayBuffer = data;
                break;
            case 'String':
            case 'Number':
                dataArrayBuffer = this.encoder.encode(data);
                break;
        }
        serial.writeSerial(dataArrayBuffer).then(() => {
            return true;
        });
        return false;
    }

    writeSerialNewLine(text) {
        serial.writeSerial(text + ((!RawREPLMode) ? "\r\n" : "\x04")).then(() => {
            return true;
        });
    }

    async getFirmwareInfo() {
        return this.firmwareInfo;
    }

    async checkFirmwareVersion() {
        let checkVersion = /MicroPython\s+([^\s]+)\s+on\s+([0-9\-]+);\s?(.+)\s+with\s+([^\s]+)$/m.exec(serial.lastData);
        if (checkVersion) {
            this.firmwareInfo = {
                version: checkVersion[1],
                date: checkVersion[2],
                board: checkVersion[3],
                cpu: checkVersion[4]
            };
        }
    }
};


class mBot {
    constructor() {
        this.prefix1_ = 0xFF;
        this.prefix2_ = 0x55;
        this.suffix1_ = 0x0d;
        this.suffix2_ = 0x0a;
        this.sendData = null;
    }
    bytesToHexString = function(byteArray) {
        return Array.from(byteArray, function(byte) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join(' ')
    }
    bytesToString = function (byteArray) {
        return Array.from(byteArray, function(byte) {
            return (String.fromCharCode(byte));
        }).join('')
    }

    async sendCommand() {
        let data = [0xff, 0x55, 0x09, 0x00, 0x02, 0x08, 0x07, 0x02, 0x00, 0x00, 0x0a, 0x00];
        this.sendData = this.bytesToHexString(data);
        await serial.writeSerialBytes(data);
    }

    async onResponse(data) {
        let recData = this.bytesToHexString(data);
        if(recData === this.sendData) {
            console.log("OK");
            term.write("OK");
        }
        else {
            console.log("Fail");
            term.write("Fail");
        }
    }


}