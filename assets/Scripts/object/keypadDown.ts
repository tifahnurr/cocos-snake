
import { _decorator, Component, Node, KeyCode } from 'cc';
import { gameControl } from '../control/gameControl';
import { SNAKE_DIRECTION } from '../enum/levelEnum';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = keypad
 * DateTime = Wed Apr 13 2022 14:26:17 GMT+0700 (Western Indonesia Time)
 * Author = lthfh503
 * FileBasename = keypad.ts
 * FileBasenameNoExtension = keypad
 * URL = db://assets/Scripts/object/keypad.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('keypadDown')
export class keypadDown extends Component {
    // [1]
    // dummy = '';

    @property(gameControl)
    gameControl: gameControl;

    // @property
    // type: number;

    public keyCode: KeyCode;

    start () {
        console.log('started');
        // console.log(this.type);
        // [3]
        // switch (this.type) {
        //     case 0:
        //         this.keyCode = KeyCode.ARROW_UP;
        //         break;
        //     case 1:
        //         this.keyCode = KeyCode.ARROW_LEFT;
        //         break;
        //     case 2:
                this.keyCode = KeyCode.ARROW_DOWN;
        //         break;
        //     case 3:
        //         this.keyCode = KeyCode.ARROW_RIGHT;
        //         break;
        // }
        this.registerTouchEvent()
    }

    private registerTouchEvent() {
        console.log('registering');
        this.node.on(Node.EventType.TOUCH_END, () => {
            // console.log('tourched');
            this.gameControl.event(this);
        }, this)
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
