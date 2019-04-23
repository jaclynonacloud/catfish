import { Game } from "../Game";
import { Entity } from "./Entity";
import { LoadManager } from "../managers/LoadManager";
import { IEnableable } from "../Interfaces";
import { Logging } from "../Functions";
import { GameScreen } from "../screens/GameScreen";
import { Cat } from "./Cat";

export class Puffer extends Entity implements IEnableable {
    public get Type() { return "Puffer"; }
    
    private _speed:number;
    private _cooldown:number = 40;
    private _currentCooldown:number = 0;

    private _isCaught:boolean;

    constructor(gameScreen:GameScreen) {
        super(gameScreen, LoadManager.Spritesheets.Puffer_Spritesheet);
        this._speed = 1;

        this._isCaught = false;

        this._sprite.gotoAndPlay(Puffer.ANIMATION.Idle);
    }

    /*--------------- METHODS ------------------------*/
    


    /***************/
    /*   ACTIONS   */
    /***************/
    public puff() {
        this._sprite.gotoAndPlay(Puffer.ANIMATION.Angry);
        //start cooldown
        this._currentCooldown = this._cooldown;
    }


    /**Test to see if global position hits sprite. */
    public testHit(x:number, y:number, cat:Cat):boolean {
        return (x >= this.X - cat.Bounds.Width && x <= this.X + this.Bounds.Width 
            && y >= this.Y - cat.Bounds.Height && y <= this.Y + this.Bounds.Height) ;
        // return this._sprite.hitTest(x, y);
    }
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    destroy() {
        //reset flags
        this._isCaught = false;
        //reset animations
        this._sprite.gotoAndPlay(Puffer.ANIMATION.Idle);

        this.disable();
        return super.destroy();
    }

    update(gameTime:number) {
        super.update(gameTime);

        //move the fishy
        if(!this._isCaught)
            this.X += this._speed * gameTime * this._direction.x;

        //do cooldown
        if(this._currentCooldown >= 0) {
            this._currentCooldown--;
            if(this._currentCooldown == 0) {
                //reset animations
                this._sprite.gotoAndPlay(Puffer.ANIMATION.Recover);
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
            "Idle" : "pufferIdle",
            "Angry" : "pufferAngry",
            "Recover" : "pufferRecover"
        });
    }
    public get Speed() { return this._speed; }
    public set Speed(value:number) { this._speed = value; }
}