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
            // X - CENTER
            let totalHeight = 0;
            if(this._alignment == Layout.CENTER) {
                for(let i = 0; i < items.length; i++) {
                    const item:createjs.DisplayObject = items[i];
                    item.x = (Game.WIDTH / 2) - (item.getBounds().width / 2);
                    item.y = totalHeight;
                    totalHeight += item.getBounds().height + this._spacing;
                    if(addToParent) this._parent.addChild(item);
                }

                // Y - CENTER
                //handle vertical alignment
                if(this._crossAlignment == Layout.START) {
                    // DO NOTHING, this is the default
                }
                else if(this._crossAlignment == Layout.CENTER) {
                    totalHeight += items[items.length-1].getBounds().height;
                    for(let i = 0; i < items.length; i++) {
                        const item:createjs.DisplayObject = items[i];
                        //decipher desired center
                        item.y += (Game.HEIGHT / 2) - (totalHeight / 2);
                    }
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

}