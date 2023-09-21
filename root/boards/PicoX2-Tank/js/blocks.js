// events
Blockly.Blocks['events_tank_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.tank_start);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setStyle("events_blocks");
    this.setHelpUrl("");
  }
};

/*** chip ***/
Blockly.Blocks['tank_pinout'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG["pin"]);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
            ["GP2","2"], ["GP3","3"], ["GP4","4"], ["ADC0", "26"],["ADC1", "27"],["ADC2", "28"],["LED", "25"]
        ]), "PIN");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setStyle("rp2_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

/*** display: led strip ***/


/*** display: oled ***/
Blockly.Blocks['tank_oled_default'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.oled_default)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("oled_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['tank_oled_slot'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG["oled"]);
    this.appendValueInput("WIDTH")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.oled_width);
    this.appendValueInput("HEIGHT")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.oled_height);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("oled_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


/*** Sensors: ultrasound ***/
Blockly.Blocks['tank_ultrasound_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.hcsr04_start);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldDropdown([[MSG.sensor_port1,"1"],[MSG.sensor_port2,"2"]]),"PORT_NUM");
    this.setInputsInline(false);
    this.setStyle("sensors_blocks");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};


/*** Sensors: line follower ***/
Blockly.Blocks['tank_line_follower_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.mit500_start);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldDropdown([[MSG.sensor_port1,"1"],[MSG.sensor_port2,"2"]]),"PORT_NUM");
    this.setInputsInline(false);
    this.setStyle("sensors_blocks");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['line_follower_read_left'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldDropdown([[MSG.sensor_port1,"1"],[MSG.sensor_port2,"2"]]),"PORT_NUM")
        .appendField(MSG.mit500_read_left);
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setStyle("sensors_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['line_follower_read_right'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldDropdown([[MSG.sensor_port1,"1"],[MSG.sensor_port2,"2"]]),"PORT_NUM")
        .appendField(MSG.mit500_read_right);
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setStyle("sensors_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

/*** Sensors: I2C line follower ***/
Blockly.Blocks['i2c_line_follower_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.sx1508_init);    
    this.setInputsInline(false);
    this.setStyle("sensors_blocks");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['i2c_line_follower_read'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.sensor_read)
        .appendField(new Blockly.FieldDropdown([['1',"0"],['2',"1"],['3',"2"],['4',"3"]]),"PORT_NUM");        
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setStyle("sensors_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


/*** Robot Car Operations: motor ***/
Blockly.Blocks['tank_move_forward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.tank_move_forward);
    this.appendValueInput("POWER")
        .setCheck("Number")
        .appendField(MSG.tank_at_power);
    this.appendDummyInput()
        .appendField("%");
    this.appendValueInput("WAIT")
        .setCheck("Number")
        .appendField(MSG.tank_for);
    this.appendDummyInput()
        .appendField(MSG.second)
        .appendField(MSG.then)
        .appendField(MSG.stop);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLOR.picx2_motions);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['tank_move_backward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.tank_move_backward);
    this.appendValueInput("POWER")
        .setCheck("Number")
        .appendField(MSG.tank_at_power);
    this.appendDummyInput()
        .appendField("%");
    this.appendValueInput("WAIT")
        .setCheck("Number")
        .appendField(MSG.tank_for);
    this.appendDummyInput()
        .appendField(MSG.second)
        .appendField(MSG.then)
        .appendField(MSG.stop);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLOR.picx2_motions);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['tank_turn_left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.tank_turn_left);
    this.appendValueInput("POWER")
        .setCheck("Number")
        .appendField(MSG.tank_at_power);
    this.appendDummyInput()
        .appendField("%");
    this.appendValueInput("WAIT")
        .setCheck("Number")
        .appendField(MSG.tank_for);
    this.appendDummyInput()
        .appendField(MSG.second)
        .appendField(MSG.then)
        .appendField(MSG.stop);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLOR.picx2_motions);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['tank_turn_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.tank_turn_right);
    this.appendValueInput("POWER")
        .setCheck("Number")
        .appendField(MSG.tank_at_power);
    this.appendDummyInput()
        .appendField("%");
    this.appendValueInput("WAIT")
        .setCheck("Number")
        .appendField(MSG.tank_for);
    this.appendDummyInput()
        .appendField(MSG.second)
        .appendField(MSG.then)
        .appendField(MSG.stop);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLOR.picx2_motions);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['tank_move'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.car)
        .appendField(new Blockly.FieldDropdown(
            [
              [MSG.tank_move_forward,"tank_forward"],
              [MSG.tank_move_backward,"tank_backward"],
              [MSG.tank_turn_left,"tank_left"],
              [MSG.tank_turn_right,"tank_right"],
              [MSG.rotate_left,"tank_rotate_left"],
              [MSG.rotate_right,"tank_rotate_right"]
            ]), "MOVE");
    this.appendValueInput("POWER")
        .setCheck("Number")
        .appendField(MSG.tank_at_power);
    this.appendDummyInput()
        .appendField("%");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLOR.picx2_motions);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['tank_move_wait'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.car)
        .appendField(new Blockly.FieldDropdown(
            [
              [MSG.tank_move_forward,"tank_forward"],
              [MSG.tank_move_backward,"tank_backward"],
              [MSG.tank_turn_left,"tank_left"],
              [MSG.tank_turn_right,"tank_right"],
              [MSG.rotate_left,"tank_rotate_left"],
              [MSG.rotate_right,"tank_rotate_right"]
            ]), "MOVE");
    this.appendValueInput("POWER")
        .setCheck("Number")
        .appendField(MSG.tank_at_power);
    this.appendDummyInput()
        .appendField("%");
    this.appendValueInput("WAIT")
        .setCheck("Number")
        .appendField(MSG.tank_for);
    this.appendDummyInput()
        .appendField(MSG.second)
        .appendField(MSG.then)
        .appendField(MSG.stop);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLOR.picx2_motions);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['tank_move_power'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.tank_left_wheel);
    this.appendValueInput("LEFT_POWER")
        .setCheck("Number")
        .appendField(MSG.tank_at_power);
    this.appendDummyInput()
        .appendField("%,");
    this.appendDummyInput()
        .appendField(MSG.tank_right_wheel);
    this.appendValueInput("RIGHT_POWER")
        .setCheck("Number")
        .appendField(MSG.tank_at_power);
    this.appendDummyInput()
        .appendField("%");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLOR.picx2_motions);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['tank_move_power_wait'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.tank_left_wheel);
    this.appendValueInput("LEFT_POWER")
        .setCheck("Number")
        .appendField(MSG.tank_at_power);
    this.appendDummyInput()
        .appendField("%,");
    this.appendDummyInput()
        .appendField(MSG.tank_right_wheel);
    this.appendValueInput("RIGHT_POWER")
        .setCheck("Number")
        .appendField(MSG.tank_at_power);
    this.appendDummyInput()
        .appendField("%");
    this.appendValueInput("WAIT")
        .setCheck("Number")
        .appendField(MSG.tank_for);
    this.appendDummyInput()
        .appendField(MSG.second)
        .appendField(MSG.then)
        .appendField(MSG.stop);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLOR.picx2_motions);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['tank_stop_move'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.tank_stop_move);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLOR.picx2_motions);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['tank_wait_move'] = {
  init: function() {
    this.appendValueInput("WAIT")
        .setCheck(null)
        .appendField(MSG.stopped)
        .appendField(MSG.wait);
    this.appendDummyInput()
        .appendField(MSG.second)
        .appendField(MSG.then)
        .appendField(MSG.can_move);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLOR.picx2_motions);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['tank_wait_stop'] = {
  init: function() {
    this.appendValueInput("WAIT")
        .setCheck(null)
        .appendField(MSG.continue);
    this.appendDummyInput()
        .appendField(MSG.second)
        .appendField(MSG.then)
        .appendField(MSG.stop);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLOR.picx2_motions);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['tank_state'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.car_state)
        .appendField("=")
        .appendField(new Blockly.FieldDropdown(
            [
              [MSG.state_moving,"M"],
              [MSG.state_stopped,"X"]
            ]), "STATE");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(COLOR.picx2_motions);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['tank_direct'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.move_direct)
        .appendField(new Blockly.FieldDropdown(
            [
              ["=","=="],
              ["<>","!="]
            ]), "OP")
        .appendField(new Blockly.FieldDropdown(
            [
              [MSG.move_forward,"'FM','FL','FR'"],
              [MSG.move_backward,"'BM','BL','BR'"],
              [MSG.turn_left,"'FL','BL','RL'"],
              [MSG.turn_right,"'FR','BR','RR'"],
              [MSG.rotate_left,"'RL'"],
              [MSG.rotate_right,"'RR'"]
            ]), "STATE");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(COLOR.picx2_motions);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['tank_force_stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.car)
        .appendField(MSG.force_stop);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLOR.picx2_motions);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
// servo
Blockly.Blocks['tank_servo_position'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.tank_set_servo)
        .appendField(new Blockly.FieldDropdown([["1","1"], ["2", "2"]]), "SERVO");
    this.appendValueInput("ANGLE")
        .setCheck("Number")
        .appendField(MSG.tank_angle);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLOR.picx2_servo);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['tank_servo_release'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.servo_release)
        .appendField(new Blockly.FieldDropdown([["1","1"], ["2", "2"], ["All", "all"]]), "SERVO");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLOR.picx2_servo);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['tank_servo_max_angle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.tank_set_servo)
        .appendField(new Blockly.FieldDropdown([["1","1"], ["2", "2"]]), "SERVO");
    this.appendValueInput("ANGLE")
        .setCheck("Number")
        .appendField(MSG.max_angle);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLOR.picx2_servo);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
