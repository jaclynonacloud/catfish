(function(window) {
Menu_Level_Select = function() {
	this.initialize();
}
Menu_Level_Select._SpriteSheet = new createjs.SpriteSheet({images: ["assets/spritesheets/menu_level_select.png"], frames: [[0,0,299,555,0,1,1],[0,558,31,31,0,0,0],[34,558,31,31,0,0,0],[68,558,31,31,0,0,0],[102,558,31,31,0,0,0]],  animations: {static_bg:[0,0, true], level_empty:[1,1, true], level_complete:[2,2, true], level_special_empty:[3,3, true], level_special_complete:[4,4, true]}});
var Menu_Level_Select_p = Menu_Level_Select.prototype = new createjs.Sprite();
Menu_Level_Select_p.Sprite_initialize = Menu_Level_Select_p.initialize;
Menu_Level_Select_p.initialize = function() {
	this.Sprite_initialize(Menu_Level_Select._SpriteSheet);
	this.paused = false;
}
Menu_Level_Select_p.static_bg = function(){
	this.gotoAndPlay("static_bg");
}
Menu_Level_Select_p.level_empty = function(){
	this.gotoAndPlay("level_empty");
}
Menu_Level_Select_p.level_complete = function(){
	this.gotoAndPlay("level_complete");
}
Menu_Level_Select_p.level_special_empty = function(){
	this.gotoAndPlay("level_special_empty");
}
Menu_Level_Select_p.level_special_complete = function(){
	this.gotoAndPlay("level_special_complete");
}
window.Menu_Level_Select = Menu_Level_Select;
}(window));

