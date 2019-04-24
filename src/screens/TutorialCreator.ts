import { LoadManager } from "../managers/LoadManager";
import { Game } from "../Game";
import { GameScreen } from "./GameScreen";

/**This class creates the tutorial items.  This class will control the game and game screen when being used. */
export class TutorialCreator {
    public static get KEY() {
        return {
            "First" : "first",
            "You" : "you",
            "Fish" : "fish",
            "Puffer" : "puffer",
            "Many" : "many",
            "Pause" : "pause",
            "Special" : "special"
        }
    };

    private _game:Game;
    private _gameScreen:GameScreen;


    //tutorial overlays
    private _youOverlay:createjs.Sprite;
    private _fishOverlay:createjs.Sprite;
    private _pufferOverlay:createjs.Sprite;
    private _manyOverlay:createjs.Sprite;
    private _pauseOverlay:createjs.Sprite;
    private _specialOverlay:createjs.Sprite;

    private _currentOverlay:createjs.Sprite;
    private _tutorialQueue:string[];

    constructor(game:Game, gameScreen:GameScreen) {
        this._game = game;
        this._gameScreen = gameScreen;

        this._tutorialQueue = [];

        //build all the required screens
        this._youOverlay = new createjs.Sprite(LoadManager.Spritesheets.Tutorial_Spritesheet, "you");
        this._fishOverlay = new createjs.Sprite(LoadManager.Spritesheets.Tutorial_Spritesheet, "fish");
        this._pufferOverlay = new createjs.Sprite(LoadManager.Spritesheets.Tutorial_Spritesheet, "puffer");
        this._manyOverlay = new createjs.Sprite(LoadManager.Spritesheets.Tutorial_Spritesheet, "many");
        this._pauseOverlay = new createjs.Sprite(LoadManager.Spritesheets.Tutorial_Spritesheet, "pause");
        this._specialOverlay = new createjs.Sprite(LoadManager.Spritesheets.Tutorial_Spritesheet, "special");
    }

    /*--------------- METHODS ------------------------*/
    public async queueTutorials(keys:string[]) {

        for(let i = 0; i < keys.length; i++) {
            const key = keys[i];

            await new Promise(async(res, rej) => {

                switch(key) {
                    //first will play multiple screens
                    case TutorialCreator.KEY.First :
                        await this._runYou();
                        await this._transition(this._fishOverlay);
                        await this._runFish();
                        await this._transition(null);
                        this._gameScreen.unpauseGameLogic();
                        res();
                        break;
                    case TutorialCreator.KEY.You :
                        await this._runYou();
                        await this._transition(null);
                        this._gameScreen.unpauseGameLogic();
                        res();
                        break;
                    case TutorialCreator.KEY.Fish :
                        await this._runFish();
                        await this._transition(null);
                        this._gameScreen.unpauseGameLogic();
                        res();
                        break;
                    case TutorialCreator.KEY.Puffer :
                        await this._runPuffer();
                        await this._transition(null);
                        this._gameScreen.unpauseGameLogic();
                        res();
                        break;
                    case TutorialCreator.KEY.Special :
                        await this._runSpecial();
                        await this._transition(null);
                        this._gameScreen.unpauseGameLogic();
                        res();
                        break;

                }

            });
        }
        
    }

    private async _transition(nextScreen) {
        let promises = [];
        //if we have a current screen, wait for it to fade out
        if(this._currentOverlay != null) {
            promises.push(
                new Promise(async(res) => {
                    //fade out
                    createjs.Tween
                        .get(this._currentOverlay)
                        .to({ alpha:0 }, 500, createjs.Ease.linear)
                        .call(() => {
                            this._gameScreen.Container.removeChild(this._currentOverlay);
                            res();
                        });
                })
            );
        }

        //wait for certain actions to finish
        return new Promise(async(res) => {
            //wait for promises to finish
            await Promise.all(promises);

            //if we are transitioning to null, just end us
            if(nextScreen == null) {
                this._currentOverlay.alpha = 1;
                res();
                return;
            }

            this._currentOverlay.alpha = 1;

            //now add in the new one
            this._currentOverlay = nextScreen;
            this._gameScreen.Container.addChild(this._currentOverlay);
            this._currentOverlay.alpha = 0;

            //fade in
            createjs.Tween
                .get(this._currentOverlay)
                .to({ alpha:1 }, 500, createjs.Ease.linear)
                .call(() => {
                    res();
                });

        });

    }


    private async _runYou() {

        return new Promise((res, rej) => {
            this._currentOverlay = this._youOverlay;

            const catStart = this._gameScreen.Cat.Y;
            //move the cat hand
            
            this._gameScreen.Cat.Y = 80;
            //pause the game
            this._gameScreen.pauseGameLogic();
            //overlay screen
            this._gameScreen.Container.addChild(this._youOverlay);
            //listen for screen click
            (this._game.Stage).on("pressup", () => { 
                //put cat paw back to start Y
                this._gameScreen.Cat.Y = catStart;
                res();
            }, true, true);

        });
        
    }

    private async _runFish() {

        return new Promise((res, rej) => {
            this._currentOverlay = this._fishOverlay;
            //pause the game
            this._gameScreen.pauseGameLogic();
            //overlay screen
            this._gameScreen.Container.addChild(this._fishOverlay);
            //listen for screen click
            (this._game.Stage).on("pressup", () => { 
                res();
            }, true, true);
        });

    }

    private async _runPuffer() {

        return new Promise((res, rej) => {
            this._currentOverlay = this._pufferOverlay;
            //pause the game
            this._gameScreen.pauseGameLogic();
            //overlay screen
            this._gameScreen.Container.addChild(this._pufferOverlay);
            //listen for screen click
            (this._game.Stage).on("pressup", () => { 
                res();
            }, true, true);
        });

    }

    private async _runSpecial() {

        return new Promise((res, rej) => {
            this._currentOverlay = this._specialOverlay;
            //pause the game
            this._gameScreen.pauseGameLogic();
            //overlay screen
            this._gameScreen.Container.addChild(this._specialOverlay);
            //listen for screen click
            (this._game.Stage).on("pressup", () => { 
                res();
            }, true, true);
        });

    }
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    /*--------------- GETTERS & SETTERS --------------*/
}