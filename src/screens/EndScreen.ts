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
    
    constructor(game:Game) {
        super();

        this._game = game;


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

        //conditionals
        //--high score
        this._highScoreSpr = new createjs.Sprite(LoadManager.Spritesheets.Catfish_End, "highScore");
        this._highScoreSpr.x = this._game.StageWidth / 2 - (this._highScoreSpr.getBounds().width / 2);
        this._highScoreSpr.y = 60;
        this._container.addChild(this._highScoreSpr);
        //--conditional text
        this._completeSpr = new createjs.Sprite(LoadManager.Spritesheets.Catfish_End, "complete");
        this._failSpr = new createjs.Sprite(LoadManager.Spritesheets.Catfish_End, "failure");
        this._completeSpr.x = this._game.StageWidth / 2 - (this._completeSpr.getBounds().width / 2);
        this._completeSpr.y = 220;
        this._failSpr.x = this._game.StageWidth / 2 - (this._failSpr.getBounds().width / 2);
        this._failSpr.y = this._game.StageHeight * 0.45;
        this._container.addChild(this._completeSpr);
        this._container.addChild(this._failSpr);
        //--score container
        this._scoreContainer = new Container(Container.LAYOUT_OPTIONS.ColumnCenterCenter);
        this._scoreContainer.addMany({
            fishRemain: new createjs.Sprite(LoadManager.Spritesheets.Catfish_End, "fishRemain"),
            time: new createjs.Sprite(LoadManager.Spritesheets.Catfish_End, "time"),
            combos: new createjs.Sprite(LoadManager.Spritesheets.Catfish_End, "combos"),
            line: new createjs.Sprite(LoadManager.Spritesheets.Catfish_End, "line")
        });
        const scoreX = 250;
        this._scoreContainer.Sprites["fishRemain"].x = scoreX - (this._scoreContainer.Sprites["fishRemain"].getBounds().width);
        this._scoreContainer.Sprites["time"].x = scoreX - (this._scoreContainer.Sprites["time"].getBounds().width);
        this._scoreContainer.Sprites["combos"].x = scoreX - (this._scoreContainer.Sprites["combos"].getBounds().width);
        this._scoreContainer.Sprites["line"].x = this._game.StageWidth - this._scoreContainer.Sprites["line"].getBounds().width - 30;
        this._container.addChild(this._scoreContainer.Container);
        
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
    /*--------------- GETTERS & SETTERS --------------*/
}