import { Game } from "../Game";
import { Entity } from "./Entity";
import { LoadManager } from "../managers/LoadManager";
import { IEnableable } from "../Interfaces";
import { Logging } from "../Functions";
import { GameScreen } from "../screens/GameScreen";
import { Fish } from "./Fish";

export class Cat extends Entity implements IEnableable {
    private _speed:number;
    private _fishCaughtMultiplier:number; //this will be the rate at which the cat slows down when rising per fish

    private _catYTween:createjs.Tween;
    private _caughtFish:Fish[];

    private _isGrabbing:boolean;
    private _isRising:boolean;
    private _hasReachedSurface:boolean;

    constructor(gameScreen:GameScreen) {
        super(gameScreen, LoadManager.Spritesheets.Kitty_Spritesheet);
        // super(gameScreen, LoadManager.Spritesheets.Cat_Spritesheet);
        this._speed = 3;
        this._fishCaughtMultiplier = 0.05;

        this._caughtFish = [];
        this._isGrabbing = false;
        this._isRising = false;
        this._hasReachedSurface = true;

        this._sprite.gotoAndPlay(Cat.ANIMATION.Idle);
    }

    /*--------------- METHODS ------------------------*/
    enable() {

    }

    disable() {

    }


    /***************/
    /*   ACTIONS   */
    /***************/
    public grab() {
        //cannot grab if we are not at surface
        if(!this._hasReachedSurface) return;

        this._isGrabbing = true;
        this._hasReachedSurface = false;

        //move to x position
        this.X = this.GameScreen.Game.Stage.mouseX;


        console.log("START SPEED:", this.Speed);

        //grab to y position
        const speed = (this.GameScreen.Game.Stage.mouseY / 2) * this.Speed;
        this._catYTween = createjs.Tween
            .get(this._sprite)
            .to({ y:this.GameScreen.Game.Stage.mouseY }, speed, createjs.Ease.circIn)
            .call(() => {
                //once the grab is done, turn off flag
                this._isGrabbing = false;

                 //play animations
                this._sprite.gotoAndPlay(Cat.ANIMATION.Grab);
                //listen for animation to finish
                (this._sprite as any).on("animationend", () => {
                    this._sprite.gotoAndPlay(Cat.ANIMATION.Hold);
                }, true);

                //try to grab a fish
                const fishes = this.GameScreen.tryToGrabFishes(this.X , this.Y);
                //see if a fish was grabbed
                if(fishes.length > 0) this.caught(fishes);
                else this.returnToSurface();
            });

    }

    /**
     * Called to return cat to surface.
     */
    public returnToSurface() {
        this._sprite.gotoAndPlay(Cat.ANIMATION.Idle);

        //remove any lingering tweens
        createjs.Tween.removeTweens(this._sprite);
        const speed = (this.Y / 2) * this.Speed;
        this._catYTween = createjs.Tween.get(this._sprite)
            .wait(150)
            .to({y:20}, speed, createjs.Ease.linear)
            .call(() => {
                //once the surface has been reached, allow x movement again
                this.reachSurface();
            });
    }

    public caught(fishes:Fish[]) {
        console.log("I CAUGHT");
        if(fishes.length <= 0) return;
        this._isRising = true;  
        
        let hasNewFish = false;

        fishes.forEach(f => {
            if(this._caughtFish.indexOf(f) != -1) return;
            hasNewFish = true;
            //grab the fish
            f.catch();

            //add fish to caught array
            this._caughtFish.push(f);

            //control the fish
            f.Y = this.Y;
        });
        
        console.log("I WAS CAUGHT, NOW RISING");
        console.log("FISH CAUGHT SPEED:", this.Speed);

        if(!hasNewFish) return;
        
        //if we grabbed a fish...
        //go back up... slowly
        createjs.Tween.removeTweens(this._sprite);
        const speed = this.Y * this.Speed;
        this._catYTween = createjs.Tween.get(this._sprite)
            .wait(250)
            .to({y:-20}, speed, createjs.Ease.linear)
            .call(() => {
                //once the surface has been reached, allow x movement again
                this.reachSurface();
                this._isRising = false;
            });

    }
    public drop() {
        //release the fish
        // this._caughtFish.dropped();
        this._caughtFish = [];
        //return quickly
        this.returnToSurface();
    }

    /**Called when hit by an enemy. */
    public injure(enemy) {
        //start hurt animation
        //end any current tweening
        createjs.Tween.removeTweens(this._sprite);
        this._sprite.gotoAndPlay(Cat.ANIMATION.Ow);
        this._catYTween = createjs.Tween.get(this._sprite)
            .wait(30)
            .to({y:20}, 1000, createjs.Ease.linear)
            .call(() => {
                //once the surface has been reached, allow x movement again
                this.reachSurface();
                this._sprite.gotoAndPlay(Cat.ANIMATION.Idle);
            });
    }

    public reachSurface() {
        //if we have a fish, send to main logic
        if(this._caughtFish != null) {
            this._caughtFish.forEach(f => {
                this.GameScreen.collectFish(f);
            });
            this._caughtFish = [];
        }

        this._hasReachedSurface = true;
    }
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    update(gameTime:number) {
        super.update(gameTime);


        //if we are rising, attempt to catch more fish
        if(this._isRising) {
            console.log("TRY TO GRAB");
            //try to grab a fish
            const fishes = this.GameScreen.tryToGrabFishes(this.X , this.Y);
            //see if a fish was grabbed
            if(fishes.length > 0)
                this.caught(fishes);
        }

        //drag fish with us if we have any
        if(this._caughtFish != null) {
            this._caughtFish.forEach(f => {
                f.Y = this.Y - 20;
            });
        }
    }
    /*--------------- GETTERS & SETTERS --------------*/
    public static get GRAB_RANGE() { return 120; }
    public static get ANIMATION() {
        return Object.freeze({
            "Idle" : "kittyIdle",
            "Death" : "kittyIdle",
            "Grab" : "kittyIdle",
            "Hold" : "kittyIdle",
            "Ow" : "kittyIdle"
        });
    }
    // public static get ANIMATION() {
    //     return Object.freeze({
    //         "Idle" : "cat_idle",
    //         "Death" : "cat_death",
    //         "Grab" : "cat_grab",
    //         "Hold" : "cat_grab_hold",
    //         "Ow" : "cat_ow"
    //     });
    // }
    public get Speed() { 
        const caughtFishMult = ((this._caughtFish.length > 0) ? 1 + (this._caughtFish.length + this._fishCaughtMultiplier) : 1);
        console.log(caughtFishMult);

        return caughtFishMult * this._speed;
    }
    public set Speed(value:number) { this._speed = value; }
}