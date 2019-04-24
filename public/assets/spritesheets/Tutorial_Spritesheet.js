(function(window) {
  Tutorial_Spritesheet = function() {
    this.initialize();
  }
  Tutorial_Spritesheet._SpriteSheet = new createjs.SpriteSheet({"images":["assets/spritesheets/Tutorial_Spritesheet.png"],"frames":[[0,0,576,1024,0,0,0],[576,0,576,1024,0,0,0],[0,1024,576,1024,0,0,0],[1152,0,576,1024,0,0,0],[576,1024,576,1024,0,0,0],[1152,1024,576,1024,0,0,0]],"animations":{"you":[0,0],"special":[1,1],"puffer":[2,2],"pause":[3,3],"many":[4,4],"fish":[5,5]}});
  var Tutorial_Spritesheet_p = Tutorial_Spritesheet.prototype = new createjs.Sprite();
  Tutorial_Spritesheet_p.Sprite_initialize = Tutorial_Spritesheet_p.initialize;
  Tutorial_Spritesheet_p.initialize = function() {
    this.Sprite_initialize(Tutorial_Spritesheet._SpriteSheet);
    this.paused = true;
  }
  window.Tutorial_Spritesheet = Tutorial_Spritesheet;
}(window))