import { Screen } from "../screens/Screen";

export interface WorldsData {
    worlds:LevelData[];
}

export interface LevelData {
    name:string;
    data:any[];
    duration?:number;
    showScore?:boolean;
    showRemainingFish?:boolean;
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
        return flatten[index];
    }
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    /*--------------- GETTERS & SETTERS --------------*/
    public static get WorldsData():WorldsData { return DataManager._worldsData; }
}