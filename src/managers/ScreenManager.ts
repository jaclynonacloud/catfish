import { Screen } from "../screens/Screen";

export class ScreenManager {
    private static _screensLookup:{ [key:string]:Screen } = { };
    private static _currentScreen:Screen = null;


    /*--------------- METHODS ------------------------*/
    /**Registers a screen into the Screen Manager.  Uses a key to associate it. */
    public static registerScreen(key:string, screen:Screen):void {
        //if we don't have this screen, add it
        if(ScreenManager._screensLookup[key] == null)
            ScreenManager._screensLookup[key] = screen;
    }

    /**Unregisters a screen from the Screen Manager. */
    public static unregisterScreen(key:string):boolean {
        if(ScreenManager._screensLookup[key] == null) return false;

        ScreenManager._screensLookup[key] = null;
        delete ScreenManager._screensLookup[key];
        return true;
    }

    /**Sets the current screen.  Can be done with the screen itself or an associative key. */
    public static setCurrentScreen(screen:string | Screen, stage:createjs.StageGL):Promise<void> {
        let tempScreen = null;
        if(screen instanceof Screen) tempScreen = screen;
        else tempScreen = ScreenManager._screensLookup[screen];

        //if we did not find a screen, do not follow through
        if(tempScreen == null) return Promise.resolve();

        let promises = [];
        //if we have a previous screen, wait for it to fade out
        if(ScreenManager._currentScreen != null)
        promises.push(
            new Promise(async(res) => {
                //fade out
                createjs.Tween
                    .get(ScreenManager._currentScreen.Container)
                    .to({ alpha:0 }, 500, createjs.Ease.linear)
                    .call(() => {
                        ScreenManager._currentScreen.destroy();
                        ScreenManager._currentScreen.disable();
                        res();
                    });
            })
        );


        //wait for certain actions to finish
        return new Promise(async(res) => {
            //wait for promises to finish
            await Promise.all(promises);

            //now add in the new one
            ScreenManager._currentScreen = tempScreen;
            ScreenManager._currentScreen.create(stage);
            ScreenManager._currentScreen.Container.alpha = 0;
            ScreenManager._currentScreen.disable(); //disable until ready
            console.log("FADE IN")
            //fade in
            createjs.Tween
                .get(ScreenManager._currentScreen.Container)
                .to({ alpha:1 }, 1200, createjs.Ease.linear)
                .call(() => {
                    console.log("DONE");
                    ScreenManager._currentScreen.enable();
                    res();
                });

        });
    }

    public static getScreenByKey(key:string):Screen {
        return ScreenManager._screensLookup[key];
    }
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    /*--------------- GETTERS & SETTERS --------------*/
    public static get AllScreens() { return ScreenManager._screensLookup; }
    public static get CurrentScreen() { return ScreenManager._currentScreen; }
}