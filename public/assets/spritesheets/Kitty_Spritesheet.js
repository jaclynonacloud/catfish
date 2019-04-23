(function(window) {
  Kitty_Spritesheet = function() {
    this.initialize();
  }
  Kitty_Spritesheet._SpriteSheet = new createjs.SpriteSheet({"images":["assets/spritesheets/Kitty_Spritesheet.png"],"frames":[[0,0,107,914,0,54,869],[107,0,107,914,0,54,869]],"animations":{"kittyIdle":{"frames":[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1],"loop":true}}});
  var Kitty_Spritesheet_p = Kitty_Spritesheet.prototype = new createjs.Sprite();
  Kitty_Spritesheet_p.Sprite_initialize = Kitty_Spritesheet_p.initialize;
  Kitty_Spritesheet_p.initialize = function() {
    this.Sprite_initialize(Kitty_Spritesheet._SpriteSheet);
    this.paused = true;
  }
  window.Kitty_Spritesheet = Kitty_Spritesheet;
}(window))