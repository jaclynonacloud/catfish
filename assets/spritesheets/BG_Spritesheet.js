(function(window) {
  BG_Spritesheet = function() {
    this.initialize();
  }
  BG_Spritesheet._SpriteSheet = new createjs.SpriteSheet({"images":["assets/spritesheets/BG_Spritesheet.png"],"frames":[[0,0,576,1024,0,0,0],[576,0,576,1024,0,0,0],[0,1024,576,1024,0,0,0],[1152,0,576,1024,0,0,0]],"animations":{"bg4":[0,0],"bg3":[1,1],"bg2":[2,2],"bg1":[3,3]}});
  var BG_Spritesheet_p = BG_Spritesheet.prototype = new createjs.Sprite();
  BG_Spritesheet_p.Sprite_initialize = BG_Spritesheet_p.initialize;
  BG_Spritesheet_p.initialize = function() {
    this.Sprite_initialize(BG_Spritesheet._SpriteSheet);
    this.paused = true;
  }
  window.BG_Spritesheet = BG_Spritesheet;
}(window))