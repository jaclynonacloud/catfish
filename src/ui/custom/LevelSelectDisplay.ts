import { Sprites } from "../Sprites";
import { LoadManager } from "../../managers/LoadManager";
import { ProgressManager } from "../../managers/ProgressManager";
import { Game } from "../../Game";
import { IEnableable } from "../../Interfaces";
import { GameScreen } from "../../screens/GameScreen";
import { DataManager } from "../../managers/DataManager";
import { ScreenManager } from "../../managers/ScreenManager";
import { IntermediaryScreen } from "../../screens/IntermediaryScreen";
import { SoundManager } from "../../managers/SoundManager";


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
        this._background = new createjs.Sprite(LoadManager.Spritesheets.Menu_Spritesheet, "bgLevelSelect");

        this._levelsContainer = new createjs.Container();
        this._container.addChild(this._background);


        //setup display text
        this._levelTextContainer = new createjs.Container();
        this._container.addChild(this._levelTextContainer);

        this.LevelText = "";



        this.rebuild();
    }

    /*--------------- METHODS ------------------------*/
    public enable() {
        this.rebuild();
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

    public rebuild() {
        //rebuild all buttons
        this._levelButtons.forEach(ch => {
            this._container.removeChild(ch);
            ch.removeAllEventListeners();
            ch = null;
        });
        this._levelButtons = [];
        this._levelsContainer.removeAllChildren();

        //build levels data
        this._levelsData = DataManager.WorldsData.worlds.map((world, i) => {
            return [].concat.apply([], world as any)
            .map((level, n) => {
                let special = ProgressManager.ProgressData.specials[i][n];

                let obj = level;
                obj.unlocked = ProgressManager.ProgressData.levels[i][n].unlocked;
                obj.completed = ProgressManager.ProgressData.levels[i][n].completed;
                obj.special = (special != null);

                return obj;
            })
        });


        //build the level icons
        for(let r = 0; r < this._levelsData.length; r++) {
            //iterate through levels
            for(let i = 0; i < this._levelsData[r].length; i++) {
                const levelData = this._levelsData[r][i];
                //decide the sprite
                let sprite = new createjs.Sprite(LoadManager.Spritesheets.Menu_Spritesheet, "btnLvlEmpty")
                if(levelData.special != null && levelData.special) sprite.gotoAndPlay("btnLvlSpecial")
                // //completed
                if(levelData.completed && (levelData.special == null || !levelData.special)) {
                    sprite.gotoAndPlay("btnLvlComplete")
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
                sprite.x = 100 * i;
                sprite.y = 90 * r;

                //add world tint
                // const step = (360 / this._levelsData.length) * r;
                // var matrix = new createjs.ColorMatrix().adjustHue(step - 180).adjustSaturation(-50);
                // sprite.filters = [
                //     new createjs.ColorMatrixFilter(matrix)
                // ];

                // sprite.cache(0, 0, sprite.getBounds().width, sprite.getBounds().height);

                //add
                this._levelsContainer.addChild(sprite);
                //to array
                this._levelButtons.push(sprite as createjs.Sprite);
            }
        };

        this._levelsContainer.x = (this._game.StageWidth / 2) - (this._levelsContainer.getBounds().width / 2);
        this._levelsContainer.y = 210;
        this._container.addChild(this._levelsContainer);
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
        if(data == null) return;
        if(!data.unlocked) return;

        SoundManager.playSFX(LoadManager.Sounds.BubblesFade);
        SoundManager.fadeOutAmbience("ambience");

        //make sure this level is UNLOCKED
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