/*** wifi ***/
Blockly.Python['wifi_connect'] = function(block) {
    block.disabled || (
        Blockly.Python.definitions_.import_network = "import network",
        Blockly.Python.definitions_.import_time = "import time"
    );
    let value_ssid = Blockly.Python.valueToCode(block, 'SSID', Blockly.Python.ORDER_ATOMIC);
    let value_key = Blockly.Python.valueToCode(block, 'KEY', Blockly.Python.ORDER_ATOMIC);
    let code = `wlan = network.WLAN(network.STA_IF)\n`;
    code += 'wlan.active(True)\n';
    code += `wlan.connect(${value_ssid},${value_key})\n`;
    code += 'time.sleep(5)\n';
    return code;
};
Blockly.Python['wifi_is_connected'] = function(block) {
    let code = 'wlan.isconnected()';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
};