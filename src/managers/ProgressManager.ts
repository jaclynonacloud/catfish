import { WorldsData, LevelData } from "./DataManager";

export interface IProgressLevel {
    unlocked: boolean;
    completed: boolean;
}

export interface IProgressSpecial {
    collected: boolean;
    unlocks: string;
}

/**Handles progress made while playing the game. */
export class ProgressManager {

    private static _worldsData:WorldsData;
    private static _levelsProgress:IProgressLevel[];
    private static _specialsProgress:IProgressSpecial[];
    
    /*--------------- METHODS ------------------------*/
    /**Loads in the worlds data so it can parse the progress data. */
    public static loadWorldsData(worldsData:WorldsData) {
        ProgressManager._worldsData = worldsData;

        //build data for world set

        console.log(worldsData);

        ProgressManager._levelsProgress = worldsData.worlds.map(world => {
            return [].concat.apply([], world as any)
                .map(level => {
                    return { unlocked: false, completed: false };
                });
        });
        ProgressManager._specialsProgress = worldsData.worlds.map(world => {
            return [].concat.apply([], world as any)
                .map(level => {
                    if(level.special) return { collected: false, unlocks:level.unlocks };
                    return null;
                });
        });

        //unlock level 1
        ProgressManager._levelsProgress[0][0].unlocked = true;

        console.log("PROGRESS", ProgressManager._levelsProgress, ProgressManager._specialsProgress);

        //read cookie data
        ProgressManager._readCookieData();
    }

    /**Mark level as complete. Also saves data. */
    public static completeLevel(worldIndex:number, levelIndex:number) {
        //set to complete!
        const level = ProgressManager._levelsProgress[worldIndex][levelIndex];
        if(level == null) return;
        level.completed = true;

        //if there is a next level, unlock it
        //test for next in this world
        const nextLevel = ProgressManager._levelsProgress[worldIndex][levelIndex+1];
        if(nextLevel != null) {
            nextLevel.unlocked = true;
        }
        else {
            const nextWorld = ProgressManager._levelsProgress[worldIndex+1][0];
            if(nextWorld != null) nextWorld.unlocked = true;
        }

        //save cookie data
        ProgressManager.saveCookieData();
    }

    /**Mark special as collected.  Also saves data. */
    public static collectSpecial(worldIndex:number, levelIndex:number) {
        //set to collected!
        const level = ProgressManager._specialsProgress[worldIndex][levelIndex];
        if(level == null) return;
        level.collected = true;

        //save cookie data
        ProgressManager.saveCookieData();
    }

    /**Saves the progress data to a cookie or two. */
    public static saveCookieData() {
        console.log("MY NEW SAVE DATA", ProgressManager.ProgressData);

        document.cookie = `progData=${JSON.stringify(ProgressManager.ProgressData)};path=/`;
    }

    /**Reads cookie data and fills in progress data. */
    private static _readCookieData() {
        //look for cookie
        const cookie = ProgressManager._getCookie("progData");
        if(cookie != null) {
            //read the cookie
            const data = JSON.parse(cookie);
            ProgressManager._levelsProgress = data.levels;
            ProgressManager._specialsProgress = data.specials;
        }
    }


    /*https://www.w3schools.com/js/js_cookies.asp*/
    private static _getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    /*--------------- GETTERS & SETTERS --------------*/
    public static get ProgressData() {
        return {
            levels : ProgressManager._levelsProgress,
            specials : ProgressManager._specialsProgress
        };
    }
}