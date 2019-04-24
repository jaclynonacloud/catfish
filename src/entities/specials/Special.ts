import { LoadManager } from "../../managers/LoadManager";
import { Fish } from "../Fish";
import { GameScreen } from "../../screens/GameScreen";

export abstract class Special extends Fish {
    private _isOnMainPage:boolean;
    private _desiredY:number;
    private _attnSpanDuration:number; //how long before fish wants to do something else

    constructor(gameScreen:GameScreen, spritesheet:createjs.SpriteSheet) {
        super(gameScreen, spritesheet);
        this._isOnMainPage = false;

        this._resetAttentionSpan();
    }


    /*--------------- METHODS ------------------------*/
    public setMainPage(isOnMainPage) {
        this._isOnMainPage = isOnMainPage;
    }

    private _resetAttentionSpan() {
        this._attnSpanDuration = Math.random() * 100 + 10;
        this._desiredY = Math.random() * 1024;
        //do a flip?
        if(Math.random() > 0.5) this.Sprite.scaleX *= -1;
    }
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    /**Extend update for main menu logic. */
    public update(gameTime:number) {
        super.update(gameTime);

        //listen for main page logic
        if(this._isOnMainPage) {
            //move to random y pos every once in a while
            if(this._attnSpanDuration <= 0) this._resetAttentionSpan();
            this._attnSpanDuration--;

            //float toward y
            if(Math.abs(this.Y - this._desiredY) > 30) {
                const isNeg = this.Y > this._desiredY;
                this.Y += (isNeg) ? -10 : 10;
            }
        }
    }
    /*--------------- GETTERS & SETTERS --------------*/




}