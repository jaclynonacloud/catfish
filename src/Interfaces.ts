/**Defines an updateable object. */
export interface IUpdateable {
    update(gameTime:number):void;
}

/**Defines a createable and destroyable object. */
export interface ICreateable<T> {
    create(display:createjs.DisplayObject):T;
    destroy():T;
}


/**Defines an enable-able object.  Typically used on objects that have user events, such as click or keydown. */
export interface IEnableable {
    enable():void;
    disable():void;
}



/**Defines an x/y coordinate. */
export interface IPoint {
    x: number;
    y: number;
}


export interface IRect {
    x: number;
    y: number;
    width: number;
    height: number;
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
}




/*https://stackoverflow.com/questions/15338610/dynamically-loading-a-typescript-class-reflection-for-typescript*/
export class InstanceLoader<T> {
    constructor(private context:Object) { }

    public getInstance(name:string, ...args:any[]) :T {
        var instance = Object.create(this.context[name].prototype);
        instance.constructor.apply(instance, args);
        return <T>instance;
    }
}