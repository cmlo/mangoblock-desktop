if (isElectron) {
    const { Menu, MenuItem } = remote;

    Menu.setApplicationMenu(Menu.buildFromTemplate([
        {
            label: Blockly.Msg.MENU_FILE,
            submenu: [
                {
                    label: Blockly.Msg.MENU_FILE_NEW,
                    accelerator: 'Ctrl+N',
                    click: () => $("#new-project").click()
                },
                {
                    label: Blockly.Msg.MENU_FILE_OPEN,
                    accelerator: 'Ctrl+O',
                    click: () => $("#open-project").click()
                },
                {
                    label: Blockly.Msg.MENU_FILE_SAVE,
                    accelerator: 'Ctrl+S',
                    click: () => $("#save-project").click()
                },
                {
                    label: Blockly.Msg.MENU_FILE_SAVE_AS,
                    accelerator: 'Ctrl+Shift+S',
                    click: () => {
                        saveAsFlag = true;
                        $("#save-project").click();
                    }
                },
                { type: 'separator' },
                {
                    label: Blockly.Msg.MENU_FILE_RESET,
                    accelerator: 'Ctrl+Shift+R',
                    click: () => {
                        localStorage.removeItem('mango_AutoSave');
                    }
                },
                { type: 'separator' },
                { 
                    label: Blockly.Msg.MENU_FILE_EXIT,
                    role: 'quit' 
                }
            ]
        },
        {
            label: Blockly.Msg.MENU_EDIT,
            submenu: [
                { 
                    label: Blockly.Msg.MENU_EDIT_UNDO,
                    role: 'undo' },
                { 
                    label: Blockly.Msg.MENU_EDIT_REDO,
                    role: 'redo' },
                { type: 'separator' },
                { 
                    label: Blockly.Msg.MENU_EDIT_CUT,
                    role: 'cut' },
                { 
                    label: Blockly.Msg.MENU_EDIT_COPY,
                    role: 'copy' },
                { 
                    label: Blockly.Msg.MENU_EDIT_PASTE,
                    role: 'paste' },
                { 
                    label: Blockly.Msg.MENU_EDIT_DELETE,
                    role: 'delete' },
                { type: 'separator' },
                { 
                    label: Blockly.Msg.MENU_EDIT_SELECT_ALL,
                    role: 'selectAll' }
            ]
        },
        {
            label: Blockly.Msg.MENU_VIEW,
            submenu: [
                { 
                    label: Blockly.Msg.MENU_VIEW_RELOAD,
                    role: 'reload' },
                { 
                    label: Blockly.Msg.MENU_VIEW_FORCE_RELOAD,
                    role: 'forcereload' },
                { role: 'toggledevtools' },
                { type: 'separator' },
                { 
                    label: Blockly.Msg.MENU_VIEW_ACTUAL_SIZE,
                    role: 'resetzoom' },
                { 
                    label: Blockly.Msg.MENU_VIEW_ZOOM_IN,
                    role: 'zoomin' },
                { 
                    label: Blockly.Msg.MENU_VIEW_ZOOM_OUT,
                    role: 'zoomout' },
                { type: 'separator' },
                {
                    label: Blockly.Msg.MENU_VIEW_BLOCK_STYLES,
                    submenu: [
                        {
                            type: "radio",
                            label: Blockly.Msg.MENU_VIEW_BLOCK_STYLES_GERAS,
                            click: () => selectRenderer("geras"),
                            checked: getRenderer() === "geras"
                        },
                        {
                            type: "radio",
                            label: Blockly.Msg.MENU_VIEW_BLOCK_STYLES_ZELOS,
                            click: () => selectRenderer("zelos"),
                            checked: getRenderer() === "zelos"
                        },
                    ]
                },
                {
                    label: Blockly.Msg.MENU_VIEW_TOOLBOX_STYLES,
                    submenu: [
                        {
                            type: "radio",
                            label: Blockly.Msg.MENU_VIEW_TOOLBOX_STYLES_DARK,
                            click: () => selectTheme("dark"),
                            checked: getTheme() === "dark"
                        },
                        {
                            type: "radio",
                            label: Blockly.Msg.MENU_VIEW_TOOLBOX_STYLES_LIGHT,
                            click: () => selectTheme("light"),
                            checked: getTheme() === "light"
                        },
                    ]
                },
                {
                    label: Blockly.Msg.MENU_VIEW_TOOLBOX_FLYOUT,
                    submenu: [
                        {
                            type: "checkbox",
                            label: Blockly.Msg.MENU_VIEW_TOOLBOX_FLYOUT_AUTO,
                            click: () => flyoutAutoCloseToggle(),
                            checked: settings.flyoutAutoClose === "1"
                        },
                    ]
                },
                {
                    label: Blockly.Msg.MENU_VIEW_BLOCK_ZOOM,
                    submenu: [
                        {
                            type: "checkbox",
                            label: Blockly.Msg.MENU_VIEW_BLOCK_ZOOM_WHEEL,
                            click: () => zoomWheelToggle(),
                            checked: settings.zoomWheel === "1"
                        },
                    ]
                },
                { type: 'separator' },
                { 
                    label: Blockly.Msg.MENU_VIEW_TOGGLE_FULLSCREEN,
                    role: 'togglefullscreen' }
            ]
        },
        {
            label: Blockly.Msg.MENU_BOARD,
            submenu: [
                {
                    label: Blockly.Msg.MENU_BOARD_UPLOAD,
                    click: () => $("#upload-program").click()
                },
                {
                    label: Blockly.Msg.MENU_BOARD_REMOVE,
                    click: () => $("#remove-program").click()
                },
                {
                    label: Blockly.Msg.MENU_BOARD_RUN,
                    click: () => $("#btn-run").click()
                },
                {
                    label: Blockly.Msg.MENU_BOARD_STOP,
                    click: () => $("#btn-stop").click()
                },
                {
                    label: Blockly.Msg.MENU_BOARD_RESET,
                    click: () => tools.reset()
                },
                { type: 'separator' },
                {
                    label: Blockly.Msg.MENU_BOARD_OPEN_TERMINAL,
                    click: () => $("#open-terminal").click()
                },
                {
                    label: Blockly.Msg.MENU_BOARD_CONNECT,
                    click: () => $("#connect-device").click()
                },
                {
                    label: Blockly.Msg.MENU_BOARD_DISCONNECT,
                    click: () => $("#disconnect-device").click()
                },
                { type: 'separator' },
                {
                    label: Blockly.Msg.MENU_BOARD_UPDATE_FIRMWARE,
                    click: () => firmwareUpgradeFlow()
                }
            ]
        },
        {
            label: Blockly.Msg.MENU_WINDOW,
            submenu: [
                { 
                    label: Blockly.Msg.MENU_WINDOW_MINIMIZE,
                    role: 'minimize' },
                { 
                    label: Blockly.Msg.MENU_WINDOW_ZOOM,
                    role: 'zoom' },
                { 
                    label: Blockly.Msg.MENU_WINDOW_CLOSE,
                    role: 'close' }
            ]
        },
        {
            label: Blockly.Msg.MENU_HELP,
            submenu: [
                {
                    label: Blockly.Msg.MENU_HELP_DOCUMENT,
                    click: () => $("#open-help").click()
                },
                { type: 'separator' },
                {
                    label: Blockly.Msg.MENU_HELP_JOIN_FACEBOOK,
                    click: () => shell.openExternal('https://www.facebook.com/groups/mangoblock')
                },
                {
                    label: Blockly.Msg.MENU_HELP_REPORT_ISSUE,
                    click: () => shell.openExternal('https://github.com/cmlo/mangoblock-desktop/issues')
                },
                { type: 'separator' },
                {
                    label: Blockly.Msg.MENU_HELP_CHECK_UPDATE,
                    click: () => checkUpdate()
                },
                {
                    label: Blockly.Msg.MENU_HELP_DOWNLOAD_LAST_VERSION,
                    click: () => shell.openExternal('https://github.com/cmlo/mangoblock-desktop/releases')
                },
                { type: 'separator' },
                {
                    label: Blockly.Msg.MENU_HELP_ABOUT,
                    click: async () => {
                        dialog.showMessageBox({
                            type: "info",
                            title: Blockly.Msg.MENU_HELP_ABOUT,
                            message: `mangoblock desktop version ${pjson.version} \n\nMangoBlock is a Blocks-based programming editor.\n\nAuthor: Dr. Chihmin Lo\nNational Taipei University of Business, Taiwan`
                        });
                    }
                },
            ]
        }
    ]));
}
