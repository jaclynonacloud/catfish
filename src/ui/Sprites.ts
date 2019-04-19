import { LoadManager } from "../managers/LoadManager";

/**Used to gain access to in-game sprites. */
export class Sprites {
    public static CLEAR_DATA:string = "onClearData";

    private static _backgrounds:{ [key:string]:createjs.DisplayObject } = { };
    private static _buttons:{ [key:string]:createjs.DisplayObject } = { };

    private static _graphics:{ [key:string]:createjs.DisplayObject } = { };

    private static _spritesheets:createjs.SpriteSheet[];

    private static _canClearData:boolean = false;

    /*--------------- METHODS ------------------------*/
    public static setup() {
        return new Promise((res, rej) => {
            // Sprites.spritesheets = spritesheets
            //setup all the sprites
            /* ------- STATIC ------- */
            Sprites._backgrounds.Main = new createjs.Sprite(LoadManager.Spritesheets.UI); // Static BG
            (Sprites._backgrounds.Main as createjs.Sprite).gotoAndStop("bg_main_static");

            Sprites._backgrounds.Logo = new createjs.Sprite(LoadManager.Spritesheets.Entities); // LOGO
            (Sprites._backgrounds.Logo as createjs.Sprite).gotoAndStop("icon_title");

            Sprites._backgrounds.BG = LoadManager.Images.BG; // Redux
            Sprites._backgrounds.BGTop = LoadManager.Images.BGTop;


            /* ------- ANIMATED ------- */
            Sprites._backgrounds.Wave = new createjs.Sprite(LoadManager.Spritesheets.UI); // Animated BG
            (Sprites._backgrounds.Wave as createjs.Sprite).gotoAndPlay("bg_main");


            /* ------- GRAPHICS ------ */
            Sprites._graphics.Timer = new createjs.Sprite(LoadManager.Spritesheets.ScoreHUD_Spritesheet);
            (Sprites._graphics.Timer as createjs.Sprite).gotoAndPlay("sprTime");
            Sprites._graphics.Score = new createjs.Sprite(LoadManager.Spritesheets.ScoreHUD_Spritesheet);
            (Sprites._graphics.Score as createjs.Sprite).gotoAndPlay("sprScore");
            Sprites._graphics.FishRemain = new createjs.Sprite(LoadManager.Spritesheets.ScoreHUD_Spritesheet);
            (Sprites._graphics.FishRemain as createjs.Sprite).gotoAndPlay("sprFish");
            
            /* ------- BUTTONS ------- */
            Sprites._buttons.NewGame = new createjs.Sprite(LoadManager.Spritesheets.Entities); // New Game
            (Sprites._buttons.NewGame as createjs.Sprite).gotoAndStop("btn_new_game");
            new createjs.ButtonHelper(Sprites._buttons.NewGame as createjs.Sprite, "btn_new_game", "btn_new_game_hover", "btn_new_game_hover");


            Sprites._buttons.Options = new createjs.Sprite(LoadManager.Spritesheets.Entities); // Options
            (Sprites._buttons.Options as createjs.Sprite).gotoAndStop("btn_new_game");
            new createjs.ButtonHelper(Sprites._buttons.Options as createjs.Sprite, "btn_options", "btn_options_hover", "btn_options_hover");

            Sprites._buttons.LevelSelect = new createjs.Sprite(LoadManager.Spritesheets.Entities); // Select
            (Sprites._buttons.LevelSelect as createjs.Sprite).gotoAndStop("btn_select");
            new createjs.ButtonHelper(Sprites._buttons.LevelSelect as createjs.Sprite, "btn_select", "btn_select_hover", "btn_select_hover");

            Sprites._buttons.Exit = new createjs.Sprite(LoadManager.Spritesheets.Entities); // Exit
            (Sprites._buttons.Exit as createjs.Sprite).gotoAndStop("btn_select");
            new createjs.ButtonHelper(Sprites._buttons.Exit as createjs.Sprite, "btn_exit", "btn_exit_hover", "btn_exit_hover");

            Sprites._buttons.Fishbowl = new createjs.Sprite(LoadManager.Spritesheets.Entities); // Fishbowl
            (Sprites._buttons.Fishbowl as createjs.Sprite).gotoAndStop("btn_select");
            new createjs.ButtonHelper(Sprites._buttons.Fishbowl as createjs.Sprite, "icon_fishbowl", "icon_fishbowl_hover", "icon_fishbowl_hover", true);


            /* ------- MENU ------- */
            Sprites._backgrounds.LevelSelectBG = new createjs.Sprite(LoadManager.Spritesheets.Menu_Level_Select); // Level Select BG
            (Sprites._backgrounds.LevelSelectBG as createjs.Sprite).gotoAndStop("static_bg");
            Sprites._buttons.LevelEmpty = new createjs.Sprite(LoadManager.Spritesheets.Menu_Level_Select); // Level Empty Button
            (Sprites._buttons.LevelEmpty as createjs.Sprite).gotoAndStop("level_empty");
            Sprites._buttons.LevelComplete = new createjs.Sprite(LoadManager.Spritesheets.Menu_Level_Select); // Level Complete Button
            (Sprites._buttons.LevelComplete as createjs.Sprite).gotoAndStop("level_complete");
            Sprites._buttons.LevelSpecialEmpty = new createjs.Sprite(LoadManager.Spritesheets.Menu_Level_Select); // Level Special Empty Button
            (Sprites._buttons.LevelSpecialEmpty as createjs.Sprite).gotoAndStop("level_special_empty");
            Sprites._buttons.LevelSpecialComplete = new createjs.Sprite(LoadManager.Spritesheets.Menu_Level_Select); // Level Special Complete Button
            (Sprites._buttons.LevelSpecialComplete as createjs.Sprite).gotoAndStop("level_special_complete");


            /* ------- COMPLEX ------- */
            Sprites._setupBTNClearData();

            res();
        });
    }

    // /* --- Complex createjs.Sprite Setup --- */
    private static _setupBTNClearData() {
        Sprites._buttons.ClearData = new createjs.Sprite(LoadManager.Spritesheets.UI); // BTN Clear Data
        (Sprites._buttons.ClearData as createjs.Sprite).gotoAndStop("btn_clear_data");
        (Sprites._buttons.ClearData as createjs.Sprite).cursor = "pointer";
        Sprites._canClearData = false;
    }
    public static listenToClearData() {
        //listen
        (Sprites._buttons.ClearData as any).on("mousedown", Sprites._btnDataDown);
        (Sprites._buttons.ClearData as any).on("animationend", Sprites._btnDataComplete);
        (Sprites._buttons.ClearData as any).on("click", Sprites._btnDataUp);
    }
    public static stopListenToClearData() {
        //listen
        (Sprites._buttons.ClearData as any).off("mousedown", Sprites._btnDataDown);
        (Sprites._buttons.ClearData as any).off("animationend", Sprites._btnDataComplete);
        (Sprites._buttons.ClearData as any).off("click", Sprites._btnDataUp);
    }

    private static _btnDataDown(e) {
        (Sprites._buttons.ClearData as createjs.Sprite).gotoAndPlay("btn_clear_data_progress");
        Sprites._canClearData = true;
    }
    private static _btnDataUp(e) {
        (Sprites._buttons.ClearData as createjs.Sprite).gotoAndStop("btn_clear_data");
        Sprites._canClearData = false;
    }
    private static _btnDataComplete(e) {
        (Sprites._buttons.ClearData as createjs.Sprite).gotoAndStop("btn_clear_data");
        //dispatch event to button
        if(Sprites._canClearData) {
            (Sprites._buttons.ClearData as createjs.Sprite).dispatchEvent(new Event(Sprites.CLEAR_DATA));
        }
    }



    /**A helper function to generate and cache text for the StageGL object. */
    public static generateText(text, details = "20px Arial", color = "#FFFEEE") {
        const textObj = new createjs.Text(text, details, color)
        textObj.cache(0, 0, textObj.getBounds().width, textObj.getBounds().height);
        return textObj;
    }

    public static generateBitmapText(text, spritesheet) {
        const textObj = new createjs.BitmapText(text, spritesheet);
        return textObj;
    }


    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    /*--------------- GETTERS & SETTERS --------------*/
    public static get Backgrounds() { return Sprites._backgrounds; }
    public static get Buttons() { return Sprites._buttons; }
    public static get Graphics() { return Sprites._graphics; }

    // static get BG() { return Sprites._bg }
    // static get Logo() { return Sprites._logo }
    // static get AnimBG() { return Sprites._animBg }
    // static get GameBG() { return Sprites._gameBG }
    // static get GameBGTop() { return Sprites._gameBGTop }
    // //buttons
    // static get BTN_New_Game() { return Sprites._btnNewGame }
    // static get BTN_Options() { return Sprites._btnOptions }
    // static get BTN_Select() { return Sprites._btnSelect }
    // static get BTN_Exit() { return Sprites._btnExit }
    // static get BTN_Fishbowl() { return Sprites._btnFishbowl }
    // static get BTN_ClearData() { return Sprites._btnClearData }


    // static get CLEAR_DATA() { return "onClearData" }
}