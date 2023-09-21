let codeShowFlag = false;
let beforeWidthCodeviewerSize = 300;

const MINIMUM_CODEVIEWER_WIDTH = 300;

let codeFullSizeFlag = false;


let setCodeViewerSize = function (size) {
    localStorage.setItem("codeviewer_size", size);
}
let getCodeViewerSize = function () {
    return localStorage.getItem("codeviewer_size");
}
let removeCodeViewerSize = function () {
    localStorage.removeItem("codeviewer_size");
}


if (!isEmbed && deviceMode === MODE_REAL_DEVICE) {
    codeviewer_size = getCodeViewerSize();
    if (codeviewer_size) {
        codeviewer_size = + codeviewer_size;
        beforeWidthCodeviewerSize = codeviewer_size >= MINIMUM_CODEVIEWER_WIDTH ? codeviewer_size : MINIMUM_CODEVIEWER_WIDTH;
        $(() => $("#open-code").click());
    }
}


$("#close-codeviewer").click(() => {
    $("#codeviewer").css("display", "none");
    if (codeFullSizeFlag) {
        $(".page > .main").css("display", "flex");
    }
    Blockly.triggleResize();
    if (editor) editor.layout();
    codeShowFlag = false;
    $("#codeviewer-h-resize").css("display", "none");
    removeCodeViewerSize();
});

$("#open-codeviewer").click(() => {
    $("#codeviewer").css("display", "flex");
    if (codeFullSizeFlag) {
        $(".page > .main").css("display", "none");
    } else {
        $("#codeviewer").width(beforeWidthCodeviewerSize);
        Blockly.triggleResize();
    }
    $("#codeviewer-h-resize").css("display", "block");
    $("#codeviewer-h-resize").css("right", $("#codeviewer").width());
    setCodeViewerSize($("#codeviewer").width());
    Blockly.triggleResize();
});

$("#codeviewer-h-resize").bind('mousedown', function(event){
    offsetX = event.pageX - ($(document).width() - +$("#codeviewer-h-resize").css("right").replace("px", ""));
    offsetX = $(document).width() + offsetX;
    $("#codeviewer-h-resize").addClass("active");

    $(document).bind('mousemove', function(event){
        let rightPos = offsetX - event.pageX;
        rightPos = rightPos < MINIMUM_CODEVIEWER_WIDTH ? MINIMUM_CODEVIEWER_WIDTH : rightPos;
        $("#codeviewer-h-resize").css("right", rightPos - 14);
    }).bind('mouseup', function(event){
        $(this).unbind('mousemove');
        $(this).unbind('mouseup');

        if (deviceMode === MODE_REAL_DEVICE) {
            $("#codeviewer").width(+$("#codeviewer-h-resize").css("right").replace("px", ""));
            setCodeViewerSize($("#codeviewer").width());
        }

        Blockly.triggleResize();
        $("#codeviewer-h-resize").removeClass("active");
    });
});
