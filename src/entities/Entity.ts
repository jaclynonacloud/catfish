import { ICreateable, IUpdateable } from "../Interfaces";
import { GameScreen } from "../screens/GameScreen";
import { Game } from "../Game";

export class Entity implements ICreateable<Entity>, IUpdateable {
    private _gameScreen:GameScreen;
    protected _name:string;
    protected _sprite:createjs.Sprite;
    protected _direction:{ x:number, y:number };
    private _scaling:number;

    private _isIgnoringCollision:boolean;
    private _ignoreCollisionTimer:number;

    constructor(gameScreen:GameScreen, spritesheet:createjs.SpriteSheet) {
        this._gameScreen = gameScreen;
        this._sprite = new createjs.Sprite(spritesheet);
        this._direction = { x:1, y:1 };

        this._isIgnoringCollision = false;
        this._ignoreCollisionTimer = 0;

        //get the game scale
        this._scaling = this._gameScreen.Game.Scaling;
    }

    /*--------------- METHODS ------------------------*/
    public create(container:createjs.Container):Entity {
        // (this._sprite as any).scale = this._scaling;

        //move to main container
        if(container == null)
            this._gameScreen.Game.Stage.addChild(this._sprite);
        else
            container.addChild(this._sprite);
        return this;
    }

    public destroy():Entity {
        if(this._sprite == null || this._sprite.parent == null) return null;

        //remove from main container
        this._sprite.parent.removeChild(this._sprite);

        return this;
    }

    public update(gameTime:number) {

         //listen for collision ignore
        if(this._isIgnoringCollision) {
            this._ignoreCollisionTimer++;

            if(this._ignoreCollisionTimer > Entity.IGNORE_COLLISION)
                this._isIgnoringCollision = false;
        }
    }

    protected startIgnoreCollision() {
        this._isIgnoringCollision = true
    }

    protected testStageBounds(artificialReg:{x:number, y:number} = null) {
        let reg = { x:this._sprite.regX, y:this._sprite.regY };
        if(artificialReg != null) {
            reg = {
                x: (this._direction.x > 0) ? this.Bounds.Width * artificialReg.x : (this.Bounds.Width * (1 - artificialReg.x)),
                y: (this._direction.y > 0) ? this.Bounds.Height * artificialReg.y : (this.Bounds.Height * (1 - artificialReg.y))
            }
        }
        // const bounds = { width:this._game.StageWidth, height: this._game.StageHeight };
        const bounds = { width:this._gameScreen.Game.StageWidth, height: this._gameScreen.Game.StageHeight };
        const extents = {   
            x:(this._direction.x > 0) ? (this.Bounds.Width - reg.x) : -reg.x, 
            y:(this._direction.y > 0) ? (this.Bounds.Height - reg.y) : -reg.y 
        };

        //test walls
        if((this.X + extents.x) > bounds.width) return Entity.HIT.Right;
        else if(this.X + extents.x < 0) return Entity.HIT.Left;
    }
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    /*--------------- GETTERS & SETTERS --------------*/
    public static get IGNORE_COLLISION() { return 20; }
    public static get HIT() { return Object.freeze({Top:0, Right:1, Bottom:2, Left:3}); }

    protected get GameScreen() { return this._gameScreen; }

    public get Sprite() { return this._sprite; }
    public get Parent() { return this._sprite.parent; }

    public get X() { return this._sprite.x; }
    public set X(value) { this._sprite.x = value; }
    public get Y() { return this._sprite.y; }
    public set Y(value) { this._sprite.y = value; }

    public set DirectionX(value) { 
        const lastX = this._direction.x;
        this._direction.x = value; 
        //flip sprite if our direction has changed
        if(this._direction.x != lastX) this._sprite.scaleX *= -1;
    }

    public get Bounds() { 
        let bounds = this._sprite.getBounds();
        return  { Width:bounds.width, Height:bounds.height };
    }

    public get IsIgnoringCollision() { return this._isIgnoringCollision; }
}