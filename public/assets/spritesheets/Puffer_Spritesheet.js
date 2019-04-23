(function(window) {
  Puffer_Spritesheet = function() {
    this.initialize();
  }
  Puffer_Spritesheet._SpriteSheet = new createjs.SpriteSheet({"images":["assets/spritesheets/Puffer_Spritesheet.png"],"frames":[[0,270,137,135,0,0,0],[137,135,137,135,0,0,0],[137,0,137,135,0,0,0],[0,135,137,135,0,0,0],[0,0,137,135,0,0,0]],"animations":{"pufferIdle":{"frames":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]},"pufferAngry":{"frames":[2,2,2,3,3,3,4,4,4,4,4,4,4,4,4],"next":false}, "pufferRecover":{"frames":[4,4,4,4,3,3,3,3,2,2,2,2,2,2,2],"next":"pufferIdle"}}});
  var Puffer_Spritesheet_p = Puffer_Spritesheet.prototype = new createjs.Sprite();
  Puffer_Spritesheet_p.Sprite_initialize = Puffer_Spritesheet_p.initialize;
  Puffer_Spritesheet_p.initialize = function() {
    this.Sprite_initialize(Puffer_Spritesheet._SpriteSheet);
    this.paused = true;
  }
  window.Puffer_Spritesheet = Puffer_Spritesheet;
}(window))