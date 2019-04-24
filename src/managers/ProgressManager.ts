import { WorldsData } from "./DataManager";

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

    /**Saves the progress data to a cookie or two. */
    public static saveCookieData() {
        
    }

    /**Reads cookie data and fills in progress data. */
    private static _readCookieData() {

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