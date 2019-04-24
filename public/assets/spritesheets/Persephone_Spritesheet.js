(function(window) {
  Persephone_Spritesheet = function() {
    this.initialize();
  }
  Persephone_Spritesheet._SpriteSheet = new createjs.SpriteSheet({"images":["assets/spritesheets/Persephone_Spritesheet.png"],"frames":[[0,0,139,159,0,0,0],[139,0,139,159,0,0,0]],"animations":{"persIdle":{"frames":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}}});
  var Persephone_Spritesheet_p = Persephone_Spritesheet.prototype = new createjs.Sprite();
  Persephone_Spritesheet_p.Sprite_initialize = Persephone_Spritesheet_p.initialize;
  Persephone_Spritesheet_p.initialize = function() {
    this.Sprite_initialize(Persephone_Spritesheet._SpriteSheet);
    this.paused = true;
  }
  window.Persephone_Spritesheet = Persephone_Spritesheet;
}(window))