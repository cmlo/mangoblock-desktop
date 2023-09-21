'use strict';

let settings = {
    boardId: "PicoX2-Tank",
    chipId: "RP2",
    uploadMode: "REPL",
    runMode: "Y",
    programId: "python",
    useMode: "block",
    deviceMode: "ReadDevices",
    language: localStorage.getItem("mango_language") || "zh-hant",
    projectName: "myProject",
    theme: "classic",
    uiTheme: "light",
    flyoutAutoClose: localStorage.getItem("mango_flyout") || "1",
    zoomWheel: localStorage.getItem("mango_zoomwheel") || "1"
}



// load language package
let loadLanguageScripts = function() {
    if(settings.language != "en") {
        loadScript(`${rootPath}/blockly/msg/lang/${settings.language}.js`);
        loadScript(`${rootPath}/blockly/msg/ext/${settings.language}.js`);
    }
}
loadLanguageScripts();


// local storage
let selectRenderer = function(renderer) {
    localStorage.setItem("mango_renderer", renderer);
    window.location.reload();
};
let getRenderer = function() {
    return localStorage.getItem("mango_renderer") || "zelos";  // zelos or geras
};

let selectTheme = function(theme) {
    localStorage.setItem("mango_theme", theme);
    settings.uiTheme = theme;
    loadTheme();
    updateBlockCategory().then();
}
let getTheme = function() {
    return localStorage.getItem("mango_theme") || "dark";
};
let loadTheme = function () {
    settings.uiTheme = getTheme();
    let link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = `${rootPath}/css/theme-${settings.uiTheme}.css`;
    document.head.appendChild(link);
}

let selectDeviceMode = function (deviceMode) {
    localStorage.setItem("mango_deivce_mode", deviceMode);
}
let getDeviceMode = function () {
    return localStorage.getItem("mango_deivce_mode") || "0";
}

let zoomWheelToggle = function () {
    settings.zoomWheel = (settings.zoomWheel==="1")? "0":"1";
    localStorage.setItem("mango_zoomwheel", settings.zoomWheel);
    //window.location.reload();
}