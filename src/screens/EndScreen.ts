import { Screen } from "./Screen";
import { ScreenManager } from "../managers/ScreenManager";

export class EndScreen extends Screen {
    private _splash:createjs.Shape;
    
    constructor() {
        super();
    }

    /*--------------- METHODS ------------------------*/
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    create(stage:createjs.StageGL):Screen {
        //add stuff
        this._splash = new createjs.Shape();
        this._splash.graphics.beginFill("pink");
        this._splash.graphics.drawRect(0, 0, 200, 100);
        this._splash.graphics.endFill();
        this._splash.cache(0, 0, 200, 100);
        this._container.addChild(this._splash);
        super.create(stage);

         //for testing
        (this._container as any).on("click", (e) => {
            ScreenManager.setCurrentScreen("end", stage);
        }, this, true);

        return null;
    }
    /*--------------- GETTERS & SETTERS --------------*/
}