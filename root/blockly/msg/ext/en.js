let MSG = {};

MSG.title = "mangoblock";
MSG.blocks = "Blocks";
MSG.files = "Files";
MSG.shared = "Shared";
MSG.device = "Device";
MSG.linkTooltip = "Save and link to blocks.";
MSG.runTooltip = "Run the program defined by the blocks in the workspace.";
MSG.badCode = "Program error:\n%1";
MSG.timeout = "Maximum execution iterations exceeded.";
MSG.trashTooltip = "Discard all blocks.";
MSG.httpRequestError = "There was a problem with the request.";
MSG.linkAlert = "Share your blocks with this link:\n\n%1";
MSG.hashError = "Sorry, '%1' doesn't correspond with any saved program.";
MSG.xmlError = "Could not load your saved file. Perhaps it was created with a different version of Blockly?";
MSG.badXml = "Error parsing XML:\n%1\n\nSelect 'OK' to abandon your changes or 'Cancel' to further edit the XML.";
MSG.saveTooltip = "Save blocks to file.";
MSG.loadTooltip = "Load blocks from file.";
MSG.notificationTooltip = "Notifications panel.";
MSG.ErrorGET = "Unable to load requested file.";
MSG.invalidDevice = "Invalid device.";
MSG.languageTooltip = "Change language.";
MSG.noToolbox = "The device has no toolbox set.";
MSG.networkTooltip = "Connect through network (WebREPL, http).";
MSG.serialTooltip = "Connect through serial/USB or Bluetooth (Web Serial API, https).";
MSG.toolbarTooltip = "Show toolbar";
MSG.wrongDevicePin = "Check pins, target device changed!";
MSG.notDefined = "not defined";
MSG.editAsFileValue = "Edit as a file";
MSG.editAsFileTooltip = "Edit python code and save to device's filesystem.";
MSG.forumTooltip = "Help forum.";
MSG.accountTooltip = "Your projects and settings.";
MSG.blocksLoadedFromFile = "Blocks loaded from file '%1'.";
MSG.deviceUnavailable = "Device '%1' unavailable.";
MSG.notConnected = "No connection to send data.";
MSG.serialFroozen = "Serial connection is unresponsive.";
MSG.notAvailableFlag = "$1 is not available on your browser.\r\nPlease make sure the $1 flag is enabled.";
MSG.runCodeStart = "Upload program.";
MSG.runCodeEnd = "Upload program finished.";
MSG.error_load_board = "Unable to load board information.";
MSG.text = "text";
MSG.text_join = "text join";
MSG.textVariable = "text variable";
MSG.all = "all";
MSG.for = "for";
MSG.slot = "slots";
MSG.to_str = "to string"
MSG.on = "turn on";
MSG.off = "turn off";
MSG.yes = "yes";
MSG.no = "no";
MSG.ok = "ok";
MSG.cancel = "cancel";
MSG.as = "as";
MSG.read = "read";
MSG.to = "to";
MSG.from = "from";
MSG.then = "then";
MSG.process = "process";
MSG.id = "ID";
MSG.when = "when";
MSG.clicked = "clicked";
MSG.default = "default";

//Blocks
MSG.project_info = "Project Information";
MSG.project_info_author = "Author";
MSG.project_info_desc = "Description";
MSG.on_start = "when start";
MSG.on_pico_start = "when pico start up";
MSG.on_pico_x2_start = "when mango robot starts up";
MSG.on_uart_received = "when UART received data";
MSG.start = "start";
MSG.main_program = "main program";
MSG.main_program_end = "main program end";
MSG.when_timer_tick = "timer event";
MSG.timer_callback = "watch dog";
MSG.thread_task = "threading";
MSG.async_task = "async";

// Date
MSG.data = "value";
MSG.set_rtc = "set date and time";
MSG.get_rtc = "get date and time";

// Time
MSG.timer = "timer";
MSG.block_delay = "delay";
MSG.delay = "delay";
MSG.delay_milliseconds = "delay milliseconds";
MSG.delay_microseconds = "delay microseconds";
MSG.wait = "wait";
MSG.watch = "watch";
MSG.interval = "interval";
MSG.move_wait = "wait";
MSG.seconds = "seconds";
MSG.milliseconds = "milliseconds";
MSG.microseconds = "microseconds";
MSG.year = "year";
MSG.month = "month";
MSG.day = "day";
MSG.hour = "hour";
MSG.minute = "minute";
MSG.second = "second";
MSG.continue = "continue";
MSG.control_finish = "finish";

// Text
MSG.text_join_single = "text join";
MSG.text_join_label = "label";
MSG.text_join_value = "value";

// system
MSG.console_print = "print";
MSG.declare = "declare";
MSG.initial = "initial";

// Chip
MSG.pin_pullup = "pull-up resistors";
MSG.pin_pulldown = "pull-down resistors";
MSG.with_resistor = "with";
MSG.none_resistor = "none resistor";
MSG.set_pin = "set output pin";
MSG.pin = "pin";
MSG.pin_output = "output";
MSG.pin_input = "input";
MSG.pin_on = "on";
MSG.pin_off = "off";
MSG.pin_toggle = "toggle";
MSG.read_digital_pin = "read digital input";
MSG.read_analog_pin = "read analog input";
MSG.button_pin = "button";
MSG.button_value = "button pressed";
MSG.pressed = "pressed";
MSG.analog = "analog";
MSG.digital ="digital";
MSG.F = "FARENHEIT";
MSG.C = "CELSIUS";

// Motor control
MSG.car = "car";
MSG.car_state = "state";
MSG.move_direct = "direct";
MSG.mango_car = "mango car";
MSG.mango_tank = "mango tank";
MSG.move_forward = "move forward";
MSG.move_backward = "move backward";
MSG.turn_left = "turn left";
MSG.turn_right = "turn right";
MSG.rotate_left = "rotate left";
MSG.rotate_right = "rotate right";
MSG.left_wheel = "left wheel turns";
MSG.right_wheel = "right wheel turns";
MSG.move_stop = "stop moving";
MSG.state_moving = "moving";
MSG.state_stopped = "stopped";
MSG.power = "power";
MSG.at_power = "at power";
MSG.move = "move";
MSG.stop = "stop";
MSG.stopped = "stopped";
MSG.can_move = "can move";
MSG.can_open = "can open";
MSG.force_stop = "force stop";


//LED
MSG.led_strip = "LED Strip";
MSG.led_number_pixels = "number of pixels";
MSG.led_rgb = "RGB LED";
MSG.led_count = "LED Number";
MSG.led = "LED";
MSG.on_board = "on board";
MSG.led_rgb_list = "RGB LED Strip";
MSG.led_number = "LED Number:";
MSG.led_color = "colour:";
MSG.color = "colour";
MSG.color_red = "red";
MSG.color_green = "green";
MSG.color_blue = "blue";
MSG.rgb_close = "LED close";
MSG.rgb_turn_on = "LED turn on";
MSG.set = "set";
MSG.close = "close";
MSG.rgb_brightness = "LED brightness";
MSG.rgb_demo = "RGB demo";
MSG.rgb_chases = "Chases";
MSG.rgb_rainbow = "Rainbow";
MSG.rgb_following = "Following";
MSG.rgb_color = "RGB color";
MSG.rgb_r = "red";
MSG.rgb_g ="green";
MSG.rgb_b = "blue";
MSG.rgb_value = "RGB";
MSG.rgb_effect = "effects";
MSG.can_open = "can open";


//OLED
MSG.oled = "SSD1306 OLED Display";
MSG.oled_init = "Init I2C SSD1306 OLED Display";
MSG.oled_i2c = "I2C Number";
MSG.oled_scl = "SCL Pin";
MSG.oled_sda = "SDA Pin";
MSG.oled_width = "WIDTH";
MSG.oled_height = "HEIGHT";
MSG.oled_radius = "RADIUS";
MSG.oled_write_text = "Write text on display";
MSG.oled_draw_line = "Draw a line on display";
MSG.oled_draw_rect = "Draw a rectangle outline on display";
MSG.oled_draw_circle = "Draw a circle on display";
MSG.oled_x_position = "X position";
MSG.oled_y_position = "Y position";
MSG.oled_x1 = "Initial X position";
MSG.oled_y1 = "Initial Y position";
MSG.oled_x2 = "Final X position";
MSG.oled_y2 = "Final Y position";
MSG.oled_show = "Show";
MSG.oled_clear = "Clear OLED Display";
MSG.oled_draw = "Drawing";
MSG.oled_invert ="Invert";
MSG.oled_invert0 ="White background";
MSG.oled_invert1 ="Black background";
MSG.oled_default = "Default SSD1306 OLED Display";
MSG.oled_color1 ="White";
MSG.oled_color0 ="Black";
MSG.fontsize ="Font size";

//ultrasound: hcsr04
MSG.hcsr04_start = "Start HCSR04 ultrasound sensor";
MSG.sensor_port = "Sensor terminal";
MSG.sensor_port_num = "Sensor terminal number";
MSG.sensor_port1 = "Sensor 1";
MSG.sensor_port2 = "Sensor 2";
MSG.ultrasound_get_distance ="Get distance (Ultrasound sensor)";

//line follower
MSG.mit500_start = "Start line follower sensor";
MSG.mit500_left_sensor = "Left Sensor";
MSG.mit500_right_sensor = "Right Sensor";
MSG.mit500_read_left = "Get left sensor value";
MSG.mit500_read_right = "Get right sensor value";
MSG.mit500_read_sensor = "Get sensor value";
MSG.sx1508_init = "Start I2C line follower sensor";
MSG.sensor_read = "Get sensor value";
MSG.sensor1 = "Sensor 1";
MSG.sensor2 = "Sensor 2";
MSG.sensor3 = "Sensor 3";
MSG.sensor4 = "Sensor 4";

// Controls
MSG.try1 = "try";
MSG.exp1 = "except";
MSG.forever = "forever";
MSG.repeat = "repeat";
MSG.repeat_times = "";
MSG.control_break = "break";
MSG.control_continue = "continue";
MSG.control_pass = "pass";
MSG.repeat_until = "repeat until";
MSG.wait_until = "wait until";
MSG.time_out = "time out";
MSG.control_finish = "finish";

// Sound and Music
MSG.song = "song";
MSG.buzzer = "buzzer";
MSG.volume = "volume";
MSG.beats = "beats";
MSG.volume_level = "volume";
MSG.play_music = "play music";
MSG.play_song = "play song";
MSG.note = "note";
MSG.beats = "beats";
MSG.pause = "pause";
MSG.tempo = "tempo";
MSG.beat = "beat";
MSG.bpm = "bpm";
MSG.instrument = "instrument";
MSG.make_tone = "tone";
MSG.music_loop = "loop start";
MSG.music_loop_end = "end of loop";
MSG.times = "times";
MSG.sound_play_repeat = "play for";

//Servo
MSG.set_servo = "set servo";
MSG.set_servo_angle = "set servo angle";
MSG.angle = "angle";
MSG.max_angle = "max angle";
MSG.servo_release = "release servo connected pin";


MSG.show_iot = "show on IoT tab";
MSG.wifi_scan = "scan wifi networks";
MSG.wifi_connect = "connect to wifi network";
MSG.wifi_name = "network name";
MSG.wifi_key = "key/password";
MSG.easymqtt_start = "EasyMQTT Start";
MSG.easymqtt_publish = "EasyMQTT Publish Data";
MSG.topic = "topic";
MSG.session_id = "session ID";
MSG.file_open = "open File";
MSG.file_name = "file name";
MSG.file_mode = "mode";
MSG.file_binary = "open in binary mode";
MSG.file_close = "close file";
MSG.file_write_line = "write line to file";
MSG.file_line = "line";
MSG.ntp_sync = "sync date and time with NTP";
MSG.timezone = "timezone";
MSG.easymqtt_subscribe = "EasyMQTT subscribe to topic";
MSG.data_received = "is received";
MSG.easymqtt_receive = "EasyMQTT receive data";
MSG.relay = "relay";
MSG.relay_on = "relay on pin";
MSG.wait_for_data = "wait for data";
MSG.dht_start = "Start DHT Sensor";
MSG.dht_measure = "update DHT11/22 sensor reading";
MSG.dht_temp = "get DHT11/22 temperature";
MSG.dht_humi = "get DHT11/22 humidity";
MSG.type = "type";
MSG.var_to_int = "to int";
MSG.var_to_float = "to float";
MSG.chip_temperature = "chip temperature";
MSG.turn_pin = "turn pin";
MSG.is_pin = "is pin";

//BMP180
MSG.pressure = "pressure";
MSG.temperature = "temperature";
MSG.altitude = "altitude";
MSG.bmp180_init = "Init BMP180";
//SHT20
MSG.init_sht20 = "Init SHT20";
MSG.humidity = "humidity";
//Network
MSG.net_http_get = "HTTP GET Request";
MSG.net_http_get_status = "HTTP Status code";
MSG.net_http_get_content = "HTTP Response content";
MSG.net_http_server_start = "Start HTTP Web Server";
MSG.net_http_server_start_port = "Port";
MSG.net_http_server_wait = "Wait for HTTP Client";
MSG.net_http_server_requested_page = "Requested Web Page";
MSG.net_http_server_send_response = "Send HTTP Response";
MSG.net_http_server_send_html = "HTML";
//Splash screen
MSG.splash_welcome = "Welcome to mangoblock!";
MSG.splash_footer = "Do not show this screen again";
MSG.splash_close = "Close";
MSG.splash_message = "<p><b>MangoBlock</b> allows text and block based programming for several types of embedded systems, microprocessors and Internet of Things modules using MicroPython, CircuitPython, Python or Snek. You can connect, program, debug and monitor several types of boards using network, USB or Bluetooth. Please check a list of <a href=https://mangoblock.tw/boards/>compatible boards here</a>. Compatible boards include STM32, ESP32, ESP8266, Raspberry Pi Pico and even Arduino. <p><b>MangoBlock</b> is fully <a href=https://mangoblock.tw/development/>open source</a> and based on HTML and JavaScript, so no software install or configuration is needed and you can use it offline! We hope MangoBlock is useful for you and that you can enjoy using MangoBlock. If you need help, we now have a <a href=https://github.com/cmlo/mangoblock/discussions>discussion forum</a>, where we also post <a href=https://github.com/cmlo/mangoblock/discussions/categories/announcements>new features and announcements about MangoBlock</a>. Feel free to use it! Also, we invite you to use the forum to leave feedbacks and suggestions for MangoBlock!</p><p>Now you can easily load MicroPython on your ESP32 or ESP8226 to use with MangoBlock.</p><p>Thank you from the MangoBlock Team!</p>";

