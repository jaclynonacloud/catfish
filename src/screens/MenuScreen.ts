import { Screen } from "./Screen";
import { ScreenManager } from "../managers/ScreenManager";
import { Sprites } from "../ui/Sprites";
import { Layout } from "../ui/display/Layout";
import { LoadManager } from "../managers/LoadManager";
import { Container } from "../ui/display/Container";
import { Logging } from "../Functions";
import { Game } from "../Game";
import { LevelSelectDisplay } from "../ui/custom/LevelSelectDisplay";
import { IntermediaryScreen } from "./IntermediaryScreen";
import { GameScreen, POOL } from "./GameScreen";
import { DataManager } from "../managers/DataManager";
import { Special } from "../entities/specials/Special";
import { Persephone } from "../entities/specials/Persephone";
import { ProgressManager } from "../managers/ProgressManager";
import { SoundManager } from "../managers/SoundManager";
import { Owen } from "../entities/specials/Owen";
import { Riley } from "../entities/specials/Riley";

export class MenuScreen extends Screen {
    private _game:Game;
    //containers
    private _swipeContainer:createjs.Container;
    private _staticContainer:Container;
    // private _mainContainer:Container;
    private _mainContainer:createjs.Container;
    private _clearedContainer:Container;
    // private _optionsContainer:Container;
    private _optionsContainer:createjs.Container;
    private _collectedContainer:createjs.Container;

    private _mainButtonsContainer:Container;
    private _logo:createjs.DisplayObject;
    private _fancyFish:createjs.Sprite;

    private _btnResetData:createjs.Sprite;
    private _btnCheat:createjs.Sprite;
    private _soundOn:createjs.Sprite;
    private _soundOff:createjs.Sprite;
    private _btnLeft:createjs.Sprite;
    private _btnRight:createjs.Sprite;
    private _btnUp:createjs.Sprite;

    //custom containers
    private _levelSelectDisplay:LevelSelectDisplay;

    //properties
    private _swipeSpeed:number;
    private _currentScreen:string;
    private _initialSwipePos:{x:number, y:number};
    private _dragTimer:any;

    //collectibles
    private _collectibleFish:Special[];

    
    constructor(game:Game) {
        super();

        this._game = game;

        //setup swipe container -- holds all moving sprites
        this._swipeContainer = new createjs.Container();

        //setup static container
        this._staticContainer = new Container();
        const bg = new createjs.Sprite(LoadManager.Spritesheets.Catfish_Main, "bg");

        this._staticContainer.addMany({
            bg
        });

        //setup main container
        this._mainContainer = new createjs.Container();
        this._logo = new createjs.Sprite(LoadManager.Spritesheets.Catfish_Main, "logo");
        this._logo.x = this._game.StageWidth - this._logo.getBounds().width - 20;
        this._logo.y = this._game.StageHeight * 0.4;
        this._mainContainer.addChild(this._logo);
        this._mainButtonsContainer = new Container(Container.LAYOUT_OPTIONS.ColumnLeftBottom);
        this._mainButtonsContainer.addMany({
            btnNewGame : new createjs.Sprite(LoadManager.Spritesheets.Menu_Spritesheet, "btnNewGame"),
            btnOptions : new createjs.Sprite(LoadManager.Spritesheets.Menu_Spritesheet, "btnOptions"),
            btnLevelSelect : new createjs.Sprite(LoadManager.Spritesheets.Menu_Spritesheet, "btnLevelSelect"),
            btnExit : new createjs.Sprite(LoadManager.Spritesheets.Menu_Spritesheet, "btnExit"),
        });
        this._mainContainer.addChild(this._mainButtonsContainer.Container);
        this._fancyFish = new createjs.Sprite(LoadManager.Spritesheets.Catfish_Main, "fancyFish");
        this._fancyFish.x = this._game.StageWidth - this._fancyFish.getBounds().width - 20;
        this._fancyFish.y = this._game.StageHeight - this._fancyFish.getBounds().height - 20;
        this._mainContainer.addChild(this._fancyFish);
        this._fancyFish.visible = false;

        //setup options container
        this._optionsContainer = new createjs.Container();
        const optionsBG = new createjs.Sprite(LoadManager.Spritesheets.Menu_Spritesheet, "bgOptions");
        this._btnResetData = new createjs.Sprite(LoadManager.Spritesheets.Menu_Spritesheet, "btnResetData");
        this._btnCheat = new createjs.Sprite(LoadManager.Spritesheets.Menu_Spritesheet, "btnCheat");
        this._soundOn = new createjs.Sprite(LoadManager.Spritesheets.Menu_Spritesheet, "btnOn");
        this._soundOff = new createjs.Sprite(LoadManager.Spritesheets.Menu_Spritesheet, "btnOff");
        this._soundOn.x = this._soundOff.x = 240;
        this._soundOn.y = this._soundOff.y = 240;
        this._soundOff.x += 130;

        this._optionsContainer.addChild(
            optionsBG, this._btnResetData, this._btnCheat, this._soundOff, this._soundOn
        );

        this._optionsContainer.x -= this._game.StageWidth;

        //setup cleared container
        this._clearedContainer = new Container();
        this._clearedContainer.add("txtCleared", Sprites.generateBitmapText("Data successfully cleared!", LoadManager.Spritesheets.Typography));
        this._clearedContainer.Container.x -= this._game.StageWidth;
        this._clearedContainer.Container.y -= this._game.StageHeight;

        this._levelSelectDisplay = new LevelSelectDisplay(game);
        this._levelSelectDisplay.Container.x += this._game.StageWidth;

        //setup collected container
        this._collectedContainer = new createjs.Container;
        this._collectedContainer.y += this._game.StageHeight;


        this._collectibleFish = [];


        //setup arrow btns
        this._btnUp = new createjs.Sprite(LoadManager.Spritesheets.Menu_Spritesheet, "btnUp");
        this._btnLeft = new createjs.Sprite(LoadManager.Spritesheets.Menu_Spritesheet, "btnLeft");
        this._btnRight = new createjs.Sprite(LoadManager.Spritesheets.Menu_Spritesheet, "btnRight");
        this._btnUp.x = (this._game.StageWidth / 2) - this._btnUp.getBounds().width / 2;
        this._btnUp.y = this._game.StageHeight + 10;
        this._btnLeft.y = this._btnRight.y = 250;
        this._btnLeft.x = (this._game.StageWidth) + 10;
        this._btnRight.x -= this._btnRight.getBounds().width + 10;

        this._swipeContainer.addChild(
            this._btnUp, this._btnLeft, this._btnRight
        );


        //setup properties
        this._swipeSpeed = 800;
        this._currentScreen = "main";
        this._initialSwipePos = { x:-1, y:-1 };        

    }

    /*--------------- METHODS ------------------------*/
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    private _onNewGame() {
        // SoundManager.stopAllSound();
        SoundManager.fadeOutAmbience("ambience");
        //play the sound
        SoundManager.playSFX(LoadManager.Sounds.BubblesFade);
        Logging.message("Go to new game!");
        
        const data = DataManager.getLevelDataByIndex(0);
        this._game.changeCurrentLevel(data);
        
        const intermediary = ScreenManager.getScreenByKey("intermediary") as IntermediaryScreen;
        new Promise(async(res) => {
            intermediary.Text = data.name;
            await ScreenManager.setCurrentScreen(intermediary, this.Stage);
            intermediary.queueNextScreen("game");

            res();
        });
    }
    private _onOptions() {
        //play the sound
        SoundManager.playSFX(LoadManager.Sounds.BTNSelect);
        //go to options!
        Logging.message("Go to options!");
        createjs.Tween.get(this._swipeContainer).to({x:this._game.StageWidth}, this._swipeSpeed, createjs.Ease.circOut);
        this._currentScreen = "options";
    }
    private _onLevelSelect() {
        //play the sound
        SoundManager.playSFX(LoadManager.Sounds.BTNSelect);
        Logging.message("Go to level select!");
        createjs.Tween.get(this._swipeContainer).to({x:-this._game.StageWidth}, this._swipeSpeed, createjs.Ease.circOut);
        this._currentScreen = "levelSelect";
    }
    private _onFish() {
        //play the sound
        SoundManager.playSFX(LoadManager.Sounds.BTNSelect);
        Logging.message("Go to fish!");
        createjs.Tween.get(this._swipeContainer).to({y:-this._game.StageHeight}, this._swipeSpeed, createjs.Ease.circOut);
        this._currentScreen = "fish";
    }
    private _onExit() {
        //play the sound
        SoundManager.playSFX(LoadManager.Sounds.BTNSelect);
        Logging.message("Go to exit!");
    }

    private _onMain() {
        Logging.message("Go to main!");
        createjs.Tween.get(this._swipeContainer).to({x:0, y:0}, this._swipeSpeed, createjs.Ease.bounceOut);
        this._currentScreen = "main";
    }

    private _onDragStart(e) {

        this._initialSwipePos = { x:e.stageX, y:e.stageY };

        //reset drag timer if not null
        if(this._dragTimer != null) window.clearTimeout(this._dragTimer);
        this._dragTimer = setTimeout(() => {
            this._initialSwipePos = { x:-1, y:-1 };
            this._dragTimer = null;
        }, 500);
    }
    private _onDragEnd(e) {
        if(this._initialSwipePos.x != -1 || this._initialSwipePos.y != -1) {
            //find the direction
            if((this._initialSwipePos.x - e.stageX) > 20) {
                if(this._currentScreen == "options")
                    this._onMain();
            }
            else if((this._initialSwipePos.x - e.stageX) < -20) {
                if(this._currentScreen == "levelSelect")
                    this._onMain();
            }
            else if((this._initialSwipePos.y - e.stageY) < -20) {
                if(this._currentScreen == "fish")
                    this._onMain();
            }
        }
    }

    /*--------------- OVERRIDES ----------------------*/
    public create(stage:createjs.StageGL):Screen {
        //start music
        SoundManager.playAmbienceWithFadeIn("ambience", LoadManager.Sounds["intro"], true, 1, 400);
        // SoundManager.playAmbienceWithFadeIn("ambience", LoadManager.Sounds["woowoobeat"], true, 1, 400);

        //add in the containers
        this._staticContainer.Sprites.bg.y = 0;
        this._container.addChild(this._staticContainer.Container);
        this._container.addChild(this._swipeContainer);
        this._swipeContainer.addChild(this._mainContainer);
        this._swipeContainer.addChild(this._optionsContainer);
        this._swipeContainer.addChild(this._clearedContainer.Container);
        this._swipeContainer.addChild(this._collectedContainer);

        
        this._swipeContainer.addChild(this._levelSelectDisplay.Container);

        this._fancyFish.visible = false;

        //kill any existing collectibles
        this._collectedContainer.removeAllChildren();
        this._collectibleFish.forEach(f => {
            f = null;
        });
        this._collectibleFish = [];


        //toggle sound
        if(SoundManager.IsSoundPlaying) {
            this._soundOff.alpha = 0.5;
            this._soundOn.alpha = 1;
        }
        else {
            this._soundOff.alpha = 1;
            this._soundOn.alpha = 0.5;
        }

        return super.create(stage);
    }

    public enable() {
        super.enable();
        //listen to events
        (this._mainButtonsContainer.Sprites.btnNewGame as any).on("click", this._onNewGame, this, true);
        (this._mainButtonsContainer.Sprites.btnOptions as any).on("click", this._onOptions, this);
        (this._mainButtonsContainer.Sprites.btnLevelSelect as any).on("click", this._onLevelSelect, this);
        (this._mainButtonsContainer.Sprites.btnExit as any).on("click", this._onExit, this);

        (this._fancyFish as any).on("click", this._onFish, this);

        (this._btnCheat as any).on("click", () => {
            //play the sound
            SoundManager.playSFX(LoadManager.Sounds.BTNSelect);
            //unlock all
            ProgressManager.unlockAll();
            //reload this menu
            ScreenManager.setCurrentScreen("menu", this.Stage);
        }, this);
        (this._btnResetData as any).on("click", () => {
            //play the sound
            SoundManager.playSFX(LoadManager.Sounds.BTNSelect);
            //kill all
            ProgressManager.killAll();
            ProgressManager.deleteCookieData();
            //reload this menu
            ScreenManager.setCurrentScreen("menu", this.Stage);
        }, this);
        (this._soundOff as any).on("click", () => {
            //play the sound
            SoundManager.playSFX(LoadManager.Sounds.BTNSelect);
            SoundManager.stopAllSound();
            //toggle buttons
            this._soundOff.alpha = 1;
            this._soundOn.alpha = 0.5;
        }, this);
        (this._soundOn as any).on("click", () => {
            //play the sound
            SoundManager.playSFX(LoadManager.Sounds.BTNSelect);
            SoundManager.playAllSound();
            //toggle buttons
            this._soundOff.alpha = 0.5;
            this._soundOn.alpha = 1;
        }, this);

        (this._btnLeft as any).on("click", () => {
            this._onMain();
        }, this);
        (this._btnRight as any).on("click", () => {
            this._onMain();
        }, this);
        (this._btnUp as any).on("click", () => {
            this._onMain();
        }, this);

        //listen for swipes
        (this._staticContainer.Sprites.bg as any).on("mousedown", this._onDragStart, this);
        (this._staticContainer.Sprites.bg as any).on("click", this._onDragEnd, this);

        this._levelSelectDisplay.enable();

        //testing -- add fakey collectible fish
        //get any collected fish CLASS names
        const collFish = [].concat.apply([], ProgressManager.ProgressData.specials).filter(d => d != null && d.collected).map(d => d.unlocks);

        
        collFish.forEach(f => {
            switch(f.toLowerCase()) {
                case POOL.PERSEPHONE:
                    this._collectibleFish.push(new Persephone(this._game));
                    break;
                case POOL.OWEN:
                    this._collectibleFish.push(new Owen(this._game));
                    break;
                case POOL.RILEY:
                    this._collectibleFish.push(new Riley(this._game));
                    break;
            }
        });
            

        //add the fish to the container
        this._collectibleFish.forEach(f => {
            f.setMainPage(true);
            f.create(this._collectedContainer);
            f.Speed = Math.random() * 3 + 3;
        });

        //if we don't have any collectible fish, hide the fish button
        if(collFish.length <= 0) {
            this._fancyFish.visible = false;
        }
        else {
            this._fancyFish.visible = true;
            this._fancyFish.alpha = 0;

            createjs.Tween
            .get(this._fancyFish)
            .to({ alpha:1 }, 500, createjs.Ease.circIn);
        }



        //rock the fish
        createjs.Tween
            // @ts-ignore
            .get(this._fancyFish, { loop:true })
            .to({ y:this._fancyFish.y-30 }, 3000, createjs.Ease.sineInOut)
            .to({ y:this._fancyFish.y }, 3000, createjs.Ease.sineInOut);

        //rock the logo
        createjs.Tween
            // @ts-ignore
            .get(this._logo, { loop:true })
            .wait(1200)
            .to({ y:this._logo.y-15 }, 4500, createjs.Ease.sineInOut)
            .to({ y:this._logo.y }, 4800, createjs.Ease.sineInOut);
    }

    public disable() {
        super.disable();
        //stop listen to events
        (this._mainButtonsContainer.Sprites.btnNewGame as any).off("click", this._onNewGame);
        (this._mainButtonsContainer.Sprites.btnOptions as any).off("click", this._onOptions);
        (this._mainButtonsContainer.Sprites.btnLevelSelect as any).off("click", this._onLevelSelect);
        (this._mainButtonsContainer.Sprites.btnExit as any).off("click", this._onExit);

        this._fancyFish.removeAllEventListeners();

        this._btnCheat.removeAllEventListeners();
        this._btnResetData.removeAllEventListeners();
        this._soundOff.removeAllEventListeners();
        this._soundOn.removeAllEventListeners();
        this._btnLeft.removeAllEventListeners();
        this._btnRight.removeAllEventListeners();
        this._btnUp.removeAllEventListeners();


        //stop listen for swipes
        (this._staticContainer.Sprites.bg as any).off("mousedown", this._onDragStart);
        (this._staticContainer.Sprites.bg as any).off("click", this._onDragEnd);


        this._mainButtonsContainer.Sprites.btnNewGame.removeAllEventListeners();
        this._mainButtonsContainer.Sprites.btnOptions.removeAllEventListeners();
        this._mainButtonsContainer.Sprites.btnLevelSelect.removeAllEventListeners();
        this._mainButtonsContainer.Sprites.btnExit.removeAllEventListeners();
        this._staticContainer.Sprites.bg.removeAllEventListeners();


        this._levelSelectDisplay.disable();

        this.reset();


        createjs.Tween.removeAllTweens();
    }

    public reset() {
        //reset the position of the swipe container
        this._swipeContainer.x = 0;
        this._swipeContainer.y = 0;

        super.reset();
    }

    public update(gameTime:number) {
        this._collectibleFish.forEach(f => f.update(gameTime));
    }
    /*--------------- GETTERS & SETTERS --------------*/
}