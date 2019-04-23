(function(window) {
  Catfish_Main = function() {
    this.initialize();
  }
  Catfish_Main._SpriteSheet = new createjs.SpriteSheet({"images":["assets/spritesheets/Catfish_Main.png"],"frames":[[828,285,194,70],[576,611,294,81],[576,521,287,90],[576,416,290,105],[576,285,252,131],[576,0,259,285],[0,0,576,1024]],"animations":{"btnExit":[0,0],"btnLevelSelect":[1,1],"btnOptions":[2,2],"btnNewGame":[3,3],"logo":[4,4],"fancyFish":[5,5],"bg":[6,6]}});
  var Catfish_Main_p = Catfish_Main.prototype = new createjs.Sprite();
  Catfish_Main_p.Sprite_initialize = Catfish_Main_p.initialize;
  Catfish_Main_p.initialize = function() {
    this.Sprite_initialize(Catfish_Main._SpriteSheet);
    this.paused = true;
  }
  window.Catfish_Main = Catfish_Main;
}(window))