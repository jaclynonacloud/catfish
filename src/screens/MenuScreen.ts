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
import { GameScreen } from "./GameScreen";
import { DataManager } from "../managers/DataManager";

export class MenuScreen extends Screen {
    private _game:Game;
    //containers
    private _swipeContainer:createjs.Container;
    private _staticContainer:Container;
    // private _mainContainer:Container;
    private _mainContainer:createjs.Container;
    private _clearedContainer:Container;
    private _optionsContainer:Container;

    private _mainButtonsContainer:Container;
    private _logo:createjs.DisplayObject;
    private _fancyFish:createjs.Sprite;

    //custom containers
    private _levelSelectDisplay:LevelSelectDisplay;

    //properties
    private _swipeSpeed:number;
    private _currentScreen:string;
    private _initialSwipePos:{x:number, y:number};
    private _dragTimer:any;

    
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
            btnNewGame : new createjs.Sprite(LoadManager.Spritesheets.Catfish_Main, "btnNewGame"),
            btnOptions : new createjs.Sprite(LoadManager.Spritesheets.Catfish_Main, "btnOptions"),
            btnLevelSelect : new createjs.Sprite(LoadManager.Spritesheets.Catfish_Main, "btnLevelSelect"),
            btnExit : new createjs.Sprite(LoadManager.Spritesheets.Catfish_Main, "btnExit"),
        });
        this._mainContainer.addChild(this._mainButtonsContainer.Container);
        this._fancyFish = new createjs.Sprite(LoadManager.Spritesheets.Catfish_Main, "fancyFish");
        this._fancyFish.x = this._game.StageWidth - this._fancyFish.getBounds().width - 20;
        this._fancyFish.y = this._game.StageHeight - this._fancyFish.getBounds().height - 20;
        this._mainContainer.addChild(this._fancyFish);
        // this._mainContainer.addMany({
        //     logo : new createjs.Sprite(LoadManager.Spritesheets.Catfish_Main, "logo"),
        //     fishbowl : Sprites.Buttons.Fishbowl,
        //     btnNewGame : new createjs.Sprite(LoadManager.Spritesheets.Catfish_Main, "btnNewGame"),
        //     btnOptions : Sprites.Buttons.Options,
        //     btnLevelSelect : Sprites.Buttons.LevelSelect,
        //     btnExit : Sprites.Buttons.Exit
        // });

        //setup options container
        this._optionsContainer = new Container();
        this._optionsContainer.addMany({
            txtOptions : Sprites.generateBitmapText("Options", LoadManager.Spritesheets.Typography),
            btnClearData : Sprites.Buttons.ClearData
        });
        this._optionsContainer.Container.x -= this._game.StageWidth;

        //setup cleared container
        this._clearedContainer = new Container();
        this._clearedContainer.add("txtCleared", Sprites.generateBitmapText("Data successfully cleared!", LoadManager.Spritesheets.Typography));
        this._clearedContainer.Container.x -= this._game.StageWidth;
        this._clearedContainer.Container.y -= this._game.StageHeight;

        this._levelSelectDisplay = new LevelSelectDisplay(game);
        this._levelSelectDisplay.Container.x += this._game.StageWidth;


        //setup properties
        this._swipeSpeed = 800;
        this._currentScreen = "main";
        this._initialSwipePos = { x:-1, y:-1 };

    }

    /*--------------- METHODS ------------------------*/
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    private _onNewGame() {
        Logging.message("Go to new game!");
        
        const data = DataManager.getLevelDataByIndex(0);
        
        const intermediary = ScreenManager.getScreenByKey("intermediary") as IntermediaryScreen;
        new Promise(async(res) => {
            intermediary.Text = data.name;
            await ScreenManager.setCurrentScreen(intermediary, this.Stage);
            intermediary.queueNextScreen("game");

            res();
        });
    }
    private _onOptions() {
        //go to options!
        Logging.message("Go to options!");
        createjs.Tween.get(this._swipeContainer).to({x:this._game.StageWidth}, this._swipeSpeed, createjs.Ease.circOut);
        this._currentScreen = "options";
    }
    private _onLevelSelect() {
        Logging.message("Go to level select!");
        createjs.Tween.get(this._swipeContainer).to({x:-this._game.StageWidth}, this._swipeSpeed, createjs.Ease.circOut);
        this._currentScreen = "levelSelect";
    }
    private _onExit() {
        Logging.message("Go to exit!");
    }

    private _onMain() {
        Logging.message("Go to main!");
        createjs.Tween.get(this._swipeContainer).to({x:0}, this._swipeSpeed, createjs.Ease.bounceOut);
        this._currentScreen = "main";
    }

    private _onClearData() {
        Logging.success("Cleared data!");
        createjs.Tween.get(this._swipeContainer).to({x:this._game.StageWidth, y:this._game.StageHeight}, this._swipeSpeed, createjs.Ease.cubicIn);
        // this._currentScreen = "cleared"
        let e = window.setTimeout(() => {
            createjs.Tween.get(this._swipeContainer).to({x:this._game.StageWidth, y:0}, this._swipeSpeed, createjs.Ease.cubicInOut);
            window.clearInterval(e);
            this._currentScreen = "options";
        }, 2000);
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
        }
    }

    /*--------------- OVERRIDES ----------------------*/
    public create(stage:createjs.StageGL):Screen {

        //add in the containers
        this._staticContainer.Sprites.bg.y = 0;
        this._container.addChild(this._staticContainer.Container);
        this._container.addChild(this._swipeContainer);
        this._swipeContainer.addChild(this._mainContainer);
        this._swipeContainer.addChild(this._optionsContainer.Container);
        this._swipeContainer.addChild(this._clearedContainer.Container);
        // this._swipeContainer.addChild(this._levelSelectContainer.Container);

        
        this._swipeContainer.addChild(this._levelSelectDisplay.Container);

        return super.create(stage);
    }

    public enable() {
        console.log("LOAD IN MENU ACTIONS");
        super.enable();
        //listen to events
        (this._mainButtonsContainer.Sprites.btnNewGame as any).on("click", this._onNewGame, this, true);
        (this._mainButtonsContainer.Sprites.btnOptions as any).on("click", this._onOptions, this);
        (this._mainButtonsContainer.Sprites.btnLevelSelect as any).on("click", this._onLevelSelect, this);
        (this._mainButtonsContainer.Sprites.btnExit as any).on("click", this._onExit, this);

        Sprites.listenToClearData();
        (this._optionsContainer.Sprites.btnClearData as any).on(Sprites.CLEAR_DATA, this._onClearData, this);

        //listen for swipes
        (this._staticContainer.Sprites.bg as any).on("mousedown", this._onDragStart, this);
        (this._staticContainer.Sprites.bg as any).on("click", this._onDragEnd, this);

        // this._mainButtonsContainer.Sprites.btnOptions.on("click", () => console.log("HELLO I CLIC"));

        this._levelSelectDisplay.enable();



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

        Sprites.stopListenToClearData();
        (this._optionsContainer.Sprites.btnClearData as any).off(Sprites.CLEAR_DATA, this._onClearData);

        //stop listen for swipes
        (this._staticContainer.Sprites.bg as any).off("mousedown", this._onDragStart);
        (this._staticContainer.Sprites.bg as any).off("click", this._onDragEnd);


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
    /*--------------- GETTERS & SETTERS --------------*/
}