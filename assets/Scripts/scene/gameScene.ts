import { _decorator, Component, Node, director, RichText, sys } from 'cc';
import { LoadingUI } from '../manager/loader/loadingUI';
import { AssetLoader } from '../manager/assetLoader';
import { ASSET_LOADER_EVENT } from '../enum/assetLoader';
import { PreloadControl } from '../control/preloadControl';
import { PRELOAD_EVENT } from '../enum/preloadEnum';
import { SCENE_NAME } from '../enum/sceneEnum';
import { GameBoard } from '../object/gameBoard';
import { GAME_EVENT } from '../enum/levelEnum';
import { bgSound } from '../audio/bgSound';
import { soundManager } from '../manager/soundManager';
import { popup } from '../object/popup';
import { gameControl } from '../control/gameControl';
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
 
@ccclass('GameScene')
export class GameScene extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property(GameBoard)
    gameBoard: GameBoard;

    @property(RichText)
    highScore: RichText;

    @property(popup)
    popup: popup;

    @property(gameControl)
    gameControl: gameControl;

    isError: boolean;
    isPopupAlreadyShown: boolean;

    isMovementAlreadyEnabled: boolean;

    start () {
        console.log("start game scene");
        this.gameBoard.node.on(GAME_EVENT.GAME_OVER, this.runGameOver, this)
        this.highScore.string = sys.localStorage.getItem('highScore');
        this.gameBoard.node.on(GAME_EVENT.ERROR, this.runError, this);
        this.gameBoard.node.on(GAME_EVENT.START_PLAYING, this.startPlay, this);
        // this.bgSound.play();
    }

    runGameOver() {
        this.popup.showPopup(`${this.gameBoard.getScore()}`, 'Your score', 'Try again', () => {
            director.loadScene(SCENE_NAME.GAME)
        } ,'Exit', () => {
            director.loadScene(SCENE_NAME.TITLE)
        })
    }
    runError() {
        console.log('run error')
        this.isError = true;
    }

    startPlay() {
        console.log("enable moving");
        this.gameControl.enableMoving();
    }

    update() {
        if (this.isError) {
            if (this.isPopupAlreadyShown === undefined) {
                this.isPopupAlreadyShown = false;
            }
            if (!this.isPopupAlreadyShown) {
                if (this.popup) {
                    this.gameControl.disableMoving();
                    this.popup.showPopup('Invalid Snake', '', 'Reload', () => {
                        director.loadScene(SCENE_NAME.GAME)
                    }, 'Title', () => {
                        director.loadScene(SCENE_NAME.TITLE)
                    });
                    this.isPopupAlreadyShown = true;
                }
            }
        } else {
            if (!this.gameControl.getIsAbleToMove()) {
                this.gameControl.enableMoving();
            }
        }
    }
    // update (deltaTime: number) {
    //     // [4]
    // }
}
