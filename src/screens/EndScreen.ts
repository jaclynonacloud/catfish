import { Screen } from "./Screen";
import { ScreenManager } from "../managers/ScreenManager";
import { Container } from "../ui/display/Container";
import { Sprites } from "../ui/Sprites";
import { LoadManager } from "../managers/LoadManager";

export class EndScreen extends Screen {
    private _splash:createjs.Shape;
    private _mainContainer:Container;
    
    constructor() {
        super();

        //setup main container
        this._mainContainer = new Container();
        this._mainContainer.addMany({
            txtScoreStatic : Sprites.generateBitmapText("Score", LoadManager.Spritesheets.Typography),
            txtScore : Sprites.generateBitmapText("0", LoadManager.Spritesheets.Typography),
            logo : Sprites.Backgrounds.Logo,
            btnMainMenu : Sprites.Buttons.NewGame,
            btnNext : Sprites.Buttons.Options,
        });
        
    }

    /*--------------- METHODS ------------------------*/
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    create(stage:createjs.StageGL):Screen {
        
        //set the score
        this._mainContainer.Sprites['txtScore'] = Sprites.generateBitmapText("9999", LoadManager.Spritesheets.Typography);
        
        //add in the containers
        this._mainContainer.checkoutSprites();
        this._container.addChild(this._mainContainer.Container);
        
        //for testing
        (this._container as any).on("click", (e) => {
            ScreenManager.setCurrentScreen("menu", stage);
        }, this, true);
        

        return super.create(stage);
    }
    /*--------------- GETTERS & SETTERS --------------*/
}