import { LoadManager } from "./managers/LoadManager";
import { ProgressManager } from "./managers/ProgressManager";
import { ScreenManager } from "./managers/ScreenManager";
import { SplashScreen } from "./screens/SplashScreen";
import { MenuScreen } from "./screens/MenuScreen";
import { GameScreen } from "./screens/GameScreen";
import { EndScreen } from "./screens/EndScreen";
import { Logging } from "./Functions";
import { Sprites } from "./ui/Sprites";
import { IntermediaryScreen } from "./screens/IntermediaryScreen";
import { DataManager, LevelData } from "./managers/DataManager";

export interface ICurrentScore {
    totalFish: number;
    time: number;
    combos: number;
}


export class Game {
    private _canvas:HTMLCanvasElement;
    private _stage:createjs.StageGL;
    private _scaling:number;

    private _lastGameTime:number;

    private _currentLevel:LevelData;
    private _currentScore:ICurrentScore;

    constructor(canvasDiv:HTMLCanvasElement) {

        this._canvas = canvasDiv;
        this._canvas.width = Game.WIDTH;
        this._canvas.height = Game.HEIGHT;

        this._lastGameTime = -1;

        //set the scaling
        this._scaling = Game.HEIGHT / 1024;

        //start loading game assets
        new Promise(async(res, rej) => {
            //create the stage
            this._stage = new createjs.StageGL(this._canvas, { antialias: true });
            // this._stage = new createjs.StageGL(this._canvas);
            (this._stage as any).setClearColor("#000000");
            this._stage.enableMouseOver(10);
            this._stage.update();


            //load the splash screen
            ScreenManager.registerScreen("splash", new SplashScreen(this));
            ScreenManager.setCurrentScreen("splash", this._stage);

            const splash = ScreenManager.getScreenByKey("splash") as SplashScreen;

            //listen to asset updates
            (this._stage as any).addEventListener(LoadManager.ASSETS_UPDATED, (e) => {
                //update percent
                splash.Text = Math.ceil(LoadManager.Percentage * 100).toString();
            });
            //load assets
            await LoadManager.loadAssets("assets/manifest.json", this._stage)
                .catch(err => {
                    console.warn("Error loading assets:", err);
                });

            Logging.success("Assets Loaded Successfully!");

            //load level data
            await DataManager.loadWorldsData("assets/data/levels.json")
                .catch(err => {
                    Logging.error(err);
                    return;
                });
            //load progress data
            await ProgressManager.loadWorldsData(DataManager.WorldsData);

            //set the current screen
            //game test, load desired level patch -- if autoloading to game screen
            this.changeCurrentLevel(DataManager.getLevelDataByIndex(0));

            Logging.success("Level Data Loaded Successfully!");

            //setup createjs.Sprites
            await Sprites.setup();

            //build the screens
            ScreenManager.registerScreen("menu", new MenuScreen(this));
            ScreenManager.registerScreen("game", new GameScreen(this));
            ScreenManager.registerScreen("end", new EndScreen(this));
            ScreenManager.registerScreen("intermediary", new IntermediaryScreen(this));
            

            ScreenManager.setCurrentScreen("menu", this._stage);
            // ScreenManager.setCurrentScreen("game", this._stage);
            // ScreenManager.setCurrentScreen("end", this._stage);

            //setup the game loop
            createjs.Ticker.framerate = Game.FRAME_RATE;
            createjs.Ticker.on("tick", this.update, this);

            res();

        });
    }



    /*--------------- METHODS ------------------------*/
    public changeCurrentLevel(levelData:LevelData) {
        this._currentLevel = levelData;
    }

    public changeCurrentScore(currentScore:ICurrentScore) {
        this._currentScore = currentScore;
    }



    //recursive sizing
    private _scaleChildren(children) {


        if(children != null) {
            for(let i = 0; i < children.length; i++) {
                const ch = children[i];
                ch.scaleX = ch.scaleY = this._scaling;
                if(ch.children != null && ch.scaleX != null) this._scaleChildren(ch);
            }
        }

    }
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    public update(e:any) {

        const gameTime = (this._lastGameTime != -1) ? createjs.Ticker.getMeasuredFPS() - this._lastGameTime : 1;
        this._lastGameTime = createjs.Ticker.getMeasuredFPS();

        //update the screen
        if(ScreenManager.CurrentScreen != null) ScreenManager.CurrentScreen.update(gameTime);

        //scale all children
        // this._scaleChildren(this._stage.children);

        //update the stage
        this._stage.update();
    }


    /*--------------- OVERRIDES ----------------------*/
    /*--------------- GETTERS & SETTERS --------------*/
    public static get FRAME_RATE() { return 30; }
    // public static get WIDTH() { return Game.HEIGHT * 0.5625; } //desired size
    // public static get HEIGHT() { return Math.min(document.body.clientHeight, 1024); }

    public static get WIDTH() { return 576; }
    public static get HEIGHT() { return 1024; }

    public get StageWidth() { return this._canvas.width; } //actual size
    public get StageHeight() { return this._canvas.height; }

    public get Stage() { return this._stage; }
    public get Scaling() { return this._scaling; }

    public get CurrentLevelData() { return this._currentLevel; }
    public get CurrentScoreData() { return this._currentScore; }





    /*--------------- METHODS ------------------------*/
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    /*--------------- GETTERS & SETTERS --------------*/


    //generate levels
    /*
    let data = [];
    for(let i = 0; i < 15; i++) {
        data.push({
        id: (Math.random() > 0.8) ? "puffer" : "fish",
        x: Math.floor(Math.random() * 500 + 50),
        y: Math.floor(Math.random() * 850 + 10),
        speed: parseFloat((Math.random() * 5 + 2).toFixed(2)),
        flip: Math.random() > 0.5 ? true : false
        });
    }

    console.log(data);

    console.log(JSON.stringify(data, null, 2));
    */


}