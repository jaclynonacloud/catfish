(function(window) {
  Peeper_Spritesheet = function() {
    this.initialize();
  }
  Peeper_Spritesheet._SpriteSheet = new createjs.SpriteSheet({"images":["assets/spritesheets/Peeper_Spritesheet.png"],"frames":[[254,0,127,112],[0,224,127,112],[127,112,127,112],[127,0,127,112],[0,112,127,112],[0,0,127,112]],"animations":{"fishIdle":{"frames":[0,0,0,0,0,0,1,1,1,1,1,1,2,2,2,2,2,2,1,1,1,1,1,1]},"fishPanic":{"frames":[3,3,4,4,5,5,4,4]}}});
  var Peeper_Spritesheet_p = Peeper_Spritesheet.prototype = new createjs.Sprite();
  Peeper_Spritesheet_p.Sprite_initialize = Peeper_Spritesheet_p.initialize;
  Peeper_Spritesheet_p.initialize = function() {
    this.Sprite_initialize(Peeper_Spritesheet._SpriteSheet);
    this.paused = true;
  }
  window.Peeper_Spritesheet = Peeper_Spritesheet;
}(window))



//"next":false