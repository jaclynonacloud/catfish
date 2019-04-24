export class SoundManager {
    private static _ambience:{ [key:string]:createjs.AbstractSoundInstance } = {};
    private static _sfx:createjs.AbstractSoundInstance[] = [];

    /*--------------- METHODS ------------------------*/
    /**Plays an ambience track. */
    public static playAmbience(key:string, src:string, loop:boolean=true) {
        //make sure this key is not in use
        if(SoundManager._ambience[key] != null) {
            SoundManager._ambience[key].stop();
            console.warn("This ambience key is already in use! Overwriting!");
        }

        //add the ambience as a sound js object
        const sound = createjs.Sound.play(src, { loop:(loop) ? -1 : 1} );
        SoundManager._ambience[key] = sound;
        sound.position = 0;
        return sound;
    }
    /**Plays an ambience track with fade in. */
    public static playAmbienceWithFadeIn(key:string, src:string, loop:boolean=true, prefVolume:number=1, duration:number=100, ) {
        const sound = SoundManager.playAmbience(key, src, loop);

        //start fade in 
        if(sound != null) {
            SoundManager.fadeInAmbience(key, prefVolume, duration);
        }

    }
    /**Removes an ambience track. */
    public static removeAmbience(key:string) {
        //look for ambience
        let sound = SoundManager._ambience[key];
        if(sound == null) {
            console.warn("Could not find ambience with key of " + key);
            return;
        }

        sound.stop();
        sound = null;
        //splice it out
        SoundManager._ambience[key] = null;
    }

    /**Plays a sound effect. */
    public static playSFX(src:string, volume:number=1) {
        const sound = createjs.Sound.play(src);
        sound.volume = volume;
        SoundManager._sfx.push(sound);

        //listen for the sound to finish -- remove from array
        sound.on("complete", () => {
            SoundManager._sfx.splice(SoundManager._sfx.indexOf(sound), 1);
        });
    }

    /**Stops all queued sounds. */
    public static stopAllSound() {
        //ambience
        Object.keys(SoundManager._ambience).forEach(key => {
            SoundManager._ambience[key].stop();
        });

        //sfx
        SoundManager._sfx.forEach(sound => sound.stop());
    }

    /**Plays any queued sounds. */
    public static playAllSound() {
         //ambience
        Object.keys(SoundManager._ambience).forEach(key => {
            const sound = SoundManager._ambience[key];
            if(sound != null)
                sound.play();
        });

        //sfx
        SoundManager._sfx.forEach(sound => {
            if(sound != null)
                sound.play()
        });
    }


    /**Fades in an ambience track. */
    public static fadeInAmbience(key:string, prefVolume:number=1, duration:number=100) {
        //find the ambience to fade
        let sound = SoundManager._ambience[key];
        if(sound == null) return;

        //fade volume from 0
        sound.volume = 0;
        sound.play();
        const step = prefVolume / duration;

        const fadeEvent = () => {
            //clear the interval if done
            if(sound.volume >= prefVolume) {
                window.clearInterval(fadeInterval);
                return;
            }

            sound.volume += step;
        };
        const fadeInterval = window.setInterval(fadeEvent, 10);
        
    }
    /**Fades out an ambience track. */
    public static fadeOutAmbience(key:string, duration:number=100, killOnFinish:boolean=true) {
        //find the ambience to fade
        let sound = SoundManager._ambience[key];
        if(sound == null) return;
        const prefVolume = sound.volume;

        //fade volume to 0
        const step = prefVolume / duration;

        const fadeEvent = () => {
            //clear the interval if done
            if(sound.volume <= 0) {
                window.clearInterval(fadeInterval);
                //turn off sound
                sound.stop();
                //set volume back to preferred
                sound.volume = prefVolume;
                if(killOnFinish) sound = null;
                return;
            }

            sound.volume -= step;
        };
        const fadeInterval = window.setInterval(fadeEvent, 10);
        
    }
    /*--------------- ABSTRACTS ----------------------*/
    /*--------------- EVENTS -------------------------*/
    /*--------------- OVERRIDES ----------------------*/
    /*--------------- GETTERS & SETTERS --------------*/
}