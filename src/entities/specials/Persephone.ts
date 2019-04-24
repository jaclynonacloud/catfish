import { LoadManager } from "../../managers/LoadManager";
import { Special } from "./Special";
import { Game } from "../../Game";

export class Persephone extends Special {

    constructor(game:Game) {
        super(game, LoadManager.Spritesheets.Persephone_Spritesheet);
        this._sprite.gotoAndPlay(Persephone.SPEC_ANIMATION.Idle);
    }


    public static get SPEC_ANIMATION() {
        return Object.freeze({
            "Idle" : "persIdle"
        });
    }

}