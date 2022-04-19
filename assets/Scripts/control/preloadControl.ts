
import { _decorator, Component, Node } from 'cc';
import { PRELOAD_EVENT } from '../enum/preloadEnum';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = preloadControl
 * DateTime = Wed Apr 06 2022 13:07:11 GMT+0700 (Western Indonesia Time)
 * Author = lthfh503
 * FileBasename = preloadControl.ts
 * FileBasenameNoExtension = preloadControl
 * URL = db://assets/Scripts/control/preloadControl.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('PreloadControl')
export class PreloadControl extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    public createControl() {
        this.node.on(Node.EventType.TOUCH_END, () => {
            this.node.emit(PRELOAD_EVENT.TOUCH_END);
        })
    }
}
