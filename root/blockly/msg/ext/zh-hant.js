'use strict';

MSG["title"] = "芒果磚";
MSG["blocks"] = "積木";
MSG["files"] = "檔案";
MSG["shared"] = "分享";
MSG["device"] = "設備";
MSG["linkTooltip"] = "儲存積木組並提供連結。";
MSG["runTooltip"] = "於工作區中執行積木組所定義的程式。";
MSG["badCode"] = "程式錯誤：\n%1";
MSG["timeout"] = "超過最大執行數。";
MSG["trashTooltip"] = "捨棄所有積木。";
MSG["httpRequestError"] = "命令出現錯誤。";
MSG["linkAlert"] = "透過此連結分享您的積木組：\n\n%1";
MSG["hashError"] = "對不起，「%1」並未對應任何已保存的程式。";
MSG["xmlError"] = "未能載入您保存的檔案。或許它是由其他版本的Blockly創建？";
MSG["badXml"] = "解析 XML 時出現錯誤：\n%1\n\n選擇'確定'以放棄您的更改，或選擇'取消'以進一步編輯 XML。";
MSG["saveTooltip"] = "將積木程式存檔";
MSG["loadTooltip"] = "由檔案載入積木程式";
MSG["notificationTooltip"] = "Notifications panel.";
MSG["ErrorGET"] = "Unable to load requested file.";
MSG["invalidDevice"] = "Invalid device.";
MSG["languageTooltip"] = "Change language.";
MSG["noToolbox"] = "The device has no toolbox set.";
MSG["networkTooltip"] = "Connect through network (WebREPL, http).";
MSG["serialTooltip"] = "Connect through serial/USB or Bluetooth (Web Serial API, https).";
MSG["toolbarTooltip"] = "Show toolbar";
MSG["wrongDevicePin"] = "檢查腳位，目標設備已改變 !";
MSG["notDefined"] = "沒有定義的";
MSG["editAsFileValue"] = "Edit as a file";
MSG["editAsFileTooltip"] = "Edit python code and save to device's filesystem.";
MSG["forumTooltip"] = "Help forum.";
MSG["accountTooltip"] = "Your projects and settings.";
MSG["blocksLoadedFromFile"] = "Blocks loaded from file '%1'.";
MSG["deviceUnavailable"] = "Device '%1' unavailable.";
MSG["notConnected"] = "No connection to send data.";
MSG["serialFroozen"] = "Serial connection is unresponsive.";
MSG["notAvailableFlag"] = "$1 is not available on your browser.\r\nPlease make sure the $1 flag is enabled.";
MSG["runCodeStart"] = "即時執行程式上傳";
MSG["runCodeEnd"] ="即時執行程式上傳結束";
MSG["error_load_board"] = "無法正確載入主板資料。";
MSG["text"] = "文字";
MSG["text_join"] = "組合文字";
MSG["textVariable"] = "文字變數";
MSG["all"] = "全部";
MSG["for"] = "持續";
MSG["slot"] = "端口";
MSG["to_str"] = "轉換成文字";
MSG["on"] = "開啟";
MSG["off"] = "關閉";
MSG["yes"] = "是";
MSG["no"] = "否";
MSG["ok"] = "確定";
MSG["cancel"] = "取消";
MSG["as"] = "為";
MSG["read"] = "讀取";
MSG["to"] = "到";
MSG["from"] = "由";
MSG["then"] = "然後";
MSG["process"] = "程序"
MSG["id"] = "編號";
MSG["when"] = "當";
MSG["clicked"] = "被點擊";
MSG["default"] = "預設";

//Blocks
MSG["project_info"] = "專案資訊";
MSG["project_info_author"] = "作者";
MSG["project_info_desc"] = "說明";
MSG["on_start"] = "當程式開始";
MSG["on_pico_start"] = "當程式開始";
MSG["on_pico_x2_start"] = "當芒果小車啟動";
MSG["on_uart_received"] = "當收到資料時";
MSG["start"] = "開始";
MSG["main_program"] = "主程式";
MSG["main_program_end"] = "結束時執行";
MSG["when_timer_tick"] = "感測器";
MSG["timer_callback"] = "時間程序";
MSG["thread_task"] = "分工程序";
MSG["async_task"] = "非同步程序";

//日期
MSG["data"] = "value";
MSG["set_rtc"] = "set date and time";
MSG["get_rtc"] = "get date and time";

//時間
MSG["timer"] = "時間";
MSG["block_delay"] = "延遲";
MSG["delay"] = "延遲";
MSG["delay_milliseconds"] = "延遲毫秒";
MSG["delay_microseconds"] = "延遲微秒";
MSG["wait"] = "等待";
MSG["watch"] = "查看";
MSG["interval"] = "間隔";
MSG["move_wait"] = "運轉";
MSG["seconds"] = "秒";
MSG["milliseconds"] = "毫秒";
MSG["microseconds"] = "微秒";
MSG["year"] = "年";
MSG["month"] = "月";
MSG["day"] = "日";
MSG["hour"] = "時";
MSG["minute"] = "分";
MSG["second"] = "秒";
MSG["continue"] = "持續";

// 文字
MSG["text_join_single"] = "單行組合文字";
MSG["text_join_label"] = "標題";
MSG["text_join_value"] = "值";

// 系統
MSG["console_print"] = "輸出文字";
MSG["declare"] = "宣告";
MSG["initial"] = "初始化";

//晶片腳位
MSG["pin_pullup"] = "上拉電阻";
MSG["pin_pulldown"] = "下拉電阻";
MSG["with_resistor"] = "並置";
MSG["none_resistor"] = "無內建電阻";
MSG["set_pin"] = "設定腳位";
MSG["pin"] = "腳位";
MSG["pin_output"] = "輸出腳位";
MSG["pin_input"] = "輸入腳位";
MSG["pin_on"] = "開";
MSG["pin_off"] = "關";
MSG["pin_toggle"] = "切換腳位開關";
MSG["read_digital_pin"] = "讀取數位輸入";
MSG["read_analog_pin"] = "讀取類比輸入";
MSG["button_pin"] = "按鈕";
MSG["button_value"] = "按鈕按下";
MSG["pressed"] = "按下";
MSG["analog"] = "類比";
MSG["digital"] = "數位";
MSG["F"] = "華氏";
MSG["C"] = "攝氏";

//機器車控制
MSG["car"] = "小車";
MSG["car_state"] = "狀態";
MSG["move_direct"] = "方向";
MSG["mango_car"] = "芒果小車";
MSG["mango_tank"] = "芒果坦克";
MSG["move_forward"] = "向前";
MSG["move_backward"] = "向後";
MSG["turn_left"] = "向左";
MSG["turn_right"] = "向右";
MSG["rotate_left"] = "旋轉向左";
MSG["rotate_right"] = "旋轉向右";
MSG["left_wheel"] = "左輪";
MSG["right_wheel"] = "右輪";
MSG["move_stop"] = "停止移動";
MSG["state_moving"] = "移動中";
MSG["state_stopped"] = "停止移動";
MSG["power"] = "能量";
MSG["at_power"] = "動力";
MSG["move"] = "移動";
MSG["stop"] = "停止";
MSG["stopped"] = "停止後";
MSG["can_move"] = "可以移動";
MSG["force_stop"] = "強制停止運行";

//LED彩燈
MSG["led_strip"] = "LED 燈帶";
MSG["led_number_pixels"] = "燈珠數量";
MSG["led_rgb"] = "LED 彩燈";
MSG["led_count"] = "燈珠數量";
MSG["led"] = "LED";
MSG["on_board"] = "板載";
MSG["led_rgb_list"] = "LED 彩燈串";
MSG["led_number"] = "編號";
MSG["led_color"] = "顏色";
MSG["color"] = "顏色";
MSG["color_red"] = "紅色";
MSG["color_green"] = "綠色";
MSG["color_blue"] = "藍色";
MSG["rgb_close"] = "關閉LED燈";
MSG["rgb_turn_on"] = "點亮LED燈";
MSG["set"] = "設定";
MSG["close"] = "關閉";
MSG["rgb_brightness"] = "LED燈亮度";
MSG["rgb_demo"] = "LED燈特效展示";
MSG["rgb_chases"] = "流星";
MSG["rgb_rainbow"] = "彩虹";
MSG["rgb_following"] = "跟隨";
MSG["rgb_color"] = "三原色";
MSG["rgb_r"] = "紅";
MSG["rgb_g"] = "綠";
MSG["rgb_b"] = "藍";
MSG["rgb_value"] = "RGB值";
MSG["rgb_effect"] = "特效";
MSG["can_open"] = "可以開啟";

//OLED顯示器
MSG["oled"] = "SSD1306 OLED 顯示器";
MSG["oled_init"] = "初始化 SSD1306 OLED 顯示器";
MSG["oled_i2c"] = "I2C 編號";
MSG["oled_scl"] = "SCL 腳位";
MSG["oled_sda"] = "SDA 腳位";
MSG["oled_width"] = "面板寬點數";
MSG["oled_height"] = "面板高點數";
MSG["oled_radius"] = "半徑";
MSG["oled_write_text"] = "寫字到顯示器";
MSG["oled_draw_line"] = "畫一條線";
MSG["oled_draw_rect"] = "畫一個矩形框";
MSG["oled_draw_circle"] = "畫一個圓形";
MSG["oled_x_position"] = "X 座標";
MSG["oled_y_position"] = "Y 座標";
MSG["oled_x1"] = "起點 X 座標";
MSG["oled_y1"] = "起點 Y 座標";
MSG["oled_x2"] = "終點 X 座標";
MSG["oled_y2"] = "終點 Y 座標";
MSG["oled_show"] = "顯示內容";
MSG["oled_clear"] = "清除顯示內容";
MSG["oled_draw"] = "畫像素圖";
MSG["oled_invert"] = "反轉顯示";
MSG["oled_invert0"] ="黑底";
MSG["oled_invert1"] ="白底";
MSG["oled_default"] = "預設 SSD1306 OLED 顯示器";
MSG["oled_color1"] ="白字黑底";
MSG["oled_color0"] ="黑字白底";
MSG["fontsize"] ="字體大小";

//超音波感測器: hcsr04
MSG["sensor_port"] = "接線端子";
MSG["sensor_port_num"] = "接線端子編號";
MSG["sensor_port1"] = "感測器 1";
MSG["sensor_port2"] = "感測器 2";
MSG["hcsr04_start"] = "啟用超音波測距感測器";
MSG["ultrasound_get_distance"] ="超音波測量距離 (cm)";

//循跡感測器
MSG["mit500_start"] = "啟用雙路紅外線循跡感測器";
MSG["mit500_left_sensor"] = "左邊感測器";
MSG["mit500_right_sensor"] = "右邊感測器";
MSG["mit500_read_left"] = "左邊感測器值";
MSG["mit500_read_right"] = "右邊感測器值";
MSG["mit500_read_sensor"] = "感測器值";
MSG["sx1508_init"] = "啟用四路紅外線循跡感測器";
MSG["sensor_read"] = "讀取感測器";
MSG["sensor1"] = "感測器 1";
MSG["sensor2"] = "感測器 2";
MSG["sensor3"] = "感測器 3";
MSG["sensor4"] = "感測器 4";

//控制
MSG["try1"] = "嘗試";
MSG["exp1"] = "除外";
MSG["forever"] = "重複執行";
MSG["repeat"] = "重複";
MSG["repeat_times"] = "次";
MSG["control_break"] = "中斷";
MSG["control_continue"] = "繼續";
MSG["control_pass"] = "略過";
MSG["repeat_until"] = "重複執行，直到";
MSG["wait_until"] = "等待，直到";
MSG["time_out"] = "逾時";
MSG["control_finish"] = "終止";

// 聲與音樂
MSG["song"] = "歌曲";
MSG["buzzer"] = "蜂鳴器";
MSG["volume"] = "音量";
MSG["beats"] = "拍數";
MSG["play_music"] = "播放音樂";
MSG["play_song"] = "播放歌曲";
MSG["note"] = "音階";
MSG["beats"] = "拍子";
MSG["pause"] = "休止符";
MSG["tempo"] = "節奏";
MSG["beat"] = "拍";
MSG["bpm"] = "拍/每分鐘";
MSG["instrument"] = "樂器";
MSG["make_tone"] = "音符";
MSG["music_loop"] = "重複";
MSG["music_loop_end"] = "重複結束";
MSG["times"] = "次";
MSG["sound_play_repeat"] = "播放";

//Servo
MSG["set_servo"] = "設定舵機";
MSG["set_servo_angle"] = "設定舵機角度";
MSG["max_angle"] = "最大角度";
MSG["angle"] = "角度";
MSG["servo_release"] = "釋放舵機";

MSG["show_iot"] = "show on IoT tab";
MSG["wifi_scan"] = "scan wifi networks";
MSG["wifi_connect"] = "connect to wifi network";
MSG["wifi_name"] = "network name";
MSG["wifi_key"] = "key/password";
MSG["easymqtt_start"] = "EasyMQTT Start";
MSG["easymqtt_publish"] = "EasyMQTT Publish Data";
MSG["topic"] = "topic";
MSG["session_id"] = "session ID";
MSG["file_open"] = "open File";
MSG["file_name"] = "file name";
MSG["file_mode"] = "mode";
MSG["file_binary"] = "open in binary mode";
MSG["file_close"] = "close file";
MSG["file_write_line"] = "write line to file";
MSG["file_line"] = "line";
MSG["ntp_sync"] = "sync date and time with NTP";
MSG["timezone"] = "timezone";
MSG["easymqtt_subscribe"] = "EasyMQTT subscribe to topic";
MSG["data_received"] = "is received";
MSG["easymqtt_receive"] = "EasyMQTT receive data";
MSG["relay"] = "中繼";
MSG["relay_on"] = "relay on pin";
MSG["wait_for_data"] = "wait for data";
MSG["dht_start"] = "Start DHT Sensor";
MSG["dht_measure"] = "update DHT11/22 sensor reading";
MSG["dht_temp"] = "get DHT11/22 temperature";
MSG["dht_humi"] = "get DHT11/22 humidity";
MSG["type"] = "類型";
MSG["var_to_int"] = "轉成整數";
MSG["var_to_float"] = "轉成浮點數值";
MSG["chip_temperature"] = "晶片溫度";
MSG["turn_pin"] = "將腳位";
MSG["is_pin"] = "腳位";

//BMP180
MSG["pressure"] = "pressure";
MSG["temperature"] = "temperature";
MSG["altitude"] = "altitude";
MSG["bmp180_init"] = "Init BMP180";
//SHT20
MSG["init_sht20"] = "Init SHT20";
MSG["humidity"] = "humidity";
//Network
MSG["net_http_get"] = "HTTP GET Request";
MSG["net_http_get_status"] = "HTTP Status code";
MSG["net_http_get_content"] = "HTTP Response content";
MSG["net_http_server_start"] = "Start HTTP Web Server";
MSG["net_http_server_start_port"] = "Port";
MSG["net_http_server_wait"] = "Wait for HTTP Client";
MSG["net_http_server_requested_page"] = "Requested Web Page";
MSG["net_http_server_send_response"] = "Send HTTP Response";
MSG["net_http_server_send_html"] = "HTML";
//Splash screen
MSG["splash_welcome"] = "Welcome to mangoblock!";
MSG["splash_footer"] = "Do not show this screen again";
MSG["splash_close"] = "Close";
MSG["splash_message"] = "<p><b>MangoBlock</b> allows text and block based programming for several types of embedded systems, microprocessors and Internet of Things modules using MicroPython, CircuitPython, Python or Snek. You can connect, program, debug and monitor several types of boards using network, USB or Bluetooth. Please check a list of <a href=https://mangoblock.tw/boards/>compatible boards here</a>. Compatible boards include STM32, ESP32, ESP8266, Raspberry Pi Pico and even Arduino. <p><b>MangoBlock</b> is fully <a href=https://mangoblock.tw/development/>open source</a> and based on HTML and JavaScript, so no software install or configuration is needed and you can use it offline! We hope MangoBlock is useful for you and that you can enjoy using MangoBlock. If you need help, we now have a <a href=https://github.com/cmlo/mangoblock/discussions>discussion forum</a>, where we also post <a href=https://github.com/cmlo/mangoblock/discussions/categories/announcements>new features and announcements about MangoBlock</a>. Feel free to use it! Also, we invite you to use the forum to leave feedbacks and suggestions for MangoBlock!</p><p>Now you can easily load MicroPython on your ESP32 or ESP8226 to use with MangoBlock.</p><p>Thank you from the MangoBlock Team!</p>";

