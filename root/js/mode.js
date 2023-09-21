let editor = null, editorReadonly = true;
//let useMode = "block";
let onKeyUpTimer = null;


function switchMode(value) {
    setEditorMode(value);
}

let initEditor = async function(lang = 'python') {
    editor = monaco.editor.create($("#code-container")[0], {
        language: lang,
        readOnly: true,
        automaticLayout: true,
        theme: 'vs-dark',
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        wrappingStrategy: 'advanced',
        minimap: {
            enabled: false
        },
        overviewRulerLanes: 0
    });
    editor.onKeyUp(async (evant) => {
        // console.log(evant);
        let allowKey = [
            8, // CapsLock
            9, // ESC
            6, // AltLeft
            60, // F2
            61, // F3
            62, // F4
            63, // F5
            64, // F6
            65, // F7
            66, // F8
            67, // F9
            68, // F10
            69, // F11
            70, // F12
            15, // ArrowLeft
            16, // ArrowUp
            17, // ArrowRight
            18, // ArrowDown
        ]
        if (!evant.ctrlKey && !evant.metaKey && !evant.shiftKey && allowKey.indexOf(evant.keyCode) === -1 && settings.useMode !== "code") {
            evant.preventDefault();
            if (isEmbed) {
                return;
            }
            if (await NotifyConfirm("If edit code, program in block will lost. Are you want to edit ?")) {
                editor.updateOptions({ readOnly: false });
                settings.useMode = "code";
            } else {
                editor.updateOptions({ readOnly: true });
                settings.useMode = "block";
            }
        }

        if (settings.useMode === "code") {
            if (onKeyUpTimer) clearTimeout(onKeyUpTimer);
            onKeyUpTimer = setTimeout(() => {
                saveCodeToLocal();
            }, 1000);
        }
    });
}

let setEditorMode = async function (value) {
    if (value == 1) { // Block mode
        if (settings.useMode === "code") {
            await updataWorkspaceAndCategory();
            //editor.updateOptions({ readOnly: true });
        }
        $("#blocks-editor").css("display", "flex");
        $("#code-editor").hide();
        Blockly.triggleResize();
        blocklyWorkspace.scrollCenter();
        settings.useMode = "block";
    } 
    else if (value == 2) { // Code mode
        settings.useMode = "code";
        $("#blocks-editor").hide();
        $("#code-editor").css("display", "flex");
        let code = Blockly.Python.workspaceToCode(blocklyWorkspace);
        if (!editor) {
            await initEditor();
        }
        editor.setValue(code);
        editor.layout();
    } else { // ????

    }

    $(this).addClass("active");    
};

let updateEditorValue = async function () {
    let code = Blockly.Python.workspaceToCode(blocklyWorkspace);
    if (!editor) {
        await initEditor();
    }
    editor.setValue(code);
    editor.layout();
}

let __Function = () => "";
let __Number = 0;
let __Text = "";
let __Array = [];

// Helper function to return the monaco completion item type of a thing
function getType(thing, isMember) {
    isMember = (isMember == undefined) ? (typeof isMember == "boolean") ? isMember : false : false; // Give isMember a default value of false

    switch ((typeof thing).toLowerCase()) {
        case "object":
            return monaco.languages.CompletionItemKind.Class;

        case "function":
            return (isMember) ? monaco.languages.CompletionItemKind.Method : monaco.languages.CompletionItemKind.Function;

        default:
            return (isMember) ? monaco.languages.CompletionItemKind.Property : monaco.languages.CompletionItemKind.Variable;
    }
}

let autoCompletionDictionary = { };

// Register object that will return autocomplete items 
monaco.languages.registerCompletionItemProvider('python', {
    // Run this function when the period or open parenthesis is typed (and anything after a space)
    triggerCharacters: ['.', '('],

    // Function to generate autocompletion results
    provideCompletionItems: function (model, position, token) {
        // Split everything the user has typed on the current line up at each space, and only look at the last word
        let last_chars = model.getValueInRange({ startLineNumber: position.lineNumber, startColumn: 0, endLineNumber: position.lineNumber, endColumn: position.column });
        if (last_chars.lastIndexOf("(") >= 0) {
            last_chars = last_chars.substring(last_chars.lastIndexOf("(") + 1, last_chars.length);
        }
        let words = last_chars.replace("\t", "").split(" ");
        let active_typing = words[words.length - 1]; // What the user is currently typing (everything after the last space)

        // If the last character typed is a period then we need to look at member objects of the obj object 
        let is_member = active_typing.charAt(active_typing.length - 1) == ".";

        // Array of autocompletion results
        let result = [];

        // Used for generic handling between member and non-member objects
        let last_token = autoCompletionDictionary;
        let prefix = '';

        if (is_member) {
            // Is a member, get a list of all members, and the prefix
            let parents = active_typing.substring(0, active_typing.length - 1).split(".");
            last_token = autoCompletionDictionary[parents[0]];
            prefix = parents[0];

            // Loop through all the parents the current one will have (to generate prefix)
            for (let i = 1; i < parents.length; i++) {
                if (last_token.hasOwnProperty(parents[i])) {
                    prefix += '.' + parents[i];
                    last_token = last_token[parents[i]];
                } else {
                    // Not valid
                    return result;
                }
            }

            prefix += '.';
        }

        // Get all the child properties of the last token
        for (let prop in last_token) {
            // Do not show properites that begin with "__"
            if (last_token.hasOwnProperty(prop) && !prop.startsWith("__")) {
                // Get the detail type (try-catch) incase object does not have prototype 
                let details = '';
                try {
                    details = last_token[prop].__proto__.constructor.name;
                } catch (e) {
                    details = typeof last_token[prop];
                }

                // Create completion object
                let to_push = {
                    label: prefix + prop,
                    kind: getType(last_token[prop], is_member),
                    detail: details,
                    insertText: prop
                };

                // Change insertText and documentation for functions
                if (to_push.detail.toLowerCase() == 'function') {
                    to_push.insertText += "(";
                    // to_push.documentation = (last_token[prop].toString()).split("{")[0]; // Show function prototype in the documentation popup
                } else if (Array.isArray(last_token[prop])) {
                    to_push.insertText += "[";
                }

                // Add to final results
                result.push(to_push);
            }
        }

        return {
            suggestions: result
        };
    }
});

