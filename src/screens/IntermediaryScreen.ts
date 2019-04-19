import { Screen } from "./Screen";
import { ScreenManager } from "../managers/ScreenManager";
import { Sprites } from "../ui/Sprites";
import { Game } from "../Game";
import { LoadManager } from "../managers/LoadManager";

export class IntermediaryScreen extends Screen {
    private _game:Game;
    private _bg:createjs.Shape;
    private _textContainer:createjs.Container;

    private _text:string;
    
    constructor(game:Game) {
        super();
        this._game = game;

        this._text = "";
    }

    /*--------------- METHODS ------------------------*/
    /**Chooses the screen to load in after the intermediary. */
    public queueNextScreen(screenKey:string, duration:number=3000) {
        const evt = window.setTimeout(() => {
            //load the screen
            ScreenManager.setCurrentScreen(screenKey, this._game.Stage);
            //clear the timeout
            window.clearTimeout(evt);
        }, duration);
    }
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    public create(stage:createjs.StageGL):Screen {
        //add stuff
        this._bg = new createjs.Shape();
        this._bg.graphics.beginFill("#191919");
        this._bg.graphics.drawRect(0, 0, this._game.StageWidth, this._game.StageHeight);
        this._bg.graphics.endFill();
        this._bg.cache(0, 0, this._game.StageWidth, this._game.StageHeight);
        this._container.addChild(this._bg);

        this._textContainer = new createjs.Container();
        this._container.addChild(this._textContainer);

        super.create(stage);

        //for testing
        (this._container as any).on("click", (e) => {
            ScreenManager.setCurrentScreen("menu", stage);
        }, this, true);

        if(this._text != "") {
            //create the text
            const text = Sprites.generateBitmapText(this._text, LoadManager.Spritesheets.TypographyWhite);
            (text as any).scale = 0.6;
            // const text = createjs.Sprites.generateText(value);
            //load into container
            this._textContainer.removeAllChildren();
            this._textContainer.addChild(text);
    
            //put container at bottom
            this._textContainer.x = (this._game.StageWidth / 2) - ((text.getBounds().width / 2) * 0.6);
            this._textContainer.y = (this._game.StageHeight / 2) - (text.getBounds().height / 2);
        }
        else {
            this._textContainer.removeAllChildren();
        }

        return this;
    }

    /*--------------- GETTERS & SETTERS --------------*/
    public set Text(value:string) {
        this._text = value;
    }
}