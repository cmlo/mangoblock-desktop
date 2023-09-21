'use strict';

class Serial {
    static lastData = "";
    static portSelected = "usb";

    constructor() {
        this.writer = null;
        this.reader = null;
        this.port = null;
        this.decoder = new TextDecoder();
    }

    webConnect = async () => {
        navigator.serial.ondisconnect = () => {
            NotifyW(Blockly.Msg.UI_SERIAL_DISCONNECT);
            statusbar.usb(false, '');
            statusbar.log(Blockly.Msg.UI_SERIAL_DISCONNECT);
            this.port = null;
            term.dispose();
            term = null;
        }

        try {
            this.port = await navigator.serial.requestPort();
        } catch(e) {
            NotifyE(Blockly.Msg.UI_NOT_SELECT_PORT);
            return false;
        }

        try {
            await this.port.open({ baudrate: 115200 });
        } catch(e) {
            if (e.toString().indexOf("Failed to read the 'baudRate' property") >= 0) { // New version of Google Chrome ?
                try {
                    await this.port.open({ baudRate: 115200 });
                } catch(e) {
                    NotifyE(Blockly.Msg.UI_CANNOT_OPEN_SERIAL_PORT);
                    console.log(e);
                    this.port = null;
                    return false;
                }
            } else {
                NotifyE(Blockly.Msg.UI_CANNOT_OPEN_SERIAL_PORT);
                console.log("Error in try 2", e);
                this.port = null;
                return false;
            }
        }

        NotifyS(Blockly.Msg.UI_SERIAL_CONNECTED);
        statusbar.log(Blockly.Msg.UI_SERIAL_CONNECTED);
        statusbar.usb(true, this.port.portName);

        this.writer = this.port.writable.getWriter();
        // reader = serialPort.readable.getReader();

        term = new Terminal();
        if (!fitAddon) fitAddon = new FitAddon.FitAddon();
        term.loadAddon(fitAddon);
        term.open($("#terminal > section")[0]);
        try {
            fitAddon.fit();
        } catch(e) {

        }

        await this.port.readable.pipeTo(new WritableStream({
            write(chunk) {
                if (!firmwareUpdateMode) {
                    for (let key of chunk) {
                        term.write(String.fromCharCode(key));
                        Serial.lastData += String.fromCharCode(key);
                    }
                    if (Serial.lastData.length > 300) {
                        Serial.lastData = Serial.lastData.substring(Serial.lastData.length - 300, Serial.lastData.length);
                    }
                } else {
                    inputBuffer = inputBuffer.concat(Array.from(chunk));
                    console.log(inputBuffer);
                }
            }
        }));

        term.onData((data) => {
            this.writeSerial(data);
        });

        statusbar.usb(true, serialPort.portName);

        return true;
    }

    showTypeSelect = () => {
        return (new Promise(async (resolve, reject) => {
            $("#type-list > li").click(function() {
                $("#type-list > li").removeClass("active");
                $(this).addClass("active");
            });
            $("#type-select-button").click(function () {
                let select_type = $("#type-list > li.active").attr("data-port");
                if (select_type) {
                    resolve(select_type);
                } else {
                    reject("not_select");
                }
                $("#type-select-dialog").hide();
            });

            $("#type-select-dialog .close-btn").click(() => {
                reject("cancle");
                $("#type-select-dialog").hide();
            });

            $("#type-select-dialog").show();
        }));
    }

    selectPortType = async  () => {
        try {
            let typeName = await this.showTypeSelect();
            Serial.portSelected = typeName;
            if(typeName == "ble") {
                $('#port-select').attr('src', 'images/icons/bluetooth.svg');
            }
            else if(typeName == "wifi") {
                $('#port-select').attr('src', 'images/icons/wifi-g.svg');
            }
            else {
                $('#port-select').attr('src', 'images/icons/usb.svg');
            }

        } catch(e) {
            console.log(e);
            return false;
        }
    }

    showPortSelect = () => {
        return (new Promise(async (resolve, reject) => {
            $("#port-list").html("");
            for (let port of (await serialAPI.list())) {
                $("#port-list").append(`<li data-port="${port.path}"><i class="fab fa-usb"></i> ${port.path} - ${port.manufacturer}</li>`);
            }

            $("#port-list > li").click(function() {
                $("#port-list > li").removeClass("active");
                $(this).addClass("active");
            });

            $("#port-select-button").click(function() {
                let select_port = $("#port-list > li.active").attr("data-port");
                if (select_port) {
                    resolve(select_port);
                } else {
                    reject("not_select");
                }
                $("#port-select-dialog").hide();
            });

            $("#port-select-dialog .close-btn").click(() => {
                reject("cancle");
                $("#port-select-dialog").hide();
            });

            $("#port-select-dialog").show();
        }));
    }

    electronConnect = async (portName = "", autoConnect = false, uploadMode = false) => {
        if (!portName) {
            try {
                portName = await this.showPortSelect();
            } catch(e) {
                NotifyE(Blockly.Msg.UI_NOT_SELECT_PORT);
                console.log(e);
                return false;
            }
        }
        try {
            await (new Promise((resolve, reject) => {
                this.port = new serialAPI(portName, { baudRate: 115200 }, err => {
                    if (err) reject(err);
                    else resolve();
                });
            }));
        }
        catch(e) {
            if (!autoConnect) NotifyE("Can't open serial port, some program use this port ?");
            console.log(e);
            this.port = null;

            return false;
        }

        NotifyS(Blockly.Msg.UI_SERIAL_CONNECTED);
        statusbar.log(Blockly.Msg.UI_SERIAL_CONNECTED);

        // Fixed ESP32 go to Bootloader Mode after press Reset Button
        this.port.set({
            dtr: true,
            rts: true
        });

        this.port.on("close", () => {
            NotifyW(Blockly.Msg.UI_SERIAL_DISCONNECT);
            statusbar.usb(false, '');
            this.port = null;
            term.dispose();
            term = null;
        });

        term = new Terminal();
        if (!fitAddon) fitAddon = new FitAddon.FitAddon();
        term.loadAddon(fitAddon);
        term.open($("#terminal > section")[0]);
        try {
            fitAddon.fit();
        } catch(e) {

        }

        this.port.on("data", (chunk) => {
            if (!firmwareUpdateMode) {
                if(settings.uploadMode === "REPL") {
                    term.write(chunk);
                }
                else if(settings.uploadMode === "VM") {
                    if(settings.programId === "mBot") {
                        if(chunk.length > 0) {
                            if(chunk[0] != 0xFF){
                                term.write(chunk);
                            }
                        }
                    }
                }
                Serial.lastData += chunk;
                if (Serial.lastData.length > 300) {
                    Serial.lastData = Serial.lastData.substring(Serial.lastData.length - 300, Serial.lastData.length);
                }
                let firmwareInfo = tools.checkFirmware();                
            } else {
                inputBuffer = inputBuffer.concat(Array.from(chunk));
            }
        });

        term.onData((data) => {
            this.writeSerial(data);
        });

        if(this.port) {
            await this.writeSerial("\x02");
        }
        statusbar.usb(true, ` (${portName})`);
        skipFirmwareUpgrade = false;
        return true;
    }

    connect = () => {
        //uploadFileLog = { };
        return (!isElectron) ? this.webConnect() : this.electronConnect();
    }

    connected = () => {
        return this.port? true: false;
    }

    disconnect = async () => {
        if (this.port) {
            autoConnectFlag = false;
            if (!isElectron) {

            } else {
                this.port.close();
            }
        }
    }

    // Hard-reset
    boardReset = (enterToBootMode) => {
        if (typeof enterToBootMode === "undefined") {
            enterToBootMode = false;
        }

        return new Promise(async resolve => {
            if (!enterToBootMode) {
                if (!isElectron) { // Web
                    await this.port.setSignals({ // EN = 1, BOOT = 1
                        dataTerminalReady: true,
                        requestToSend: true
                    });
                    await this.port.setSignals({ // EN = 0, BOOT = 1
                        dataTerminalReady: false,
                        requestToSend: true
                    });
                    await this.port.setSignals({ // EN = 1, BOOT = 1
                        dataTerminalReady: true,
                        requestToSend: true
                    });
                    resolve();
                }
                else { // Electron
                    this.port.set({ // EN = 1, BOOT = 1
                            dtr: true,
                            rts: true
                        }, () =>
                            this.port.set({ // EN = 0, BOOT = 1
                                dtr: false,
                                rts: true
                            }, async () => {
                                await sleep(50);
                                this.port.set({ // EN = 1, BOOT = 1
                                    dtr: true,
                                    rts: true
                                }, resolve)
                            })
                    );
                }
            }
            else {
                if (!isElectron) { // Web
                    await this.port.setSignals({ // EN = 1, BOOT = 0
                        dataTerminalReady: 0,
                        requestToSend: 1
                    });
                    await sleep(50);
                    await this.port.setSignals({ // EN = 0, BOOT = 1
                        dataTerminalReady: 1,
                        requestToSend: 0
                    });
                    await sleep(500);
                    await this.port.setSignals({ // EN = 1, BOOT = 1
                        dataTerminalReady: 0,
                        requestToSend: 0
                    });
                    await sleep(100);
                    resolve();
                }
                else { // Electron
                    console.log("Try to BOOT mode");
                    this.port.set({ // EN = 1, BOOT = 0
                        dtr: 0,
                        rts: 1
                    },
                    async () => {
                        await sleep(300);
                        this.port.set({ // EN = 0, BOOT = 1
                            dtr: 1,
                            rts: 0
                        }, async () => {
                            // await sleep(50);
                            this.port.set({ // EN = 1, BOOT = 1
                                dtr: 0,
                                rts: 0
                            }, resolve)
                        });
                    });
                }
            }
        });
    }

    async writeSerial(text) {
        if (!isElectron) {
            let data = new TextEncoder("utf-8").encode(text);
            let buff = new ArrayBuffer(data.length);
            let view = new Uint8Array(buff);
            view.set(data);
            await this.writer.write(buff);
        }
        else {
            let buff = Buffer.from(text, 'binary');
            await new Promise(resolve => {
                this.port.write(buff, () => {
                    resolve();
                });
            });
        }
    }

    async writeSerialByte(data) {
        if (!isElectron) {
            let buff = new Uint8Array([ data ]);
            await this.writer.write(buff);
        } else {
            let b = Buffer.from([ data ]);
            await (new Promise(resolve => this.port.write(Buffer.from(b), resolve)));
        }
    }

    async writeSerialBytes(data) {
        if (!isElectron) {
            await this.writer.write(new Uint8Array(data));
        } else {
            if(mx != null) {
                await mx.onResponse(data);
            }
            let b = Buffer.from(data);
            let writeSize = 0;
            while(writeSize < b.length) {
                const len = Math.min(1024, b.length - writeSize);
                const block = b.slice(writeSize, writeSize + len);
                await new Promise(resolve => this.port.write(block, resolve));
                writeSize += len;
            }
        }
    }

};

let serial = new Serial();


