﻿(function(window) {
UI = function() {
	this.initialize();
}
UI._SpriteSheet = new createjs.SpriteSheet({images: ["assets/spritesheets/ui.png"], frames: [[0,0,411,731,0,0.5,0],[0,734,411,375,0,0.5,0],[0,1112,411,375,0,0.5,0],[0,1490,411,375,0,0.5,0],[414,1890,411,374,0,0.5,-1],[414,3398,411,373,0,0.5,-2],[828,752,411,372,0,0.5,-3],[828,2252,411,371,0,0.5,-4],[1242,0,411,370,0,0.5,-5],[1242,1492,411,369,0,0.5,-6],[1242,2980,411,368,0,0.5,-7],[1656,371,411,367,0,0.5,-8],[1656,1851,411,366,0,0.5,-9],[1656,2220,411,366,0,0.5,-9],[1656,3696,411,365,0,0.5,-10],[2070,1104,411,364,0,0.5,-11],[2070,2572,411,363,0,0.5,-12],[2070,1471,411,364,0,0.5,-11],[2070,0,411,365,0,0.5,-10],[1656,2589,411,366,0,0.5,-9],[1656,741,411,367,0,0.5,-8],[1242,3351,411,368,0,0.5,-7],[1242,1864,411,369,0,0.5,-6],[1242,373,411,370,0,0.5,-5],[828,2626,411,371,0,0.5,-4],[828,1127,411,372,0,0.5,-3],[828,0,411,373,0,0.5,-2],[414,2267,411,374,0,0.5,-1],[0,1868,411,375,0,0.5,0],[0,2246,411,375,0,0.5,0],[0,2624,411,375,0,0.5,0],[0,3002,411,375,0,0.5,0],[0,3380,411,375,0,0.5,0],[414,0,411,375,0,0.5,0],[414,378,411,375,0,0.5,0],[414,756,411,375,0,0.5,0],[414,2644,411,374,0,0.5,-1],[828,376,411,373,0,0.5,-2],[828,1502,411,372,0,0.5,-3],[828,3000,411,371,0,0.5,-4],[1242,746,411,370,0,0.5,-5],[1242,2236,411,369,0,0.5,-6],[1242,3722,411,368,0,0.5,-7],[1656,1111,411,367,0,0.5,-8],[2070,368,411,365,0,0.5,-10],[2070,1838,411,364,0,0.5,-11],[2070,2938,411,363,0,0.5,-12],[2070,2205,411,364,0,0.5,-11],[2070,736,411,365,0,0.5,-10],[1656,2958,411,366,0,0.5,-9],[1656,3327,411,366,0,0.5,-9],[1656,1481,411,367,0,0.5,-8],[1656,0,411,368,0,0.5,-7],[1242,2608,411,369,0,0.5,-6],[1242,1119,411,370,0,0.5,-5],[828,3374,411,371,0,0.5,-4],[828,1877,411,372,0,0.5,-3],[414,3021,411,374,0,0.5,-1],[414,1134,411,375,0,0.5,0],[414,1512,411,375,0,0.5,0],[0,734,411,375,0,0.5,0],[733,3774,218,49,0,2.5,2],[264,3800,218,49,0,2.5,2],[485,3800,218,49,0,2.5,2],[954,3748,218,49,0,2.5,2],[954,3800,218,49,0,2.5,2],[706,3826,218,49,0,2.5,2],[927,3852,218,49,0,2.5,2],[264,3852,218,49,0,2.5,2],[485,3852,218,49,0,2.5,2],[706,3878,218,49,0,2.5,2],[927,3904,218,49,0,2.5,2],[264,3904,218,49,0,2.5,2],[485,3904,218,49,0,2.5,2],[706,3930,218,49,0,2.5,2],[927,3956,218,49,0,2.5,2],[132,3956,218,49,0,2.5,2],[353,3956,218,49,0,2.5,2],[574,3982,218,49,0,2.5,2],[795,4008,218,49,0,2.5,2],[1016,4008,218,49,0,2.5,2],[0,4008,218,49,0,2.5,2],[221,4008,218,49,0,2.5,2],[507,4034,92,30,0,0.5,0],[602,4034,92,30,0,0.5,0],[442,4008,62,81,0,0.5,0],[264,3774,466,23,0,1.5,1],[559,4020,8,8,0,-109.5,-18],[559,4008,10,9,0,-109.5,-16],[1197,3810,17,10,0,-105.5,-14],[1175,3828,20,13,0,-105.5,-11],[706,3800,23,14,0,-105.5,-9],[507,4008,26,15,0,-105.5,-7],[764,4034,28,25,0,-106.5,-4],[697,4034,30,29,0,-106.5,-1],[1148,3852,30,28,0,-108.5,-2],[730,4034,31,28,0,-109.5,-3],[1175,3779,22,28,0,-110.5,-4],[1175,3748,23,28,0,-111.5,-6],[536,4008,20,15,0,-112.5,-23],[1175,3810,19,15,0,-113.5,-26],[927,3826,18,17,0,-114.5,-28],[559,4020,8,8,0,-115.5,-29],[132,3758,129,179,0,0.5,0],[0,3758,129,228,0,0.5,49]],  animations: {bg_main_static:[0,0, true], bg_main:[1,60, true], btn_clear_data:[61,61, true], btn_clear_data_hover:[62,62, true], btn_clear_data_progress:[63,82, true], arrow_left:[83,83, true], arrow_right:[84,84, true], arrows_down:[85,85, true], waterline:[86,86, true], cry:[87,102, true], icon_hand:[103,103, true], icon_hand_tap:[104,104, true]}});
var UI_p = UI.prototype = new createjs.Sprite();
UI_p.Sprite_initialize = UI_p.initialize;
UI_p.initialize = function() {
	this.Sprite_initialize(UI._SpriteSheet);
	this.paused = false;
}
UI_p.bg_main_static = function(){
	this.gotoAndPlay("bg_main_static");
}
UI_p.bg_main = function(){
	this.gotoAndPlay("bg_main");
}
UI_p.btn_clear_data = function(){
	this.gotoAndPlay("btn_clear_data");
}
UI_p.btn_clear_data_hover = function(){
	this.gotoAndPlay("btn_clear_data_hover");
}
UI_p.btn_clear_data_progress = function(){
	this.gotoAndPlay("btn_clear_data_progress");
}
UI_p.arrow_left = function(){
	this.gotoAndPlay("arrow_left");
}
UI_p.arrow_right = function(){
	this.gotoAndPlay("arrow_right");
}
UI_p.arrows_down = function(){
	this.gotoAndPlay("arrows_down");
}
UI_p.waterline = function(){
	this.gotoAndPlay("waterline");
}
UI_p.cry = function(){
	this.gotoAndPlay("cry");
}
UI_p.icon_hand = function(){
	this.gotoAndPlay("icon_hand");
}
UI_p.icon_hand_tap = function(){
	this.gotoAndPlay("icon_hand_tap");
}
window.UI = UI;
}(window));

