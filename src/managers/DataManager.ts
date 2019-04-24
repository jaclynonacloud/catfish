import { Screen } from "../screens/Screen";

export interface WorldsData {
    worlds:LevelData[];
}

export interface LevelData {
    name:string;
    tutorials?:string[];
    background?:string;
    music?:string;
    data:any[];
    duration?:number;
    showScore?:boolean;
    showRemainingFish?:boolean;
    special?:boolean;
    unlocks?:string; // name of unlock fish
}

export class DataManager {
    private static _worldsData:WorldsData;


    /*--------------- METHODS ------------------------*/
    /**Loads in the worlds data! */
    public static loadWorldsData(fileLocation:string) {
        return new Promise<WorldsData>(async(res, rej) => {
            await fetch(fileLocation)
                .then(blob => blob.json())
                .then(json => {
                    this._worldsData = json;
                    res(this._worldsData);
                })
                .catch(err => {
                    rej("Could not load world data! " + err);
                });
        });
    }

    /**Returns the level data received by the given index. */
    public static getLevelDataByIndex(index:number) {
        //flatten level data, and get data
        let flatten = [].concat.apply([], DataManager._worldsData.worlds);
        if(index < flatten.length)
            return flatten[index];
        return null;
    }

    /**Inverse of getLevelDataByIndex.
     * @see getLevelDataByIndex . */
    public static getLevelIndexByData(levelData:LevelData) {
        //flatten level data, and get data
        let flatten = [].concat.apply([], DataManager._worldsData.worlds);
        return flatten.indexOf(levelData);
    }

    /**Gets the next level data or returns null if there is no next level. */
    public static getNextLevel(currentLevel:number | LevelData) {
        let index = currentLevel as number;
        if(currentLevel as LevelData != null) index = this.getLevelIndexByData(currentLevel as LevelData);

        //get the next index
        return this.getLevelDataByIndex(index + 1);
    }

    /**Gets the world and level index of the given level. */
    public static getIndexData(levelData:LevelData) {
        //test each world and look for us
        for(let i = 0; i < DataManager._worldsData.worlds.length; i++) {
            const world = DataManager._worldsData.worlds[i];
            for(let n = 0; n < (world as any).length; n++) {
                if(world[n] == levelData) return { world:i, level:n };
            }            
        }

        return { world:-1, level:-1 };
    }
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    /*--------------- GETTERS & SETTERS --------------*/
    public static get WorldsData():WorldsData { return DataManager._worldsData; }
    public static get FlatWorldData() { return [].concat.apply([], DataManager._worldsData.worlds); }
}