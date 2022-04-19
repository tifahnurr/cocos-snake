
import { _decorator, Component, Node, director } from 'cc';
import { SCENE_NAME } from '../enum/sceneEnum';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = button
 * DateTime = Wed Apr 06 2022 15:17:09 GMT+0700 (Western Indonesia Time)
 * Author = lthfh503
 * FileBasename = button.ts
 * FileBasenameNoExtension = button
 * URL = db://assets/Scripts/objects/button.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('button')
export class button extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        console.log('startt');
        this.registerTouchEvent();
    }

    private registerTouchEvent() {
        console.log('registering')
        this.node.on(Node.EventType.TOUCH_END, () => {
            director.loadScene(SCENE_NAME.GAME);
        })
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
