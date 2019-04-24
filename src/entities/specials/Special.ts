import { Fish } from "../Fish";
import { Game } from "../../Game";

export abstract class Special extends Fish {
    private _isOnMainPage:boolean;
    private _desiredX:number;
    private _desiredY:number;
    private _attnSpanDuration:number; //how long before fish wants to do something else

    constructor(game:Game, spritesheet:createjs.SpriteSheet) {
        super(game, spritesheet);
        this._isOnMainPage = false;

        this._resetAttentionSpan();
    }


    /*--------------- METHODS ------------------------*/
    public setMainPage(isOnMainPage) {
        this._isOnMainPage = isOnMainPage;
        //randomly place on the page
        this.X = Math.floor(Math.random() * (576 - this.Sprite.getBounds().width));
        this.Y = Math.floor(Math.random() * (1024 - this.Sprite.getBounds().height));
        // this.X = Math.floor(Math.random() * (window.innerWidth - this.Sprite.getBounds().width));
        // this.Y = Math.floor(Math.random() * (window.innerHeight - this.Sprite.getBounds().height));

        //set reg to center
        this.Sprite.regX = this.Sprite.getBounds().width / 2;
    }

    private _resetAttentionSpan() {
        this._attnSpanDuration = Math.random() * 100 + 100;
        this._desiredX = Math.floor(Math.random() * (576 - this.Sprite.getBounds().width));
        this._desiredY = Math.floor(Math.random() * (1024 - this.Sprite.getBounds().height));
        // this._desiredX = Math.floor(Math.random() * (window.innerWidth - this.Sprite.getBounds().width));
        // this._desiredY = Math.floor(Math.random() * (window.innerHeight - this.Sprite.getBounds().height));

        //do a flip?
        if(this.DirectionX > 0 && this._desiredX < this.X)  this.DirectionX *= -1;
        if(this.DirectionX < 0 && this._desiredX > this.X)  this.DirectionX *= -1;
    }
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    /**Extend update for main menu logic. */
    public update(gameTime:number) {

        //listen for main page logic
        if(this._isOnMainPage) {
            //move to random y pos every once in a while
            if(this._attnSpanDuration <= 0) this._resetAttentionSpan();
            else this._attnSpanDuration--;

            //float toward X
            if(Math.abs(this.X - this._desiredX) > 60) {
                const isNeg = this.X > this._desiredX;
                this.X += (isNeg) ? -this.Speed : this.Speed;
            }
            //float toward y
            if(Math.abs(this.Y - this._desiredY) > 30) {
                const isNeg = this.Y > this._desiredY;
                this.Y += (isNeg) ? -this.Speed : this.Speed;
            }
        }
        else super.update(gameTime);
    }
    /*--------------- GETTERS & SETTERS --------------*/




}