/*********************************************************/
// These blocks for Raspberry Pi RP2040 microprocessor   
// Last update: 2023.01.04
/*********************************************************/

// for mangoblock
let COLOR = {};

// Constants
Blockly.Constants || (Blockly.Constants = {});
Blockly.Constants.BOOLEAN = "Boolean";
Blockly.Constants.NUMBER = "Number";
Blockly.Constants.COLOR = "Color";
Blockly.Constants.STRING = "String";
Blockly.Constants.SOUND = "Sound";
Blockly.Constants.LIST = "Array";
Blockly.Constants.PIXELGRID = "PixelGrid";

// Variables
Blockly.Variables || (Blockly.Variables = {});
Blockly.Variables.id_num = 0;


/*** Project ***/
Blockly.Blocks['project_metadata'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabel(MSG["project_info"]), "NAME");
    this.appendValueInput("AUTHOR")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldLabel(MSG["project_info_author"]), "project_author");    
    this.appendValueInput("DESCRIPTION")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldLabel(MSG["project_info_desc"]), "project_description");
    this.setNextStatement(true, null);
    this.setStyle("project_blocks");
    this.setTooltip("Information about the project");
    this.setHelpUrl(Blockly.Msg.MANGOBLOCK);
  }
};

/*** System ***/
Blockly.Blocks['sys_print'] = {
  init: function() {
    this.appendValueInput("TEXT")
        .setCheck(null)
        .appendField(MSG.console_print);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("system_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

/*** Events ***/
Blockly.Blocks['on_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG["on_start"]);
    this.setPreviousStatement(false, null);
    this.setNextStatement(true, null);
    this.setStyle("events_blocks");
    this.setHelpUrl(Blockly.Msg.MANGOBLOCK);
  }
};
Blockly.Blocks['events_play_click'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG["when"])
        .appendField(new Blockly.FieldImage("./images/icons/x-play.svg", 32, 32, { alt: "*", flipRtl: "FALSE" }))
        .appendField(MSG["clicked"]);
    this.setPreviousStatement(false, null);
    this.setNextStatement(true, null);
    this.setStyle("events_blocks");
    this.setHelpUrl(Blockly.Msg.MANGOBLOCK);
  }
};
Blockly.Blocks['on_pico_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG["on_pico_start"]);
    this.setPreviousStatement(false, null);
    this.setNextStatement(true, null);
    this.setStyle("events_blocks");
    this.setHelpUrl(Blockly.Msg.MANGOBLOCK);
  }
};
Blockly.Blocks['on_pico_x2_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG["on_pico_x2_start"]);
    this.setPreviousStatement(false, null);
    this.setNextStatement(true, null);
    this.setStyle("events_blocks");
    this.setHelpUrl(Blockly.Msg.MANGOBLOCK);
  }
};
Blockly.Blocks['events_declare'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG["initial"]);
    this.setPreviousStatement(false, null);
    this.setNextStatement(true, null);
    this.setStyle("events_blocks");
    this.setHelpUrl(Blockly.Msg.MANGOBLOCK);
  }
};
Blockly.Blocks['events_main_procedures'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.main_program);
    this.appendStatementInput("START")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(MSG.main_program_end);
    this.appendStatementInput("END")
        .setCheck(null);
    this.setInputsInline(true);
    this.setStyle("events_blocks");
    this.setHelpUrl("");
  }
};

/*** Async or Thread ***/
Blockly.Blocks['thread_task'] = {
  init: function() {
    this.appendDummyInput()        
        .appendField(MSG["thread_task"]) 
    this.setInputsInline(true);
    this.appendStatementInput("CODE")
        .setCheck(null);
    this.setStyle("events_blocks");
    this.setHelpUrl(Blockly.Msg.MANGOBLOCK);
  }
};
Blockly.Blocks['when_timer_tick'] = {
  init: function() {
    this.appendValueInput("WAIT")
        .setCheck("Number")
        .appendField(MSG["timer_callback"])
        .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"]]), "ID")
        .appendField(MSG["interval"]);
    this.appendDummyInput()
        .appendField(MSG["second"]);
    this.setInputsInline(true);
    this.appendStatementInput("CODE")
        .setCheck(null);
    this.setStyle("events_blocks");
    this.setHelpUrl(Blockly.Msg.MANGOBLOCK);
  }
};

/*** Controls ***/
Blockly.Blocks['wait_sec'] = {
  init: function() {
    this.appendValueInput("WAIT")
        .setCheck("Number")
        .appendField(MSG["wait"]);
    this.appendDummyInput()
        .appendField(MSG["seconds"]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("control_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['controls_for'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.CONTROLS_FOR)
        .appendField(new Blockly.FieldVariable("i"), "VAR");
    this.appendValueInput("FROM")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.CONTROLS_FROM);
    this.appendValueInput("TO")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.CONTROLS_TO);
    this.appendValueInput("BY")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.CONTROLS_BY);
    this.appendStatementInput("CODE")
        .setCheck(null)
        .appendField(Blockly.Msg.CONTROLS_DO);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("control_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['controls_repeat'] = {
  init: function() {
    this.appendValueInput("NUMBER")
        .setCheck("Number")
        .appendField(MSG.repeat);
    this.appendDummyInput()
        .appendField(MSG.repeat_times);
    this.appendStatementInput("CODE")
        .setCheck(null)
        .appendField(Blockly.Msg.CONTROLS_DO);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("control_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['controls_forever'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.forever)
    this.appendStatementInput("CODE")
        .setCheck(null)
        .appendField(Blockly.Msg.CONTROLS_DO);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("control_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['controls_break'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.control_break);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("control_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['controls_continue'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.control_continue);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("control_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['controls_pass'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.control_pass);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("control_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['controls_if'] = {
  init: function() {
    this.appendValueInput("IF0")
        .setCheck("Boolean")
        .appendField(Blockly.Msg["CONTROLS_IF_MSG_IF"]);
    this.appendStatementInput("DO0")
        .setCheck(null)
        .appendField(Blockly.Msg.CONTROLS_DO);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("control_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
    this.setMutator(new Blockly.Mutator(['controls_if_elseif', 'controls_if_else']));
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
  },
  // Mutator functions
  mutationToDom: function() {
    if (!this.elseifCount_ && !this.elseCount_) return null;
    var a = Blockly.utils.xml.createElement("mutation");
    this.elseifCount_ && a.setAttribute("elseif", this.elseifCount_);
    this.elseCount_ && a.setAttribute("else", 1);
    return a
  },
  domToMutation: function(a) {
    this.elseifCount_ = parseInt(a.getAttribute("elseif"), 10) || 0;
    this.elseCount_ = parseInt(a.getAttribute("else"), 10) || 0;
    this.rebuildShape_()
  },
  decompose: function(a) {
    var b = a.newBlock("controls_if_if");
    b.initSvg();
    for (var c = b.nextConnection, d = 1; d <= this.elseifCount_; d++) {
      var e = a.newBlock("controls_if_elseif");
      e.initSvg();
      c.connect(e.previousConnection);
      c = e.nextConnection
    }
    this.elseCount_ && (a = a.newBlock("controls_if_else"), a.initSvg(), c.connect(a.previousConnection));
    return b
  },
  compose: function(a) {
    a = a.nextConnection.targetBlock();
    this.elseCount_ = this.elseifCount_ = 0;
    for (var b = [null], c = [null], d = null; a;) {
      switch (a.type) {
        case "controls_if_elseif":
          this.elseifCount_++;
          b.push(a.valueConnection_);
          c.push(a.statementConnection_);
          break;
        case "controls_if_else":
          this.elseCount_++;
          d = a.statementConnection_;
          break;
        default:
          throw TypeError(MSG["UNKNOWN_BLOCK_TYPE"] + a.type);
      }
      a = a.nextConnection && a.nextConnection.targetBlock()
    }
    this.updateShape_();
    this.reconnectChildBlocks_(b, c, d)
  },
  saveConnections: function(a) {
    a = a.nextConnection.targetBlock();
    for (var b = 1; a;) {
      switch (a.type) {
        case "controls_if_elseif":
          var c = this.getInput("IF" + b),
              d = this.getInput("DO" + b);
          a.valueConnection_ = c && c.connection.targetConnection;
          a.statementConnection_ = d && d.connection.targetConnection;
          b++;
          break;
        case "controls_if_else":
          d = this.getInput("ELSE");
          a.statementConnection_ = d && d.connection.targetConnection;
          break;
        default:
          throw TypeError(MSG["UNKNOWN_BLOCK_TYPE"] + a.type);
      }
      a = a.nextConnection && a.nextConnection.targetBlock()
    }
  },
  rebuildShape_: function() {
    var a = [null],
        b = [null],
        c = null;
    this.getInput("ELSE") && (c = this.getInput("ELSE").connection.targetConnection);
    for (var d = 1; this.getInput("IF" + d);) {
      var e = this.getInput("IF" + d),
          f = this.getInput("DO" + d);
      a.push(e.connection.targetConnection);
      b.push(f.connection.targetConnection);
      d++
    }
    this.updateShape_();
    this.reconnectChildBlocks_(a, b, c)
  },
  updateShape_: function() {
    this.getInput("ELSE") && this.removeInput("ELSE");
    for (var a = 1; this.getInput("IF" + a);) this.removeInput("IF" + a), this.removeInput("DO" + a), a++;
    for (a = 1; a <= this.elseifCount_; a++) this.appendValueInput("IF" + a).setCheck("Boolean").appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF), this.appendStatementInput("DO" + a).appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
    this.elseCount_ && this.appendStatementInput("ELSE").appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE)
  },
  reconnectChildBlocks_: function(a, b, c) {
    for (var d = 1; d <= this.elseifCount_; d++) Blockly.Mutator.reconnect(a[d], this, "IF" + d), Blockly.Mutator.reconnect(b[d], this, "DO" + d);
    Blockly.Mutator.reconnect(c, this, "ELSE")
  }
};
Blockly.Blocks['controls_if_else'] = {
  init: function() {
    this.appendValueInput("IF0")
        .setCheck("Boolean")
        .appendField(Blockly.Msg["CONTROLS_IF_MSG_IF"]);
    this.appendStatementInput("DO0")
        .setCheck(null)
        .appendField(Blockly.Msg["CONTROLS_IF_MSG_THEN"]);
    this.appendStatementInput("ELSE")
        .setCheck(null)
        .appendField(Blockly.Msg["CONTROLS_IF_MSG_ELSE"]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("control_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['controls_if_if'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.CONTROLS_IF_IF_TITLE_IF);
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setStyle("control_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['controls_if_elseif'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.CONTROLS_IF_ELSEIF_TITLE_ELSEIF);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("control_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['controls_ifelse'] = {
  init: function() {
    this.appendValueInput("IF0")
        .setCheck("Boolean")
        .appendField(Blockly.Msg["CONTROLS_IF_MSG_IF"]);
    this.appendStatementInput("DO0")
        .setCheck(null)
        .appendField(Blockly.Msg["CONTROLS_IF_MSG_THEN"]);
    this.appendStatementInput("ELSE")
        .setCheck(null)
        .appendField(Blockly.Msg["CONTROLS_IF_MSG_ELSE"]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("control_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['controls_repeat_until'] = {
  init: function() {
    this.appendValueInput("REPEAT")
        .setCheck("Boolean")
        .appendField(MSG.repeat_until);
    this.appendDummyInput()
        .appendField(MSG.control_finish);
    this.appendStatementInput("CODE")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("control_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['controls_while'] = {
  init: function() {
    this.appendStatementInput("main_code")
        .setCheck(null)
        .appendField(MSG["forever"]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("control_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['try_catch'] = {
  init: function() {
    this.appendStatementInput("main_code")
        .setCheck(null)
        .appendField(MSG["try1"]);
    this.appendStatementInput("catch_code")
        .setCheck(null)
        .appendField(MSG["exp1"]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("control_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

/*** Logic ***/
Blockly.Blocks['logic_compare_eq'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput("B")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("=");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setStyle("logic_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['logic_compare_more_then'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput("B")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(">");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setStyle("logic_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['logic_compare_less_then'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput("B")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("<");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setStyle("logic_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['logic_operation_and'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck(null);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(Blockly.Msg.LOGIC_OPERATION_AND);
    this.appendValueInput("B")
        .setCheck(null);
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setStyle("logic_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['logic_operation_or'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck(null);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField(Blockly.Msg.LOGIC_OPERATION_OR);
    this.appendValueInput("B")
        .setCheck(null);
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setStyle("logic_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['logic_operation_eq'] = {
  init: function() {
    this.appendValueInput("A")
        .setCheck("Boolean")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput("B")
        .setCheck("Boolean")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.as);
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setStyle("logic_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

/*** Math ***/
Blockly.Blocks['math_percentage'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(100, -100, 100), "PER");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setStyle("math_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['math_rgb'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(100, 0, 255), "NUM");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setStyle("math_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['math_percentage_dropdown'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["100","100"], ["75","75"], ["50","50"], ["30","30"], ["0","0"]]), "PER");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setStyle("math_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['var_to_int'] = {
  init: function() {
    this.appendValueInput("var")
        .appendField(new Blockly.FieldLabelSerializable("to int"), "VAR");
    this.setStyle("math_blocks");
    this.setOutput(true, null);
    this.setTooltip("Convert anything to Int.");
    this.setHelpUrl(Blockly.Msg.MANGOBLOCK);
  }
};
Blockly.Blocks['var_to_float'] = {
  init: function() {
    this.appendValueInput("var")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldLabelSerializable("to float"), "VAR");
    this.setStyle("math_blocks");
    this.setOutput(true, null);
    this.setTooltip("Convert anything to float.");
    this.setHelpUrl(Blockly.Msg.MANGOBLOCK);
  }
};

/*** Time ***/
Blockly.Blocks['delay'] = {
  init: function() {
    this.appendValueInput("TIME")
        .setCheck(null)
        .appendField(MSG["wait"]);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([[MSG["seconds"],"sleep"], [MSG["milliseconds"],"sleep_ms"], [MSG["microseconds"],"sleep_us"]]), "SCALE");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("time_blocks");
    this.setTooltip("Delay for given number, should be positive or 0.");
    this.setHelpUrl("https://docs.micropython.org/en/latest/library/utime.html#utime.sleep");
  }
};
Blockly.Blocks['delay_sec'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG["wait"])
        .appendField(new Blockly.FieldNumber(1, 0, 100), "TIME")
        .appendField(MSG["seconds"]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("time_blocks");
    this.setTooltip("Delay for given number, should be positive or 0.");
    this.setHelpUrl("https://docs.micropython.org/en/latest/library/utime.html#utime.sleep");
  }
};
Blockly.Blocks['delay_ms'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG["wait"])
        .appendField(new Blockly.FieldNumber(1, 0, 1000), "TIME")
        .appendField(MSG["milliseconds"]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("time_blocks");
    this.setTooltip("Delay for given number, should be positive or 0.");
    this.setHelpUrl("https://docs.micropython.org/en/latest/library/utime.html#utime.sleep");
  }
};
Blockly.Blocks['delay_us'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG["wait"])
        .appendField(new Blockly.FieldNumber(1, 0, 1000), "TIME")
        .appendField(MSG["microseconds"]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("time_blocks");
    this.setTooltip("Delay for given number, should be positive or 0.");
    this.setHelpUrl("https://docs.micropython.org/en/latest/library/utime.html#utime.sleep");
  }
};

/*** Text ***/
Blockly.Blocks['text_join'] = {
  init: function() {
    this.appendValueInput("a")
        .setCheck("String")
        .appendField(MSG.text_join);
    this.appendValueInput("b")
        .setCheck("String")
        .appendField("+");
    this.setInputsInline(true);
    this.setOutput(true, "String");
    this.setStyle("text_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['text_join_single'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG["text_join_single"]);
    this.appendValueInput("LABEL")
        .setCheck("String")
    this.appendValueInput("VALUE")
        .setCheck("String")
        .appendField(new Blockly.FieldTextInput("="), "JOIN_TEXT");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setStyle("text_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['text_to_str'] = {
  init: function() {
    this.appendValueInput("var")
        .appendField(new Blockly.FieldLabelSerializable(MSG["to_str"]), "VAR");
    this.setStyle("text_blocks");
    this.setOutput(true, null);
    this.setTooltip("Convert anything to String.");
    this.setHelpUrl(Blockly.Msg.MANGOBLOCK);
  }
};


/*** chip: rp2 ***/
Blockly.Blocks['pico_pinout'] = {
  init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["LED","25"], ["GP0","0"], ["GP1","1"],["GP2", "2"],
              ["GP3", "3"],["GP4", "4"],["GP5", "5"],["GP6", "6"],["GP7", "7"],
              ["GP8", "8"],["GP9", "9"],["GP10", "10"],["GP11", "11"],["GP12", "12"],
              ["GP13", "13"],["GP14", "14"],["GP15", "15"],["GP16", "16"],["GP17", "17"],
              ["GP18", "18"],["GP19", "19"],["GP20", "20"],["GP21", "21"],["GP22", "22"],
              ["ADC0", "26"],["ADC1", "27"],["ADC2", "28"],
              ["ADC3", "29"]
          ]), "PIN");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setStyle("rp2_blocks");
      this.setTooltip("");
      this.setHelpUrl("");
  }
};
Blockly.Blocks['pico_digital_value'] = {
  init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([[MSG["pin_on"],"1"], [MSG["pin_off"],"0"]]), "VALUE");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setStyle("rp2_blocks");
      this.setTooltip("");
      this.setHelpUrl("");
  }
};
Blockly.Blocks['pico_digital_pinout'] = {
  init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["GP0","0"], ["GP1","1"],["GP2", "2"],
              ["GP3", "3"],["GP4", "4"],["GP5", "5"],["GP6", "6"],["GP7", "7"],
              ["GP8", "8"],["GP9", "9"],["GP10", "10"],["GP11", "11"],["GP12", "12"],
              ["GP13", "13"],["GP14", "14"],["GP15", "15"],["GP16", "16"],["GP17", "17"],
              ["GP18", "18"],["GP19", "19"],["GP20", "20"],["GP21", "21"],["GP22", "22"],
              ["GP25", "25"]
          ]), "PIN");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setStyle("rp2_blocks");
      this.setTooltip("");
      this.setHelpUrl("");
  }
};
Blockly.Blocks['pico_i2c_pinout'] = {
  init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([
              ["GP2", "2"],["GP3", "3"],["GP6", "6"],["GP7", "7"],["GP10", "10"],["GP11", "11"],
              ["GP14", "14"],["GP15", "15"],["GP20", "20"],["GP21", "21"],["GP26", "26"],["GP27", "27"]
          ]), "PIN");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setStyle("rp2_blocks");
      this.setTooltip("");
      this.setHelpUrl("");
  }
};
Blockly.Blocks['pico_analog_pinout'] = {
  init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["ADC0", "26"],["ADC1", "27"],["ADC2", "28"]]), "PIN");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setStyle("rp2_blocks");
      this.setTooltip("");
      this.setHelpUrl("");
  }
};
Blockly.Blocks['pico_set_pin'] = {
  init: function() {
      this.appendValueInput("PIN")
          .setCheck("Number")
          .appendField(MSG["set"]);
      this.appendDummyInput()
          .appendField(MSG["as"])
          .appendField(new Blockly.FieldDropdown([[MSG["pin_input"],"Pin.IN"], [MSG["pin_output"],"Pin.OUT"]]), "MODE")
          .appendField(MSG["with_resistor"])
          .appendField(new Blockly.FieldDropdown([[MSG["none_resistor"],"-1"],[MSG["pin_pullup"],"Pin.PULL_UP"], [MSG["pin_pulldown"],"Pin.PULL_DOWN"]]), "PULL");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("rp2_blocks");
      this.setTooltip("");
      this.setHelpUrl("");
  }
};
Blockly.Blocks['pico_set_digital'] = {
  init: function() {
      this.appendValueInput("PIN")
          .setCheck("Number")
          .appendField(MSG["set"]);
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([[MSG["pin_on"],"1"], [MSG["pin_off"],"0"]]), "VALUE");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("rp2_blocks");
      this.setTooltip("");
      this.setHelpUrl("");
  }
};
Blockly.Blocks['pico_set_pwm'] = {
  init: function() {
    this.appendValueInput("PIN")
        .setCheck("Number")
        .appendField(MSG["set"])
        .appendField("PWM");
    this.appendValueInput("PWM")
        .appendField("=");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("rp2_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['pico_read_button'] = {
  init: function() {
      this.appendValueInput("PIN")
          .setCheck("Number")
          .appendField(MSG["button_pin"]);
      this.appendDummyInput()
          .appendField(MSG["pressed"]);
      this.setInputsInline(true);
      this.setOutput(true, "Boolean");
      this.setStyle("rp2_blocks");
      this.setTooltip("");
      this.setHelpUrl("");
  }
};
Blockly.Blocks['pico_read_digital'] = {
  init: function() {
      this.appendValueInput("PIN")
          .setCheck("Number")
          .appendField(MSG["read"])
          .appendField(MSG["digital"]);
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setStyle("rp2_blocks");
      this.setTooltip("");
      this.setHelpUrl("");
  }
};
Blockly.Blocks['pico_read_analog'] = {
  init: function() {
      this.appendValueInput("PIN")
          .setCheck("Number")
          .appendField(MSG["read"])
          .appendField(MSG["analog"]);
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setStyle("rp2_blocks");
      this.setTooltip("");
      this.setHelpUrl("");
  }
};
Blockly.Blocks['pico_write_digital'] = {
  init: function() {
      this.appendValueInput("PIN")
          .setCheck("Number")
          .appendField(MSG["write"])
          .appendField(MSG["digital"]);
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setStyle("rp2_blocks");
      this.setTooltip("");
      this.setHelpUrl("");
  }
};
Blockly.Blocks['pico_write_analog'] = {
  init: function() {
      this.appendValueInput("PIN")
          .setCheck("Number")
          .appendField(MSG["write"])
          .appendField(MSG["analog"]);
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setStyle("rp2_blocks");
      this.setTooltip("");
      this.setHelpUrl("");
  }
};
Blockly.Blocks['pico_chip_temperature'] = {
  init:function(){
      this.appendDummyInput()
          .appendField(MSG["chip_temperature"])
          .appendField(new Blockly.FieldDropdown([["\u00b0F","FARENHEIT"],["\u00b0C","CELSIUS"]]),"UNIT");
      this.setOutput(!0,Blockly.Constants.NUMBER);
      this.setStyle("rp2_blocks");
      this.setTooltip("");
      this.setHelpUrl("")
  }
};

/*** chip: rp2-pico-w ***/
Blockly.Blocks['picow_pinout'] = {
  init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["LED","'LED'"], ["GP0","0"], ["GP1","1"],["GP2", "2"],
              ["GP3", "3"],["GP4", "4"],["GP5", "5"],["GP6", "6"],["GP7", "7"],
              ["GP8", "8"],["GP9", "9"],["GP10", "10"],["GP11", "11"],["GP12", "12"],
              ["GP13", "13"],["GP14", "14"],["GP15", "15"],["GP16", "16"],["GP17", "17"],
              ["GP18", "18"],["GP19", "19"],["GP20", "20"],["GP21", "21"],["GP22", "22"],
              ["ADC0", "26"],["ADC1", "27"],["ADC2", "28"],
              ["ADC3", "29"]
          ]), "PIN");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setStyle("rp2_blocks");
      this.setTooltip("");
      this.setHelpUrl("");
  }
};
Blockly.Blocks['picow_digital_pinout'] = {
  init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["GP0","0"], ["GP1","1"],["GP2", "2"],
              ["GP3", "3"],["GP4", "4"],["GP5", "5"],["GP6", "6"],["GP7", "7"],
              ["GP8", "8"],["GP9", "9"],["GP10", "10"],["GP11", "11"],["GP12", "12"],
              ["GP13", "13"],["GP14", "14"],["GP15", "15"],["GP16", "16"],["GP17", "17"],
              ["GP18", "18"],["GP19", "19"],["GP20", "20"],["GP21", "21"],["GP22", "22"],
              ["LED", "LED"]
          ]), "PIN");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setStyle("rp2_blocks");
      this.setTooltip("");
      this.setHelpUrl("");
  }
};
Blockly.Blocks['picow_set_digital'] = {
  init: function() {
      this.appendValueInput("PIN")          
          .appendField(MSG["set"])
          .appendField(MSG["digital"]);
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([[MSG["pin_on"],"1"], [MSG["pin_off"],"0"]]), "VALUE");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("rp2_blocks");
      this.setTooltip("");
      this.setHelpUrl("");
  }
};


/*** network: WiFi ***/


/*** network: MQTT ***/


/*** display: rgb ***/
Blockly.Blocks['color_picker'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour("#ff0000"), "COLOR");
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setStyle("rgb_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['rgb_color'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.rgb_value)
        .appendField("(");
    this.appendValueInput("R")
        .setCheck("Number")
        .appendField(MSG.rgb_r);
    this.appendValueInput("G")
        .setCheck("Number")
        .appendField(MSG.rgb_g);
    this.appendValueInput("B")
        .setCheck("Number")
        .appendField(MSG.rgb_b);
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setStyle("rgb_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['rgb_turn_on'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG["rgb_turn_on"])
        .appendField(new Blockly.FieldDropdown([[MSG.all,"all"],["1","0"],["2","1"],["3","2"],["4","3"],["5","4"],["6","5"],["7","6"],["8","7"],["9","8"],["10","9"]]),"LED");
    this.appendValueInput("COLOR")
        .setCheck(null)
        .appendField(MSG.led_color);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("rgb_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['rgb_turn_on_num'] = {
  init: function() {
    this.appendValueInput("NUM")
        .setCheck("Number")
        .appendField(MSG["rgb_turn_on"]);
    this.appendValueInput("COLOR")
        .setCheck(null)
        .appendField(MSG.led_color);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("rgb_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['rgb_turn_on_range'] = {
  init: function() {
    this.appendValueInput("FROM_NUM")
        .setCheck("Number")
        .appendField(MSG["rgb_turn_on"])
        .appendField(MSG["from"]);
    this.appendValueInput("TO_NUM")
        .setCheck("Number")
        .appendField(MSG["to"]);
    this.appendValueInput("COLOR")
        .setCheck(null)
        .appendField(MSG.led_color);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("rgb_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['rgb_turn_on_wait'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG["rgb_turn_on"])
        .appendField(new Blockly.FieldDropdown([[MSG.all,"all"],["1","0"],["2","1"],["3","2"],["4","3"],["5","4"],["6","5"],["7","6"],["8","7"],["9","8"],["10","9"]]),"LED")
    this.appendValueInput("COLOR")
        .setCheck(null)
        .appendField(MSG.led_color);
    this.appendValueInput("WAIT")
        .setCheck("Number")
        .appendField(MSG["for"]);
    this.appendDummyInput()
        .appendField(MSG["seconds"])
        .appendField(MSG["then"])
        .appendField(MSG["close"]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("rgb_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['rgb_matrix'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour("#ff0000"), "COLOR0")
        .appendField(new Blockly.FieldColour("#ff0000"), "COLOR1")
        .appendField(new Blockly.FieldColour("#ff0000"), "COLOR2")
        .appendField(new Blockly.FieldColour("#ff0000"), "COLOR3")
        .appendField(new Blockly.FieldColour("#ff0000"), "COLOR4");
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour("#ff0000"), "COLOR5")
        .appendField(new Blockly.FieldColour("#ff0000"), "COLOR6")
        .appendField(new Blockly.FieldColour("#ff0000"), "COLOR7")
        .appendField(new Blockly.FieldColour("#ff0000"), "COLOR8")
        .appendField(new Blockly.FieldColour("#ff0000"), "COLOR9");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setStyle("rgb_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['rgb_matrix_wait'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG["rgb_turn_on"])
    this.appendValueInput("LED")
        .setCheck(null)
        .appendField("LED");
    this.appendDummyInput()
        .appendField(MSG["wait"])
        .appendField(new Blockly.FieldNumber(0, 0, 100), "WAIT")
        .appendField(MSG["seconds"])
        .appendField(MSG["close"]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("rgb_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['rgb_demo'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG["rgb_demo"])
        .appendField(new Blockly.FieldDropdown([
            [MSG.rgb_rainbow,"rainbow"],
            [MSG.rgb_chases,"chases"]
        ]),"EFFECT");
    this.appendValueInput("FROM_NUM")
        .setCheck("Number")
        .appendField(MSG["from"]);
    this.appendValueInput("TO_NUM")
        .setCheck("Number")
        .appendField(MSG["to"]);
    this.appendValueInput("WAIT")
        .setCheck("Number")
        .appendField(MSG["for"]);
    this.appendDummyInput()
        .appendField(MSG["seconds"]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("rgb_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['rgb_chases'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG["rgb_demo"])
        .appendField(MSG["rgb_chases"]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("rgb_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['rgb_rainbow'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG["rgb_demo"])
        .appendField(MSG["rgb_rainbow"]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("rgb_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['rgb_following'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG["rgb_demo"])
        .appendField(MSG["rgb_following"]);
    this.appendValueInput("COLOR")
        .setCheck(null)
        .appendField(MSG.led_color);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("rgb_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['rgb_close'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG["rgb_close"]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("rgb_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['rgb_brightness'] = {
  init: function() {
    this.appendValueInput("NUM")
        .setCheck("Number")
        .appendField(MSG["set"])
        .appendField(MSG["rgb_brightness"]);
    this.appendDummyInput()
        .appendField("%");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("rgb_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['rgb_set_leds'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG["led_rgb"])
        .appendField(MSG["pin"])
        .appendField(new Blockly.FieldDropdown([[MSG["on_board"],"2"],["D3","3"],["D4","4"],["D5","5"],["D6","6"],["D7","7"]]),"PIN");
    this.appendValueInput("COUNT")
        .setCheck("Number")
        .appendField(MSG["led_count"]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("rgb_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['rgb_set_leds_pin'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG["led_rgb"]);
    this.appendValueInput("PIN")
        .setCheck("Number")
        .appendField(MSG["pin"]);
    this.appendValueInput("COUNT")
        .setCheck("Number")
        .appendField(MSG["led_count"]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("rgb_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['rgb_wait_open'] = {
  init: function() {
    this.appendValueInput("WAIT")
        .setCheck(null)
        .appendField(MSG.wait);
    this.appendDummyInput()
        .appendField(MSG.second)
        .appendField(MSG.then)
        .appendField(MSG.can_open);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("rgb_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['rgb_wait_close'] = {
  init: function() {
    this.appendValueInput("WAIT")
        .setCheck(null)
        .appendField(MSG.for);
    this.appendDummyInput()
        .appendField(MSG.second)
        .appendField(MSG.then)
        .appendField(MSG.close);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("rgb_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


/*** display: oled ***/
Blockly.Blocks['oled_color'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([[MSG.oled_color0,"0"], [MSG.oled_color1,"1"]]), "VAL");
    this.setInputsInline(true);
    this.setOutput(true, "String");
    this.setStyle("oled_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['oled_fontsize'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["12","12"], ["15","15"], ["20","20"]]), "VAL");
    this.setInputsInline(true);
    this.setOutput(true, "String");
    this.setStyle("oled_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['oled_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.oled_init);
    this.appendValueInput("I2C")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.oled_i2c);
    this.appendValueInput("SCL")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.oled_scl);
    this.appendValueInput("SDA")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.oled_sda);
    this.appendValueInput("WIDTH")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.oled_width);
    this.appendValueInput("HEIGHT")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.oled_height);
    this.setInputsInline(false);
    this.setStyle("oled_blocks");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['oled_slot'] = {
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
Blockly.Blocks['oled_show'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.oled_show);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("oled_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['oled_clear'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.oled_clear);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("oled_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['oled_write_text'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.oled_write_text);
    this.appendValueInput("X")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.oled_x_position);
    this.appendValueInput("Y")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.oled_y_position);
    this.appendValueInput("TEXT")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.text);
    this.appendValueInput("COLOR")
        .setCheck("String")        
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.color);
    this.appendValueInput("FONT")
        .setCheck("String")        
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.fontsize);
    this.setInputsInline(false);
    this.setStyle("oled_blocks");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['oled_draw_line'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.oled_draw_line);
    this.appendValueInput("X1")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.oled_x1);
    this.appendValueInput("Y1")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.oled_y1);
    this.appendValueInput("X2")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.oled_x2);
    this.appendValueInput("Y2")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.oled_y2);
    this.appendValueInput("COLOR")
        .setCheck("String")        
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.color);
    this.setInputsInline(false);
    this.setStyle("oled_blocks");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['oled_draw_rect'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.oled_draw_rect);
    this.appendValueInput("X")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.oled_x_position);
    this.appendValueInput("Y")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.oled_y_position);
    this.appendValueInput("WIDTH")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.oled_width);
    this.appendValueInput("HEIGHT")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.oled_height);
    this.appendValueInput("COLOR")
        .setCheck("String")        
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.color);
    this.setInputsInline(false);
    this.setStyle("oled_blocks");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['oled_draw_circle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.oled_draw_circle);
    this.appendValueInput("X")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.oled_x_position);
    this.appendValueInput("Y")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.oled_y_position);
    this.appendValueInput("RADIUS")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.oled_radius);    
    this.appendValueInput("COLOR")
        .setCheck("String")        
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.color);
    this.setInputsInline(false);
    this.setStyle("oled_blocks");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['oled_invert'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.oled_invert)
        .appendField(new Blockly.FieldDropdown([[MSG.oled_invert1,"1"],[MSG.oled_invert0,"0"]]),"COLOUR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("oled_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

/*** sounds ***/
Blockly.Blocks['set_sound_player'] = {
  init: function() {
    this.appendValueInput("PIN")
        .setCheck("Number")
        .appendField(MSG["buzzer"])
        .appendField(MSG["pin"]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("sounds_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['set_sound_tempo'] = {
  init: function() {
    this.appendValueInput("BEATS")
        .setCheck("Number")
        .appendField(MSG["set"])
        .appendField(MSG["tempo"]);
    this.appendDummyInput()
        .appendField(MSG["bpm"]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("sounds_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['set_sound_duty'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG["set"])
        .appendField(MSG["volume"])
        .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"]]), "VOLUME");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("sounds_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['sound_play_repeat'] = {
  init: function() {
    this.appendValueInput("NUMBER")
        .setCheck("Number")
        .appendField(MSG.sound_play_repeat);
    this.appendDummyInput()
        .appendField(MSG.repeat_times);
    this.appendStatementInput("CODE")
        .setCheck(null)
        .appendField(Blockly.Msg.CONTROLS_DO);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("sounds_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['set_play_song'] = {
  init: function() {
    this.appendValueInput("SONG")
        .setCheck(null)
        .appendField(MSG["play_song"]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("sounds_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['set_sound_close'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.close);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("sounds_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['music_tone_notes'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["C4","C4"], ["D4","D4"], ["E4","E4"], ["F4","F4"], ["G4","G4"], ["A4","A4"], ["B4","B4"]]), "NOTE");
    this.setInputsInline(true);
    this.setOutput(true, "String");
    this.setStyle("sounds_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['music_tone_beats'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["4","4"], ["3","3"], ["2","2"], ["1","1"], ["1/2","0.5"], ["1/4","0.25"], ["1/8","0.125"]]), "BEAT");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setStyle("sounds_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['music_tone_item'] = {
  init: function() {
    this.appendValueInput("NOTE")
        .setCheck("String")
        .appendField(MSG["note"]);
    this.appendValueInput("BEATS")
        .setCheck("Number")
        .appendField(MSG["beats"]);
    this.appendDummyInput()
        .appendField(MSG["beat"]);
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setStyle("sounds_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['music_create'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("./images/icon_flag.svg", 24, 24, "*", this.callbackFunc))
        .appendField(MSG["song"])
        .appendField(new Blockly.FieldVariable("item"), "NAME");
    this.appendDummyInput()
        .appendField(MSG["instrument"])
        .appendField(new Blockly.FieldDropdown([["1","Piano"], ["2","Electric Piano"], ["3","Organ"], ["4","Guitar"]]), "Instrument");
    this.appendStatementInput("CODE")
        .setCheck("Array");
    this.setInputsInline(true);
    this.setStyle("sounds_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  },
  callbackFunc: function (e) {
    alert("Clicked");
    console.log(e);
    return 0;
  }
};
Blockly.Blocks['music_make_tone'] = {
  init: function() {
    this.appendValueInput("ITEM")
        .setCheck(null)
        .appendField(MSG["make_tone"]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("sounds_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['music_set_pause'] = {
  init: function() {
    this.appendValueInput("PAUSE")
        .setCheck(null)
        .appendField(MSG["pause"]);
    this.appendDummyInput()
        .appendField(MSG["beat"]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("sounds_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['music_set_loop_start'] = {
  init: function() {
    this.appendValueInput("LOOP")
        .setCheck(null)
        .appendField(MSG["music_loop"]);
    this.appendDummyInput()
        .appendField(MSG["times"]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("sounds_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['music_set_loop_end'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG["music_loop_end"]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("sounds_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

/*** Sensors: ultrasound ***/
Blockly.Blocks['ultrasound_init_pin'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.hcsr04_start);
    this.appendValueInput("TRIGGER")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Trigger");
    this.appendValueInput("ECHO")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Echo");
    this.setInputsInline(false);
    this.setStyle("sensors_blocks");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['ultrasound_get_distance'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.ultrasound_get_distance);
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setStyle("sensors_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

/*** Sensors: line follower ***/
Blockly.Blocks['line_follower_init_pin'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.mit500_start);
    this.appendValueInput("left_pin")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.mit500_left_sensor);
    this.appendValueInput("right_pin")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.mit500_right_sensor);
    this.setInputsInline(false);
    this.setStyle("sensors_blocks");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};
Blockly.Blocks['line_follower_read_pin'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.read);
    this.appendValueInput("pin")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(MSG.digital);
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setStyle("sensors_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

/*** dc motor ***/


/*** servo ***/