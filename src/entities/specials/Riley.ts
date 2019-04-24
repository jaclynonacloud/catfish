import { LoadManager } from "../../managers/LoadManager";
import { Special } from "./Special";
import { Game } from "../../Game";

export class Riley extends Special {

    constructor(game:Game) {
        super(game, LoadManager.Spritesheets.Specials_Spritesheet);
        this._sprite.gotoAndPlay(Riley.SPEC_ANIMATION.Idle);
    }


    public static get SPEC_ANIMATION() {
        return Object.freeze({
            "Idle" : "rileyIdle"
        });
    }

}