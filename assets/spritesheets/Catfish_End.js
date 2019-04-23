(function(window) {
  Catfish_End = function() {
    this.initialize();
  }
  Catfish_End._SpriteSheet = new createjs.SpriteSheet({"images":["assets/spritesheets/Catfish_End.png"],"frames":[[0,0,576,1024],[576,0,376,145],[576,145,366,98],[576,243,290,105],[576,348,287,90],[576,438,294,81],[576,519,254,82],[576,601,102,64],[576,665,95,53],[678,601,150,27],[576,718,304,12]],"animations":{"bg":[0,0],"highScore":[1,1],"complete":[2,2],"btnTryAgain":[3,3],"btnNextLevel":[4,4],"btnMainMenu":[5,5],"failure":[6,6],"time":[7,7],"fishRemain":[8,8],"combos":[9,9],"line":[10,10]}});
  var Catfish_End_p = Catfish_End.prototype = new createjs.Sprite();
  Catfish_End_p.Sprite_initialize = Catfish_End_p.initialize;
  Catfish_End_p.initialize = function() {
    this.Sprite_initialize(Catfish_End._SpriteSheet);
    this.paused = true;
  }
  window.Catfish_End = Catfish_End;
}(window))