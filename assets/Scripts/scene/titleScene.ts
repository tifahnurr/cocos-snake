import { _decorator, Component, Node, director, RichText, sys } from 'cc';
import { LoadingUI } from '../manager/loader/loadingUI';
import { AssetLoader } from '../manager/assetLoader';
import { ASSET_LOADER_EVENT } from '../enum/assetLoader';
import { PreloadControl } from '../control/preloadControl';
import { PRELOAD_EVENT } from '../enum/preloadEnum';
import { SCENE_NAME } from '../enum/sceneEnum';
import { SoundSprite } from '../sprite/soundSprite';
import { SOUND_CONF } from '../enum/levelEnum';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = preloadScene
 * DateTime = Wed Apr 06 2022 11:14:37 GMT+0700 (Western Indonesia Time)
 * Author = lthfh503
 * FileBasename = preloadScene.ts
 * FileBasenameNoExtension = preloadScene
 * URL = db://assets/Scene/preloadScene.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('TitleScene')
export class TitleScene extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property(RichText)
    highScore: RichText;

    start () {
        console.log("start title scene");
        const currentHighScore = sys.localStorage.getItem('highScore');
        if (currentHighScore) {
            this.highScore.string = `Highscore: ${currentHighScore}`;
        }
        
    }
    // update (deltaTime: number) {
    //     // [4]
    // }
}
