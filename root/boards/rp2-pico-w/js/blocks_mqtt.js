/*** MQTT ***/
Blockly.Blocks['mqtt_connect'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(MSG["mqtt_connect"]);
        this.appendValueInput("HOST")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(MSG["mqtt_host"]);
        this.appendValueInput("PORT")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(MSG["mqtt_port"]);
        this.appendValueInput("CLIENT_ID")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(MSG["mqtt_client_id"]);
        this.appendValueInput("USER")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(MSG["mqtt_user"]);
        this.appendValueInput("PASSWORD")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(MSG["mqtt_password"]);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle("network_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['mqtt_subscribe'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(MSG["mqtt_subscribe"]);
        this.appendValueInput("TOPIC")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(MSG["mqtt_topic"]);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle("network_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['mqtt_publish'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(MSG["mqtt_publish"]);
        this.appendValueInput("TOPIC")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(MSG["mqtt_topic"]);
        this.appendValueInput("MESSAGE")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(MSG["mqtt_message"]);
        this.appendValueInput("RETAIN")
            .setCheck("Boolean")
            .appendField("Retain");
        this.appendValueInput("QOS")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(MSG["mqtt_qos"]);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle("network_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['mqtt_qos_list'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([[MSG["mqtt_qos_0"],"0"], [MSG["mqtt_qos_1"],"1"], [MSG["mqtt_qos_2"],"2"]]), "NAME");
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setStyle("network_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['mqtt_check_message'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("MQTT check message");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setStyle("network_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['mqtt_on_receive'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(MSG["mqtt_on_receive"]);
        this.appendStatementInput("CODE")
            .setCheck(null);
        this.setStyle("events_blocks");
        this.setHelpUrl(Blockly.Msg.MANGOBLOCK);
    }
};
Blockly.Blocks['mqtt_receive_topic'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(MSG["mqtt_receive_topic"]);
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setStyle("network_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['mqtt_receive_message'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(MSG["mqtt_receive_message"]);
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setStyle("network_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
