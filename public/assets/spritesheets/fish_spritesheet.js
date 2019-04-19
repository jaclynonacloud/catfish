﻿(function(window) {
Fish_Spritesheet = function() {
	this.initialize();
}
Fish_Spritesheet._SpriteSheet = new createjs.SpriteSheet({images: ["assets/spritesheets/fish_spritesheet.png"], frames: [[600,1094,196,172,0,-8.55,-1.5],[400,1108,195,171,0,-9.55,-1.5],[205,193,194,170,0,-10.55,-0.5],[598,1269,194,169,0,-10.55,-0.5],[0,1278,194,168,0,-10.55,-0.5],[397,1282,194,168,0,-10.55,0.5],[594,1441,194,167,0,-10.55,0.5],[0,1449,194,166,0,-10.55,0.5],[0,1618,194,164,0,-10.55,0.5],[589,1611,194,165,0,-10.55,0.5],[786,1611,194,165,0,-10.55,0.5],[393,1453,193,166,0,-11.55,0.5],[197,1454,193,166,0,-11.55,0.5],[791,1441,193,167,0,-11.55,0.5],[197,1283,193,168,0,-11.55,0.5],[795,1269,194,169,0,-10.55,0.5],[199,1109,195,171,0,-9.55,0.5],[201,933,196,173,0,-8.55,0.5],[771,918,198,173,0,-6.55,-0.5],[0,559,200,175,0,-4.55,-0.5],[0,199,202,178,0,-2.55,-0.5],[406,0,204,181,0,-0.55,-0.5],[406,184,203,179,0,-1.55,-1.5],[205,366,202,178,0,-2.55,-1.5],[805,374,201,177,0,-3.55,-1.5],[0,380,201,176,0,-3.55,-1.5],[583,559,200,175,0,-4.55,-1.5],[771,741,199,174,0,-5.55,-1.5],[0,927,198,173,0,-6.55,-1.5],[400,933,197,172,0,-7.55,-1.5],[600,1094,196,172,0,-8.55,-1.5],[606,374,196,182,0,-8.55,-3.5],[805,554,191,184,0,-13.55,-2.5],[204,547,188,188,0,-16.55,-0.5],[583,737,185,189,0,-19.55,0.5],[0,737,187,187,0,-17.55,-0.5],[410,366,193,185,0,-11.55,-0.5],[203,0,200,190,0,-4.55,-1.5],[814,0,199,184,0,-5.55,-1.5],[612,188,197,183,0,-7.55,-1.5],[814,187,196,184,0,-8.55,-1.5],[799,1094,196,172,0,-8.55,-3.5],[383,748,189,182,0,-15.55,-1.5],[395,554,185,191,0,-19.55,0.5],[190,738,190,183,0,-14.55,-0.5],[0,0,200,196,0,-4.55,-1.5],[613,0,198,185,0,-6.55,-1.5],[0,1103,196,172,0,-8.55,-1.5]],  animations: {fish_swim_slow:[0,30, true], fish_swim_fast:[31,40, true], fish_swim_panic:[41,47, true]}});
var Fish_Spritesheet_p = Fish_Spritesheet.prototype = new createjs.Sprite();
Fish_Spritesheet_p.Sprite_initialize = Fish_Spritesheet_p.initialize;
Fish_Spritesheet_p.initialize = function() {
	this.Sprite_initialize(Fish_Spritesheet._SpriteSheet);
	this.paused = false;
}
Fish_Spritesheet_p.fish_swim_slow = function(){
	this.gotoAndPlay("fish_swim_slow");
}
Fish_Spritesheet_p.fish_swim_fast = function(){
	this.gotoAndPlay("fish_swim_fast");
}
Fish_Spritesheet_p.fish_swim_panic = function(){
	this.gotoAndPlay("fish_swim_panic");
}
window.Fish_Spritesheet = Fish_Spritesheet;
}(window));

