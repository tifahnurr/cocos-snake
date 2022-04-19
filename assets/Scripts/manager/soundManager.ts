
import { _decorator, Component, Node, sys } from 'cc';
import { bgSound } from '../audio/bgSound';
import { crashSfx } from '../audio/crashSfx';
import { eatSfx } from '../audio/eatSfx';
import { turnSfx } from '../audio/turnSfx';
import { SOUND, SOUND_CONF } from '../enum/levelEnum';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = soundManager
 * DateTime = Mon Apr 18 2022 14:54:25 GMT+0700 (Western Indonesia Time)
 * Author = lthfh503
 * FileBasename = soundManager.ts
 * FileBasenameNoExtension = soundManager
 * URL = db://assets/Scripts/manager/soundManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('soundManager')
export class soundManager extends Component {
    @property(eatSfx)
    private eatSfx?: eatSfx;

    @property(turnSfx)
    private turnSfx?: turnSfx;

    @property(crashSfx)
    private crashSfx?: crashSfx;

    @property(bgSound)
    private bgSound: bgSound;

    private soundConf: boolean;

    start () {
        const soundConfig = sys.localStorage.getItem('soundConfig');
        if (soundConfig && soundConfig === SOUND_CONF.OFF) {
            this.setSoundConf(false);
        } else {
            this.setSoundConf(true);
            this.bgSound.play();
        }
        
    }

    play(sound: SOUND) {
        if (this.soundConf) {
            switch(sound) {
                case (SOUND.EAT):
                    this.eatSfx.play();
                    break;
                case (SOUND.TURN):
                    this.turnSfx.play();
                    break;
                case (SOUND.CRASH):
                    this.crashSfx.play();
                    break;
            }
        }
    }

    toggleSoundConf() {
        this.soundConf = !this.soundConf;
        sys.localStorage.setItem('soundConfig', this.soundConf ? SOUND_CONF.ON : SOUND_CONF.OFF);
        if (this.soundConf) {
            this.bgSound.play();
        } else {
            this.bgSound.stop();
        }
    }

    setSoundConf(soundConf: boolean) {
        this.soundConf = soundConf
    }

    getSoundConf() {
        return this.soundConf;
    }
    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
