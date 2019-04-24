import { LoadManager } from "../../managers/LoadManager";
import { Fish } from "../Fish";
import { GameScreen } from "../../screens/GameScreen";

export class Persephone extends Fish {

    constructor(gameScreen:GameScreen) {
        super(gameScreen, LoadManager.Spritesheets.Persephone_Spritesheet);
        this._sprite.gotoAndPlay(Persephone.SPEC_ANIMATION.Idle);
    }


    public static get SPEC_ANIMATION() {
        return Object.freeze({
            "Idle" : "persIdle"
        });
    }

}