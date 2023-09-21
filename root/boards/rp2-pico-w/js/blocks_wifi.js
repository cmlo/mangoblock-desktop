/*** WiFi ***/
Blockly.Blocks['wifi_connect'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG["wifi_connect"]);
    this.appendValueInput("SSID")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG["wifi_ssid"]);
    this.appendValueInput("KEY")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG["wifi_key"]);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("network_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['wifi_is_connected'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG["wifi_is_connected"]);
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setStyle("network_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

