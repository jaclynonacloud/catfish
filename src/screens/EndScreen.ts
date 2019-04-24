import { Screen } from "./Screen";
import { ScreenManager } from "../managers/ScreenManager";
import { Container } from "../ui/display/Container";
import { Sprites } from "../ui/Sprites";
import { LoadManager } from "../managers/LoadManager";
import { Game } from "../Game";

export class EndScreen extends Screen {
    private _game:Game;
    private _splash:createjs.Shape;
    private _buttonsContainer:Container;

    private _highScoreSpr:createjs.Sprite;
    private _completeSpr:createjs.DisplayObject;
    private _failSpr:createjs.DisplayObject;
    private _scoreContainer:Container;

    //scorebox holders
    private _fishRemainContainer:createjs.Container;
    private _timeContainer:createjs.Container;
    private _combosContainer:createjs.Container;

    //flags
    private _isFail:boolean;
    
    constructor(game:Game) {
        super();

        this._game = game;
        this._isFail = false;

        //layout stuff
        const bg = new createjs.Sprite(LoadManager.Spritesheets.Catfish_End, "bg");
        this._container.addChild(bg);

        this._buttonsContainer = new Container(Container.LAYOUT_OPTIONS.ColumnLeftBottom);
        this._buttonsContainer.addMany({
            btnTryAgain : new createjs.Sprite(LoadManager.Spritesheets.Catfish_End, "btnTryAgain"),
            btnNextLevel : new createjs.Sprite(LoadManager.Spritesheets.Catfish_End, "btnNextLevel"),
            btnMainMenu : new createjs.Sprite(LoadManager.Spritesheets.Catfish_End, "btnMainMenu"),
        });
        this._container.addChild(this._buttonsContainer.Container);

        // //conditionals
        // //--high score
        // this._highScoreSpr = new createjs.Sprite(LoadManager.Spritesheets.Catfish_End, "highScore");
        // this._highScoreSpr.x = this._game.StageWidth / 2 - (this._highScoreSpr.getBounds().width / 2);
        // this._highScoreSpr.y = 60;
        // this._container.addChild(this._highScoreSpr);
        //--conditional text
        this._completeSpr = new createjs.Sprite(LoadManager.Spritesheets.Catfish_End, "complete");
        this._failSpr = new createjs.Sprite(LoadManager.Spritesheets.Catfish_End, "failure");
        this._completeSpr.x = this._game.StageWidth / 2 - (this._completeSpr.getBounds().width / 2);
        this._completeSpr.y = 220;
        this._failSpr.x = this._game.StageWidth / 2 - (this._failSpr.getBounds().width / 2);
        this._failSpr.y = this._game.StageHeight * 0.45;
        this._container.addChild(this._completeSpr);
        this._container.addChild(this._failSpr);
        // --score container
        // this._scoreContainer = new Container(Container.LAYOUT_OPTIONS.ColumnCenterCenter);
        // this._scoreContainer.addMany({
        //     fishRemain: new createjs.Sprite(LoadManager.Spritesheets.Catfish_End, "fishRemain"),
        //     time: new createjs.Sprite(LoadManager.Spritesheets.Catfish_End, "time"),
        //     combos: new createjs.Sprite(LoadManager.Spritesheets.Catfish_End, "combos"),
        //     line: new createjs.Sprite(LoadManager.Spritesheets.Catfish_End, "line")
        // });
        // const scoreX = 250;
        // this._scoreContainer.Sprites["fishRemain"].x = scoreX - (this._scoreContainer.Sprites["fishRemain"].getBounds().width);
        // this._scoreContainer.Sprites["time"].x = scoreX - (this._scoreContainer.Sprites["time"].getBounds().width);
        // this._scoreContainer.Sprites["combos"].x = scoreX - (this._scoreContainer.Sprites["combos"].getBounds().width);
        // this._scoreContainer.Sprites["line"].x = this._game.StageWidth - this._scoreContainer.Sprites["line"].getBounds().width - 30;
        // this._scoreContainer.Sprites["line"].y += 15;
        // this._container.addChild(this._scoreContainer.Container);

        //line them up
        // this._fishRemainContainer = new createjs.Container();
        // this._timeContainer = new createjs.Container();
        // this._combosContainer = new createjs.Container();
        // this._container.addChild(this._fishRemainContainer);
        // this._container.addChild(this._timeContainer);
        // this._container.addChild(this._combosContainer);

        // this._fishRemainContainer.x = scoreX + 20;
        // this._fishRemainContainer.y = this._scoreContainer.Sprites["fishRemain"].y;
        // this._timeContainer.x = scoreX + 20;
        // this._timeContainer.y = this._scoreContainer.Sprites["time"].y;
        // this._combosContainer.x = scoreX + 20;
        // this._combosContainer.y = this._scoreContainer.Sprites["combos"].y;


        // const peeper = new createjs.Sprite(LoadManager.Spritesheets.Kitty_Spritesheet);
        // peeper.gotoAndPlay("kittyIdle");
        // this._container.addChild(peeper);

        
        
    }

    /*--------------- METHODS ------------------------*/
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    create(stage:createjs.StageGL):Screen {
        
        
        //for testing
        (this._container as any).on("click", (e) => {
            ScreenManager.setCurrentScreen("menu", stage);
        }, this, true);       
        

        return super.create(stage);
    }


    enable() {
        super.enable();

        //fake score data
        // this._game.changeCurrentScore({ totalFish:10, time:150, combos:2 });

        // //toggle data based on current level stats
        // const levelData = this._game.CurrentLevelData;
        // //look for flags
        // const showFishRemain = (levelData.showRemainingFish != null && !levelData.showRemainingFish) ? false : true;
        // const showScore = (levelData.showScore != null && !levelData.showScore) ? false : true;
        // const showTime = (levelData.duration != null);


        // //layout score data
        // const { totalFish, time, combos } = this._game.CurrentScoreData;
        // const txtFishRemain = Sprites.generateBitmapText((showFishRemain) ? totalFish.toString() : "-", LoadManager.Spritesheets.TypographyWhite);
        // this._fishRemainContainer.addChild(txtFishRemain);
        // const txtTime = Sprites.generateBitmapText((showTime) ? time.toString() : "-", LoadManager.Spritesheets.TypographyWhite);
        // this._timeContainer.addChild(txtTime);
        // const txtCombos = Sprites.generateBitmapText((showScore) ? combos.toString() : "-", LoadManager.Spritesheets.TypographyWhite);
        // this._combosContainer.addChild(txtCombos);

    }

    disable() {

        //kill score containers
        // this._fishRemainContainer.removeAllChildren();
        // this._timeContainer.removeAllChildren();
        // this._combosContainer.removeAllChildren();

        //toggle fail/success
        this._completeSpr.visible = !this._isFail;
        this._failSpr.visible = this._isFail;
    }
    /*--------------- GETTERS & SETTERS --------------*/
}