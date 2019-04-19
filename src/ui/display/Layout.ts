import { Game } from "../../Game";

/**Used to layout createjs display objects. */
export class Layout {
    //justify content
    public static HORIZONTAL:string = "horizontal";
    public static VERTICAL:string = "vertical";
    //align items
    public static START:string = "start";
    public static END:string = "end";
    public static CENTER:string = "center";

    private _parent:createjs.Container;
    private _items:createjs.DisplayObject[];

    private _direction:string;
    private _alignment:string;
    private _crossAlignment:string;
    private _spacing:number;

    constructor(parent:createjs.Container, direction:string, alignment:string, crossAlignment:string, spacing:number = 5) {
        this._parent = parent;
        this._items = [];

        this._direction = direction;
        this._alignment = alignment;
        this._crossAlignment = crossAlignment;
        this._spacing = spacing;
    }

    /*--------------- METHODS ------------------------*/
    public buildLayout(addToParent:boolean=true, ...items:createjs.DisplayObject[]) {
        if(items.length <= 0) return;

        this._items = items;

        if(addToParent) {
            this._parent.removeAllChildren();
        }
        

        if(this._direction == Layout.VERTICAL) {
            let totalHeight = 0;
            //ALIGNMENT
            switch(this._alignment) {
                case Layout.START : {
                    for(let i = 0; i < items.length; i++) {
                        const item:createjs.DisplayObject = items[i];
                        item.x = 0;
                        item.y = totalHeight;
                        totalHeight += item.getBounds().height + this._spacing;
                        if(addToParent) this._parent.addChild(item);
                    }
                    break;
                }
                case Layout.CENTER : {
                    for(let i = 0; i < items.length; i++) {
                        const item:createjs.DisplayObject = items[i];
                        item.x = (Game.WIDTH / 2) - (item.getBounds().width / 2);
                        item.y = totalHeight;
                        totalHeight += item.getBounds().height + this._spacing;
                        if(addToParent) this._parent.addChild(item);
                    }
                    break;
                }
                case Layout.END : {
                    for(let i = 0; i < items.length; i++) {
                        const item:createjs.DisplayObject = items[i];
                        item.x = Game.WIDTH - item.getBounds().width;
                        item.y = totalHeight;
                        totalHeight += item.getBounds().height + this._spacing;
                        if(addToParent) this._parent.addChild(item);
                    }
                    break;
                }
            }

            //CROSS ALIGNMENT
            //handle vertical alignment
            switch(this._crossAlignment) {
                case Layout.START : {
                    break;
                }
                case Layout.CENTER : {
                    totalHeight += items[items.length-1].getBounds().height;
                    for(let i = 0; i < items.length; i++) {
                        const item:createjs.DisplayObject = items[i];
                        //decipher desired center
                        item.y += (Game.HEIGHT / 2) - (totalHeight / 2);
                    }
                    break;
                }
                case Layout.END :  {
                    totalHeight += items[items.length-1].getBounds().height;
                    for(let i = 0; i < items.length; i++) {
                        const item:createjs.DisplayObject = items[i];
                        //decipher desired center
                        item.y += Game.HEIGHT - totalHeight;
                    }
                    break;
                }
            }
        }
        else {

        }
    }
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    /*--------------- GETTERS & SETTERS --------------*/
    
    /*--------------- HELPER FUNCTIONS ---------------*/
    public static MAKE_VERTICAL_CENTER(container:createjs.Container) { return new Layout(container, Layout.VERTICAL, Layout.CENTER, Layout.CENTER, 5); }
    public static MAKE_VERTICAL_START(container:createjs.Container) { return new Layout(container, Layout.VERTICAL, Layout.CENTER, Layout.START, 5); }

}