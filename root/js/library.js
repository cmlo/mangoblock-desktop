

let libUploadFlow = async () => {    
    $("#upload-lib-button").prop("disabled", true);
    $("#lib-upload-dialog").show();

    $("#lib-upload-dialog article").hide();
    $("#lib-upload-dialog article.todo").show();
    $("#lib-upload-dialog").show();
};

$("#upload-lib-button").click(async () => {
    $("#lib-upload-dialog article.todo").hide();
    $("#lib-upload-dialog .progress-box > .back-drop").width(0);
    $("#lib-upload-dialog article.doing").show();
    $("#lib-upload-dialog .close-btn").hide();

    await UploadLib();
    
});

$("#lib-upload-dialog .close-btn").click(() => $("#lib-upload-dialog").hide());


let UploadLib = async () => {
    let board = boards.find(board => board.id === settings.boardId);
    // check connection
    if (!serial.port) {
        if (!await serial.connect()) {
            $("#upload-program").removeClass("loading");
            return;
        }
        await sleep(300);
    }

    let filesUpload = [];
    for (const filePath of fs.walk(`${rootPath}/boards/${settings.boardId}/modules`)) {
        let fileName = filePath.replace(/^\//gm, "");
        if (fileName.endsWith(".py") || fileName.endsWith(".mpy")) {
            filesUpload.push({
                file: filePath.replace(/^.*[\\\/]/, ''),
                content: fs.read(`${rootPath}/boards/${settings.boardId}/modules/${fileName}`)
            });
        }
    }
    
    let method;
    if(settings.uploadMode === "REPL") {
        method = new UploadViaREPL("");
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