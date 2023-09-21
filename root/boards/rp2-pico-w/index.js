COLOR.pico = "#f36a18";
COLOR.pico_controls = "#c9a209";
COLOR.pico_logic = "#016CAF";
COLOR.pico_motions = "#0A8698";
COLOR.pico_display = "#990066";
COLOR.pico_oled = "#d73fa3";
COLOR.pico_sounds = "#4f07b9";
COLOR.pico_sensor = "#617003";
COLOR.pico_sensor2 = "#75be06";

addBoard({
    id: "RP2-Pico-W",
    name: "Raspberry Pi Pico W",
    level: Blockly.Msg.UI_LEVEL_ADVANCED,
    description: "Raspberry Pi Pico W is a tiny, fast, and versatile board built using RP2040, the flagship microcontroller chip designed by Raspberry Pi in the UK",
    author: "Dr. Chihmin Lo",
    image: "images/cover.png",
    chip: "RP2",
    uploadMode: "REPL",
    runMode: "Y",
    programId: "python",
    script: [
        `msg/${settings.language}.js`,
        `js/blocks_wifi.js`,
        `js/generators_wifi.js`,
        `js/blocks_mqtt.js`,
        `js/generators_mqtt.js`,
    ],
    css: [],
    modules: [
    ],
    firmware: [
        {
            name: "MicroPython for Raspberry Pi Pico W V1.19.1",
            path: "firmware/firmware.uf2",
            version: "v1.20.0",
            date: "2023-04-26",
            board: "Raspberry Pi Pico W",
            cpu: "RP2040"
        }
    ],
    usb: [
        {
            vendorId: "2E8A",
            productId: "0005"
        }
    ],
    autoCompletion: { },
    blocks: [
        {
            name: Blockly.Msg.CAT_SYSTEM,
            role: 'category',
            icon: tools.toolboxIcon("sys.svg"),
            type: "system_category",
            blocks: [
                {
                    xml: `
                    <block type="project_metadata">
                        <value name="AUTHOR">
                            <shadow type="text">
                                <field name="TEXT">mangoblock</field>
                            </shadow>
                        </value>
                        <value name="DESCRIPTION">
                            <shadow type="text">
                                <field name="TEXT">project title</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `<block type="on_pico_start"></block>`
                },
                {
                    xml: `<block type="events_main_procedures"></block>`
                },
                {
                    xml: `
                    <block type="when_timer_tick">
                        <value name="WAIT">
                            <shadow type="math_number">
                                <field name="NUM">0.1</field>
                            </shadow>
                        </value>
                    </block>`
                },                
            ]
        },
        {
            name: Blockly.Msg.CAT_CONTROL,
            role: 'category',
            icon: tools.toolboxIcon("looping.svg"),
            type: "control_category",
            blocks: [
                {
                    xml: `
                    <block type="wait_sec">
                        <value name="WAIT">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `
                    <block type="controls_for">
                        <value name="FROM">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                        <value name="TO">
                            <shadow type="math_number">
                                <field name="NUM">10</field>
                            </shadow>
                        </value>
                        <value name="BY">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `
                    <block type="controls_repeat">
                        <value name="NUMBER">
                            <shadow type="math_number">
                                <field name="NUM">10</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `<block type="controls_forever"></block>`
                },
                {
                    xml: `<block type="controls_if"></block>`
                },
                {
                    xml: `<block type="controls_repeat_until"></block>`
                },
                {
                    xml: `<block type="controls_break"></block>`
                },
                {
                    xml: `<block type="controls_continue"></block>`
                },
                {
                    xml: `<block type="controls_pass"></block>`
                },
            ]
        },
        {
            name: Blockly.Msg.CAT_LOGIC,
            role: 'category',
            icon: tools.toolboxIcon("logic.svg"),
            type: "logic_category",
            blocks: [
                {
                    xml: `<block type="logic_compare"></block> `
                },
                {
                    xml: `
                    <block type="logic_compare_eq">
                        <value name="A">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                        <value name="B">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                    </block> `
                },
                {
                    xml: `
                    <block type="logic_compare_more_then">
                        <value name="A">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                        <value name="B">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                    </block> `
                },
                {
                    xml: `
                    <block type="logic_compare_less_then">
                        <value name="A">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                        <value name="B">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                    </block> `
                },
                {
                    xml: `<block type="logic_operation"></block>`
                },
                {
                    xml: `<block type="logic_operation_and"></block> `
                },
                {
                    xml: `<block type="logic_operation_or"></block> `
                },
                {
                    xml: `<block type="logic_negate"></block>`
                },
                {
                    xml: `
                    <block type="logic_operation_eq">
                        <value name="B">
                            <shadow type="logic_boolean">
                            </shadow>
                        </value>
                    </block> `
                },
                {
                    xml: `<block type="logic_boolean"></block>`
                },
                {
                    xml: `<block type="logic_null"></block>`
                },
            ]
        },
        {
            name: Blockly.Msg.CAT_MATH,
            role: 'category',
            icon: tools.toolboxIcon("math.svg"),
            type: 'math_category',
            blocks: [
                {
                    xml: `
                    <block type="math_number">
                        <field name="NUM">123</field>
                    </block>`
                },
                {
                    xml: `
                    <block type="math_arithmetic">
                        <value name="A">
                        <shadow type="math_number">
                            <field name="NUM">1</field>
                        </shadow>
                        </value>
                        <value name="B">
                        <shadow type="math_number">
                            <field name="NUM">1</field>
                        </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `
                    <block type="math_number_property">
                        <value name="NUMBER_TO_CHECK">
                        <shadow type="math_number">
                            <field name="NUM">0</field>
                        </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `
                    <block type="math_round">
                        <value name="NUM">
                        <shadow type="math_number">
                            <field name="NUM">3.1</field>
                        </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `
                    <block type="math_modulo">
                        <value name="DIVIDEND">
                        <shadow type="math_number">
                            <field name="NUM">64</field>
                        </shadow>
                        </value>
                        <value name="DIVISOR">
                        <shadow type="math_number">
                            <field name="NUM">10</field>
                        </shadow>
                        </value>
                    </block> `
                },
                {
                    xml: `
                    <block type="math_constrain">
                        <value name="VALUE">
                        <shadow type="math_number">
                            <field name="NUM">50</field>
                        </shadow>
                        </value>
                        <value name="LOW">
                        <shadow type="math_number">
                            <field name="NUM">1</field>
                        </shadow>
                        </value>
                        <value name="HIGH">
                        <shadow type="math_number">
                            <field name="NUM">100</field>
                        </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `
                    <block type="math_random_int">
                        <value name="FROM">
                        <shadow type="math_number">
                            <field name="NUM">1</field>
                        </shadow>
                        </value>
                        <value name="TO">
                        <shadow type="math_number">
                            <field name="NUM">100</field>
                        </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `<block type="math_random_float"></block>`
                },
                {
                    xml: `
                    <block type="var_to_int">
                        <field name="VAR">${MSG["var_to_int"]}</field>
                    </block>`
                },
                {
                    xml: `
                    <block type="var_to_float">
                        <field name="VAR">${MSG["var_to_float"]}</field>
                    </block> `
                },
            ]
        },
        {
            name: Blockly.Msg.CAT_TEXT,
            role: 'category',
            icon: tools.toolboxIcon("text.svg"),
            type: 'text_category',
            blocks: [
                {
                    xml: `
                            <block type="text"></block>
                            `
                },
                {
                    xml: `  
                            <block type="text_join"></block>                          
                            `
                },
                {
                    xml: `  
                            <block type="text_join_single"></block>                          
                            `
                },
                {
                    xml: `
                            <block type="text_append">
                                <value name="TEXT">
                                <shadow type="text"></shadow>
                                </value>
                            </block>
                            `
                },
                {
                    xml: `
                            <block type="text_length">
                                <value name="VALUE">
                                <shadow type="text">
                                    <field name="TEXT">abc</field>
                                </shadow>
                                </value>
                            </block>
                            `
                },
                {
                    xml: `
                            <block type="text_isEmpty">
                                <value name="VALUE">
                                <shadow type="text">
                                    <field name="TEXT"></field>
                                </shadow>
                                </value>
                            </block>
                            `
                },
                {
                    xml: `
                            <block type="text_indexOf">
                                <value name="VALUE">
                                <block type="variables_get">
                                    <field name="VAR">{textVariable}</field>
                                </block>
                                </value>
                                <value name="FIND">
                                <shadow type="text">
                                    <field name="TEXT">abc</field>
                                </shadow>
                                </value>
                            </block>
                            `
                },
                {
                    xml: `
                            <block type="text_charAt">
                                <value name="VALUE">
                                <block type="variables_get">
                                    <field name="VAR">{textVariable}</field>
                                </block>
                                </value>
                            </block>
                            `
                },
                {
                    xml: `
                            <block type="text_getSubstring">
                                <value name="STRING">
                                <block type="variables_get">
                                    <field name="VAR">{textVariable}</field>
                                </block>
                                </value>
                            </block>
                            `
                },
                {
                    xml: `
                            <block type="text_changeCase">
                                <value name="TEXT">
                                <shadow type="text">
                                    <field name="TEXT">abc</field>
                                </shadow>
                                </value>
                            </block>
                            `
                },
                {
                    xml: `
                            <block type="text_trim">
                                <value name="TEXT">
                                <shadow type="text">
                                    <field name="TEXT">abc</field>
                                </shadow>
                                </value>
                            </block>
                            `
                },
                {
                    xml: `
                    <block type="sys_print">
                        <value name="TEXT">
                              <shadow type="text">
                                    <field name="TEXT">hello</field>
                              </shadow>
                        </value>
                    </block>`
                },
            ]
        },
        {
            name: "sep",
            blocks: "<sep></sep>"
        },
        {
            name: Blockly.Msg.CAT_VARIABLES,
            role: 'category',
            icon: tools.toolboxIcon("var.svg"),
            type: 'variable_category',
            blocks: "VARIABLE"
        },
        {
            name: Blockly.Msg.CAT_FUNCTIONS,
            role: 'category',
            icon: tools.toolboxIcon("func.svg"),
            type: 'procedure_category',
            blocks: "PROCEDURE"
        },
        {
            name: "sep",
            blocks: "<sep></sep>"
        },
        {
            name: Blockly.Msg.CAT_CHIP,
            role: 'category',
            icon: tools.toolboxIcon("chip.svg"),
            type: "rp2_category",
            blocks: [
                {
                    xml: `<block type="pico_pinout"></block>`
                },
                {
                    xml: `
                    <block type="pico_set_pin">
                        <value name="PIN">
                              <shadow type="picow_pinout">
                                    <field name="PIN">LED</field>
                              </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `
                    <block type="pico_read_digital">
                        <value name="PIN">
                              <shadow type="picow_digital_pinout">
                                    <field name="PIN">2</field>
                              </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `
                    <block type="pico_read_analog">
                        <value name="PIN">
                              <shadow type="pico_analog_pinout">
                                    <field name="PIN">26</field>
                              </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `
                    <block type="picow_set_digital"> 
                        <value name="PIN">
                            <shadow type="picow_digital_pinout">
                                <field name="PIN">LED</field>
                            </shadow>
                        </value>                      
                    </block>`
                },
                {
                    xml: `
                    <block type="pico_chip_temperature">                       
                    </block>`
                },
            ]
        },
        {
            name: Blockly.Msg.CAT_NETWORK,
            role: 'category',
            icon: tools.toolboxIcon("network.svg"),
            type: "network_category",
            blocks: [
                {
                    xml: `
                    <block type="wifi_connect">
                        <value name="SSID">
                              <shadow type="text">
                                    <field name="TEXT">ntub-dmd</field>
                              </shadow>
                        </value>
                        <value name="KEY">
                              <shadow type="text">
                                    <field name="TEXT">12345678</field>
                              </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `<block type="wifi_is_connected"></block>`
                },
                {
                    xml: `
                    <block type="mqtt_connect">
                        <value name="HOST">
                              <shadow type="text">
                                    <field name="TEXT">127.0.0.1</field>
                              </shadow>
                        </value>
                        <value name="PORT">
                              <shadow type="math_number">
                                    <field name="NUM">1883</field>
                              </shadow>
                        </value>
                        <value name="USER">
                              <shadow type="text">
                                    <field name="TEXT"></field>
                              </shadow>
                        </value>
                        <value name="PASSWORD">
                              <shadow type="text">
                                    <field name="TEXT"></field>
                              </shadow>
                        </value>
                        <value name="CLIENT_ID">
                              <shadow type="text">
                                    <field name="TEXT">cmlo_12345678</field>
                              </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `
                    <block type="mqtt_subscribe">
                        <value name="TOPIC">
                              <shadow type="text">
                                    <field name="TEXT">home/room</field>
                              </shadow>
                        </value>                        
                    </block>`
                },
                {
                    xml: `
                    <block type="mqtt_publish">
                        <value name="TOPIC">
                              <shadow type="text">
                                    <field name="TEXT">home/room</field>
                              </shadow>
                        </value>
                        <value name="MESSAGE">
                              <shadow type="text">
                                    <field name="TEXT">demo</field>
                              </shadow>
                        </value> 
                        <value name="RETAIN">
                              <shadow type="logic_boolean">
                                <field name="BOOL">TRUE</field>                                                                
                              </shadow>
                        </value> 
                        <value name="QOS">
                              <shadow type="mqtt_qos_list">
                                    <field name="NAME">0</field>
                              </shadow>
                        </value>                           
                    </block>`
                },
                {
                    xml: `<block type="mqtt_check_message"></block>`
                },
                {
                    xml: `<block type="mqtt_on_receive"></block>`
                },
                {
                    xml: `<block type="mqtt_receive_topic"></block>`
                },
                {
                    xml: `<block type="mqtt_receive_message"></block>`
                },
            ]
        },
        {
            name: Blockly.Msg.CAT_RGB,
            role: 'category',
            icon: tools.toolboxIcon("led.svg"),
            type: "rgb_category",
            blocks: [
                {
                    xml: `
                    <block type="rgb_set_leds">
                        <value name="COUNT">
                            <shadow type="math_number">
                                <field name="NUM">10</field>
                            </shadow>
                        </value>                      
                    </block>`
                },
                {
                    xml: `
                    <block type="rgb_set_leds_pin">
                        <value name="PIN">
                            <shadow type="pico_pinout">
                                <field name="PIN">2</field>
                            </shadow>
                        </value>  
                        <value name="COUNT">
                            <shadow type="math_number">
                                <field name="NUM">10</field>
                            </shadow>
                        </value>                      
                    </block>`
                },
                {
                    xml: `
                    <block type="rgb_brightness">
                        <value name="NUM">
                            <shadow type="math_percentage">
                                <field name="PER">30</field>
                            </shadow>
                        </value>                 
                    </block>`
                },
                {
                    xml: `<block type="color_picker"></block>`
                },
                {
                    xml: `
                    <block type="rgb_color">
                        <value name="R">
                            <shadow type="math_rgb">
                                <field name="NUM">255</field>
                            </shadow>
                        </value>
                        <value name="G">
                            <shadow type="math_rgb">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                        <value name="B">
                            <shadow type="math_rgb">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `
                    <block type="rgb_turn_on">
                        <value name="COLOR">
                            <shadow type="color_picker">
                                <field name="COLOR"></field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `
                    <block type="rgb_turn_on_wait">
                        <value name="COLOR">
                            <shadow type="color_picker">
                                <field name="COLOR"></field>
                            </shadow>
                        </value>
                        <value name="WAIT">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `
                    <block type="rgb_turn_on_num">
                        <value name="NUM">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                        <value name="COLOR">
                            <shadow type="color_picker">
                                <field name="COLOR"></field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `
                    <block type="rgb_turn_on_range">
                        <value name="FROM_NUM">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                        <value name="TO_NUM">
                            <shadow type="math_number">
                                <field name="NUM">10</field>
                            </shadow>
                        </value>
                        <value name="COLOR">
                            <shadow type="color_picker">
                                <field name="COLOR"></field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `<block type="rgb_close"></block>`
                },
                {
                    xml: `
                    <block type="rgb_wait_close">
                        <value name="WAIT">
                            <shadow type="math_number">
                                <field name="NUM">0.01</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `<label text="${MSG.rgb_effect}"></label>`
                },
                {
                    xml: `
                    <block type="rgb_chases">
                    </block>`
                },
                {
                    xml: `
                    <block type="rgb_rainbow">
                    </block>`
                },
                {
                    xml: `
                    <block type="rgb_following">
                        <value name="COLOR">
                            <shadow type="color_picker">
                                <field name="COLOR"></field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `
                    <block type="rgb_demo">
                        <value name="FROM_NUM">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                        <value name="TO_NUM">
                            <shadow type="math_number">
                                <field name="NUM">10</field>
                            </shadow>
                        </value>
                        <value name="WAIT">
                            <shadow type="math_number">
                                <field name="NUM">0.01</field>
                            </shadow>
                        </value>
                    </block>`
                },
            ]
        },
        {
            name: Blockly.Msg.CAT_SENSORS,
            role: 'category',
            icon: tools.toolboxIcon("sensor.svg"),
            type: "sensors_category",
            blocks: [
                {
                    xml: `
                    <block type="ultrasound_init_pin">
                        <value name="TRIGGER">
                              <shadow type="pico_pinout">
                                    <field name="PIN">13</field>
                              </shadow>
                        </value>
                        <value name="ECHO">
                              <shadow type="pico_pinout">
                                    <field name="PIN">14</field>
                              </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `<block type="ultrasound_get_distance"></block>`
                },
                {
                    xml: `
                    <block type="line_follower_read_pin">
                        <value name="pin">
                              <shadow type="pico_digital_pinout">
                                    <field name="PIN">13</field>
                              </shadow>
                        </value>
                    </block>`
                },
            ]
        },
        {
            name: Blockly.Msg.CAT_SOUNDS,
            role: 'category',
            icon: tools.toolboxIcon("sound.svg"),
            type: "sounds_category",
            blocks: [
                {
                    xml: `
                    <block type="set_sound_player">
                        <value name="PIN">
                              <shadow type="pico_digital_pinout">
                                    <field name="PIN">22</field>
                              </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `
                    <block type="set_sound_tempo">
                        <value name="BEATS">
                              <shadow type="math_number">
                                    <field name="NUM">80</field>
                              </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `
                    <block type="set_sound_duty">                        
                    </block>`
                },
                {
                    xml: `
                    <block type="set_play_song">
                        <value name="SONG">                             
                        </value>
                    </block>`
                },
                {
                    xml: `
                    <block type="set_sound_close">                        
                    </block>`
                },
                {
                    xml: `
                    <block type="music_create">
                        <value name="NAME">
                              <shadow type="text">
                                    <field name="TEXT">music name</field>
                              </shadow>
                        </value>                    
                    </block>`
                },
                {
                    xml: `
                    <block type="music_make_tone">
                        <value name="ITEM">
                            <shadow type="music_tone_item">
                                <value name="NOTE">
                                    <shadow type="music_tone_notes">
                                        <field name="NOTE">C4</field>
                                    </shadow>
                                </value>
                                <value name="BEATS">
                                    <shadow type="music_tone_beats">
                                        <field name="BEAT">1</field>
                                    </shadow>
                                </value>                                     
                            </shadow>
                        </value>                    
                    </block>`
                },
                {
                    xml: `
                    <block type="music_tone_item">
                        <value name="NOTE">
                              <shadow type="music_tone_notes">
                                    <field name="NOTE">C4</field>
                              </shadow>
                        </value>
                        <value name="BEATS">
                              <shadow type="music_tone_beats">
                                    <field name="BEAT">1</field>
                              </shadow>
                        </value>                        
                    </block>`
                },
                {
                    xml: `
                    <block type="music_set_pause">
                        <value name="PAUSE">
                              <shadow type="music_tone_beats">
                                    <field name="BEAT">1</field>
                              </shadow>
                        </value>                
                    </block>`
                },
                {
                    xml: `
                    <block type="music_set_loop_start">
                        <value name="LOOP">
                              <shadow type="math_number">
                                    <field name="NUM">2</field>
                              </shadow>
                        </value>                
                    </block>`
                },
                {
                    xml: `
                    <block type="music_set_loop_end">                         
                    </block>`
                },
            ]
        },
        {
            name: Blockly.Msg.CAT_OLED,
            role: 'category',
            icon: tools.toolboxIcon("oled.svg"),
            type: "oled_category",
            blocks: [
                {
                    xml: `
                    <block type="oled_init">
                        <value name="I2C">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                        <value name="SCL">
                            <shadow type="pico_i2c_pinout">
                                <field name="PIN">21</field>
                            </shadow>
                        </value>
                        <value name="SDA">
                            <shadow type="pico_i2c_pinout">
                                <field name="PIN">20</field>
                            </shadow>
                        </value>
                        <value name="WIDTH">
                            <shadow type="math_number">
                                <field name="NUM">128</field>
                            </shadow>
                        </value>
                        <value name="HEIGHT">
                            <shadow type="math_number">
                                <field name="NUM">64</field>
                            </shadow>
                        </value>
                    </block>`
                },                
                {
                    xml: `
                    <block type="oled_write_text">
                        <value name="X">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                        <value name="Y">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                        <value name="TEXT">
                            <shadow type="text">
                                <field name="TEXT">hello</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `<block type="oled_show"></block>`
                },
                {
                    xml: `<block type="oled_invert"></block>`
                },
                {
                    xml: `<block type="oled_clear"></block>`
                },
            ]
        },
    ]
});
