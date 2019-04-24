import { Screen } from "./Screen";
import { ScreenManager } from "../managers/ScreenManager";
import { Container } from "../ui/display/Container";
import { Sprites } from "../ui/Sprites";
import { LoadManager } from "../managers/LoadManager";
import { Game } from "../Game";
import { DataManager } from "../managers/DataManager";
import { IntermediaryScreen } from "./IntermediaryScreen";
import { Logging } from "../Functions";

export class EndScreen extends Screen {
    private _game:Game;
    private _buttonsContainer:Container;

    private _completeSpr:createjs.DisplayObject;
    private _failSpr:createjs.DisplayObject;

    //flags
    private _isFail:boolean;
    
    constructor(game:Game) {
        super();

        this._game = game;
        this._isFail = false;

        //layout stuff
        const bg = new createjs.Sprite(LoadManager.Spritesheets.Catfish_End, "bg");
        this._container.addChild(bg);

        this._buttonsContainer = new Container(Container.LAYOUT_OPTIONS.ColumnLeftBottom);
        this._buttonsContainer.addMany({
            btnTryAgain : new createjs.Sprite(LoadManager.Spritesheets.Catfish_End, "btnTryAgain"),
            btnNextLevel : new createjs.Sprite(LoadManager.Spritesheets.Catfish_End, "btnNextLevel"),
            btnMainMenu : new createjs.Sprite(LoadManager.Spritesheets.Catfish_End, "btnMainMenu"),
        });
        this._container.addChild(this._buttonsContainer.Container);

        //--conditional text
        this._completeSpr = new createjs.Sprite(LoadManager.Spritesheets.Catfish_End, "complete");
        this._failSpr = new createjs.Sprite(LoadManager.Spritesheets.Catfish_End, "failure");
        this._completeSpr.x = this._game.StageWidth / 2 - (this._completeSpr.getBounds().width / 2);
        this._completeSpr.y = 220;
        this._failSpr.x = this._game.StageWidth / 2 - (this._failSpr.getBounds().width / 2);
        this._failSpr.y = this._game.StageHeight * 0.45;
        this._container.addChild(this._completeSpr);
        this._container.addChild(this._failSpr);

        
        
    }

    /*--------------- METHODS ------------------------*/
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    create(stage:createjs.StageGL):Screen {
        
        
        // //for testing
        // (this._container as any).on("click", (e) => {
        //     ScreenManager.setCurrentScreen("menu", stage);
        // }, this, true);       
        

        return super.create(stage);
    }


    enable() {
        super.enable();

        //try again
        (this._buttonsContainer.Sprites["btnTryAgain"] as any).on("click", () => {
            //restart this level
            this._game.changeCurrentLevel(this._game.CurrentLevelData);
            ScreenManager.setCurrentScreen("game", this._game.Stage);
        }, this, true);
        //next level
        (this._buttonsContainer.Sprites["btnNextLevel"] as any).on("click", () => {
            //find the next level
            const nextLevel = DataManager.getNextLevel(this._game.CurrentLevelData);
            //if there is no next level, go back to menu
            if(nextLevel == null) {
                //go to main menu
                ScreenManager.setCurrentScreen("menu", this._game.Stage);
                return;
            }

            Logging.error("WHERE AM I? " + nextLevel.name);
            this._game.changeCurrentLevel(nextLevel);
            //go to intermediary screen
            const intermediary = ScreenManager.getScreenByKey("intermediary") as IntermediaryScreen;
            new Promise(async(res) => {
                intermediary.Text = nextLevel.name;
                await ScreenManager.setCurrentScreen(intermediary, this._game.Stage);
                intermediary.queueNextScreen("game", 1000);

                res();
            });
        }, this, true);
        //main menu
        (this._buttonsContainer.Sprites["btnMainMenu"] as any).on("click", () => {
            //go to main menu
            ScreenManager.setCurrentScreen("menu", this._game.Stage);
        }, this, true);
    }

    disable() {
        //toggle fail/success
        this._completeSpr.visible = !this._isFail;
        this._failSpr.visible = this._isFail;

        Object.keys(this._buttonsContainer.Sprites).forEach(key => this._buttonsContainer.Sprites[key].removeAllEventListeners());
    }
    /*--------------- GETTERS & SETTERS --------------*/
}