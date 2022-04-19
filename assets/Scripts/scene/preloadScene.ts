import { _decorator, Component, Node, director } from 'cc';
import { LoadingUI } from '../manager/loader/loadingUI';
import { AssetLoader } from '../manager/assetLoader';
import { ASSET_LOADER_EVENT } from '../enum/assetLoader';
import { PreloadControl } from '../control/preloadControl';
import { PRELOAD_EVENT } from '../enum/preloadEnum';
import { SCENE_NAME } from '../enum/sceneEnum';
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
 
@ccclass('preloadScene')
export class preloadScene extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property(LoadingUI)
    assetLoadingUI: LoadingUI;

    @property(AssetLoader)
    assetLoader: AssetLoader;

    @property(PreloadControl)
    preloadControl: PreloadControl

    start () {
        console.log("start");
        this.startAssetsLoad();
    }

    private startAssetsLoad() {
        const { assetLoader, assetLoadingUI } = this;

        if (!assetLoader || !assetLoadingUI) return;

        assetLoader.node.on(ASSET_LOADER_EVENT.START, (progress: number) => {
            assetLoadingUI.updateText(progress);
        });

        assetLoader.node.on(ASSET_LOADER_EVENT.ASSET_LOAD_SUCCESS, (progress: number, key:string) => {
            console.log(progress);
            assetLoadingUI.updateText(progress, key);
        });

        assetLoader.node.on(ASSET_LOADER_EVENT.COMPLETE, (progress: number) => {
            assetLoadingUI.updateText(progress);
            this.onComplete();
        });

        assetLoader.startAssetsLoad();
    }

    private onComplete() {
        this.preloadControl?.createControl();
        this.preloadControl?.node.once(PRELOAD_EVENT.TOUCH_END, () => {
            this.goToTitleScene();
        })
    }

    private goToTitleScene() {
        director.loadScene(SCENE_NAME.TITLE);
    }
    // update (deltaTime: number) {
    //     // [4]
    // }
}
