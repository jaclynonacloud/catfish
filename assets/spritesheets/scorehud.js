(function(window) {
ScoreHUD_Spritesheet = function() {
	this.initialize();
}
ScoreHUD_Spritesheet._SpriteSheet = new createjs.SpriteSheet({images: ["assets/spritesheets/scorehud.png"], frames: [[0,0,411,40,0,0,0],[442,0,21,21,0,0,-9],[414,0,25,26,0,0,-5],[466,0,40,10,0,-4,-13],[466,13,13,20,0,0,0],[497,13,11,20,0,0,0],[442,24,11,20,0,0,0],[414,29,11,20,0,0,0],[482,13,12,20,0,0,0],[428,29,11,20,0,0,0],[456,36,11,20,0,0,0],[470,36,11,20,0,0,0],[484,36,11,20,0,0,0],[498,36,11,20,0,0,0],[0,43,11,20,0,0,0],[14,43,11,20,0,0,0]],  animations: {bg:[0,0, true], sprTime:[1,1, true], sprFish:[2,2, true], sprScore:[3,3, true], 0:[4,4, true], 1:[5,5, true], 2:[6,6, true], 3:[7,7, true], 4:[8,8, true], 5:[9,9, true], 6:[10,10, true], 7:[11,11, true], 8:[12,12, true], 9:[13,13, true], ".":[14,14, true], ",":[15,15, true]}});
var ScoreHUD_Spritesheet_p = ScoreHUD_Spritesheet.prototype = new createjs.Sprite();
ScoreHUD_Spritesheet_p.Sprite_initialize = ScoreHUD_Spritesheet_p.initialize;
ScoreHUD_Spritesheet_p.initialize = function() {
	this.Sprite_initialize(ScoreHUD_Spritesheet._SpriteSheet);
	this.paused = false;
}
ScoreHUD_Spritesheet_p.bg = function(){
	this.gotoAndPlay("bg");
}
ScoreHUD_Spritesheet_p.sprTime = function(){
	this.gotoAndPlay("sprTime");
}
ScoreHUD_Spritesheet_p.sprFish = function(){
	this.gotoAndPlay("sprFish");
}
ScoreHUD_Spritesheet_p.sprScore = function(){
	this.gotoAndPlay("sprScore");
}
// ScoreHUD_Spritesheet_p.0 = function(){
// 	this.gotoAndPlay("0");
// }
// ScoreHUD_Spritesheet_p.1 = function(){
// 	this.gotoAndPlay("1");
// }
// ScoreHUD_Spritesheet_p.2 = function(){
// 	this.gotoAndPlay("2");
// }
// ScoreHUD_Spritesheet_p.3 = function(){
// 	this.gotoAndPlay("3");
// }
// ScoreHUD_Spritesheet_p.4 = function(){
// 	this.gotoAndPlay("4");
// }
// ScoreHUD_Spritesheet_p.5 = function(){
// 	this.gotoAndPlay("5");
// }
// ScoreHUD_Spritesheet_p.6 = function(){
// 	this.gotoAndPlay("6");
// }
// ScoreHUD_Spritesheet_p.7 = function(){
// 	this.gotoAndPlay("7");
// }
// ScoreHUD_Spritesheet_p.8 = function(){
// 	this.gotoAndPlay("8");
// }
// ScoreHUD_Spritesheet_p.9 = function(){
// 	this.gotoAndPlay("9");
// }
// ScoreHUD_Spritesheet_p.. = function(){
// 	this.gotoAndPlay(".");
// }
// ScoreHUD_Spritesheet_p., = function(){
// 	this.gotoAndPlay(",");
// }
window.ScoreHUD_Spritesheet = ScoreHUD_Spritesheet;
}(window));

