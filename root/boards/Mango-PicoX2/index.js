COLOR.picx2_system = "#f36a18";
COLOR.picx2_controls = "#c9a209";
COLOR.picx2_logic = "#016CAF";
COLOR.picx2_motions = "#0A8698";
COLOR.picx2_servo = "#0daec5";
COLOR.picx2_display = "#990066";
COLOR.picx2_oled = "#d73fa3";
COLOR.picx2_sounds = "#4f07b9";
COLOR.picx2_sensor = "#617003";
COLOR.picx2_sensor2 = "#75be06";


addBoard({
    id: "Mango-PicoX2",
    name: "Mango PicoX2 education kit",
    level: Blockly.Msg.UI_LEVEL_BEGINNER,
    description: "Raspberry Pi Pico is a tiny, fast, and versatile board built using RP2040, the flagship microcontroller chip designed by Raspberry Pi in the UK",
    author: "Dr. Chihmin Lo",
    image: "images/cover.png",
    chip: "RP2",
    uploadMode: "REPL",
    runMode: "Y",
    programId: "python",
    script: [
        `msg/${settings.language}.js`,
        `js/blocks.js`,
        `js/generators.js`,
    ],
    css: [],
    modules: [
        
    ],
    examples: [
        "基本電子電路",
        {
            name: "數位輸出 - 內建LED範例",
            files: "Ex-led25"
        },
        {
            name: "數位輸入 - 按鈕範例",
            files: "Ex-button"
        },
        {
            name: "類比輸入 - 電位器範例",
            files: "Ex-analog_input"
        },
        {
            name: "類比輸出 - PWM範例",
            files: "Ex-pwm"
        },
        "傳感器",        
        {
            name: "超聲波測距範例",
            files: "Ex-mus025"
        },
        {
            name: "讀取四路尋跡感測器範例",
            files: "Ex-sx1508"
        },
        {
            name: "WS2812B RGB 燈光範例",
            files: "Ex-ws2812b"
        },
        {
            name: "聲音播放",
            files: "Ex-play_sound"
        },
        {
            name: "創作歌曲及播放",
            files: "Ex-play_song"
        },
        {
            name: "OLED",
            files: "Ex-oled"
        },
        {
            name: "OLED 繪圖",
            files: "Ex-oled_draw"
        },
        "電機",
        {
            name: "舵機範列",
            files: "Ex-servo"
        },
        "自走車",
        {
            name: "循跡自走車範列",
            files: "Ex-linetrace"
        },
        {
            name: "避障自走車範例",
            files: "Ex-avoid"
        }        
    ],
    firmware: [
        {
            name: "MicroPython for Raspberry Pi Pico X2 Edu. Kit",
            path: "firmware/firmware.uf2",
            version: "v2.4.3",
            date: "2022-10-24",
            board: "Raspberry Pi Pico",
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
                    xml: `<block type="events_main_procedures"></block>`
                },
                {
                    xml: `<block type="events_declare"></block>`
                },
                {
                    xml: `
                    <block type="thread_task">                        
                    </block>`
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
                        <block type="text_to_str">
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
                              <shadow type="pico_pinout">
                                    <field name="PIN">25</field>
                              </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `
                    <block type="pico_read_digital">
                        <value name="PIN">
                              <shadow type="pico_digital_pinout">
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
                    <block type="pico_set_digital"> 
                        <value name="PIN">
                            <shadow type="pico_digital_pinout">
                                <field name="PIN">LED</field>
                            </shadow>
                        </value>                      
                    </block>`
                },
                {
                    xml: `
                    <block type="pico_set_pwm"> 
                        <value name="PIN">
                            <shadow type="pico_digital_pinout">
                                <field name="PIN">2</field>
                            </shadow>
                        </value>    
                        <value name="PWM">
                        <shadow type="math_number">
                            <field name="NUM">1000</field>
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
            name: Blockly.Msg.CAT_MOTION,
            role: 'category',
            icon: tools.toolboxIcon("robot-explorer.svg"),
            color: COLOR.picx2_motions,
            blocks: [
                {
                    xml: `
                    <block type="math_percentage">
                        <value name="NUM">
                            <shadow type="math_percentage_type">
                                <field name="PER">75</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `
                    <block type="math_percentage_dropdown">                        
                    </block>`
                },
                {
                    xml: `
                    <block type="tank_state">                        
                    </block>`
                },
                {
                    xml: `
                    <block type="tank_direct">                        
                    </block>`
                },
                {
                    xml: `
                    <block type="tank_move">
                        <value name="POWER">
                            <shadow type="math_percentage_dropdown">
                                <field name="PER">75</field>
                            </shadow>
                        </value>                        
                    </block>`
                },
                {
                    xml: `
                    <block type="tank_move_wait">
                        <value name="POWER">
                            <shadow type="math_percentage_dropdown">
                                <field name="PER">75</field>
                            </shadow>
                        </value>
                        <value name="WAIT">
                            <shadow type="math_number">
                                <field name="NUM">10</field>
                            </shadow>
                        </value>                     
                    </block>`
                },
                {
                    xml: `
                    <block type="tank_move_power">
                        <value name="LEFT_POWER">
                            <shadow type="math_percentage_dropdown">
                                <field name="PER">75</field>
                            </shadow>
                        </value>
                        <value name="RIGHT_POWER">
                            <shadow type="math_percentage_dropdown">
                                <field name="PER">75</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `
                    <block type="tank_move_power_wait">
                        <value name="LEFT_POWER">
                            <shadow type="math_percentage_dropdown">
                                <field name="PER">75</field>
                            </shadow>
                        </value>
                        <value name="RIGHT_POWER">
                            <shadow type="math_percentage_dropdown">
                                <field name="PER">75</field>
                            </shadow>
                        </value>
                        <value name="WAIT">
                            <shadow type="math_number">
                                <field name="NUM">10</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `
                    <block type="tank_stop_move">                        
                    </block>`
                },
                Blockly.Msg["CAT_SERVO"],
                {
                    xml: `
                    <block type="tank_servo_position">
                        <value name="ANGLE">
                            <shadow type="math_number">
                                <field name="NUM">30</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `
                    <block type="tank_servo_release">                        
                    </block>`
                },
                {
                    xml: `
                    <block type="tank_servo_max_angle">
                        <value name="ANGLE">
                            <shadow type="math_number">
                                <field name="NUM">60</field>
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
                Blockly.Msg["CAT_ULTRASOUND"],
                {
                    xml: `<block type="tank_ultrasound_init"></block>`
                },
                {
                    xml: `<block type="ultrasound_get_distance"></block>`
                },
                Blockly.Msg["CAT_LINE_FOLLOW"],
                {
                    xml: `<block type="tank_line_follower_init"></block>`
                },
                {
                    xml: `<block type="line_follower_read_left"></block>`
                },
                {
                    xml: `<block type="line_follower_read_right"></block>`
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
                Blockly.Msg["CAT_I2C_LINE_FOLLOW"],
                {
                    xml: `<block type="i2c_line_follower_init"></block>`
                },
                {
                    xml: `<block type="i2c_line_follower_read"></block>`
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
                    <block type="sound_play_repeat">
                        <value name="NUMBER">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
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
                    xml: `<block type="tank_oled_default"></block>`
                },
                {
                    xml: `
                    <block type="tank_oled_slot">
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
                    xml: `<block type="oled_color"></block>`
                },
                {
                    xml: `<block type="oled_fontsize"></block>`
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
                        <value name="COLOR">
                            <shadow type="oled_color">
                                <field name="COLOR"></field>
                            </shadow>
                        </value>
                        <value name="FONT">
                            <shadow type="oled_fontsize">
                                <field name="FONT"></field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `
                    <block type="oled_draw_line">
                        <value name="X1">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                        <value name="Y1">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                        <value name="X2">
                            <shadow type="math_number">
                                <field name="NUM">128</field>
                            </shadow>
                        </value>
                        <value name="Y2">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                        <value name="COLOR">
                            <shadow type="oled_color">
                                <field name="COLOR"></field>
                            </shadow>
                        </value>                        
                    </block>`
                },
                {
                    xml: `
                    <block type="oled_draw_rect">
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
                        <value name="WIDTH">
                            <shadow type="math_number">
                                <field name="NUM">64</field>
                            </shadow>
                        </value>
                        <value name="HEIGHT">
                            <shadow type="math_number">
                                <field name="NUM">40</field>
                            </shadow>
                        </value>
                        <value name="COLOR">
                            <shadow type="oled_color">
                                <field name="COLOR"></field>
                            </shadow>
                        </value>                        
                    </block>`
                },
                {
                    xml: `
                    <block type="oled_draw_circle">
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
                        <value name="RADIUS">
                            <shadow type="math_number">
                                <field name="NUM">10</field>
                            </shadow>
                        </value>                        
                        <value name="COLOR">
                            <shadow type="oled_color">
                                <field name="COLOR"></field>
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
