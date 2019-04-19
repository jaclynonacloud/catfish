(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/* ************************************************* */
/*                      LOGGING                      */
/* ************************************************* */

var Logging = function () {
    function Logging() {
        _classCallCheck(this, Logging);
    }

    _createClass(Logging, null, [{
        key: "success",
        value: function success(message) {
            console.log("%c " + message, 'color:seagreen; font-size:1.1em; font-weight:bold; border-left: solid 3px seagreen;');
        }
    }, {
        key: "message",
        value: function message(_message) {
            console.log("%c " + _message, 'color:#1E265C; font-size:1.1em; font-weight:bold; border-left: solid 3px #1E265C;');
        }
    }, {
        key: "error",
        value: function error(message) {
            console.log("%c " + message, 'color:red; font-size:1.1em; border-left: solid 3px red;');
        }
    }]);

    return Logging;
}();

exports.Logging = Logging;

},{}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoadManager_1 = require("./managers/LoadManager");
var ScreenManager_1 = require("./managers/ScreenManager");
var SplashScreen_1 = require("./screens/SplashScreen");
var MenuScreen_1 = require("./screens/MenuScreen");
var GameScreen_1 = require("./screens/GameScreen");
var EndScreen_1 = require("./screens/EndScreen");
var Functions_1 = require("./Functions");
var Sprites_1 = require("./ui/Sprites");
var IntermediaryScreen_1 = require("./screens/IntermediaryScreen");
var DataManager_1 = require("./managers/DataManager");

var Game = function () {
    function Game(canvasDiv) {
        var _this = this;

        _classCallCheck(this, Game);

        this._canvas = canvasDiv;
        this._canvas.width = Game.WIDTH;
        this._canvas.height = Game.HEIGHT;
        this._lastGameTime = -1;
        //set the scaling
        this._scaling = Game.HEIGHT / 1366;
        //start loading game assets
        new Promise(function (res, rej) {
            return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                //create the stage
                                console.log("Readying stage!");
                                this._stage = new createjs.StageGL(this._canvas, { antialias: true });
                                this._stage.setClearColor("#000000");
                                this._stage.enableMouseOver(10);
                                this._stage.update();
                                console.log(this._stage, this._canvas);
                                //listen to asset updates
                                this._stage.addEventListener(LoadManager_1.LoadManager.ASSETS_UPDATED, function (e) {
                                    console.log(LoadManager_1.LoadManager.Percentage);
                                });
                                //load assets
                                _context.next = 9;
                                return LoadManager_1.LoadManager.loadAssets("assets/manifest.json", this._stage).catch(function (err) {
                                    console.warn("Error loading assets:", err);
                                });

                            case 9:
                                Functions_1.Logging.success("Assets Loaded Successfully!");
                                //load level data
                                _context.next = 12;
                                return DataManager_1.DataManager.loadWorldsData("assets/data/levels.json").catch(function (err) {
                                    Functions_1.Logging.error(err);
                                    return;
                                });

                            case 12:
                                Functions_1.Logging.success("Level Data Loaded Successfully!");
                                //setup createjs.Sprites
                                _context.next = 15;
                                return Sprites_1.Sprites.setup();

                            case 15:
                                //build the screens
                                ScreenManager_1.ScreenManager.registerScreen("splash", new SplashScreen_1.SplashScreen());
                                ScreenManager_1.ScreenManager.registerScreen("menu", new MenuScreen_1.MenuScreen(this));
                                ScreenManager_1.ScreenManager.registerScreen("game", new GameScreen_1.GameScreen(this));
                                ScreenManager_1.ScreenManager.registerScreen("end", new EndScreen_1.EndScreen());
                                ScreenManager_1.ScreenManager.registerScreen("intermediary", new IntermediaryScreen_1.IntermediaryScreen(this));
                                //set the current screen
                                //game test, load desired level patch -- if autoloading to game screen
                                ScreenManager_1.ScreenManager.getScreenByKey("game").LevelData = DataManager_1.DataManager.getLevelDataByIndex(1);
                                ScreenManager_1.ScreenManager.setCurrentScreen("game", this._stage);
                                //setup the game loop
                                createjs.Ticker.framerate = Game.FRAME_RATE;
                                createjs.Ticker.on("tick", this.update, this);

                            case 24:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        });
    }
    /*--------------- METHODS ------------------------*/
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/


    _createClass(Game, [{
        key: "update",
        value: function update(e) {
            var gameTime = this._lastGameTime != -1 ? createjs.Ticker.getMeasuredFPS() - this._lastGameTime : 1;
            this._lastGameTime = createjs.Ticker.getMeasuredFPS();
            //update the screen
            if (ScreenManager_1.ScreenManager.CurrentScreen != null) ScreenManager_1.ScreenManager.CurrentScreen.update(gameTime);
            //update the stage
            this._stage.update();
        }
        /*--------------- OVERRIDES ----------------------*/
        /*--------------- GETTERS & SETTERS --------------*/

    }, {
        key: "StageWidth",
        get: function get() {
            return this._canvas.width;
        } //actual size

    }, {
        key: "StageHeight",
        get: function get() {
            return this._canvas.height;
        }
    }, {
        key: "Stage",
        get: function get() {
            return this._stage;
        }
    }, {
        key: "Scaling",
        get: function get() {
            return this._scaling;
        }
    }], [{
        key: "FRAME_RATE",
        get: function get() {
            return 30;
        }
    }, {
        key: "WIDTH",
        get: function get() {
            return document.body.clientHeight * 0.48;
        } //desired size

    }, {
        key: "HEIGHT",
        get: function get() {
            return document.body.clientHeight;
        }
    }]);

    return Game;
}();

exports.Game = Game;

},{"./Functions":1,"./managers/DataManager":8,"./managers/LoadManager":9,"./managers/ScreenManager":10,"./screens/EndScreen":11,"./screens/GameScreen":12,"./screens/IntermediaryScreen":13,"./screens/MenuScreen":14,"./screens/SplashScreen":16,"./ui/Sprites":17}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Functions_1 = require("./Functions");

var ObjectPool = function () {
    function ObjectPool() {
        _classCallCheck(this, ObjectPool);
    }

    _createClass(ObjectPool, null, [{
        key: "createPoolObject",

        /*--------------- METHODS ------------------------*/
        /**Creates a pool object. */
        value: function createPoolObject(obj, type) {
            var poolObj = {
                type: type,
                obj: obj,
                active: false
            };
            ObjectPool.Pool.push(poolObj);
            return poolObj;
        }
        /**Checks out a pool object.  Use POOL global function to access. */

    }, {
        key: "checkout",
        value: function checkout(type) {
            var poolObj = ObjectPool._getObjectByType(type);
            if (poolObj != null) {
                poolObj.active = true;
                return poolObj.obj;
            }
            return null;
        }
        /**Returns an object to the pool. */

    }, {
        key: "return",
        value: function _return(obj) {
            var poolObj = ObjectPool._getObjectByObj(obj);
            if (poolObj != null) {
                poolObj.active = false;
                return true;
            }
            return false;
        }
    }, {
        key: "_getObjectByType",
        value: function _getObjectByType(type) {
            var poolObj = ObjectPool._pool.find(function (o) {
                return o.type == type && !o.active;
            });
            if (poolObj == null) Functions_1.Logging.error("Object not found in pool, or pool is exhausted.  Return some objects.");
            return poolObj;
        }
    }, {
        key: "_getObjectByObj",
        value: function _getObjectByObj(obj) {
            return ObjectPool._pool.find(function (o) {
                return o.obj == obj;
            });
        }
        /*--------------- ABSTRACTS ----------------------*/
        /*--------------- EVENTS -------------------------*/
        /*--------------- OVERRIDES ----------------------*/
        /*--------------- GETTERS & SETTERS --------------*/

    }, {
        key: "Pool",
        get: function get() {
            if (ObjectPool._pool == null) ObjectPool._pool = [];
            return ObjectPool._pool;
        }
    }]);

    return ObjectPool;
}();

exports.ObjectPool = ObjectPool;

},{"./Functions":1}],4:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var Entity_1 = require("./Entity");
var LoadManager_1 = require("../managers/LoadManager");

var Cat = function (_Entity_1$Entity) {
    _inherits(Cat, _Entity_1$Entity);

    function Cat(gameScreen) {
        _classCallCheck(this, Cat);

        var _this = _possibleConstructorReturn(this, (Cat.__proto__ || Object.getPrototypeOf(Cat)).call(this, gameScreen, LoadManager_1.LoadManager.Spritesheets.Cat_Spritesheet));

        _this._speed = 3;
        _this._fishCaughtMultiplier = 0.05;
        _this._caughtFish = [];
        _this._isGrabbing = false;
        _this._isRising = false;
        _this._hasReachedSurface = true;
        _this._sprite.gotoAndPlay(Cat.ANIMATION.Idle);
        return _this;
    }
    /*--------------- METHODS ------------------------*/


    _createClass(Cat, [{
        key: "enable",
        value: function enable() {}
    }, {
        key: "disable",
        value: function disable() {}
        /***************/
        /*   ACTIONS   */
        /***************/

    }, {
        key: "grab",
        value: function grab() {
            var _this2 = this;

            //cannot grab if we are not at surface
            if (!this._hasReachedSurface) return;
            this._isGrabbing = true;
            this._hasReachedSurface = false;
            //move to x position
            this.X = this.GameScreen.Game.Stage.mouseX;
            console.log("START SPEED:", this.Speed);
            //grab to y position
            var speed = this.GameScreen.Game.Stage.mouseY / 2 * this.Speed;
            this._catYTween = createjs.Tween.get(this._sprite).to({ y: this.GameScreen.Game.Stage.mouseY }, speed, createjs.Ease.circIn).call(function () {
                //once the grab is done, turn off flag
                _this2._isGrabbing = false;
                //play animations
                _this2._sprite.gotoAndPlay(Cat.ANIMATION.Grab);
                //listen for animation to finish
                _this2._sprite.on("animationend", function () {
                    _this2._sprite.gotoAndPlay(Cat.ANIMATION.Hold);
                }, true);
                //try to grab a fish
                var fishes = _this2.GameScreen.tryToGrabFishes(_this2.X, _this2.Y);
                //see if a fish was grabbed
                if (fishes.length > 0) _this2.caught(fishes);else _this2.returnToSurface();
            });
        }
        /**
         * Called to return cat to surface.
         */

    }, {
        key: "returnToSurface",
        value: function returnToSurface() {
            var _this3 = this;

            this._sprite.gotoAndPlay(Cat.ANIMATION.Idle);
            //remove any lingering tweens
            createjs.Tween.removeTweens(this._sprite);
            var speed = this.Y / 2 * this.Speed;
            this._catYTween = createjs.Tween.get(this._sprite).wait(150).to({ y: 20 }, speed, createjs.Ease.linear).call(function () {
                //once the surface has been reached, allow x movement again
                _this3.reachSurface();
            });
        }
    }, {
        key: "caught",
        value: function caught(fishes) {
            var _this4 = this;

            console.log("I CAUGHT");
            if (fishes.length <= 0) return;
            this._isRising = true;
            var hasNewFish = false;
            fishes.forEach(function (f) {
                if (_this4._caughtFish.indexOf(f) != -1) return;
                hasNewFish = true;
                //grab the fish
                f.catch();
                //add fish to caught array
                _this4._caughtFish.push(f);
                //control the fish
                f.Y = _this4.Y;
            });
            console.log("I WAS CAUGHT, NOW RISING");
            console.log("FISH CAUGHT SPEED:", this.Speed);
            if (!hasNewFish) return;
            //if we grabbed a fish...
            //go back up... slowly
            createjs.Tween.removeTweens(this._sprite);
            var speed = this.Y * this.Speed;
            this._catYTween = createjs.Tween.get(this._sprite).wait(250).to({ y: -20 }, speed, createjs.Ease.linear).call(function () {
                //once the surface has been reached, allow x movement again
                _this4.reachSurface();
                _this4._isRising = false;
            });
        }
    }, {
        key: "drop",
        value: function drop() {
            //release the fish
            // this._caughtFish.dropped();
            this._caughtFish = [];
            //return quickly
            this.returnToSurface();
        }
        /**Called when hit by an enemy. */

    }, {
        key: "injure",
        value: function injure(enemy) {
            var _this5 = this;

            //start hurt animation
            //end any current tweening
            createjs.Tween.removeTweens(this._sprite);
            this._sprite.gotoAndPlay(Cat.ANIMATION.Ow);
            this._catYTween = createjs.Tween.get(this._sprite).wait(30).to({ y: 20 }, 1000, createjs.Ease.linear).call(function () {
                //once the surface has been reached, allow x movement again
                _this5.reachSurface();
                _this5._sprite.gotoAndPlay(Cat.ANIMATION.Idle);
            });
        }
    }, {
        key: "reachSurface",
        value: function reachSurface() {
            var _this6 = this;

            //if we have a fish, send to main logic
            if (this._caughtFish != null) {
                this._caughtFish.forEach(function (f) {
                    _this6.GameScreen.collectFish(f);
                });
                this._caughtFish = [];
            }
            this._hasReachedSurface = true;
        }
        /*--------------- ABSTRACTS ----------------------*/
        /*--------------- EVENTS -------------------------*/
        /*--------------- OVERRIDES ----------------------*/

    }, {
        key: "update",
        value: function update(gameTime) {
            var _this7 = this;

            _get(Cat.prototype.__proto__ || Object.getPrototypeOf(Cat.prototype), "update", this).call(this, gameTime);
            //if we are rising, attempt to catch more fish
            if (this._isRising) {
                console.log("TRY TO GRAB");
                //try to grab a fish
                var fishes = this.GameScreen.tryToGrabFishes(this.X, this.Y);
                //see if a fish was grabbed
                if (fishes.length > 0) this.caught(fishes);
            }
            //drag fish with us if we have any
            if (this._caughtFish != null) {
                this._caughtFish.forEach(function (f) {
                    f.Y = _this7.Y - 20;
                });
            }
        }
        /*--------------- GETTERS & SETTERS --------------*/

    }, {
        key: "Speed",
        get: function get() {
            var caughtFishMult = this._caughtFish.length > 0 ? 1 + (this._caughtFish.length + this._fishCaughtMultiplier) : 1;
            console.log(caughtFishMult);
            return caughtFishMult * this._speed;
        },
        set: function set(value) {
            this._speed = value;
        }
    }], [{
        key: "GRAB_RANGE",
        get: function get() {
            return 120;
        }
    }, {
        key: "ANIMATION",
        get: function get() {
            return Object.freeze({
                "Idle": "cat_idle",
                "Death": "cat_death",
                "Grab": "cat_grab",
                "Hold": "cat_grab_hold",
                "Ow": "cat_ow"
            });
        }
    }]);

    return Cat;
}(Entity_1.Entity);

exports.Cat = Cat;

},{"../managers/LoadManager":9,"./Entity":5}],5:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var Entity = function () {
    function Entity(gameScreen, spritesheet) {
        _classCallCheck(this, Entity);

        this._gameScreen = gameScreen;
        this._sprite = new createjs.Sprite(spritesheet);
        this._direction = { x: 1, y: 1 };
        this._isIgnoringCollision = false;
        this._ignoreCollisionTimer = 0;
        //get the game scale
        this._scaling = this._gameScreen.Game.Scaling;
    }
    /*--------------- METHODS ------------------------*/


    _createClass(Entity, [{
        key: "create",
        value: function create(container) {
            this._sprite.scale = this._scaling;
            //move to main container
            if (container == null) this._gameScreen.Game.Stage.addChild(this._sprite);else container.addChild(this._sprite);
            return this;
        }
    }, {
        key: "destroy",
        value: function destroy() {
            if (this._sprite == null || this._sprite.parent == null) return null;
            //remove from main container
            this._sprite.parent.removeChild(this._sprite);
            return this;
        }
    }, {
        key: "update",
        value: function update(gameTime) {
            //listen for collision ignore
            if (this._isIgnoringCollision) {
                this._ignoreCollisionTimer++;
                if (this._ignoreCollisionTimer > Entity.IGNORE_COLLISION) this._isIgnoringCollision = false;
            }
        }
    }, {
        key: "startIgnoreCollision",
        value: function startIgnoreCollision() {
            this._isIgnoringCollision = true;
        }
    }, {
        key: "testStageBounds",
        value: function testStageBounds() {
            var artificialReg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var reg = { x: this._sprite.regX, y: this._sprite.regY };
            if (artificialReg != null) {
                reg = {
                    x: this._direction.x > 0 ? this.Bounds.Width * artificialReg.x : this.Bounds.Width * (1 - artificialReg.x),
                    y: this._direction.y > 0 ? this.Bounds.Height * artificialReg.y : this.Bounds.Height * (1 - artificialReg.y)
                };
            }
            // const bounds = { width:this._game.StageWidth, height: this._game.StageHeight };
            var bounds = { width: this._gameScreen.Game.StageWidth, height: this._gameScreen.Game.StageHeight };
            var extents = {
                x: this._direction.x > 0 ? this.Bounds.Width - reg.x : -reg.x,
                y: this._direction.y > 0 ? this.Bounds.Height - reg.y : -reg.y
            };
            //test walls
            if (this.X + extents.x > bounds.width) return Entity.HIT.Right;else if (this.X + extents.x < 0) return Entity.HIT.Left;
        }
        /*--------------- ABSTRACTS ----------------------*/
        /*--------------- EVENTS -------------------------*/
        /*--------------- OVERRIDES ----------------------*/
        /*--------------- GETTERS & SETTERS --------------*/

    }, {
        key: "GameScreen",
        get: function get() {
            return this._gameScreen;
        }
    }, {
        key: "Sprite",
        get: function get() {
            return this._sprite;
        }
    }, {
        key: "Parent",
        get: function get() {
            return this._sprite.parent;
        }
    }, {
        key: "X",
        get: function get() {
            return this._sprite.x;
        },
        set: function set(value) {
            this._sprite.x = value;
        }
    }, {
        key: "Y",
        get: function get() {
            return this._sprite.y;
        },
        set: function set(value) {
            this._sprite.y = value;
        }
    }, {
        key: "DirectionX",
        set: function set(value) {
            var lastX = this._direction.x;
            this._direction.x = value;
            //flip sprite if our direction has changed
            if (this._direction.x != lastX) this._sprite.scaleX *= -1;
        }
    }, {
        key: "Bounds",
        get: function get() {
            var bounds = this._sprite.getBounds();
            return { Width: bounds.width, Height: bounds.height };
        }
    }, {
        key: "IsIgnoringCollision",
        get: function get() {
            return this._isIgnoringCollision;
        }
    }], [{
        key: "IGNORE_COLLISION",
        get: function get() {
            return 20;
        }
    }, {
        key: "HIT",
        get: function get() {
            return Object.freeze({ Top: 0, Right: 1, Bottom: 2, Left: 3 });
        }
    }]);

    return Entity;
}();

exports.Entity = Entity;

},{}],6:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var Entity_1 = require("./Entity");
var LoadManager_1 = require("../managers/LoadManager");
var Functions_1 = require("../Functions");

var Fish = function (_Entity_1$Entity) {
    _inherits(Fish, _Entity_1$Entity);

    function Fish(gameScreen) {
        _classCallCheck(this, Fish);

        var _this = _possibleConstructorReturn(this, (Fish.__proto__ || Object.getPrototypeOf(Fish)).call(this, gameScreen, LoadManager_1.LoadManager.Spritesheets.Fish_Spritesheet));

        _this._speed = 1;
        _this._isCaught = false;
        _this._sprite.gotoAndPlay(Fish.ANIMATION.Slow);
        return _this;
    }
    /*--------------- METHODS ------------------------*/
    /***************/
    /*   ACTIONS   */
    /***************/


    _createClass(Fish, [{
        key: "setNaturalY",
        value: function setNaturalY() {
            this._naturalY = this.Y;
        }
    }, {
        key: "catch",
        value: function _catch() {
            if (this._isCaught) return;
            Functions_1.Logging.message("Fish was grabbed!");
            this._isCaught = true;
            this._sprite.gotoAndPlay(Fish.ANIMATION.Panic);
        }
        /**Test to see if global position hits sprite. */

    }, {
        key: "testHit",
        value: function testHit(x, y) {
            return this._sprite.hitTest(x, y);
        }
        /*--------------- ABSTRACTS ----------------------*/
        /*--------------- EVENTS -------------------------*/
        /*--------------- OVERRIDES ----------------------*/

    }, {
        key: "destroy",
        value: function destroy() {
            this.disable();
            return _get(Fish.prototype.__proto__ || Object.getPrototypeOf(Fish.prototype), "destroy", this).call(this);
        }
    }, {
        key: "update",
        value: function update(gameTime) {
            _get(Fish.prototype.__proto__ || Object.getPrototypeOf(Fish.prototype), "update", this).call(this, gameTime);
            //move the fishy
            if (!this._isCaught) this.X += this._speed * gameTime * this._direction.x;
            //test collision
            if (!this.IsIgnoringCollision) {
                //if fish hits the edge, flip direction
                var hit = this.testStageBounds({ x: 0.5, y: 0.5 });
                switch (hit) {
                    case Entity_1.Entity.HIT.Right:
                        this._direction.x *= -1;
                        this._sprite.scaleX *= -1;
                        this.startIgnoreCollision();
                        this.X -= 5 - this.Bounds.Width;
                        break;
                    case Entity_1.Entity.HIT.Left:
                        this._direction.x *= -1;
                        this._sprite.scaleX *= -1;
                        this.startIgnoreCollision();
                        this.X += 5 - this.Bounds.Width;
                        break;
                }
            }
        }
    }, {
        key: "enable",
        value: function enable() {}
    }, {
        key: "disable",
        value: function disable() {}
        /*--------------- GETTERS & SETTERS --------------*/

    }, {
        key: "Speed",
        get: function get() {
            return this._speed;
        },
        set: function set(value) {
            this._speed = value;
        }
    }], [{
        key: "ANIMATION",
        get: function get() {
            return Object.freeze({
                "Slow": "fish_swim_slow",
                "Fast": "fish_swim_fast",
                "Panic": "fish_swim_panic"
            });
        }
    }]);

    return Fish;
}(Entity_1.Entity);

exports.Fish = Fish;

},{"../Functions":1,"../managers/LoadManager":9,"./Entity":5}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("./Game");
document.addEventListener("DOMContentLoaded", function () {
    var game = new Game_1.Game(document.getElementById("game-canvas"));
});

},{"./Game":2}],8:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });

var DataManager = function () {
    function DataManager() {
        _classCallCheck(this, DataManager);
    }

    _createClass(DataManager, null, [{
        key: "loadWorldsData",

        /*--------------- METHODS ------------------------*/
        /**Loads in the worlds data! */
        value: function loadWorldsData(fileLocation) {
            var _this = this;

            return new Promise(function (res, rej) {
                return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    var _this2 = this;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return fetch(fileLocation).then(function (blob) {
                                        return blob.json();
                                    }).then(function (json) {
                                        _this2._worldsData = json;
                                        res(_this2._worldsData);
                                    }).catch(function (err) {
                                        rej("Could not load world data! " + err);
                                    });

                                case 2:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));
            });
        }
        /**Returns the level data received by the given index. */

    }, {
        key: "getLevelDataByIndex",
        value: function getLevelDataByIndex(index) {
            //flatten level data, and get data
            var flatten = [].concat.apply([], DataManager._worldsData.worlds);
            return flatten[index];
        }
        /*--------------- ABSTRACTS ----------------------*/
        /*--------------- EVENTS -------------------------*/
        /*--------------- OVERRIDES ----------------------*/
        /*--------------- GETTERS & SETTERS --------------*/

    }, {
        key: "WorldsData",
        get: function get() {
            return DataManager._worldsData;
        }
    }]);

    return DataManager;
}();

exports.DataManager = DataManager;

},{}],9:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });

var LoadManager = function () {
    function LoadManager() {
        _classCallCheck(this, LoadManager);
    }

    _createClass(LoadManager, null, [{
        key: "reset",

        /*--------------- METHODS ------------------------*/
        value: function reset() {
            LoadManager._sheetsTotal = 0;
            LoadManager._sheetsLoaded = 0;
            LoadManager._percentage = 0;
            LoadManager._totalAssetsLoaded = 0;
            LoadManager._totalAssets = 0;
        }
    }, {
        key: "loadAssets",
        value: function loadAssets(src, stage) {
            var _this = this;

            LoadManager.reset();
            LoadManager._stage = stage;
            return new Promise(function (res, rej) {
                return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    LoadManager._preloadManager = new createjs.LoadQueue();
                                    //setup sound controllers
                                    createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashAudioPlugin]);
                                    createjs.Sound.alternateExtensions = ["mp3", "wav"];
                                    LoadManager._preloadManager.installPlugin(createjs.Sound);
                                    //setup listeners
                                    LoadManager._preloadManager.on("fileload", LoadManager._onLoaded, LoadManager);
                                    LoadManager._preloadManager.on("complete", LoadManager._onComplete, LoadManager);
                                    LoadManager._preloadManager.on("error", LoadManager._onError, LoadManager);
                                    //get the manifest
                                    fetch(src).then(function (blob) {
                                        return blob.json();
                                    }).then(function (data) {
                                        //load the manifest
                                        LoadManager._preloadManager.setMaxConnections(1);
                                        LoadManager._preloadManager.loadManifest(data);
                                        LoadManager._stage.addEventListener(LoadManager.ASSETS_LOADED, function () {
                                            res();
                                        });
                                    }).catch(function () {
                                        LoadManager.emitErrorEvent();
                                        rej("Could not load assets!");
                                    });

                                case 8:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));
            });
        }
    }, {
        key: "emitLoadedEvent",
        value: function emitLoadedEvent() {
            if (LoadManager._stage != null) LoadManager._stage.dispatchEvent(LoadManager.AssetsLoadedEvent);
        }
    }, {
        key: "emitErrorEvent",
        value: function emitErrorEvent() {
            if (LoadManager._stage != null) LoadManager._stage.dispatchEvent(LoadManager.AssetsFailedEvent);
        }
    }, {
        key: "emitUpdatedEvent",
        value: function emitUpdatedEvent() {
            LoadManager._percentage = parseFloat((LoadManager._preloadManager.getItems(true).length / LoadManager._preloadManager.getItems(false).length).toFixed(2));
            if (LoadManager._stage != null) LoadManager._stage.dispatchEvent(LoadManager.AssetsUpdatedEvent);
        }
    }, {
        key: "_loadedSheet",
        value: function _loadedSheet(name, sheet) {
            LoadManager.Spritesheets[name] = sheet;
            LoadManager._sheetsLoaded++;
        }
        /*--------------- ABSTRACTS ----------------------*/
        /*--------------- EVENTS -------------------------*/

    }, {
        key: "_onLoaded",
        value: function _onLoaded(e) {
            console.log("asset loaded: " + e.item.src + " type: " + e.item.type);
            switch (e.item.type) {
                case createjs.Types.JAVASCRIPT:
                    {
                        //load the spritesheet
                        LoadManager._sheetsTotal++;
                        var sheet = window[e.item.id]._SpriteSheet;
                        // listen for spritesheet to load
                        if (!sheet.complete) {
                            sheet.on("complete", function (ev) {
                                LoadManager._loadedSheet(e.item.id, sheet);
                                ev.remove();
                            });
                        } else LoadManager._loadedSheet(e.item.id, sheet);
                        break;
                    }
                case createjs.Types.IMAGE:
                    {
                        //build the bitmap
                        LoadManager.Images[e.item.id] = new createjs.Bitmap(e.item.src);
                    }
            }
            //update event
            LoadManager.emitUpdatedEvent();
        }
    }, {
        key: "_onComplete",
        value: function _onComplete(e) {
            //remove all preLoadManager events
            LoadManager._preloadManager.removeAllEventListeners();
            //make sure all spritesheets are loaded
            if (LoadManager._sheetsLoaded < LoadManager._sheetsTotal) {
                var loadInterval = setInterval(function (ev) {
                    //see if they are loaded
                    if (LoadManager._sheetsLoaded >= LoadManager._sheetsTotal) {
                        e.remove();
                        // window.clearInterval(loadInterval);
                        LoadManager.emitLoadedEvent();
                    }
                }, 100);
            } else LoadManager.emitLoadedEvent();
        }
    }, {
        key: "_onError",
        value: function _onError(e) {
            LoadManager.emitErrorEvent();
        }
        /*--------------- OVERRIDES ----------------------*/
        /*--------------- GETTERS & SETTERS --------------*/

    }, {
        key: "ASSETS_LOADED",
        get: function get() {
            return "onAssetsLoaded";
        }
    }, {
        key: "ASSETS_FAILED",
        get: function get() {
            return "onAssetsFailed";
        }
    }, {
        key: "ASSETS_UPDATED",
        get: function get() {
            return "onAssetsUpdated";
        }
    }, {
        key: "Percentage",
        get: function get() {
            return LoadManager._percentage;
        }
    }]);

    return LoadManager;
}();

LoadManager.Spritesheets = {};
LoadManager.Images = {};
LoadManager._sheetsTotal = 0;
LoadManager._sheetsLoaded = 0;
LoadManager._percentage = 0;
LoadManager._totalAssetsLoaded = 0;
LoadManager._totalAssets = 0;
LoadManager.AssetsLoadedEvent = new createjs.Event(LoadManager.ASSETS_LOADED, false, true);
LoadManager.AssetsFailedEvent = new createjs.Event(LoadManager.ASSETS_FAILED, false, true);
LoadManager.AssetsUpdatedEvent = new createjs.Event(LoadManager.ASSETS_UPDATED, false, true);
exports.LoadManager = LoadManager;

},{}],10:[function(require,module,exports){
"use strict";

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var Screen_1 = require("../screens/Screen");

var ScreenManager = function () {
    function ScreenManager() {
        _classCallCheck(this, ScreenManager);
    }

    _createClass(ScreenManager, null, [{
        key: "registerScreen",

        /*--------------- METHODS ------------------------*/
        /**Registers a screen into the Screen Manager.  Uses a key to associate it. */
        value: function registerScreen(key, screen) {
            //if we don't have this screen, add it
            if (ScreenManager._screensLookup[key] == null) ScreenManager._screensLookup[key] = screen;
        }
        /**Unregisters a screen from the Screen Manager. */

    }, {
        key: "unregisterScreen",
        value: function unregisterScreen(key) {
            if (ScreenManager._screensLookup[key] == null) return false;
            ScreenManager._screensLookup[key] = null;
            delete ScreenManager._screensLookup[key];
            return true;
        }
        /**Sets the current screen.  Can be done with the screen itself or an associative key. */

    }, {
        key: "setCurrentScreen",
        value: function setCurrentScreen(screen, stage) {
            var _this = this;

            var tempScreen = null;
            if (screen instanceof Screen_1.Screen) tempScreen = screen;else tempScreen = ScreenManager._screensLookup[screen];
            //if we did not find a screen, do not follow through
            if (tempScreen == null) return Promise.resolve();
            var promises = [];
            //if we have a previous screen, wait for it to fade out
            if (ScreenManager._currentScreen != null) promises.push(new Promise(function (res) {
                return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    //fade out
                                    createjs.Tween.get(ScreenManager._currentScreen.Container).to({ alpha: 0 }, 500, createjs.Ease.linear).call(function () {
                                        ScreenManager._currentScreen.destroy();
                                        res();
                                    });

                                case 1:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));
            }));
            //wait for certain actions to finish
            return new Promise(function (res) {
                return __awaiter(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                    var lastScreen;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.next = 2;
                                    return Promise.all(promises);

                                case 2:
                                    //now add in the new one
                                    lastScreen = Screen_1.Screen._cur;

                                    ScreenManager._currentScreen = tempScreen;
                                    ScreenManager._currentScreen.create(stage);
                                    ScreenManager._currentScreen.Container.alpha = 0;
                                    ScreenManager._currentScreen.disable(); //disable until ready
                                    console.log("FADE IN");
                                    //fade in
                                    createjs.Tween.get(ScreenManager._currentScreen.Container).to({ alpha: 1 }, 1200, createjs.Ease.linear).call(function () {
                                        console.log("DONE");
                                        ScreenManager._currentScreen.enable();
                                        res();
                                    });

                                case 9:
                                case "end":
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this);
                }));
            });
        }
    }, {
        key: "getScreenByKey",
        value: function getScreenByKey(key) {
            return ScreenManager._screensLookup[key];
        }
        /*--------------- ABSTRACTS ----------------------*/
        /*--------------- EVENTS -------------------------*/
        /*--------------- OVERRIDES ----------------------*/
        /*--------------- GETTERS & SETTERS --------------*/

    }, {
        key: "AllScreens",
        get: function get() {
            return ScreenManager._screensLookup;
        }
    }, {
        key: "CurrentScreen",
        get: function get() {
            return ScreenManager._currentScreen;
        }
    }]);

    return ScreenManager;
}();

ScreenManager._screensLookup = {};
ScreenManager._currentScreen = null;
exports.ScreenManager = ScreenManager;

},{"../screens/Screen":15}],11:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var Screen_1 = require("./Screen");
var ScreenManager_1 = require("../managers/ScreenManager");
var Container_1 = require("../ui/display/Container");
var Sprites_1 = require("../ui/Sprites");
var LoadManager_1 = require("../managers/LoadManager");

var EndScreen = function (_Screen_1$Screen) {
    _inherits(EndScreen, _Screen_1$Screen);

    function EndScreen() {
        _classCallCheck(this, EndScreen);

        //setup main container
        var _this = _possibleConstructorReturn(this, (EndScreen.__proto__ || Object.getPrototypeOf(EndScreen)).call(this));

        _this._mainContainer = new Container_1.Container();
        _this._mainContainer.addMany({
            txtScoreStatic: Sprites_1.Sprites.generateBitmapText("Score", LoadManager_1.LoadManager.Spritesheets.Typography),
            txtScore: Sprites_1.Sprites.generateBitmapText("0", LoadManager_1.LoadManager.Spritesheets.Typography),
            logo: Sprites_1.Sprites.Backgrounds.Logo,
            btnMainMenu: Sprites_1.Sprites.Buttons.NewGame,
            btnNext: Sprites_1.Sprites.Buttons.Options
        });
        return _this;
    }
    /*--------------- METHODS ------------------------*/
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/


    _createClass(EndScreen, [{
        key: "create",
        value: function create(stage) {
            //set the score
            this._mainContainer.Sprites['txtScore'] = Sprites_1.Sprites.generateBitmapText("9999", LoadManager_1.LoadManager.Spritesheets.Typography);
            //add in the containers
            this._mainContainer.checkoutSprites();
            this._container.addChild(this._mainContainer.Container);
            //for testing
            this._container.on("click", function (e) {
                ScreenManager_1.ScreenManager.setCurrentScreen("menu", stage);
            }, this, true);
            return _get(EndScreen.prototype.__proto__ || Object.getPrototypeOf(EndScreen.prototype), "create", this).call(this, stage);
        }
    }]);

    return EndScreen;
}(Screen_1.Screen);

exports.EndScreen = EndScreen;

},{"../managers/LoadManager":9,"../managers/ScreenManager":10,"../ui/Sprites":17,"../ui/display/Container":19,"./Screen":15}],12:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var Screen_1 = require("./Screen");
var ScreenManager_1 = require("../managers/ScreenManager");
var ObjectPool_1 = require("../ObjectPool");
var Fish_1 = require("../entities/Fish");
var Cat_1 = require("../entities/Cat");
var Container_1 = require("../ui/display/Container");
var Sprites_1 = require("../ui/Sprites");
var Functions_1 = require("../Functions");
var LoadManager_1 = require("../managers/LoadManager");

var GameScreen = function (_Screen_1$Screen) {
    _inherits(GameScreen, _Screen_1$Screen);

    function GameScreen(game) {
        _classCallCheck(this, GameScreen);

        var _this = _possibleConstructorReturn(this, (GameScreen.__proto__ || Object.getPrototypeOf(GameScreen)).call(this));

        _this._game = game;
        _this._fishes = [];
        _this._remainingFish = -1;
        _this._levelData = null;
        //create object pool
        ObjectPool_1.ObjectPool.createPoolObject(new Cat_1.Cat(_this), POOL.CAT);
        for (var i = 0; i < 120; i++) {
            ObjectPool_1.ObjectPool.createPoolObject(new Fish_1.Fish(_this), POOL.FISH);
        }
        // for(let i = 0; i < 30; i++) {
        //     ObjectPool.createPoolObject(new Puffer(this._game), POOL.PUFFERFISH)
        // }
        //pool out static kitty
        _this._cat = ObjectPool_1.ObjectPool.checkout(POOL.CAT);
        //create containers
        _this._staticContainer = new Container_1.Container();
        _this._staticContainer.addMany({
            bg: Sprites_1.Sprites.Backgrounds.BG
        });
        _this._fishContainer = new createjs.Container();
        _this._winContainer = new createjs.Container();
        return _this;
    }
    /*--------------- METHODS ------------------------*/
    /**Attempts to grab a fish.  Returns any fish that are touching the global position. */


    _createClass(GameScreen, [{
        key: "tryToGrabFishes",
        value: function tryToGrabFishes(x, y) {
            var fishes = [];
            //see if any fish is grabbable at these coords and return if so
            //for each fish, test the distance and return if close
            for (var i = 0; i < this._fishes.length; i++) {
                var fish = this._fishes[i];
                var localPos = fish.Sprite.globalToLocal(x, y);
                var hitFish = fish.testHit(localPos.x, localPos.y);
                if (hitFish) {
                    fishes.push(fish);
                }
            }
            //if no fish was caught, return null
            return fishes;
        }
    }, {
        key: "collectFish",
        value: function collectFish(fish) {
            //get fish
            Functions_1.Logging.success("GOT FISH!");
            var killedFish = fish.destroy();
            //decrement fish counter -- make sure we didn't make an error
            if (killedFish != null) {
                this._remainingFish--;
                //if all our fish are gone, end the game!
                if (this._remainingFish <= 0) {
                    //win game!
                    Functions_1.Logging.success("GAME IS OVER!");
                    this.win();
                }
            }
        }
    }, {
        key: "win",
        value: function win() {
            var _this2 = this;

            this.disable();
            //show win banner
            createjs.Tween.get(this._winContainer).to({ y: this._game.StageHeight / 2 - 25 }, 600, createjs.Ease.elasticOut).wait(2000).call(function () {
                //transition to end screen
                ScreenManager_1.ScreenManager.setCurrentScreen("end", _this2._game.Stage);
                // ScreenManager.setCurrentScreen("menu", this._game.Stage);
            });
        }
        /*--------------- ABSTRACTS ----------------------*/
        /*--------------- EVENTS -------------------------*/
        /*--------------- OVERRIDES ----------------------*/

    }, {
        key: "create",
        value: function create(stage) {
            _get(GameScreen.prototype.__proto__ || Object.getPrototypeOf(GameScreen.prototype), "create", this).call(this, stage);
            //add stuff
            this._staticContainer.checkoutSprites();
            this._staticContainer.Sprites.bg.y = 0;
            this._container.addChild(this._staticContainer.Container);
            this._container.addChild(this._fishContainer);
            //add conditional text
            this._winBanner = new createjs.Shape();
            this._winBanner.graphics.beginFill("black");
            this._winBanner.graphics.drawRect(0, 0, this._game.StageWidth, 50);
            this._winBanner.cache(0, 0, this._game.StageWidth, 50);
            this._winContainer.addChild(this._winBanner);
            this._winText = Sprites_1.Sprites.generateBitmapText("Win!", LoadManager_1.LoadManager.Spritesheets.TypographyWhite);
            this._winContainer.addChild(this._winText);
            this._winText.x = this._game.StageWidth / 2 - this._winText.getBounds().width / 2;
            this._container.addChild(this._winContainer);
            this._winContainer.y = this._game.StageHeight + 50;
            this._winContainer.mouseEnabled = false;
            this._cat.create(this._container);
            //add level data if it exists
            if (this._levelData != null) {
                //load in critters
                for (var i = 0; i < this._levelData.data.length; i++) {
                    var data = this._levelData.data[i];
                    switch (data.id) {
                        case POOL.FISH:
                            var fish = ObjectPool_1.ObjectPool.checkout(POOL.FISH);
                            fish.create(this._fishContainer);
                            if (data.speed != null) fish.Speed = data.speed; //set variables
                            if (data.x != null) fish.X = data.x;
                            if (data.y != null) fish.Y = data.y;
                            if (data.flip != null && data.flip) fish.DirectionX = -1;
                            fish.setNaturalY();
                            this._fishes.push(fish);
                            break;
                    }
                }
                //set fish total
                this._remainingFish = this._fishes.length;
            }
            return null;
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this._cat.destroy();
            this._fishes.forEach(function (f) {
                return f.destroy();
            });
            this._fishContainer.removeAllChildren();
            this._fishes = [];
            return _get(GameScreen.prototype.__proto__ || Object.getPrototypeOf(GameScreen.prototype), "destroy", this).call(this);
        }
    }, {
        key: "update",
        value: function update(gameTime) {
            var normalizedTime = Math.min(1, gameTime) + 0.5;
            //update entities
            this._fishes.forEach(function (fish) {
                fish.update(normalizedTime);
            });
            this._cat.update(normalizedTime);
            _get(GameScreen.prototype.__proto__ || Object.getPrototypeOf(GameScreen.prototype), "update", this).call(this, gameTime);
        }
    }, {
        key: "enable",
        value: function enable() {
            this._container.on("click", this._cat.grab, this._cat);
        }
    }, {
        key: "disable",
        value: function disable() {
            this._container.removeAllEventListeners();
        }
        /*--------------- GETTERS & SETTERS --------------*/

    }, {
        key: "Game",
        get: function get() {
            return this._game;
        }
    }, {
        key: "LevelData",
        set: function set(data) {
            this._levelData = data;
        }
    }]);

    return GameScreen;
}(Screen_1.Screen);

exports.GameScreen = GameScreen;

var POOL = function () {
    function POOL() {
        _classCallCheck(this, POOL);
    }

    _createClass(POOL, null, [{
        key: "CAT",
        get: function get() {
            return "cat";
        }
    }, {
        key: "FISH",
        get: function get() {
            return "fish";
        }
    }, {
        key: "PUFFERFISH",
        get: function get() {
            return "puffer";
        }
    }]);

    return POOL;
}();

exports.POOL = POOL;

},{"../Functions":1,"../ObjectPool":3,"../entities/Cat":4,"../entities/Fish":6,"../managers/LoadManager":9,"../managers/ScreenManager":10,"../ui/Sprites":17,"../ui/display/Container":19,"./Screen":15}],13:[function(require,module,exports){
"use strict";

var _typeof41 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof40 = typeof Symbol === "function" && _typeof41(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof41(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof41(obj);
};

var _typeof39 = typeof Symbol === "function" && _typeof40(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof40(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof40(obj);
};

var _typeof38 = typeof Symbol === "function" && _typeof39(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof39(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof39(obj);
};

var _typeof37 = typeof Symbol === "function" && _typeof38(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof38(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof38(obj);
};

var _typeof36 = typeof Symbol === "function" && _typeof37(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof37(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof37(obj);
};

var _typeof35 = typeof Symbol === "function" && _typeof36(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof36(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof36(obj);
};

var _typeof34 = typeof Symbol === "function" && _typeof35(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof35(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof35(obj);
};

var _typeof33 = typeof Symbol === "function" && _typeof34(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof34(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof34(obj);
};

var _typeof32 = typeof Symbol === "function" && _typeof33(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof33(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof33(obj);
};

var _typeof31 = typeof Symbol === "function" && _typeof32(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof32(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof32(obj);
};

var _typeof30 = typeof Symbol === "function" && _typeof31(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof31(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof31(obj);
};

var _typeof29 = typeof Symbol === "function" && _typeof30(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof30(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof30(obj);
};

var _typeof28 = typeof Symbol === "function" && _typeof29(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof29(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof29(obj);
};

var _typeof27 = typeof Symbol === "function" && _typeof28(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof28(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof28(obj);
};

var _typeof26 = typeof Symbol === "function" && _typeof27(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof27(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof27(obj);
};

var _typeof25 = typeof Symbol === "function" && _typeof26(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof26(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof26(obj);
};

var _typeof24 = typeof Symbol === "function" && _typeof25(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof25(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof25(obj);
};

var _typeof23 = typeof Symbol === "function" && _typeof24(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof24(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof24(obj);
};

var _typeof22 = typeof Symbol === "function" && _typeof23(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof23(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof23(obj);
};

var _typeof21 = typeof Symbol === "function" && _typeof22(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof22(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof22(obj);
};

var _typeof20 = typeof Symbol === "function" && _typeof21(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof21(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof21(obj);
};

var _typeof19 = typeof Symbol === "function" && _typeof20(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof20(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof20(obj);
};

var _typeof18 = typeof Symbol === "function" && _typeof19(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof19(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof19(obj);
};

var _typeof17 = typeof Symbol === "function" && _typeof18(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof18(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof18(obj);
};

var _typeof16 = typeof Symbol === "function" && _typeof17(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof17(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof17(obj);
};

var _typeof15 = typeof Symbol === "function" && _typeof16(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof16(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof16(obj);
};

var _typeof14 = typeof Symbol === "function" && _typeof15(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof15(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof15(obj);
};

var _typeof13 = typeof Symbol === "function" && _typeof14(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof14(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof14(obj);
};

var _typeof12 = typeof Symbol === "function" && _typeof13(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof13(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof13(obj);
};

var _typeof11 = typeof Symbol === "function" && _typeof12(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof12(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof12(obj);
};

var _typeof10 = typeof Symbol === "function" && _typeof11(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof11(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof11(obj);
};

var _typeof9 = typeof Symbol === "function" && _typeof10(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof10(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof10(obj);
};

var _typeof8 = typeof Symbol === "function" && _typeof9(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof9(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof9(obj);
};

var _typeof7 = typeof Symbol === "function" && _typeof8(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof8(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof8(obj);
};

var _typeof6 = typeof Symbol === "function" && _typeof7(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof7(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof7(obj);
};

var _typeof5 = typeof Symbol === "function" && _typeof6(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof6(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof6(obj);
};

var _typeof4 = typeof Symbol === "function" && _typeof5(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof5(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof5(obj);
};

var _typeof3 = typeof Symbol === "function" && _typeof4(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof4(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof4(obj);
};

var _typeof2 = typeof Symbol === "function" && _typeof3(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof3(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof3(obj);
};

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if ("value" in desc) {
        return desc.value;
    } else {
        var getter = desc.get;if (getter === undefined) {
            return undefined;
        }return getter.call(receiver);
    }
};

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

Object.defineProperty(exports, "__esModule", { value: true });
var Screen_1 = require("./Screen");
var ScreenManager_1 = require("../managers/ScreenManager");
var Sprites_1 = require("../ui/Sprites");
var LoadManager_1 = require("../managers/LoadManager");

var IntermediaryScreen = function (_Screen_1$Screen) {
    _inherits(IntermediaryScreen, _Screen_1$Screen);

    function IntermediaryScreen(game) {
        _classCallCheck(this, IntermediaryScreen);

        var _this = _possibleConstructorReturn(this, (IntermediaryScreen.__proto__ || Object.getPrototypeOf(IntermediaryScreen)).call(this));

        _this._game = game;
        _this._text = "";
        return _this;
    }
    /*--------------- METHODS ------------------------*/
    /**Chooses the screen to load in after the intermediary. */

    _createClass(IntermediaryScreen, [{
        key: "queueNextScreen",
        value: function queueNextScreen(screenKey) {
            var _this2 = this;

            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;

            var evt = window.setTimeout(function () {
                //load the screen
                ScreenManager_1.ScreenManager.setCurrentScreen(screenKey, _this2._game.Stage);
                //clear the timeout
                window.clearTimeout(evt);
            }, duration);
        }
        /*--------------- ABSTRACTS ----------------------*/
        /*--------------- EVENTS -------------------------*/
        /*--------------- OVERRIDES ----------------------*/

    }, {
        key: "create",
        value: function create(stage) {
            //add stuff
            this._bg = new createjs.Shape();
            this._bg.graphics.beginFill("#191919");
            this._bg.graphics.drawRect(0, 0, this._game.StageWidth, this._game.StageHeight);
            this._bg.graphics.endFill();
            this._bg.cache(0, 0, this._game.StageWidth, this._game.StageHeight);
            this._container.addChild(this._bg);
            this._textContainer = new createjs.Container();
            this._container.addChild(this._textContainer);
            if (this._text != "") {
                //create the text
                this._txtSprite = Sprites_1.Sprites.generateBitmapText(this._text, LoadManager_1.LoadManager.Spritesheets.TypographyWhite);
                this._txtSprite.scale = 0.6;
                //load into container
                this._textContainer.addChild(this._txtSprite);
                //put container at bottom
                this._textContainer.x = this._game.StageWidth / 2 - this._txtSprite.getBounds().width / 2 * 0.6;
                this._textContainer.y = this._game.StageHeight / 2 - this._txtSprite.getBounds().height / 2;
            }
            return _get(IntermediaryScreen.prototype.__proto__ || Object.getPrototypeOf(IntermediaryScreen.prototype), "create", this).call(this, stage);
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this._textContainer.removeAllChildren();
            return _get(IntermediaryScreen.prototype.__proto__ || Object.getPrototypeOf(IntermediaryScreen.prototype), "destroy", this).call(this);
        }
    }, {
        key: "enable",
        value: function enable() {
            var _this3 = this;

            _get(IntermediaryScreen.prototype.__proto__ || Object.getPrototypeOf(IntermediaryScreen.prototype), "enable", this).call(this);
            //for testing
            this._container.on("click", function (e) {
                ScreenManager_1.ScreenManager.setCurrentScreen("menu", _this3.Stage);
            }, this, true);
        }
    }, {
        key: "disable",
        value: function disable() {
            _get(IntermediaryScreen.prototype.__proto__ || Object.getPrototypeOf(IntermediaryScreen.prototype), "disable", this).call(this);
            this.reset();
        }
    }, {
        key: "reset",
        value: function reset() {
            this.Text = "";
            _get(IntermediaryScreen.prototype.__proto__ || Object.getPrototypeOf(IntermediaryScreen.prototype), "reset", this).call(this);
        }
        /*--------------- GETTERS & SETTERS --------------*/

    }, {
        key: "Text",
        set: function set(value) {
            this._text = value;
        }
    }]);

    return IntermediaryScreen;
}(Screen_1.Screen);

exports.IntermediaryScreen = IntermediaryScreen;

},{"../managers/LoadManager":9,"../managers/ScreenManager":10,"../ui/Sprites":17,"./Screen":15}],14:[function(require,module,exports){
"use strict";

var _typeof23 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof22 = typeof Symbol === "function" && _typeof23(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof23(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof23(obj);
};

var _typeof21 = typeof Symbol === "function" && _typeof22(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof22(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof22(obj);
};

var _typeof20 = typeof Symbol === "function" && _typeof21(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof21(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof21(obj);
};

var _typeof19 = typeof Symbol === "function" && _typeof20(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof20(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof20(obj);
};

var _typeof18 = typeof Symbol === "function" && _typeof19(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof19(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof19(obj);
};

var _typeof17 = typeof Symbol === "function" && _typeof18(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof18(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof18(obj);
};

var _typeof16 = typeof Symbol === "function" && _typeof17(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof17(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof17(obj);
};

var _typeof15 = typeof Symbol === "function" && _typeof16(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof16(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof16(obj);
};

var _typeof14 = typeof Symbol === "function" && _typeof15(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof15(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof15(obj);
};

var _typeof13 = typeof Symbol === "function" && _typeof14(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof14(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof14(obj);
};

var _typeof12 = typeof Symbol === "function" && _typeof13(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof13(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof13(obj);
};

var _typeof11 = typeof Symbol === "function" && _typeof12(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof12(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof12(obj);
};

var _typeof10 = typeof Symbol === "function" && _typeof11(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof11(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof11(obj);
};

var _typeof9 = typeof Symbol === "function" && _typeof10(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof10(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof10(obj);
};

var _typeof8 = typeof Symbol === "function" && _typeof9(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof9(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof9(obj);
};

var _typeof7 = typeof Symbol === "function" && _typeof8(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof8(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof8(obj);
};

var _typeof6 = typeof Symbol === "function" && _typeof7(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof7(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof7(obj);
};

var _typeof5 = typeof Symbol === "function" && _typeof6(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof6(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof6(obj);
};

var _typeof4 = typeof Symbol === "function" && _typeof5(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof5(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof5(obj);
};

var _typeof3 = typeof Symbol === "function" && _typeof4(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof4(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof4(obj);
};

var _typeof2 = typeof Symbol === "function" && _typeof3(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof3(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof3(obj);
};

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if ("value" in desc) {
        return desc.value;
    } else {
        var getter = desc.get;if (getter === undefined) {
            return undefined;
        }return getter.call(receiver);
    }
};

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var Screen_1 = require("./Screen");
var ScreenManager_1 = require("../managers/ScreenManager");
var Sprites_1 = require("../ui/Sprites");
var LoadManager_1 = require("../managers/LoadManager");
var Container_1 = require("../ui/display/Container");
var Functions_1 = require("../Functions");
var LevelSelectDisplay_1 = require("../ui/custom/LevelSelectDisplay");
var DataManager_1 = require("../managers/DataManager");

var MenuScreen = function (_Screen_1$Screen) {
    _inherits(MenuScreen, _Screen_1$Screen);

    function MenuScreen(game) {
        _classCallCheck(this, MenuScreen);

        var _this = _possibleConstructorReturn(this, (MenuScreen.__proto__ || Object.getPrototypeOf(MenuScreen)).call(this));

        _this._game = game;
        //setup swipe container -- holds all moving sprites
        _this._swipeContainer = new createjs.Container();
        //setup static container
        _this._staticContainer = new Container_1.Container();
        _this._staticContainer.addMany({
            bg: Sprites_1.Sprites.Backgrounds.BG
        });
        //setup main container
        _this._mainContainer = new Container_1.Container();
        _this._mainContainer.addMany({
            logo: Sprites_1.Sprites.Backgrounds.Logo,
            fishbowl: Sprites_1.Sprites.Buttons.Fishbowl,
            btnNewGame: Sprites_1.Sprites.Buttons.NewGame,
            btnOptions: Sprites_1.Sprites.Buttons.Options,
            btnLevelSelect: Sprites_1.Sprites.Buttons.LevelSelect,
            btnExit: Sprites_1.Sprites.Buttons.Exit
        });
        //setup options container
        _this._optionsContainer = new Container_1.Container();
        _this._optionsContainer.addMany({
            txtOptions: Sprites_1.Sprites.generateBitmapText("Options", LoadManager_1.LoadManager.Spritesheets.Typography),
            btnClearData: Sprites_1.Sprites.Buttons.ClearData
        });
        _this._optionsContainer.Container.x -= _this._game.StageWidth;
        //setup cleared container
        _this._clearedContainer = new Container_1.Container();
        _this._clearedContainer.add("txtCleared", Sprites_1.Sprites.generateBitmapText("Data successfully cleared!", LoadManager_1.LoadManager.Spritesheets.Typography));
        _this._clearedContainer.Container.x -= _this._game.StageWidth;
        _this._clearedContainer.Container.y -= _this._game.StageHeight;
        //setup level select container
        // this._levelSelectContainer = new Container();
        // this._levelSelectContainer.addMany({
        //     txtOptions : Sprites.generateBitmapText("Level Select", LoadManager.Spritesheets.Typography),
        //     // staticBG : Sprites.Backgrounds.LevelSelectBG,
        //     // // levels : this._levelSelectLevelsContainer.Container
        //     // level1 : Sprites.cloneSprite(Sprites.Buttons.LevelEmpty as Sprite),
        //     // level2 : Sprites.cloneSprite(Sprites.Buttons.LevelEmpty as Sprite)
        // });
        // this._levelSelectDisplay = new LevelSelectDisplay();
        // this._levelSelectContainer.add("levelSelect", this._levelSelectDisplay.Container);
        // this._levelSelectContainer.Container.x += this._game.StageWidth;
        _this._levelSelectDisplay = new LevelSelectDisplay_1.LevelSelectDisplay(game);
        _this._levelSelectDisplay.Container.x += _this._game.StageWidth;
        //setup properties
        _this._swipeSpeed = 800;
        _this._currentScreen = "main";
        _this._initialSwipePos = { x: -1, y: -1 };
        return _this;
    }
    /*--------------- METHODS ------------------------*/
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/

    _createClass(MenuScreen, [{
        key: "_onNewGame",
        value: function _onNewGame() {
            var _this2 = this;

            Functions_1.Logging.message("Go to new game!");
            var data = DataManager_1.DataManager.getLevelDataByIndex(0);
            ScreenManager_1.ScreenManager.getScreenByKey("game").LevelData = data;
            var intermediary = ScreenManager_1.ScreenManager.getScreenByKey("intermediary");
            new Promise(function (res) {
                return __awaiter(_this2, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    intermediary.Text = data.name;
                                    _context.next = 3;
                                    return ScreenManager_1.ScreenManager.setCurrentScreen(intermediary, this.Stage);

                                case 3:
                                    intermediary.queueNextScreen("game");
                                    res();

                                case 5:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));
            });
        }
    }, {
        key: "_onOptions",
        value: function _onOptions() {
            //go to options!
            Functions_1.Logging.message("Go to options!");
            createjs.Tween.get(this._swipeContainer).to({ x: this._game.StageWidth }, this._swipeSpeed, createjs.Ease.circOut);
            this._currentScreen = "options";
        }
    }, {
        key: "_onLevelSelect",
        value: function _onLevelSelect() {
            Functions_1.Logging.message("Go to level select!");
            createjs.Tween.get(this._swipeContainer).to({ x: -this._game.StageWidth }, this._swipeSpeed, createjs.Ease.circOut);
            this._currentScreen = "levelSelect";
        }
    }, {
        key: "_onExit",
        value: function _onExit() {
            Functions_1.Logging.message("Go to exit!");
        }
    }, {
        key: "_onMain",
        value: function _onMain() {
            Functions_1.Logging.message("Go to main!");
            createjs.Tween.get(this._swipeContainer).to({ x: 0 }, this._swipeSpeed, createjs.Ease.bounceOut);
            this._currentScreen = "main";
        }
    }, {
        key: "_onClearData",
        value: function _onClearData() {
            var _this3 = this;

            Functions_1.Logging.success("Cleared data!");
            createjs.Tween.get(this._swipeContainer).to({ x: this._game.StageWidth, y: this._game.StageHeight }, this._swipeSpeed, createjs.Ease.cubicIn);
            // this._currentScreen = "cleared"
            var e = window.setTimeout(function () {
                createjs.Tween.get(_this3._swipeContainer).to({ x: _this3._game.StageWidth, y: 0 }, _this3._swipeSpeed, createjs.Ease.cubicInOut);
                window.clearInterval(e);
                _this3._currentScreen = "options";
            }, 2000);
        }
    }, {
        key: "_onDragStart",
        value: function _onDragStart(e) {
            var _this4 = this;

            this._initialSwipePos = { x: e.stageX, y: e.stageY };
            //reset drag timer if not null
            if (this._dragTimer != null) window.clearTimeout(this._dragTimer);
            this._dragTimer = setTimeout(function () {
                _this4._initialSwipePos = { x: -1, y: -1 };
                _this4._dragTimer = null;
            }, 500);
        }
    }, {
        key: "_onDragEnd",
        value: function _onDragEnd(e) {
            if (this._initialSwipePos.x != -1 || this._initialSwipePos.y != -1) {
                //find the direction
                if (this._initialSwipePos.x - e.stageX > 20) {
                    if (this._currentScreen == "options") this._onMain();
                } else if (this._initialSwipePos.x - e.stageX < -20) {
                    if (this._currentScreen == "levelSelect") this._onMain();
                }
            }
        }
        /*--------------- OVERRIDES ----------------------*/

    }, {
        key: "create",
        value: function create(stage) {
            //add in the containers
            this._staticContainer.Sprites.bg.y = 0;
            this._container.addChild(this._staticContainer.Container);
            this._container.addChild(this._swipeContainer);
            this._swipeContainer.addChild(this._mainContainer.Container);
            this._swipeContainer.addChild(this._optionsContainer.Container);
            this._swipeContainer.addChild(this._clearedContainer.Container);
            // this._swipeContainer.addChild(this._levelSelectContainer.Container);
            this._swipeContainer.addChild(this._levelSelectDisplay.Container);
            return _get(MenuScreen.prototype.__proto__ || Object.getPrototypeOf(MenuScreen.prototype), "create", this).call(this, stage);
        }
    }, {
        key: "enable",
        value: function enable() {
            _get(MenuScreen.prototype.__proto__ || Object.getPrototypeOf(MenuScreen.prototype), "enable", this).call(this);
            //listen to events
            this._mainContainer.Sprites.btnNewGame.on("click", this._onNewGame, this, true);
            this._mainContainer.Sprites.btnOptions.on("click", this._onOptions, this);
            this._mainContainer.Sprites.btnLevelSelect.on("click", this._onLevelSelect, this);
            this._mainContainer.Sprites.btnExit.on("click", this._onExit, this);
            Sprites_1.Sprites.listenToClearData();
            this._optionsContainer.Sprites.btnClearData.on(Sprites_1.Sprites.CLEAR_DATA, this._onClearData, this);
            //listen for swipes
            this._staticContainer.Sprites.bg.on("mousedown", this._onDragStart, this);
            this._staticContainer.Sprites.bg.on("click", this._onDragEnd, this);
            // this._mainContainer.Sprites.btnOptions.on("click", () => console.log("HELLO I CLIC"));
            this._levelSelectDisplay.enable();
        }
    }, {
        key: "disable",
        value: function disable() {
            _get(MenuScreen.prototype.__proto__ || Object.getPrototypeOf(MenuScreen.prototype), "disable", this).call(this);
            //stop listen to events
            this._mainContainer.Sprites.btnNewGame.off("click", this._onNewGame);
            this._mainContainer.Sprites.btnOptions.off("click", this._onOptions);
            this._mainContainer.Sprites.btnLevelSelect.off("click", this._onLevelSelect);
            this._mainContainer.Sprites.btnExit.off("click", this._onExit);
            Sprites_1.Sprites.stopListenToClearData();
            this._optionsContainer.Sprites.btnClearData.off(Sprites_1.Sprites.CLEAR_DATA, this._onClearData);
            //stop listen for swipes
            this._staticContainer.Sprites.bg.off("mousedown", this._onDragStart);
            this._staticContainer.Sprites.bg.off("click", this._onDragEnd);
            this._levelSelectDisplay.disable();
        }
    }, {
        key: "reset",
        value: function reset() {
            //reset the position of the swipe container
            this._swipeContainer.x = 0;
            this._swipeContainer.y = 0;
            _get(MenuScreen.prototype.__proto__ || Object.getPrototypeOf(MenuScreen.prototype), "reset", this).call(this);
        }
    }]);

    return MenuScreen;
}(Screen_1.Screen);

exports.MenuScreen = MenuScreen;

},{"../Functions":1,"../managers/DataManager":8,"../managers/LoadManager":9,"../managers/ScreenManager":10,"../ui/Sprites":17,"../ui/custom/LevelSelectDisplay":18,"../ui/display/Container":19,"./Screen":15}],15:[function(require,module,exports){
"use strict";

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

Object.defineProperty(exports, "__esModule", { value: true });

var Screen = function () {
    function Screen() {
        _classCallCheck(this, Screen);

        this._container = new createjs.Container();
    }
    /*--------------- METHODS ------------------------*/
    /**Updates the screen. */

    _createClass(Screen, [{
        key: "update",
        value: function update(gameTime) {}
        /**Creates the screen and adds to the stage. */

    }, {
        key: "create",
        value: function create(stage) {
            this._stage = stage;
            //add to the stage
            this._stage.addChild(this._container);
            return this;
        }
        /**Destroys the screen and removes from the stage. */

    }, {
        key: "destroy",
        value: function destroy() {
            //remove from the stage
            this._stage.removeChild(this._container);
            return this;
        }
    }, {
        key: "enable",
        value: function enable() {}
    }, {
        key: "disable",
        value: function disable() {}
    }, {
        key: "reset",
        value: function reset() {}
        /*--------------- ABSTRACTS ----------------------*/
        /*--------------- EVENTS -------------------------*/
        /*--------------- OVERRIDES ----------------------*/
        /*--------------- GETTERS & SETTERS --------------*/

    }, {
        key: "Container",
        get: function get() {
            return this._container;
        }
    }, {
        key: "Stage",
        get: function get() {
            return this._stage;
        }
    }]);

    return Screen;
}();

exports.Screen = Screen;

},{}],16:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var Screen_1 = require("./Screen");
var ScreenManager_1 = require("../managers/ScreenManager");

var SplashScreen = function (_Screen_1$Screen) {
    _inherits(SplashScreen, _Screen_1$Screen);

    function SplashScreen() {
        _classCallCheck(this, SplashScreen);

        return _possibleConstructorReturn(this, (SplashScreen.__proto__ || Object.getPrototypeOf(SplashScreen)).call(this));
    }
    /*--------------- METHODS ------------------------*/
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/


    _createClass(SplashScreen, [{
        key: "create",
        value: function create(stage) {
            //add stuff
            this._splash = new createjs.Shape();
            this._splash.graphics.beginFill("red");
            this._splash.graphics.drawRect(0, 0, 100, 100);
            this._splash.graphics.endFill();
            this._splash.cache(0, 0, 100, 100);
            this._container.addChild(this._splash);
            _get(SplashScreen.prototype.__proto__ || Object.getPrototypeOf(SplashScreen.prototype), "create", this).call(this, stage);
            //for testing
            this._container.on("click", function (e) {
                ScreenManager_1.ScreenManager.setCurrentScreen("menu", stage);
            }, this, true);
            return this;
        }
    }]);

    return SplashScreen;
}(Screen_1.Screen);

exports.SplashScreen = SplashScreen;

},{"../managers/ScreenManager":10,"./Screen":15}],17:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var LoadManager_1 = require("../managers/LoadManager");
/**Used to gain access to in-game sprites. */

var Sprites = function () {
    function Sprites() {
        _classCallCheck(this, Sprites);
    }

    _createClass(Sprites, null, [{
        key: "setup",

        /*--------------- METHODS ------------------------*/
        value: function setup() {
            return new Promise(function (res, rej) {
                // Sprites.spritesheets = spritesheets
                //setup all the sprites
                /* ------- STATIC ------- */
                Sprites._backgrounds.Main = new createjs.Sprite(LoadManager_1.LoadManager.Spritesheets.UI); // Static BG
                Sprites._backgrounds.Main.gotoAndStop("bg_main_static");
                Sprites._backgrounds.Logo = new createjs.Sprite(LoadManager_1.LoadManager.Spritesheets.Entities); // LOGO
                Sprites._backgrounds.Logo.gotoAndStop("icon_title");
                Sprites._backgrounds.BG = LoadManager_1.LoadManager.Images.BG; // Redux
                Sprites._backgrounds.BGTop = LoadManager_1.LoadManager.Images.BGTop;
                /* ------- ANIMATED ------- */
                Sprites._backgrounds.Wave = new createjs.Sprite(LoadManager_1.LoadManager.Spritesheets.UI); // Animated BG
                Sprites._backgrounds.Wave.gotoAndPlay("bg_main");
                /* ------- BUTTONS ------- */
                Sprites._buttons.NewGame = new createjs.Sprite(LoadManager_1.LoadManager.Spritesheets.Entities); // New Game
                Sprites._buttons.NewGame.gotoAndStop("btn_new_game");
                new createjs.ButtonHelper(Sprites._buttons.NewGame, "btn_new_game", "btn_new_game_hover", "btn_new_game_hover");
                Sprites._buttons.Options = new createjs.Sprite(LoadManager_1.LoadManager.Spritesheets.Entities); // Options
                Sprites._buttons.Options.gotoAndStop("btn_new_game");
                new createjs.ButtonHelper(Sprites._buttons.Options, "btn_options", "btn_options_hover", "btn_options_hover");
                Sprites._buttons.LevelSelect = new createjs.Sprite(LoadManager_1.LoadManager.Spritesheets.Entities); // Select
                Sprites._buttons.LevelSelect.gotoAndStop("btn_select");
                new createjs.ButtonHelper(Sprites._buttons.LevelSelect, "btn_select", "btn_select_hover", "btn_select_hover");
                Sprites._buttons.Exit = new createjs.Sprite(LoadManager_1.LoadManager.Spritesheets.Entities); // Exit
                Sprites._buttons.Exit.gotoAndStop("btn_select");
                new createjs.ButtonHelper(Sprites._buttons.Exit, "btn_exit", "btn_exit_hover", "btn_exit_hover");
                Sprites._buttons.Fishbowl = new createjs.Sprite(LoadManager_1.LoadManager.Spritesheets.Entities); // Fishbowl
                Sprites._buttons.Fishbowl.gotoAndStop("btn_select");
                new createjs.ButtonHelper(Sprites._buttons.Fishbowl, "icon_fishbowl", "icon_fishbowl_hover", "icon_fishbowl_hover", true);
                /* ------- MENU ------- */
                Sprites._backgrounds.LevelSelectBG = new createjs.Sprite(LoadManager_1.LoadManager.Spritesheets.Menu_Level_Select); // Level Select BG
                Sprites._backgrounds.LevelSelectBG.gotoAndStop("static_bg");
                Sprites._buttons.LevelEmpty = new createjs.Sprite(LoadManager_1.LoadManager.Spritesheets.Menu_Level_Select); // Level Empty Button
                Sprites._buttons.LevelEmpty.gotoAndStop("level_empty");
                Sprites._buttons.LevelComplete = new createjs.Sprite(LoadManager_1.LoadManager.Spritesheets.Menu_Level_Select); // Level Complete Button
                Sprites._buttons.LevelComplete.gotoAndStop("level_complete");
                Sprites._buttons.LevelSpecialEmpty = new createjs.Sprite(LoadManager_1.LoadManager.Spritesheets.Menu_Level_Select); // Level Special Empty Button
                Sprites._buttons.LevelSpecialEmpty.gotoAndStop("level_special_empty");
                Sprites._buttons.LevelSpecialComplete = new createjs.Sprite(LoadManager_1.LoadManager.Spritesheets.Menu_Level_Select); // Level Special Complete Button
                Sprites._buttons.LevelSpecialComplete.gotoAndStop("level_special_complete");
                /* ------- COMPLEX ------- */
                Sprites._setupBTNClearData();
                res();
            });
        }
        // /* --- Complex createjs.Sprite Setup --- */

    }, {
        key: "_setupBTNClearData",
        value: function _setupBTNClearData() {
            Sprites._buttons.ClearData = new createjs.Sprite(LoadManager_1.LoadManager.Spritesheets.UI); // BTN Clear Data
            Sprites._buttons.ClearData.gotoAndStop("btn_clear_data");
            Sprites._buttons.ClearData.cursor = "pointer";
            Sprites._canClearData = false;
        }
    }, {
        key: "listenToClearData",
        value: function listenToClearData() {
            //listen
            Sprites._buttons.ClearData.on("mousedown", Sprites._btnDataDown);
            Sprites._buttons.ClearData.on("animationend", Sprites._btnDataComplete);
            Sprites._buttons.ClearData.on("click", Sprites._btnDataUp);
        }
    }, {
        key: "stopListenToClearData",
        value: function stopListenToClearData() {
            //listen
            Sprites._buttons.ClearData.off("mousedown", Sprites._btnDataDown);
            Sprites._buttons.ClearData.off("animationend", Sprites._btnDataComplete);
            Sprites._buttons.ClearData.off("click", Sprites._btnDataUp);
        }
    }, {
        key: "_btnDataDown",
        value: function _btnDataDown(e) {
            Sprites._buttons.ClearData.gotoAndPlay("btn_clear_data_progress");
            Sprites._canClearData = true;
        }
    }, {
        key: "_btnDataUp",
        value: function _btnDataUp(e) {
            Sprites._buttons.ClearData.gotoAndStop("btn_clear_data");
            Sprites._canClearData = false;
        }
    }, {
        key: "_btnDataComplete",
        value: function _btnDataComplete(e) {
            Sprites._buttons.ClearData.gotoAndStop("btn_clear_data");
            //dispatch event to button
            if (Sprites._canClearData) {
                Sprites._buttons.ClearData.dispatchEvent(new Event(Sprites.CLEAR_DATA));
            }
        }
        /**A helper function to generate and cache text for the StageGL object. */

    }, {
        key: "generateText",
        value: function generateText(text) {
            var details = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "20px Arial";
            var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#FFFEEE";

            var textObj = new createjs.Text(text, details, color);
            textObj.cache(0, 0, textObj.getBounds().width, textObj.getBounds().height);
            return textObj;
        }
    }, {
        key: "generateBitmapText",
        value: function generateBitmapText(text, spritesheet) {
            var textObj = new createjs.BitmapText(text, spritesheet);
            return textObj;
        }
        /*--------------- ABSTRACTS ----------------------*/
        /*--------------- EVENTS -------------------------*/
        /*--------------- OVERRIDES ----------------------*/
        /*--------------- GETTERS & SETTERS --------------*/

    }, {
        key: "Backgrounds",
        get: function get() {
            return Sprites._backgrounds;
        }
    }, {
        key: "Buttons",
        get: function get() {
            return Sprites._buttons;
        }
    }]);

    return Sprites;
}();

Sprites.CLEAR_DATA = "onClearData";
Sprites._backgrounds = {};
Sprites._buttons = {};
Sprites._canClearData = false;
exports.Sprites = Sprites;

},{"../managers/LoadManager":9}],18:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var Sprites_1 = require("../Sprites");
var LoadManager_1 = require("../../managers/LoadManager");
var DataManager_1 = require("../../managers/DataManager");
var ScreenManager_1 = require("../../managers/ScreenManager");

var LevelSelectDisplay = function () {
    function LevelSelectDisplay(game) {
        _classCallCheck(this, LevelSelectDisplay);

        this._game = game;
        this._levelButtons = [];
        //build the required components for the level select display
        this._container = new createjs.Container();
        this._background = Sprites_1.Sprites.Backgrounds.LevelSelectBG;
        this._background.x = game.StageWidth / 2 - this._background.getBounds().width / 2;
        this._background.y = 80;
        this._levelsContainer = new createjs.Container();
        this._container.addChild(this._background);
        var text = Sprites_1.Sprites.generateBitmapText("Level Select", LoadManager_1.LoadManager.Spritesheets.Typography);
        text.x = game.StageWidth / 2 - text.getBounds().width / 2;
        text.y = 30;
        this._container.addChild(text);
        //setup display text
        this._levelTextContainer = new createjs.Container();
        this._container.addChild(this._levelTextContainer);
        this.LevelText = "Hello World!";
        //spoof some level data
        this._levelsData = [[{ name: "Welcome to the pond!", complete: true, unlocked: true, data: [0, 0, 0, 0, 0, 0, 0] }, { name: "A new adventure!", complete: true, unlocked: true, data: [0, 0, 0, 0, 0, 0, 0] }, { name: "Learn to aim!", complete: false, unlocked: true, data: [0, 0, 0, 0, 0, 0, 0] }, { name: "Persephone!", special: true, complete: false, unlocked: false, data: [0, 0, 0, 0, 0, 0, 0] }], [{ name: "In deep water!", complete: false, unlocked: false, data: [0, 0, 0, 0, 0, 0, 0] }, { name: "An ocean of fish!", complete: false, unlocked: false, data: [0, 0, 0, 0, 0, 0, 0] }, { name: "Barnacles ahoy!", complete: false, unlocked: false, data: [0, 0, 0, 0, 0, 0, 0] }, { name: "Owen!", special: true, complete: false, unlocked: false, data: [0, 0, 0, 0, 0, 0, 0] }]];
        //build the level icons
        for (var r = 0; r < this._levelsData.length; r++) {
            //iterate through levels
            for (var i = 0; i < this._levelsData[r].length; i++) {
                var levelData = this._levelsData[r][i];
                console.log("LEVEL", levelData);
                //decide the sprite
                var sprite = Sprites_1.Sprites.Buttons.LevelEmpty.clone();
                if (levelData.special != null && levelData.special) sprite = Sprites_1.Sprites.Buttons.LevelSpecialEmpty.clone();
                // //completed
                if (levelData.complete) {
                    sprite = Sprites_1.Sprites.Buttons.LevelComplete.clone();
                    if (levelData.special != null && levelData.special) sprite = Sprites_1.Sprites.Buttons.LevelSpecialComplete;
                }
                //locked
                if (!levelData.unlocked) {
                    sprite.alpha = 0.25;
                } else {
                    sprite.alpha = 1;
                    //extras
                    sprite.cursor = "pointer";
                }
                //place
                sprite.x = 60 * i;
                sprite.y = 50 * r;
                //add
                this._levelsContainer.addChild(sprite);
                //to array
                this._levelButtons.push(sprite);
            }
        }
        ;
        this._levelsContainer.x = game.StageWidth / 2 - this._levelsContainer.getBounds().width / 2;
        this._levelsContainer.y = 100;
        this._container.addChild(this._levelsContainer);
    }
    /*--------------- METHODS ------------------------*/


    _createClass(LevelSelectDisplay, [{
        key: "enable",
        value: function enable() {
            var _this = this;

            this._levelButtons.forEach(function (btn) {
                btn.on("click", _this._onLevelClick, _this);
                btn.on("mouseover", _this._onLevelHover, _this);
                btn.on("mouseout", _this._onLevelUnhover, _this);
            });
        }
    }, {
        key: "disable",
        value: function disable() {
            this._levelButtons.forEach(function (btn) {
                btn.removeAllEventListeners();
            });
        }
        /**Returns level data from the given index. */

    }, {
        key: "_getDataByIndex",
        value: function _getDataByIndex(index) {
            //flatten level data, and get data
            var flatten = this._levelsData.reduce(function (acc, next) {
                return acc.concat(next);
            });
            return flatten[index];
        }
        /*--------------- ABSTRACTS ----------------------*/
        /*--------------- EVENTS -------------------------*/

    }, {
        key: "_onLevelClick",
        value: function _onLevelClick(e) {
            var _this2 = this;

            //get button index
            var index = this._levelButtons.indexOf(e.target);
            if (index == -1) return;
            //set the level index
            var data = DataManager_1.DataManager.getLevelDataByIndex(index);
            ScreenManager_1.ScreenManager.getScreenByKey("game").LevelData = data;
            //go to intermediary screen
            var intermediary = ScreenManager_1.ScreenManager.getScreenByKey("intermediary");
            new Promise(function (res) {
                return __awaiter(_this2, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    intermediary.Text = data.name;
                                    _context.next = 3;
                                    return ScreenManager_1.ScreenManager.setCurrentScreen(intermediary, this._game.Stage);

                                case 3:
                                    intermediary.queueNextScreen("game", 1000);
                                    res();

                                case 5:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));
            });
        }
    }, {
        key: "_onLevelHover",
        value: function _onLevelHover(e) {
            //find the button data
            //get button index
            var index = this._levelButtons.indexOf(e.target);
            if (index != -1) {
                var data = this._getDataByIndex(index);
                if (data != null) {
                    if (data.unlocked) this.LevelText = data.name;
                }
            }
        }
    }, {
        key: "_onLevelUnhover",
        value: function _onLevelUnhover(e) {
            this.LevelText = "";
        }
        /*--------------- OVERRIDES ----------------------*/
        /*--------------- GETTERS & SETTERS --------------*/

    }, {
        key: "Container",
        get: function get() {
            return this._container;
        }
    }, {
        key: "LevelText",
        set: function set(value) {
            if (value == "") {
                this._levelTextContainer.removeAllChildren();
                return;
            }
            //create the text
            var text = Sprites_1.Sprites.generateBitmapText(value, LoadManager_1.LoadManager.Spritesheets.Typography);
            text.scale = 0.6;
            //load into container
            this._levelTextContainer.removeAllChildren();
            this._levelTextContainer.addChild(text);
            //put container at bottom
            this._levelTextContainer.x = this._game.StageWidth / 2 - text.getBounds().width / 2 * 0.6;
            this._levelTextContainer.y = this._game.StageHeight - 30;
        }
    }]);

    return LevelSelectDisplay;
}();

exports.LevelSelectDisplay = LevelSelectDisplay;

},{"../../managers/DataManager":8,"../../managers/LoadManager":9,"../../managers/ScreenManager":10,"../Sprites":17}],19:[function(require,module,exports){
"use strict";

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }return arr2;
    } else {
        return Array.from(arr);
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

Object.defineProperty(exports, "__esModule", { value: true });
var Layout_1 = require("./Layout");
/**Uses custom classes and the createjs library to help easily build up ui interfaces with DisplayObjects. */

var Container = function () {
    function Container() {
        _classCallCheck(this, Container);

        this._sprites = {};
        this._container = new createjs.Container();
        this._layout = Layout_1.Layout.MAKE_VERTICAL_CENTER(this._container);
    }
    /*--------------- METHODS ------------------------*/

    _createClass(Container, [{
        key: "add",
        value: function add(key, sprite) {
            var _layout,
                _this = this;

            var updateLayout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            if (this._sprites[key] != null) return false;
            this._sprites[key] = sprite.clone();
            if (updateLayout) (_layout = this._layout).buildLayout.apply(_layout, [true].concat(_toConsumableArray(Object.keys(this._sprites).map(function (k) {
                return _this._sprites[k];
            }))));
            return true;
        }
    }, {
        key: "addMany",
        value: function addMany(sprites) {
            var _this2 = this,
                _layout2;

            Object.keys(sprites).forEach(function (k) {
                _this2.add(k, sprites[k], false);
            });
            (_layout2 = this._layout).buildLayout.apply(_layout2, [true].concat(_toConsumableArray(Object.keys(this._sprites).map(function (k) {
                return _this2._sprites[k];
            }))));
        }
    }, {
        key: "changeLayout",
        value: function changeLayout(layout) {
            this._layout = layout;
        }
        /**In case of wandering or reusable sprites, call them back to this layout! */

    }, {
        key: "checkoutSprites",
        value: function checkoutSprites() {
            var _layout3,
                _this3 = this;

            (_layout3 = this._layout).buildLayout.apply(_layout3, [true].concat(_toConsumableArray(Object.keys(this._sprites).map(function (k) {
                return _this3._sprites[k];
            }))));
        }
        /*--------------- ABSTRACTS ----------------------*/
        /*--------------- EVENTS -------------------------*/
        /*--------------- OVERRIDES ----------------------*/
        /*--------------- GETTERS & SETTERS --------------*/

    }, {
        key: "Container",
        get: function get() {
            return this._container;
        }
    }, {
        key: "Sprites",
        get: function get() {
            return this._sprites;
        }
    }]);

    return Container;
}();

exports.Container = Container;

},{"./Layout":20}],20:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("../../Game");
/**Used to layout createjs display objects. */

var Layout = function () {
    function Layout(parent, direction, alignment, crossAlignment) {
        var spacing = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 5;

        _classCallCheck(this, Layout);

        this._parent = parent;
        this._items = [];
        this._direction = direction;
        this._alignment = alignment;
        this._crossAlignment = crossAlignment;
        this._spacing = spacing;
    }
    /*--------------- METHODS ------------------------*/


    _createClass(Layout, [{
        key: "buildLayout",
        value: function buildLayout() {
            var addToParent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            for (var _len = arguments.length, items = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                items[_key - 1] = arguments[_key];
            }

            if (items.length <= 0) return;
            this._items = items;
            if (addToParent) {
                this._parent.removeAllChildren();
            }
            if (this._direction == Layout.VERTICAL) {
                // X - CENTER
                var totalHeight = 0;
                if (this._alignment == Layout.CENTER) {
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        item.x = Game_1.Game.WIDTH / 2 - item.getBounds().width / 2;
                        item.y = totalHeight;
                        totalHeight += item.getBounds().height + this._spacing;
                        if (addToParent) this._parent.addChild(item);
                    }
                    // Y - CENTER
                    //handle vertical alignment
                    if (this._crossAlignment == Layout.START) {
                        // DO NOTHING, this is the default
                    } else if (this._crossAlignment == Layout.CENTER) {
                        totalHeight += items[items.length - 1].getBounds().height;
                        for (var _i = 0; _i < items.length; _i++) {
                            var _item = items[_i];
                            //decipher desired center
                            _item.y += Game_1.Game.HEIGHT / 2 - totalHeight / 2;
                        }
                    }
                }
            } else {}
        }
        /*--------------- ABSTRACTS ----------------------*/
        /*--------------- EVENTS -------------------------*/
        /*--------------- OVERRIDES ----------------------*/
        /*--------------- GETTERS & SETTERS --------------*/
        /*--------------- HELPER FUNCTIONS ---------------*/

    }], [{
        key: "MAKE_VERTICAL_CENTER",
        value: function MAKE_VERTICAL_CENTER(container) {
            return new Layout(container, Layout.VERTICAL, Layout.CENTER, Layout.CENTER, 5);
        }
    }]);

    return Layout;
}();
//justify content


Layout.HORIZONTAL = "horizontal";
Layout.VERTICAL = "vertical";
//align items
Layout.START = "start";
Layout.END = "end";
Layout.CENTER = "center";
exports.Layout = Layout;

},{"../../Game":2}]},{},[7])

//# sourceMappingURL=bundle.js.map
