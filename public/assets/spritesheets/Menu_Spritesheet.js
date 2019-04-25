(function(window) {
  Menu_Spritesheet = function() {
    this.initialize();
  }
  Menu_Spritesheet._SpriteSheet = new createjs.SpriteSheet({"images":["assets/spritesheets/Menu_Spritesheet.png"],"frames":[[580,1177,37,76,0,0,0],[1248,405,49,78,0,0,0],[172,1285,86,58,0,0,0],[96,1285,76,80,0,0,0],[1152,577,76,80,0,0,0],[456,1203,76,80,0,0,0],[673,1092,76,80,0,0,0],[380,1203,76,80,0,0,0],[1152,497,76,80,0,0,0],[287,1203,93,85,0,0,0],[580,1092,93,85,0,0,0],[96,1226,147,59,0,0,0],[0,1226,96,92,0,0,0],[1152,405,96,92,0,0,0],[1152,330,198,75,0,0,0],[1152,255,198,75,0,0,0],[580,1024,242,68,0,0,0],[287,1135,242,68,0,0,0],[1152,173,294,82,0,0,0],[1152,91,294,82,0,0,0],[1152,0,287,91,0,0,0],[0,1135,287,91,0,0,0],[290,1024,290,111,0,0,0],[0,1024,290,111,0,0,0],[576,0,576,1024,0,0,0],[0,0,576,1024,0,0,0]],"animations":{"btnNewGame":{"frames":[23,23,23,23,23,23,23,23,23,23,23,23,22,22,22,22,22,22,22,22]},"btnOptions":{"frames":[21,21,21,21,21,21,21,21,21,21,21,21,21,21,20,20,20,20,20,20,20]},"btnLevelSelect":{"frames":[19,19,19,19,19,19,19,19,19,19,18,18,18,18,18,18,18,18,18,18]},"btnExit":{"frames":[15,15,15,15,15,15,15,15,15,15,15,15,15,15,14,14,14,14,14,14,14,14,14,14,14]},"btnOn":{"frames":[13,13,13,13,13,13,13,13,13,13,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12]},"btnOff":{"frames":[10,10,10,10,10,10,10,10,10,10,10,10,9,9,9,9,9,9,9,9,9,9,9,9]},"btnResetData":{"frames":[17,17,17,17,17,17,17,17,17,17,17,17,16,16,16,16,16,16,16,16,16,16,16,16]},"bgOptions":{"frames":[25]},"bgLevelSelect":{"frames":[24]},"btnLvlEmpty":{"frames":[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]},"btnLvlComplete":{"frames":[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6]},"btnLvlSpecial":{"frames":[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8]},"btnRight":{"frames":[1]},"btnLeft":{"frames":[0]},"btnUp":{"frames":[2]},"btnCheat":{"frames":[11]}}});
  var Menu_Spritesheet_p = Menu_Spritesheet.prototype = new createjs.Sprite();
  Menu_Spritesheet_p.Sprite_initialize = Menu_Spritesheet_p.initialize;
  Menu_Spritesheet_p.initialize = function() {
    this.Sprite_initialize(Menu_Spritesheet._SpriteSheet);
    this.paused = true;
  }
  window.Menu_Spritesheet = Menu_Spritesheet;
}(window))