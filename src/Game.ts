import { LoadManager } from "./managers/LoadManager";
import { ScreenManager } from "./managers/ScreenManager";
import { SplashScreen } from "./screens/SplashScreen";
import { MenuScreen } from "./screens/MenuScreen";
import { GameScreen } from "./screens/GameScreen";
import { EndScreen } from "./screens/EndScreen";
import { Logging } from "./Functions";
import { Sprites } from "./ui/Sprites";
import { IntermediaryScreen } from "./screens/IntermediaryScreen";
import { DataManager } from "./managers/DataManager";


export class Game {
    private _canvas:HTMLCanvasElement;
    private _stage:createjs.StageGL;
    private _scaling:number;

    private _lastGameTime:number;

    constructor(canvasDiv:HTMLCanvasElement) {

        this._canvas = canvasDiv;
        this._canvas.width = Game.WIDTH;
        this._canvas.height = Game.HEIGHT;

        this._lastGameTime = -1;

        //set the scaling
        this._scaling = Game.HEIGHT / 1366;

        //start loading game assets
        new Promise(async(res, rej) => {
            //create the stage
            console.log("Readying stage!");
            this._stage = new createjs.StageGL(this._canvas, { antialias: true });
            (this._stage as any).setClearColor("#000000");
            this._stage.enableMouseOver(10);
            this._stage.update();

            console.log(this._stage, this._canvas);

            //listen to asset updates
            (this._stage as any).addEventListener(LoadManager.ASSETS_UPDATED, (e) => {
                console.log(LoadManager.Percentage);
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

            Logging.success("Level Data Loaded Successfully!");

            //setup createjs.Sprites
            await Sprites.setup();

            //build the screens
            ScreenManager.registerScreen("splash", new SplashScreen());
            ScreenManager.registerScreen("menu", new MenuScreen(this));
            ScreenManager.registerScreen("game", new GameScreen(this));
            ScreenManager.registerScreen("end", new EndScreen());
            ScreenManager.registerScreen("intermediary", new IntermediaryScreen(this));

            

            
            //set the current screen
            //game test, load desired level patch -- if autoloading to game screen
            (ScreenManager.getScreenByKey("game") as GameScreen).LevelData = DataManager.getLevelDataByIndex(1);

            ScreenManager.setCurrentScreen("game", this._stage);

            //setup the game loop
            createjs.Ticker.framerate = Game.FRAME_RATE;
            createjs.Ticker.on("tick", this.update, this);

        });
    }



    /*--------------- METHODS ------------------------*/
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    public update(e:any) {

        const gameTime = (this._lastGameTime != -1) ? createjs.Ticker.getMeasuredFPS() - this._lastGameTime : 1;
        this._lastGameTime = createjs.Ticker.getMeasuredFPS();

        //update the screen
        if(ScreenManager.CurrentScreen != null) ScreenManager.CurrentScreen.update(gameTime);

        //update the stage
        this._stage.update();
    }
    /*--------------- OVERRIDES ----------------------*/
    /*--------------- GETTERS & SETTERS --------------*/
    public static get FRAME_RATE() { return 30; }
    public static get WIDTH() { return document.body.clientHeight * 0.48; } //desired size
    public static get HEIGHT() { return document.body.clientHeight; }

    public get StageWidth() { return this._canvas.width; } //actual size
    public get StageHeight() { return this._canvas.height; }

    public get Stage() { return this._stage; }
    public get Scaling() { return this._scaling; }





    /*--------------- METHODS ------------------------*/
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    /*--------------- GETTERS & SETTERS --------------*/


}