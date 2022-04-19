
import { _decorator, Component, Node, RichText, v3 } from 'cc';
import { ASSET_KEY } from '../../enum/assetEnum';
import { LogoSprite } from '../../sprite/logoSprite';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = loadingUI
 * DateTime = Wed Apr 06 2022 11:20:12 GMT+0700 (Western Indonesia Time)
 * Author = lthfh503
 * FileBasename = loadingUI.ts
 * FileBasenameNoExtension = loadingUI
 * URL = db://assets/Scripts/manager/loader/loadingUI.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('loadingUI')
export class LoadingUI extends Component {
    
    @property(RichText)
    public percentLoadText?: RichText;

    @property(LogoSprite)
    public logoSprite?: LogoSprite

    @property(Node)
    progressBar: Node;

    public updateText(progress: number, key?: string) {
        const { percentLoadText } = this;
        const percentage = Math.floor(progress * 100);
        if (percentLoadText) {
            if (percentage === 100) {
                percentLoadText.string = `<color="#1A3362">Click to start</color>`;
            } else {
                percentLoadText.string = `<color="#1A3362">${percentage}%</color>`;
            }
        }
        this.progressBar.setScale(v3(2 * progress, 1, 1));
        // console.log(ASSET_KEY.LOGO);
        // if (key === ASSET_KEY.LOGO) {
        //     this.logoSprite.reload();
        // }
    }
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
