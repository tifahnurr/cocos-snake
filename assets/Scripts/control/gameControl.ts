
import { _decorator, Component, Node, SystemEvent, Input, systemEvent, macro, KeyCode } from 'cc';
import { MOVE_EVENT, SNAKE_DIRECTION } from '../enum/levelEnum';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = gameControl
 * DateTime = Mon Apr 11 2022 15:35:46 GMT+0700 (Western Indonesia Time)
 * Author = lthfh503
 * FileBasename = gameControl.ts
 * FileBasenameNoExtension = gameControl
 * URL = db://assets/Scripts/control/gameControl.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('gameControl')
export class gameControl extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    private isAbleToMove: boolean;

    start () {
        this.setupKeyboard();
    }

    public setupKeyboard() {
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.event, this);
    }

    public enableMoving() {
        this.isAbleToMove = true;
    }

    public disableMoving() {
        this.isAbleToMove = false;
    }

    public getIsAbleToMove() {
        return (this.isAbleToMove)
    }

    public event(key) {
        switch(key.keyCode) {
            case KeyCode.ARROW_UP:
                this.snakeMovement(SNAKE_DIRECTION.UP);
                break;
            case KeyCode.ARROW_DOWN:
                this.snakeMovement(SNAKE_DIRECTION.DOWN);
                break;
            case KeyCode.ARROW_RIGHT:
                this.snakeMovement(SNAKE_DIRECTION.RIGHT);
                break;
            case KeyCode.ARROW_LEFT:
                this.snakeMovement(SNAKE_DIRECTION.LEFT);
                break;
        }
    }

    private snakeMovement(direction: SNAKE_DIRECTION) {
        console.log(this.isAbleToMove);
        if (this.isAbleToMove) this.node.emit(MOVE_EVENT.MOVE, direction);
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
