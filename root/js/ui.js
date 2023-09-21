// user interface settings 

let setBoardName = function(boardName) {
    $("#board-name").text(boardName);
}

let setFirmware = function(s) {
    $("#firmware-name").text(s);
}

let setUserLevel = function(s) {
    $("#level-name").text(s);
}

let statusLog = text => {
    let now = new Date();
    $("#text-status").text(`${text} at ${now.getHours()}:${(now.getMinutes() < 10 ? "0" : "")}${now.getMinutes()}:${(now.getSeconds() < 10 ? "0" : "")}${now.getSeconds()}`);
};

let usbState = function(isConnected, usbName="") {
    if(isConnected) {
        $("#disconnect-device").show();
        $("#connect-device").hide(); 
        $("#btn-disconnect").show();
        $("#btn-connect").hide();
        $("#usb-state").text(Blockly.Msg.UI_USB_CONNECTED+usbName);
    } else {
        $("#disconnect-device").hide();
        $("#connect-device").show();   
        $("#btn-disconnect").hide();
        $("#btn-connect").show();
        $("#usb-state").text(Blockly.Msg.UI_USB_DISCONNECT);
    }
}

let statusbar = {
    board: setBoardName,
    firmware: setFirmware,
    level: setUserLevel,
    log: statusLog,
    usb: usbState
}


let updateDisplayUI = function () {
    // initial
    $("#btn-disconnect").hide();
    $("#project-label").text(Blockly.Msg.UI_PROJECT_NAME);
    $("#usb-state").text(Blockly.Msg.UI_USB_DISCONNECT);
    $("#text-status").text(Blockly.Msg.UI_NOT_DO_ANYTING);
    $("#board-label").text(Blockly.Msg.UI_BOARD);
    $("#firmware-label").text(Blockly.Msg.UI_FIRMWARE);
    $("#level-label").text(Blockly.Msg.UI_LEVEL);
    $("#terminal_title").text(Blockly.Msg.UI_TERMINAL_TITLE);
    $("#note_title").text(Blockly.Msg.UI_NOTE_TITLE);
    $("#board-info_title").text(Blockly.Msg.UI_BOARD_INFO_TITLE);
    $("#title-new-project").text(Blockly.Msg.UI_TITLE_NEW_PROJECT);
    $("#label-new-project").text(Blockly.Msg.UI_LABEL_PROJECT_NAME);
    $("#label-hardware").text(Blockly.Msg.UI_LABEL_HARDWARE);
    $("#board-see-more-btn").text(Blockly.Msg.UI_SEE_MORE);
    $("#create-project-btn").text(Blockly.Msg.UI_CREATE);
    $("#project-name").val(settings.projectName);
    $("#btn-stop").hide();
    $("#firmware-upgrade-dialog header .title").text(Blockly.Msg.UI_FirmwareUpgrade);
    $("#firmware-upgrade-tip").text(Blockly.Msg.UI_FirmwareUpgradeTip);
    $("#firmware-upgrade-dialog section section .todo .note-for-rp2").text(Blockly.Msg.UI_FirmwareUpgradeNextTip);
    $("#install-firmware-button").text(Blockly.Msg.UI_FirmwareButton);
    $("#continue-upload").text(Blockly.Msg.UI_FirmwareContinue);
    $("#install_firmware").text(Blockly.Msg.UI_InstallingFirmware);
    $("#firmware-upgrade-close-btn").text(Blockly.Msg.UI_CLOSE);
    $("#firmware-upgrade-donot-close").text(Blockly.Msg.UI_FirmwareUpgradeDonotClose);
    $("#type-select-dialog header .title").text(Blockly.Msg.UI_SELECT_TYPE);
    $("#lang-select-dialog header .title").text(Blockly.Msg.UI_SELECT_LANG);
    $("#port-select-dialog header .title").text(Blockly.Msg.UI_SELECT_PORT);
    $("#code-example-dialog header .title").text(Blockly.Msg.UI_Examples);
    $("#example-dialog-tip").text(Blockly.Msg.UI_ExamplesDialogBox_Tip);

    // tip
    $("#switch-to-block").attr("title", Blockly.Msg.UI_MODE_BLOCK);
    $("#switch-to-python").attr("title", Blockly.Msg.UI_MODE_PYTHON);
    $("#open-example").attr("title", Blockly.Msg.UI_TIP_OPEN_EXAMPLE);
    $("#new-project").attr("title", Blockly.Msg.UI_TIP_NEW_PROJECT);
    $("#open-project").attr("title", Blockly.Msg.UI_TIP_OPEN_PROJECT);
    $("#save-project").attr("title", Blockly.Msg.UI_TIP_SAVE_PROJECT);
    $("#btn-run").attr("title", Blockly.Msg.UI_TIP_RUN_PROGRAM);
    $("#btn-stop").attr("title", Blockly.Msg.UI_TIP_STOP_PROGRAM);
    $("#upload-program").attr("title", Blockly.Msg.UI_TIP_UPLOAD_PROGRAM);
    $("#remove-program").attr("title", Blockly.Msg.UI_TIP_REMOVE_PROGRAM);
    $("#language-setting").attr("title", Blockly.Msg.UI_TIP_LANGUAGE_SETTING);
    $("#open-note").attr("title", Blockly.Msg.UI_TIP_OPEN_NOTES);
    $("#open-terminal").attr("title", Blockly.Msg.UI_TIP_OPEN_TERMINAL);
    $("#open-extension").attr("title", Blockly.Msg.UI_TIP_OPEN_EXTENSION);
    $("#update-firmware").attr("title", Blockly.Msg.UI_TIP_UPDATE_FIRMWARE);
    $("#example-dialog-close-button").attr("title", Blockly.Msg.UI_CLOSE)
    $("#add-example-code-to-workspace").attr("title", Blockly.Msg.UI_ADD_EXAMPLE);

}

let updateStatusButton = function () {
    if(isProgramRunning) {
        $("#btn-run").show();
        $("#btn-stop").show();
    }
    else {
        $("#btn-run").show();
        $("#btn-stop").show();
    }
}


updateDisplayUI();
loadTheme();
updateStatusButton();

/** Show a progress bar under the DOM `.top-menu`. */
class progress {
    constructor () {
        /**DOM node element for the progress bar.*/
        this.dom = $(".progress-bar");
        this.div = document.createElement ("div");
        this.dom.append(this.div);
        this.len = 0;
    }

    /**
     * Sets the progress bar width by the loaded and total to load, e.g. loaded=256, total=1024 equals 75%.
     * @param {number} loaded - How much has been loaded.
     * @param {number} total - Total to load.
     */
    load (loaded, total) {
        let percent = (loaded * 100 / total);
        this.div.style.width = percent + '%';
    }
    /**
     * Sets the progress bar width by the remaining value to load, e.g. 256 from 1024 equals 75%.
     * @param {number} len_ - How much more to load.
     */
    remain (len_) {
        let percent = ((this.len - len_) * 100 / this.len);
        this.div.style.width = percent + '%';
    }
    /**
     * Unhide :js:attr:`notify#dom`. and sets the (estimated) loading length.
     * @param {number} len_ - The (estimated) loading length.
     */
    start (len_) {
        this.len = len_;
        this.dom.id = 'on';
    }
    /**
     * Hides :js:attr:`notify#dom` and reset the style.
     */
    end () {
        this.dom.id = '';
        this.div.style.width = '0%';
    }
}
