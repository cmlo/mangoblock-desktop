/*** MQTT ***/
Blockly.Python['mqtt_connect'] = function(block) {
    block.disabled || (
        Blockly.Python.definitions_.import_umqtt = "from umqtt.simple import MQTTClient",
        Blockly.Python.definitions_.import_time = "import time",
        Blockly.Python.definitions_.import_machine = "import machine"
    );
    let value_host = Blockly.Python.valueToCode(block, 'HOST', Blockly.Python.ORDER_ATOMIC);
    let value_port = Blockly.Python.valueToCode(block, 'PORT', Blockly.Python.ORDER_ATOMIC);
    let value_user = Blockly.Python.valueToCode(block, 'USER', Blockly.Python.ORDER_ATOMIC);
    let value_password = Blockly.Python.valueToCode(block, 'PASSWORD', Blockly.Python.ORDER_ATOMIC);
    let value_client_id = Blockly.Python.valueToCode(block, 'CLIENT_ID', Blockly.Python.ORDER_ATOMIC);
    // define function
    let func1 = `def mqtt_connect():\n`;
    func1 += Blockly.Python.INDENT;
    func1 += `client = MQTTClient(${value_client_id}, ${value_host}, ${value_port}, ${value_user}, ${value_password}, keepalive=3600)\n`;
    func1 += Blockly.Python.INDENT + 'client.connect()\n';
    func1 += Blockly.Python.INDENT + `print('Connected to %s MQTT Broker'%(${value_host}))\n`;
    func1 += Blockly.Python.INDENT + 'return client\n';
    Blockly.Python.definitions_["def_mqtt_connect"] = func1;
    let func2 = `def mqtt_reconnect():\n`;
    func2 += Blockly.Python.INDENT + `print('Failed to connect to the MQTT Broker. Reconnecting...')\n`;
    func2 += Blockly.Python.INDENT + 'time.sleep(5)\n';
    func2 += Blockly.Python.INDENT + 'machine.reset()\n';
    Blockly.Python.definitions_["def_mqtt_reconnect"] = func2;
    let func3 = `def sub_callback(topic, msg):\n`;
    func3 += Blockly.Python.INDENT + 'pass\n';
    Blockly.Python.definitions_["def_mqtt_sub_callback"] = func3;
    // code
    let code = `# MQTT\n`;
    code += `try:\n`;
    code += Blockly.Python.INDENT + 'client = mqtt_connect()\n';
    code += 'except OSError as e:\n';
    code += Blockly.Python.INDENT + 'mqtt_reconnect()\n';
    return code;
};
Blockly.Python['mqtt_subscribe'] = function(block) {
    block.disabled || (
        Blockly.Python.definitions_.import_umqtt = "from umqtt.simple import MQTTClient",
        Blockly.Python.definitions_.import_time = "import time"
    );
    let value_topic = Blockly.Python.valueToCode(block, 'TOPIC', Blockly.Python.ORDER_ATOMIC);
    // code
    let code = `# MQTT Subscribe\n`;
    code += 'client.set_callback(sub_callback)\n';
    code += `client.subscribe(${value_topic})\n`;
    return code;
};
Blockly.Python['mqtt_publish'] = function(block) {
    block.disabled || (
        Blockly.Python.definitions_.import_umqtt = "from umqtt.simple import MQTTClient",
        Blockly.Python.definitions_.import_time = "import time"
    );
    let value_topic = Blockly.Python.valueToCode(block, 'TOPIC', Blockly.Python.ORDER_ATOMIC);
    let value_message = Blockly.Python.valueToCode(block, 'MESSAGE', Blockly.Python.ORDER_ATOMIC);
    let value_qos = Blockly.Python.valueToCode(block, 'QOS', Blockly.Python.ORDER_ATOMIC);
    let value_retain = Blockly.Python.valueToCode(block, 'RETAIN', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    value_qos = trimBrackets(value_qos);
    let code = `# MQTT Publish\n`;
    code += `client.publish(${value_topic}, ${value_message}, ${value_retain}, ${value_qos})\n`;
    return code;
};
Blockly.Python['mqtt_qos_list'] = function(block) {
    let dropdown_name = block.getFieldValue('NAME');
    // TODO: Assemble Python into code variable.
    let code = trimBrackets(dropdown_name);
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['mqtt_check_message'] = function(block) {
    // TODO: Assemble Python into code variable.
    let code = 'new_msg = client.check_msg()\n';
    return code;
};
Blockly.Python['mqtt_on_receive'] = function(block) {
    let statements_code = Blockly.Python.statementToCode(block, 'CODE');
    block.disabled || (
        Blockly.Python.definitions_.import_umqtt = "from umqtt.simple import MQTTClient"
    );
    let code = `def sub_callback(topic, msg):\n`;
    code += Blockly.Python.INDENT + `topic = topic.decode('utf-8')\n`;
    code += Blockly.Python.INDENT + `msg = msg.decode('utf-8')\n`;
    code += getGlobalVariables(block);
    code += statements_code+'\n';
    Blockly.Python.definitions_["def_mqtt_sub_callback"] = code;
    return "\n";
};
Blockly.Python['mqtt_receive_topic'] = function(block) {
    // TODO: Assemble Python into code variable.
    let code = 'topic';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
};
Blockly.Python['mqtt_receive_message'] = function(block) {
    // TODO: Assemble Python into code variable.
    let code = 'msg';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
};