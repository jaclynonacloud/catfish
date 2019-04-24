export class LoadManager {
    public static get ASSETS_LOADED():string { return "onAssetsLoaded"; }
    public static get ASSETS_FAILED():string { return "onAssetsFailed"; }
    public static get ASSETS_UPDATED():string { return "onAssetsUpdated"; }

    public static Spritesheets:{ [key:string]:createjs.SpriteSheet } = {};
    public static Images:{ [key:string]:createjs.Bitmap } = {};
    public static Sounds:{ [key:string]:string } = {};

    private static _stage:createjs.StageGL;
    private static _preloadManager:createjs.LoadQueue;
    private static _sheetsTotal:number = 0;
    private static _sheetsLoaded:number = 0;

    private static _percentage:number = 0;
    private static _totalAssetsLoaded:number = 0;
    private static _totalAssets:number = 0;

    private static AssetsLoadedEvent:any = new (createjs as any).Event(LoadManager.ASSETS_LOADED, false, true);
    private static AssetsFailedEvent:any = new (createjs as any).Event(LoadManager.ASSETS_FAILED, false, true);
    private static AssetsUpdatedEvent:any = new (createjs as any).Event(LoadManager.ASSETS_UPDATED, false, true);

    /*--------------- METHODS ------------------------*/
    public static reset() {
        LoadManager._sheetsTotal = 0;
        LoadManager._sheetsLoaded = 0;

        LoadManager._percentage = 0;
        LoadManager._totalAssetsLoaded = 0;
        LoadManager._totalAssets = 0;
    }

    public static loadAssets(src:string, stage:createjs.StageGL) {
        LoadManager.reset();
        LoadManager._stage = stage;

        return new Promise(async(res, rej) => {
            LoadManager._preloadManager = new createjs.LoadQueue();

            //setup sound controllers
            createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashAudioPlugin]);
            createjs.Sound.alternateExtensions = ["mp3","wav"];
            LoadManager._preloadManager.installPlugin(createjs.Sound);

            //setup listeners
            (LoadManager._preloadManager as any).on("fileload", LoadManager._onLoaded, LoadManager);
            (LoadManager._preloadManager as any).on("complete", LoadManager._onComplete, LoadManager);
            (LoadManager._preloadManager as any).on("error", LoadManager._onError, LoadManager);

            //get the manifest
            fetch(src)
                .then(blob => blob.json())
                .then(data => {
                    //load the manifest
                    LoadManager._preloadManager.setMaxConnections(1);
                    LoadManager._preloadManager.loadManifest(data);

                    (LoadManager._stage as any).addEventListener(LoadManager.ASSETS_LOADED, () => {
                        res();
                    });
                })
                .catch(() => {
                    LoadManager.emitErrorEvent();
                    rej("Could not load assets!");
                });


        });

    }


    public static emitLoadedEvent() {
        if(LoadManager._stage != null) (LoadManager._stage as any).dispatchEvent(LoadManager.AssetsLoadedEvent);
    }
    public static emitErrorEvent() {
        if(LoadManager._stage != null) (LoadManager._stage as any).dispatchEvent(LoadManager.AssetsFailedEvent);
    }
    public static emitUpdatedEvent() {
        LoadManager._percentage = parseFloat((LoadManager._preloadManager.getItems(true).length / LoadManager._preloadManager.getItems(false).length).toFixed(2));
        if(LoadManager._stage != null) (LoadManager._stage as any).dispatchEvent(LoadManager.AssetsUpdatedEvent);
    }


    private static _loadedSheet(name:string, sheet:createjs.SpriteSheet) {
        LoadManager.Spritesheets[name] = sheet;

        LoadManager._sheetsLoaded++;
    }
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    private static _onLoaded(e) {

        console.log("asset loaded: " + e.item.src + " type: " + e.item.type);

        switch(e.item.type) {
            case (createjs as any).Types.JAVASCRIPT: {
                //load the spritesheet
                LoadManager._sheetsTotal++;
                
                const sheet = (window[e.item.id] as any)._SpriteSheet;

                // listen for spritesheet to load
                if(!sheet.complete) {
                    sheet.on("complete", (ev:any) => {
                        LoadManager._loadedSheet(e.item.id, sheet);
                        ev.remove();
                    })
                }
                else LoadManager._loadedSheet(e.item.id, sheet);
                break
            }
            case (createjs as any).Types.IMAGE: {
                //build the bitmap
                LoadManager.Images[e.item.id] = new createjs.Bitmap(e.item.src);
            }
            case (createjs as any).Types.SOUND: {
                //build the sound
                LoadManager.Sounds[e.item.id] = e.item.src;
            }
        }



        //update event
        LoadManager.emitUpdatedEvent();
    }

    private static _onComplete(e) {
        //remove all preLoadManager events
        (LoadManager._preloadManager as any).removeAllEventListeners();
        
        //make sure all spritesheets are loaded
        if(LoadManager._sheetsLoaded < LoadManager._sheetsTotal) {
            const loadInterval = setInterval((ev:any) => {
                //see if they are loaded
                if(LoadManager._sheetsLoaded >= LoadManager._sheetsTotal) {
                    e.remove();
                    // window.clearInterval(loadInterval);
                    LoadManager.emitLoadedEvent();
                }
            }, 100)
        }
        else LoadManager.emitLoadedEvent();
    }

    private static _onError(e) {
        LoadManager.emitErrorEvent();
    }
    /*--------------- OVERRIDES ----------------------*/
    /*--------------- GETTERS & SETTERS --------------*/
    public static get Percentage():number { return LoadManager._percentage; }
    



}