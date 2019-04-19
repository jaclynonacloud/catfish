import { Game } from "../../Game";
import { Sprites } from "../Sprites";
import { LoadManager } from "../../managers/LoadManager";

/**Creates a display container for the game screen. */
export class GameScore {
    private _game:Game;
    private _container:createjs.Container;
    private _bg:createjs.Shape;
    private _txtTimer:createjs.DisplayObject;

    private _timerContainer:createjs.Container;
    private _timerTextContainer:createjs.Container;
    private _fishRemainContainer:createjs.Container;
    private _fishRemainTextContainer:createjs.Container;
    private _scoreContainer:createjs.Container;
    private _scoreTextContainer:createjs.Container;

    //game conditions
    private _useTimer:boolean = false;
    private _useFishRemain:boolean = true;
    private _useScore:boolean = true;

    constructor(game:Game) {
        this._game = game;
        //create the initial objects
        this._container = new createjs.Container();
        this._bg = new createjs.Shape();
        this._bg.graphics.beginFill("#000000");
        this._bg.graphics.drawRect(0, 0, this._game.StageWidth, 40);
        this._bg.graphics.endFill();
        this._bg.cache(0, 0, this._game.StageWidth, 40);
        this._container.addChild(this._bg);

        //create the container objects
        //timer
        this._timerContainer = new createjs.Container();
        this._timerContainer.x += 10;
        const timerSprite = Sprites.Graphics.Timer.clone();
        this._timerContainer.addChild(timerSprite);
        this._timerTextContainer = new createjs.Container();
        this._timerTextContainer.y += 8;
        this._timerTextContainer.x += Sprites.Graphics.Timer.getBounds().width + 10;
        this._timerContainer.addChild(this._timerTextContainer);
        this._container.addChild(this._timerContainer);

        //fish remain
        this._fishRemainContainer = new createjs.Container();
        const fishRemainSprite = Sprites.Graphics.FishRemain.clone();
        this._fishRemainContainer.addChild(fishRemainSprite);
        this._fishRemainTextContainer = new createjs.Container();
        this._fishRemainTextContainer.y += 8;
        this._fishRemainTextContainer.x += Sprites.Graphics.FishRemain.getBounds().width + 10;
        this._fishRemainContainer.addChild(this._fishRemainTextContainer);
        this._container.addChild(this._fishRemainContainer);

        //score
        this._scoreContainer = new createjs.Container();
        this._scoreContainer.x = this._game.StageWidth - Sprites.Graphics.Score.getBounds().width - 40;
        const scoreSprite = Sprites.Graphics.Score.clone();
        this._scoreContainer.addChild(scoreSprite);
        this._scoreTextContainer = new createjs.Container();
        this._scoreTextContainer.y += 8;
        this._scoreTextContainer.x += Sprites.Graphics.Score.getBounds().width + 10;
        this._scoreContainer.addChild(this._scoreTextContainer);
        this._container.addChild(this._scoreContainer);
        
    }

    /*--------------- METHODS ------------------------*/
    public startHUD(showScore:boolean, showFishRemain:boolean, showTimer:boolean) {
        this._useScore = showScore;
        this._useFishRemain = showFishRemain;
        this._useTimer = showTimer;

        console.log("SHOW ME THE SCORE, REMAIN, TIMER", showScore, showFishRemain, showTimer);

        if(this._useScore) this._container.addChild(this._scoreContainer);
        else this._container.removeChild(this._scoreContainer);

        if(this._useFishRemain) this._container.addChild(this._fishRemainContainer);
        else this._container.removeChild(this._fishRemainContainer);

        if(this._useTimer) this._container.addChild(this._timerContainer);
        else this._container.removeChild(this._timerContainer);
    }
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    public update(gameTime:number) {
        
        //get the game timer
        let timer = gameTime;
        this._timerTextContainer.removeAllChildren();
        let timerCont = Sprites.generateBitmapText(this._game.CurrentLevelData.currentTime.toString(), LoadManager.Spritesheets.ScoreHUD_Spritesheet);
        this._timerTextContainer.addChild(timerCont);

        //get the fish remain score
        let fishRemain = gameTime;
        this._fishRemainTextContainer.removeAllChildren();
        let fishRemainCont = Sprites.generateBitmapText(this._game.CurrentLevelData.remainingFish.toString(), LoadManager.Spritesheets.ScoreHUD_Spritesheet);
        this._fishRemainTextContainer.addChild(fishRemainCont);
        this._fishRemainContainer.x = (this._game.StageWidth / 2) - (this._fishRemainContainer.getBounds().width / 2);

        //get the score
        let score = gameTime;
        this._scoreTextContainer.removeAllChildren();
        let scoreCont = Sprites.generateBitmapText(this._game.CurrentLevelData.score.toString(), LoadManager.Spritesheets.ScoreHUD_Spritesheet);
        this._scoreTextContainer.addChild(scoreCont);
        this._scoreContainer.x = this._game.StageWidth - this._scoreContainer.getBounds().width - 40;
    }
    /*--------------- GETTERS & SETTERS --------------*/
    public get Container() { return this._container; }

}