import { TutorialCreator } from "./TutorialCreator";
import { Screen } from "./Screen";
import { ScreenManager } from "../managers/ScreenManager";
import { ObjectPool } from "../ObjectPool";
import { Fish } from "../entities/Fish";
import { Persephone } from "../entities/specials/Persephone";
import { Puffer } from "../entities/Puffer";
import { Cat } from "../entities/Cat";
import { Game } from "../Game";
import { Container } from "../ui/display/Container";
import { Sprites } from "../ui/Sprites";
import { Logging } from "../Functions";
import { LevelData, DataManager } from "../managers/DataManager";
import { LoadManager } from "../managers/LoadManager";
import { GameScore } from "../ui/partials/GameScore";
import { ProgressManager } from "../managers/ProgressManager";
import { SoundManager } from "../managers/SoundManager";

export class GameScreen extends Screen {
    private _game:Game;

    //create containers
    private _staticContainer:Container;
    private _fishContainer:createjs.Container;
    private _pufferContainer:createjs.Container;

    private _winContainer:createjs.Container;
    private _winBanner:createjs.Shape;
    private _winText:createjs.BitmapText;

    private _gameScore:GameScore;
    private _tutorialCreator:TutorialCreator;

    private _cat:Cat;
    private _fishes:Fish[];
    private _puffers:Puffer[];

    private _remainingFish:number;

    private _pauseLogic:Boolean;
    
    constructor(game:Game) {
        super();
        this._game = game;
        this._fishes = [];
        this._puffers = [];
        this._remainingFish = -1;

        //create object pool
        ObjectPool.createPoolObject(new Cat(this._game, this), POOL.CAT)
        for(let i = 0; i < 120; i++) {
            ObjectPool.createPoolObject(new Fish(this._game), POOL.FISH);
        }
        for(let i = 0; i < 30; i++) {
            ObjectPool.createPoolObject(new Puffer(this._game), POOL.PUFFERFISH)
        }
        ObjectPool.createPoolObject(new Persephone(this._game), POOL.PERSEPHONE);


        //pool out static kitty
        this._cat = (ObjectPool.checkout(POOL.CAT) as Cat);
        this._cat.X = 290;
        this._cat.Y = 70;

        //create containers
        this._staticContainer = new Container();
        this._staticContainer.addMany({
            bg : new createjs.Sprite(LoadManager.Spritesheets.BG_Spritesheet, "bg1")
        });

        this._fishContainer = new createjs.Container();
        this._pufferContainer = new createjs.Container();

        this._winContainer = new createjs.Container();

        this._gameScore = new GameScore(this._game);
        this._tutorialCreator = new TutorialCreator(this._game, this);

        this._pauseLogic = false;
    }

    /*--------------- METHODS ------------------------*/

    /**Attempts to grab a fish.  Returns any fish that are touching the global position. */
    public tryToGrabFishes(x:number, y:number):Fish[] {
        let fishes = [];


        const hitObjects = this._container.getObjectsUnderPoint(x, y, 0);
        for(let i = 0; i < this._fishes.length; i++) {
            const fish = this._fishes[i];
            if(hitObjects.indexOf(fish.Sprite) != -1) {
                fishes.push(fish);
            }
        }

        return fishes;

    }

    /**Tests to see if we hit a puffer. */
    public hasHitAPuffer(x:number, y:number):Boolean {

        let hasHitPuffer = false;
        const hitObjects = this._container.getObjectsUnderPoint(x, y, 0);
        for(let i = 0; i < this._puffers.length; i++) {
            if(hitObjects.indexOf(this._puffers[i].Sprite) != -1) {
                this._puffers[i].puff();
                return true;
            }
        }

        return false;
    }

    public collectFish(fish:Fish) {
        //get fish
        Logging.success("GOT FISH!");

        const killedFish = fish.destroy();

        //decrement fish counter -- make sure we didn't make an error
        if(killedFish != null) {
            this._remainingFish--;
            this._fishes.splice(this._fishes.indexOf(killedFish as Fish), 1);

            //if all our fish are gone, end the game!
            if(this._remainingFish <= 0) {
                //win game!
                Logging.success("GAME IS OVER!");
                //call win
                this.win();
            }
        }
    }


    public win() {
        //disable controls
        this.disable();
        //set the score
        this._game.changeCurrentScore({
            totalFish: this._fishes.length,
            combos: 10,
            time: 100
        });
        
        //show win banner
        createjs.Tween.get(this._winContainer)
            .to({y:this._game.StageHeight / 2 - 25}, 600, createjs.Ease.elasticOut)
            .wait(2000)
            .call(() => {
                //transition to end screen
                ScreenManager.setCurrentScreen("end", this._game.Stage);
                SoundManager.fadeOutAmbience("ambience");

                //save this data
                const levelIndices = DataManager.getIndexData(this._game.CurrentLevelData);
                //mark level as complete
                ProgressManager.completeLevel(levelIndices.world, levelIndices.level);
                //try to mark special as collected
                ProgressManager.collectSpecial(levelIndices.world, levelIndices.level);

                //reset game data
                this.reset();
            });
    }

    public pauseGameLogic() {
        this._pauseLogic = true;
    }

    public unpauseGameLogic() {
        this._pauseLogic = false;
    }

    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    public create(stage:createjs.StageGL):Screen {
        super.create(stage);
        //add stuff
        this._staticContainer.checkoutSprites();
        this._staticContainer.Sprites.bg.y = 0;
        this._container.addChild(this._staticContainer.Container);

        this._container.addChild(this._fishContainer);
        this._container.addChild(this._pufferContainer);

        //add conditional text
        this._winBanner = new createjs.Shape();
        this._winBanner.graphics.beginFill("black");
        this._winBanner.graphics.drawRect(0, 0, this._game.StageWidth, 50);
        this._winBanner.cache(0, 0, this._game.StageWidth, 50);
        this._winContainer.addChild(this._winBanner);
        this._winText = Sprites.generateBitmapText("Win!", LoadManager.Spritesheets.TypographyWhite);
        this._winContainer.addChild(this._winText);
        this._winText.x = (this._game.StageWidth / 2) - (this._winText.getBounds().width / 2);

        this._container.addChild(this._winContainer);
        this._winContainer. y = this._game.StageHeight + 50;
        this._winContainer.mouseEnabled = false;

        
        this._cat.create(this._container);


        //testing
        // const puffer = new createjs.Sprite(LoadManager.Spritesheets.Puffer_Spritesheet, "pufferIdle");
        // puffer.x = 100;
        // puffer.y = 200;
        // (puffer as any).on("click", () => {
        //     puffer.gotoAndPlay("pufferAngry")
        // })
        // this._container.addChild(puffer);


        //add level data if it exists
        // this.reset();
        // this.destroy();
        if(this._game.CurrentLevelData != null) {
            //load in critters
            for(let i = 0; i < this._game.CurrentLevelData.data.length; i++) {
                const data = this._game.CurrentLevelData.data[i];
                switch(data.id) {
                    case POOL.PERSEPHONE:
                    case POOL.FISH:
                        const fish = (ObjectPool.checkout(data.id) as Fish);
                        fish.create(this._fishContainer);
                        if(data.speed != null) fish.Speed = data.speed; //set variables
                        if(data.x != null) fish.X = data.x;
                        if(data.y != null) fish.Y = data.y;
                        if(data.flip != null && data.flip) fish.DirectionX = -1;
                        fish.setNaturalY();
                        this._fishes.push(fish);
                        break;
                    case POOL.PUFFERFISH:
                        const puffer = (ObjectPool.checkout(POOL.PUFFERFISH) as Puffer);
                        puffer.create(this._pufferContainer);
                        if(data.speed != null) puffer.Speed = data.speed; //set variables
                        if(data.x != null) puffer.X = data.x;
                        if(data.y != null) puffer.Y = data.y;
                        if(data.flip != null && data.flip) puffer.DirectionX = -1;
                        this._puffers.push(puffer);
                }      
            }

            //set fish total
            this._remainingFish = this._fishes.length;
        }
        //get the level tutorials
        if(this._game.CurrentLevelData.tutorials != null) {
            this._tutorialCreator.queueTutorials(this._game.CurrentLevelData.tutorials);
        }
        //get the level background
        if(this._game.CurrentLevelData.background != null) {
            (this._staticContainer.Sprites["bg"] as createjs.Sprite).gotoAndStop(this._game.CurrentLevelData.background);
        }
        else {
            (this._staticContainer.Sprites["bg"] as createjs.Sprite).gotoAndStop("bg1");
        }

        //get the level music!
        let musicKey = "Music2";
        if(this._game.CurrentLevelData.music) musicKey = this._game.CurrentLevelData.music;
        SoundManager.playAmbienceWithFadeIn("ambience", LoadManager.Sounds[musicKey], true, 0.4, 400);


        //add the score
        // this._gameScore.Container.y = this._game.StageHeight - 40;
        // this._container.addChild(this._gameScore.Container);


        //update the game HUD for this round
        const levelData = this._game.CurrentLevelData;
        const showScore = (levelData.showScore != null && !levelData.showScore) ? false : true;
        const showTimer = (levelData.duration != null);
        const showFishRemain = (levelData.showRemainingFish != null && !levelData.showRemainingFish) ? false : true;
        this._gameScore.startHUD(showScore, showFishRemain, showTimer);

        return null;
    }

    public destroy() {

        this._cat.destroy();
        this._fishes.forEach(f => {
            f.destroy();
        });
        this._puffers.forEach(f => {
            f.destroy();
        });

        ObjectPool.releaseAllObjects();

        this.reset();

        return super.destroy();
    }

    public update(gameTime:number) {
        //if our logic is paused, do not do game loop
        if(this._pauseLogic) return;

        const normalizedTime = Math.min(1, gameTime) + 0.5;

        //update entities
        this._fishes.forEach(fish => {
            fish.update(normalizedTime);
        });
        this._puffers.forEach(puffer => {
            puffer.update(normalizedTime);
        });

        this._cat.update(normalizedTime);

        //update the score
        this._gameScore.update(gameTime);

        super.update(gameTime);
    }

    public enable() {
        (this._container as any).on("click", this._cat.grab, this._cat);
    }

    public disable() {
        (this._container as any).removeAllEventListeners();
    }

    public reset() {
        this._cat.X = 290;
        this._fishes.forEach(f => { ObjectPool.return(f); });
        this._puffers.forEach(f => { ObjectPool.return(f); });

        ObjectPool.releaseAllObjects();

        this._fishContainer.removeAllChildren();
        this._pufferContainer.removeAllChildren();

        this._fishes = [];
        this._puffers = [];


        super.reset();
    }
    /*--------------- GETTERS & SETTERS --------------*/
    public get Game() { return this._game; }
    public get Cat() { return this._cat; }
    public get Fishes() { return this._fishes; }
    public get IsGamelogicPaused() { return this._pauseLogic; }
}



export class POOL { 
    static get CAT() { return "cat"; }
    static get FISH() { return "fish"; }
    static get PUFFERFISH() { return "puffer"; }
    static get PERSEPHONE() { return "persephone"; }
}