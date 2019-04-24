(function(window) {
  Specials_Spritesheet = function() {
    this.initialize();
  }
  Specials_Spritesheet._SpriteSheet = new createjs.SpriteSheet({"images":["assets/spritesheets/Specials_Spritesheet.png"],"frames":[[0,0,221,137,0,0,0],[0,137,221,137,0,0,0],[221,0,153,168,0,0,0],[0,274,153,168,0,0,0],[221,168,139,159,0,0,0],[221,327,139,159,0,0,0]],"animations":{"rileyIdle":{"frames":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"owenIdle":{"frames":[3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2]},"persIdle":{"frames":[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]}}});
  var Specials_Spritesheet_p = Specials_Spritesheet.prototype = new createjs.Sprite();
  Specials_Spritesheet_p.Sprite_initialize = Specials_Spritesheet_p.initialize;
  Specials_Spritesheet_p.initialize = function() {
    this.Sprite_initialize(Specials_Spritesheet._SpriteSheet);
    this.paused = true;
  }
  window.Specials_Spritesheet = Specials_Spritesheet;
}(window))