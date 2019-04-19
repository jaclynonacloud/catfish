import { Layout } from "./Layout";

/**Uses custom classes and the createjs library to help easily build up ui interfaces with DisplayObjects. */
export class Container {
    private _sprites:{ [key:string]:createjs.DisplayObject };
    private _container:createjs.Container;
    private _layout:Layout;

    constructor() {
        this._sprites = { };
        this._container = new createjs.Container();
        this._layout = Layout.MAKE_VERTICAL_CENTER(this._container);
    }

    /*--------------- METHODS ------------------------*/
    public add(key:string, sprite:createjs.DisplayObject, updateLayout:boolean=true):boolean {
        if(this._sprites[key] != null) return false;
        this._sprites[key] = sprite.clone();

        if(updateLayout) this._layout.buildLayout(true, ...Object.keys(this._sprites).map(k => this._sprites[k]));
        return true;
    }

    public addMany(sprites:{ [key:string]:createjs.DisplayObject }) {
        Object.keys(sprites).forEach(k => {
            this.add(k, sprites[k], false);
        });

        this._layout.buildLayout(true, ...Object.keys(this._sprites).map(k => this._sprites[k]));
    }

    public changeLayout(layout:Layout) {
        this._layout = layout;
    }

    /**In case of wandering or reusable sprites, call them back to this layout! */
    public checkoutSprites() {
        this._layout.buildLayout(true, ...Object.keys(this._sprites).map(k => this._sprites[k]));
    }
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    /*--------------- GETTERS & SETTERS --------------*/
    public get Container():createjs.Container { return this._container; }
    public get Sprites() { return this._sprites; }
}