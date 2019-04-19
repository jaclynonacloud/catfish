import { Screen } from "./Screen";
import { ScreenManager } from "../managers/ScreenManager";
import { ObjectPool } from "../ObjectPool";
import { Fish } from "../entities/Fish";
import { Cat } from "../entities/Cat";
import { Game } from "../Game";
import { Container } from "../ui/display/Container";
import { Sprites } from "../ui/Sprites";
import { Logging } from "../Functions";
import { LevelData } from "../managers/DataManager";
import { LoadManager } from "../managers/LoadManager";

export class GameScreen extends Screen {
    private _game:Game;
    private _levelData:LevelData;

    //create containers
    private _staticContainer:Container;
    private _fishContainer:createjs.Container;

    private _winContainer:createjs.Container;
    private _winBanner:createjs.Shape;
    private _winText:createjs.BitmapText;

    private _cat:Cat;
    private _fishes:Fish[];
    
    private _remainingFish:number;
    
    constructor(game:Game) {
        super();
        this._game = game;
        this._fishes = [];
        this._remainingFish = -1;
        this._levelData = null;

        //create object pool
        ObjectPool.createPoolObject(new Cat(this), POOL.CAT)
        for(let i = 0; i < 120; i++) {
            ObjectPool.createPoolObject(new Fish(this), POOL.FISH);
        }
        // for(let i = 0; i < 30; i++) {
        //     ObjectPool.createPoolObject(new Puffer(this._game), POOL.PUFFERFISH)
        // }


        //pool out static kitty
        this._cat = (ObjectPool.checkout(POOL.CAT) as Cat);

        //create containers
        this._staticContainer = new Container();
        this._staticContainer.addMany({
            bg : Sprites.Backgrounds.BG
        });

        this._fishContainer = new createjs.Container();

        this._winContainer = new createjs.Container();
    }

    /*--------------- METHODS ------------------------*/

    /**Attempts to grab a fish.  Returns any fish that are touching the global position. */
    public tryToGrabFishes(x:number, y:number):Fish[] {
        let fishes = [];

        //see if any fish is grabbable at these coords and return if so
        //for each fish, test the distance and return if close
        for(let i = 0; i < this._fishes.length; i++) {
            const fish = this._fishes[i];

            const localPos = fish.Sprite.globalToLocal(x, y);
            const hitFish = fish.testHit(localPos.x, localPos.y);

            if(hitFish) {
                fishes.push(fish);
            }
        }
        //if no fish was caught, return null
        return fishes;
    }

    public collectFish(fish:Fish) {
        //get fish
        Logging.success("GOT FISH!");

        const killedFish = fish.destroy();

        //decrement fish counter -- make sure we didn't make an error
        if(killedFish != null) {
            this._remainingFish--;

            //if all our fish are gone, end the game!
            if(this._remainingFish <= 0) {
                //win game!
                Logging.success("GAME IS OVER!");
                this.win();
            }
        }
    }


    public win() {
        this.disable();
        //show win banner
        createjs.Tween.get(this._winContainer)
            .to({y:this._game.StageHeight / 2 - 25}, 600, createjs.Ease.elasticOut)
            .wait(2000)
            .call(() => {
                //transition to end screen
                ScreenManager.setCurrentScreen("end", this._game.Stage);
                // ScreenManager.setCurrentScreen("menu", this._game.Stage);
            });
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


        //add level data if it exists
        if(this._levelData != null) {
            //load in critters
            for(let i = 0; i < this._levelData.data.length; i++) {
                const data = this._levelData.data[i];
                switch(data.id) {
                    case POOL.FISH:
                        const fish = (ObjectPool.checkout(POOL.FISH) as Fish);
                        fish.create(this._fishContainer);
                        if(data.speed != null) fish.Speed = data.speed; //set variables
                        if(data.x != null) fish.X = data.x;
                        if(data.y != null) fish.Y = data.y;
                        if(data.flip != null && data.flip) fish.DirectionX = -1;
                        fish.setNaturalY();
                        this._fishes.push(fish);
                        break;
                }      
            }

            //set fish total
            this._remainingFish = this._fishes.length;
        }

        return null;
    }

    public destroy() {
        this._cat.destroy();
        this._fishes.forEach(f => f.destroy());
        this._fishContainer.removeAllChildren();

        this._fishes = [];

        return super.destroy();
    }

    public update(gameTime:number) {
        const normalizedTime = Math.min(1, gameTime) + 0.5;

        //update entities
        this._fishes.forEach(fish => {
            fish.update(normalizedTime);
        });

        this._cat.update(normalizedTime);

        super.update(gameTime);
    }

    public enable() {
        (this._container as any).on("click", this._cat.grab, this._cat);
    }

    public disable() {
        (this._container as any).removeAllEventListeners();
    }
    /*--------------- GETTERS & SETTERS --------------*/
    public get Game() { return this._game; }

    public set LevelData(data:LevelData) { this._levelData = data; }
}



export class POOL { 
    static get CAT() { return "cat"; }
    static get FISH() { return "fish"; }
    static get PUFFERFISH() { return "puffer"; }
}