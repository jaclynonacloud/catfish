import { IUpdateable, ICreateable, IEnableable } from "../Interfaces";

export class Screen implements ICreateable<Screen>, IUpdateable, IEnableable {
    private _stage:createjs.StageGL;
    protected _container:createjs.Container;

    constructor() {
        this._container = new createjs.Container();
    }

    /*--------------- METHODS ------------------------*/
    /**Updates the screen. */
    public update(gameTime:number) {

    }

    /**Creates the screen and adds to the stage. */
    public create(stage:createjs.StageGL):Screen {
        this._stage = stage;
        //add to the stage
        this._stage.addChild(this._container);

        
        return this;
    }

    /**Destroys the screen and removes from the stage. */
    public destroy():Screen {

        //remove from the stage
        this._stage.removeChild(this._container);

        return this;
    }

    public enable() {

    }

    public disable() {
        
    }
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    /*--------------- GETTERS & SETTERS --------------*/
    public get Container():createjs.Container { return this._container; }
    protected get Stage():createjs.StageGL { return this._stage; }

}