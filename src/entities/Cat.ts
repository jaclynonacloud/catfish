import { Game } from "../Game";
import { Entity } from "./Entity";
import { LoadManager } from "../managers/LoadManager";
import { IEnableable } from "../Interfaces";
import { Logging } from "../Functions";
import { GameScreen } from "../screens/GameScreen";
import { Fish } from "./Fish";
import { SoundManager } from "../managers/SoundManager";

export class Cat extends Entity implements IEnableable {
    private _gameScreen:GameScreen;
    private _speed:number;
    private _fishCaughtMultiplier:number; //this will be the rate at which the cat slows down when rising per fish

    private _catYTween:createjs.Tween;
    private _caughtFish:Fish[];

    private _isGrabbing:boolean;
    private _isRising:boolean;
    private _isInjured:boolean;
    private _hasReachedSurface:boolean;

    constructor(game:Game, gameScreen:GameScreen) {
        super(game, LoadManager.Spritesheets.Kitty_Spritesheet);
        this._gameScreen = gameScreen;

        this._speed = 3;
        this._fishCaughtMultiplier = 0.05;

        this._caughtFish = [];
        this._isGrabbing = false;
        this._isRising = false;
        this._isInjured = false;
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
        //if the game is paused, we shall not grab
        if(this._gameScreen.IsGamelogicPaused) return;

        //cannot grab if we are not at surface
        if(!this._hasReachedSurface) return;

        this._isGrabbing = true;
        this._hasReachedSurface = false;

        //move to x position
        this.X = this._gameScreen.Game.Stage.mouseX;

        //grab to y position
        const speed = (this._gameScreen.Game.Stage.mouseY / 2) * this.Speed;
        this._catYTween = createjs.Tween
            .get(this._sprite)
            .to({ y:this._gameScreen.Game.Stage.mouseY }, speed, createjs.Ease.circIn)
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
                const fishes = this._gameScreen.tryToGrabFishes(this.X , this.Y);

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

        if(!hasNewFish) return;

        //play the sound
        SoundManager.playSFX(LoadManager.Sounds.FishGrab);
        
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
        this._caughtFish.forEach(f => f.release());
        this._caughtFish = [];
    }

    /**Called when hit by an enemy. */
    public injure() {
        this._isInjured = true;
        //start hurt animation
        //end any current tweening
        createjs.Tween.removeTweens(this._sprite);
        this._sprite.gotoAndPlay(Cat.ANIMATION.Ow);
        this._catYTween = createjs.Tween.get(this._sprite)
            .wait(15)
            .to({y:20}, 500, createjs.Ease.linear)
            .call(() => {
                //once the surface has been reached, allow x movement again
                this.reachSurface();
                this._sprite.gotoAndPlay(Cat.ANIMATION.Idle);
            });
    }

    /**Called when the cat tickles an enemy. */
    public hitEnemy() {
        this.injure();
        this.drop();

        //play the sound
        SoundManager.playSFX(LoadManager.Sounds.CatInjure);
    }

    public reachSurface() {
        //if we have a fish, send to main logic
        if(this._caughtFish != null) {
            this._caughtFish.forEach(f => {
                this._gameScreen.collectFish(f);
            });
            this._caughtFish = [];
        }

        //set flags
        this._hasReachedSurface = true;
        this._isInjured = false;
        this._isRising = false;
        this._isGrabbing = false;
    }
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    update(gameTime:number) {
        //if our game logic is paused, no FISHING
        if(this._gameScreen.IsGamelogicPaused) return;

        super.update(gameTime);


        //if we are rising, attempt to catch more fish
        if(this._isRising && !this._isInjured) {
            //try to grab a fish
            const fishes = this._gameScreen.tryToGrabFishes(this.X , this.Y);
            //see if a fish was grabbed
            if(fishes.length > 0)
                this.caught(fishes);
        }

        //test puffer damage
        if(this._isRising || this._isGrabbing) {
            //don't test again if injured
            if(!this._isInjured) {
                //test for puffer hit
                const hasHitPuffer = this._gameScreen.hasHitAPuffer(this.X, this.Y);
                if(hasHitPuffer) {
                    this.hitEnemy();
                    return;
                }
            }
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

        return caughtFishMult * this._speed;
    }
    public set Speed(value:number) { this._speed = value; }
}