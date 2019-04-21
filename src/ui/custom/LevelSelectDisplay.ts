import { Sprites } from "../Sprites";
import { LoadManager } from "../../managers/LoadManager";
import { Game } from "../../Game";
import { IEnableable } from "../../Interfaces";
import { GameScreen } from "../../screens/GameScreen";
import { DataManager } from "../../managers/DataManager";
import { ScreenManager } from "../../managers/ScreenManager";
import { IntermediaryScreen } from "../../screens/IntermediaryScreen";


export class LevelSelectDisplay implements IEnableable {
    private _game:Game;

    private _container:createjs.Container;
    private _background:createjs.Sprite;
    private _levelsContainer:createjs.Container;
    private _levelTextContainer:createjs.Container;

    private _levelsData:any;

    private _levelButtons:createjs.Sprite[];

    constructor(game:Game) {
        this._game = game;
        this._levelButtons = [];

        //build the required components for the level select display
        this._container = new createjs.Container();
        this._background = Sprites.Backgrounds.LevelSelectBG as createjs.Sprite;
        this._background.x = (game.StageWidth / 2) - (this._background.getBounds().width / 2);
        this._background.y = 80;

        this._levelsContainer = new createjs.Container();
        this._container.addChild(this._background);
        let text = Sprites.generateBitmapText("Level Select", LoadManager.Spritesheets.Typography);
        text.x = (game.StageWidth / 2) - (text.getBounds().width / 2);
        text.y = 30;
        this._container.addChild(text);


        //setup display text
        this._levelTextContainer = new createjs.Container();
        this._container.addChild(this._levelTextContainer);

        this.LevelText = "Hello World!";


        //spoof some level data
        this._levelsData = [
            [
                { name: "Welcome to the pond!", complete:true, unlocked:true, data:[0, 0, 0, 0, 0, 0, 0] },
                { name: "A new adventure!", complete:true, unlocked:true, data:[0, 0, 0, 0, 0, 0, 0] },
                { name: "Learn to aim!", complete:false, unlocked:true, data:[0, 0, 0, 0, 0, 0, 0] },
                { name: "Persephone!", special:true, complete:false, unlocked:false, data:[0, 0, 0, 0, 0, 0, 0] },
            ],
            [
                { name: "In deep water!", complete:false, unlocked:false, data:[0, 0, 0, 0, 0, 0, 0] },
                { name: "An ocean of fish!", complete:false, unlocked:false, data:[0, 0, 0, 0, 0, 0, 0] },
                { name: "Barnacles ahoy!", complete:false, unlocked:false, data:[0, 0, 0, 0, 0, 0, 0] },
                { name: "Owen!", special:true, complete:false, unlocked:false, data:[0, 0, 0, 0, 0, 0, 0] },
            ]
        ];


        //build the level icons
        for(let r = 0; r < this._levelsData.length; r++) {
            //iterate through levels
            for(let i = 0; i < this._levelsData[r].length; i++) {
                const levelData = this._levelsData[r][i];
                console.log("LEVEL", levelData);
                //decide the sprite
                let sprite = Sprites.Buttons.LevelEmpty.clone();
                if(levelData.special != null && levelData.special) sprite = Sprites.Buttons.LevelSpecialEmpty.clone();
                // //completed
                if(levelData.complete) {
                    sprite = Sprites.Buttons.LevelComplete.clone();
                    if(levelData.special != null && levelData.special) sprite = Sprites.Buttons.LevelSpecialComplete;
                }
                //locked
                if(!levelData.unlocked) {
                    sprite.alpha = 0.25;
                }
                else {
                    sprite.alpha = 1;
                     //extras
                    sprite.cursor = "pointer";
                }

                //place
                sprite.x = 60 * i;
                sprite.y = 50 * r;
                //add
                this._levelsContainer.addChild(sprite);
                //to array
                this._levelButtons.push(sprite as createjs.Sprite);
            }
        };

        this._levelsContainer.x = (game.StageWidth / 2) - (this._levelsContainer.getBounds().width / 2);
        this._levelsContainer.y = 100;
        this._container.addChild(this._levelsContainer);
    }

    /*--------------- METHODS ------------------------*/
    public enable() {
        this._levelButtons.forEach(btn => {
            btn.on("click", this._onLevelClick, this);
            btn.on("mouseover", this._onLevelHover, this);
            btn.on("mouseout", this._onLevelUnhover, this);
        });
    }

    public disable() {
        this._levelButtons.forEach(btn => {
            btn.removeAllEventListeners();
        });
    }


    /**Returns level data from the given index. */
    private _getDataByIndex(index:number) {
        //flatten level data, and get data
        let flatten = this._levelsData.reduce((acc, next) => acc.concat(next));
        return flatten[index];
    }
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    private _onLevelClick(e) {
         //get button index
        let index = this._levelButtons.indexOf(e.target);

        if(index == -1) return;

        //set the level index
        const data = DataManager.getLevelDataByIndex(index);
        console.log("MY LEVEL DATA", data);
        this._game.changeCurrentLevel(data);
        //go to intermediary screen
        const intermediary = ScreenManager.getScreenByKey("intermediary") as IntermediaryScreen;
        new Promise(async(res) => {
            intermediary.Text = data.name;
            await ScreenManager.setCurrentScreen(intermediary, this._game.Stage);
            intermediary.queueNextScreen("game", 1000);

            res();
        });
    }

    private _onLevelHover(e) {
        //find the button data
        //get button index
        let index = this._levelButtons.indexOf(e.target);
        
        if(index != -1) {
            const data = this._getDataByIndex(index);
            if(data != null) {
                if(data.unlocked)
                    this.LevelText = data.name;
            }
        }

    }
    private _onLevelUnhover(e) {
        this.LevelText = "";
    }
    /*--------------- OVERRIDES ----------------------*/
    /*--------------- GETTERS & SETTERS --------------*/
    public get Container() { return this._container; }
    public set LevelText(value:string) {
        if(value == "") {
            this._levelTextContainer.removeAllChildren();
            return;
        }
        //create the text
        const text = Sprites.generateBitmapText(value, LoadManager.Spritesheets.TypographyWhite);
        (text as any).scale = 0.6;
        //load into container
        this._levelTextContainer.removeAllChildren();
        this._levelTextContainer.addChild(text);

        //put container at bottom
        this._levelTextContainer.x = (this._game.StageWidth / 2) - ((text.getBounds().width / 2) * 0.6);
        this._levelTextContainer.y = this._game.StageHeight - 30;
    }
}