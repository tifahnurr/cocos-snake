
import { _decorator, Component, Node, sys } from 'cc';
import { SOUND_CONF } from '../enum/levelEnum';
import { soundManager } from '../manager/soundManager';
import { SoundSprite } from '../sprite/soundSprite';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = soundButton
 * DateTime = Mon Apr 18 2022 14:47:18 GMT+0700 (Western Indonesia Time)
 * Author = lthfh503
 * FileBasename = soundButton.ts
 * FileBasenameNoExtension = soundButton
 * URL = db://assets/Scripts/object/soundButton.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('soundButton')
export class soundButton extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property(SoundSprite)
    soundSprite: SoundSprite;

    @property(soundManager)
    soundManager: soundManager;

    private currentConf: boolean;

    private isLoaded = false;

    start () {
        this.registerTouchEvent();
        
    }

    reload() {
        this.updateSprite();
    }

    update() {
        if (!this.isLoaded) {
            if (this.soundManager) {
                this.updateSprite();
                this.isLoaded = true;
            }
        }
    }

    private registerTouchEvent() {
        this.node.on(Node.EventType.TOUCH_END, () => {
            this.soundManager.toggleSoundConf();
            this.updateSprite();
        }, this);
    }

    private updateSprite() {
        const currentSoundConf = this.soundManager.getSoundConf();
        if (this.currentConf === undefined || this.currentConf !== currentSoundConf) {
            console.log('updating sprite');
            this.soundSprite.updateTexture(currentSoundConf);
            this.currentConf = currentSoundConf;
        }
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
