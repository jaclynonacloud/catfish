import { Game } from "../Game";
import { Entity } from "./Entity";
import { LoadManager } from "../managers/LoadManager";
import { IEnableable } from "../Interfaces";
import { Logging } from "../Functions";
import { GameScreen } from "../screens/GameScreen";

export class Fish extends Entity implements IEnableable {
    private _speed:number;
    private _naturalY:number;

    private _isCaught:boolean;
    private _isReturning:boolean;

    constructor(gameScreen:GameScreen) {
        super(gameScreen, LoadManager.Spritesheets.Peeper_Spritesheet);
        this._speed = 1;

        this._isCaught = false;
        this._isReturning = false;

        this._sprite.gotoAndPlay(Fish.ANIMATION.Slow);
    }

    /*--------------- METHODS ------------------------*/
    


    /***************/
    /*   ACTIONS   */
    /***************/
    public setNaturalY() {
        this._naturalY = this.Y;
    }

    public catch() {
        if(this._isCaught) return;
        
        Logging.message("Fish was grabbed!");
        this._isCaught = true;

        this._sprite.gotoAndPlay(Fish.ANIMATION.Panic);
    }

    public release() {
        this._isCaught = false;
        //return to natural y position
        this._isReturning = true;
    }


    /**Test to see if global position hits sprite. */
    public testHit(x:number, y:number):boolean {
        return this._sprite.hitTest(x, y);
    }
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    destroy() {
        //reset flags
        this._isCaught = false;
        //reset animations
        this._sprite.gotoAndPlay(Fish.ANIMATION.Slow);

        this.disable();
        return super.destroy();
    }

    update(gameTime:number) {
        super.update(gameTime);

        //move the fishy
        if(!this._isCaught)
            this.X += this._speed * gameTime * this._direction.x;
        //--if returning, swim to natural y
        if(this._isReturning) {
            //if we are still far away, swim!
            if(Math.abs(this.Y - this._naturalY) > 30) {
                const isNeg = this.Y > this._naturalY;
                this.Y += (isNeg) ? -10 : 10;
            }
            else {
                this._isReturning = false;
                this._sprite.gotoAndPlay(Fish.ANIMATION.Slow);
            }
        }

        //test collision
        if(!this.IsIgnoringCollision) {

            //if fish hits the edge, flip direction
            const hit = this.testStageBounds({x:0.5, y:0.5});
            switch(hit) {
                case Entity.HIT.Right:
                    this._direction.x *= -1;
                    this._sprite.scaleX *= -1;
                    this.startIgnoreCollision();
                    this.X -= 5 - this.Bounds.Width;
                    break;
                case Entity.HIT.Left:
                    this._direction.x *= -1;
                    this._sprite.scaleX *= -1;
                    this.startIgnoreCollision();
                    this.X += 5 - this.Bounds.Width;
                    break;
            }
        }
    }


    enable() {

    }

    disable() {

    }
    /*--------------- GETTERS & SETTERS --------------*/
    public static get ANIMATION() {
        return Object.freeze({
            "Slow" : "fishIdle",
            "Fast" : "fishIdle",
            "Panic" : "fishPanic"
        });
    }
    public get Speed() { return this._speed; }
    public set Speed(value:number) { this._speed = value; }
}