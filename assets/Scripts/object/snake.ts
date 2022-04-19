
import { _decorator, Component, Node, Scheduler, v3, tween, instantiate, Color, sys, director } from 'cc';
import { crashSfx } from '../audio/crashSfx';
import { eatSfx } from '../audio/eatSfx';
import { turnSfx } from '../audio/turnSfx';
import { gameControl } from '../control/gameControl';
import { MOVE_EVENT, SNAKE_DIRECTION, SNAKE_FRAME, SOUND } from '../enum/levelEnum';
import { SCENE_NAME } from '../enum/sceneEnum';
import { soundManager } from '../manager/soundManager';
import { SnakeSprite } from '../sprite/snakeSprite';
import { GameBoard } from './gameBoard';
import { SnakePart } from './snakePart';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = snake
 * DateTime = Thu Apr 07 2022 13:39:19 GMT+0700 (Western Indonesia Time)
 * Author = lthfh503
 * FileBasename = snake.ts
 * FileBasenameNoExtension = snake
 * URL = db://assets/Scripts/object/snake.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('snake')
export class snake extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property(gameControl)
    private gameControl: gameControl;

    @property(SnakeSprite)
    private snakeSprite: SnakeSprite;

    @property(soundManager)
    private soundManager: soundManager

    private snakeParts: Array<SnakePart>;

    private gameBoard?: GameBoard;

    private isDead = false;

    private isMoving = false;

    private interval;

    private currentSpeed: number;

    private isTurning = false;

    // private isEating = false;
    private foodPos = [];

    constructor() {
        super();
        console.log('construct snake')
        if (!this.snakeParts) {
            this.snakeParts = new Array<SnakePart>();
        }
    }

    onLoad() {
        if (this.gameControl) {
            this.gameControl.node.on(MOVE_EVENT.MOVE, (key) => {
                if (!this.isMoving) {
                    this.startMoving();
                    this.isMoving = true;
                } 
                if (!this.isTurning) {
                    this.changeSnakeDirection(key);
                }
            }, this);
        }
    }

    update (deltaTime: number) {
    }

    public addSnake(node: Node, direction: {x: number, y: number}, position: {x: number, y: number}) {
        const newSnakePart = new SnakePart();
        newSnakePart.setDirection(direction.x, direction.y);
        newSnakePart.setNode(node);
        newSnakePart.setPosition(position.x, position.y);
        this.snakeParts.push(newSnakePart);
    }

    public startMoving() {
        this.schedule(this.moveSnake, this.currentSpeed);
    }

    public setGameBoard(gameBoard: GameBoard) {
        this.gameBoard = gameBoard;
        this.interval = gameBoard.getSnakeSpeed();
        this.currentSpeed = this.interval.initial;
        console.log('init current speed: ' + this.currentSpeed);
    }

    private moveSnake() {
        // this.gameControl.node.once(MOVE_EVENT.MOVE, (key) => {
        //     if (!this.isMoving) {
        //         this.startMoving();
        //         this.isMoving = true;
        //     } 
        //     this.changeSnakeDirection(key);
        // }, this);
        let positionBefore: {x: number, y: number};
        let directionBefore: {x: number, y: number};
        let currentPosition;
        let currentDirection;
        this.snakeParts.forEach((part, index) => {
            currentPosition = part.getPosition();
            currentDirection = part.getDirection();
            let direction = part.getDirection();
            if (index === 0) {
                this.movePart(part, {x: part.getPosition().x + direction.x, y: part.getPosition().y + direction.y},
                direction, true);
            } else {
                if (!this.isDead) {
                    this.movePart(part, positionBefore, directionBefore);
                    if (this.foodPos.length > 0 && this.foodPos.indexOf(index) !== -1) {
                        console.log(this.foodPos);
                        if (index === this.snakeParts.length - 1) {
                            this.spawnNewPart(part, index);
                        } else {
                            part.getNode().getComponent(SnakeSprite)?.updateTexture(SNAKE_FRAME.BODY_FAT);
                            part.getNode().getComponent(SnakeSprite)?.setColor(Color.GREEN)
                        }
                        
                    } else if (this.foodPos.length > 0 && index !== this.snakeParts.length - 1) {
                        part.getNode().getComponent(SnakeSprite)?.updateTexture(SNAKE_FRAME.BODY_THIN);
                        part.getNode().getComponent(SnakeSprite)?.setColor(Color.CYAN);
                    }
                }
            }
            positionBefore = currentPosition;
            directionBefore = currentDirection;
        })
        if (this.foodPos.length > 0) {
            this.foodPos.forEach((pos, index) => {
                this.foodPos[index] += 1;
            })
        }
    }

    private spawnNewPart(tail: SnakePart, index: number) {
        console.log(tail);
        this.foodPos.shift();
        tail.getNode().getComponent(SnakeSprite)?.updateTexture(SNAKE_FRAME.BODY_THIN);
        const node = instantiate(this.snakeSprite?.node);
        node.setParent(this.gameBoard.node);
        node.setPosition(tail.getNode().getPosition().x, tail.getNode().getPosition().y);
        node.active = true;
        node.getComponent(SnakeSprite)?.updateTexture(SNAKE_FRAME.TAIL);
        this.addSnake(node, tail.getDirection(), {x: tail.getPosition().x + 1, y:tail.getPosition().y});
    }

    public runEat(totalEat: number) {
        this.soundManager.play(SOUND.EAT);
        this.foodPos.push(0);
        this.updateSpeed(totalEat);
    }

    private updateSpeed(totalEat: number) {
        if (totalEat % this.interval.accelerateEvery === 0 && this.currentSpeed > this.interval.minimum) {
            console.log("update Speed")
            console.log(this.currentSpeed);
            console.log(this.interval.initial);
            console.log(this.interval.accelerateMultiplier);
            this.currentSpeed *= this.interval.accelerateMultiplier;
            if (this.currentSpeed < this.interval.minimum) this.currentSpeed = this.interval.minimum
            console.log(this.currentSpeed);
            this.unschedule(this.moveSnake);
            this.startMoving();
        }
    }

    private movePart(part: SnakePart, destination: {x: number, y: number},
                    direction: {x: number, y: number}, isHead?: boolean) {
        if (isHead && this.gameBoard) {
            if (!this.gameBoard?.isTileFree(destination.x, destination.y)) {
                tween(part.getNode()).to(0.1, {
                    eulerAngles: this.directionToEuler(direction)
                }).start();
                this.runGameover();
                // console.log(this.gameBoard?.isTileFree(destination.x, destination.y));
                
                return;
            };
            if (this.gameBoard.isApple(destination.x, destination.y)) {
                this.gameBoard.node.emit(MOVE_EVENT.EAT);
            }
            this.isTurning = false;
        }
        if (part.getPosition().x === destination.x && part.getPosition().y === destination.y) {
            return;
        }
        tween(part.getNode()).to(this.currentSpeed, {
            position: v3(destination.x * 21, destination.y * -21),
            eulerAngles: this.directionToEuler(direction)
        }).start();
        part.setPosition(destination.x, destination.y);
        part.setDirection(direction.x, direction.y);
    }

    private runGameover() {
        this.isDead = true;
        this.unschedule(this.moveSnake);
        const highScore = sys.localStorage.getItem('highScore');
        
        console.log(highScore)
        console.log(this.gameBoard?.getScore());
        if (!highScore || this.gameBoard?.getScore() > parseInt(highScore)) {
            sys.localStorage.setItem('highScore', this.gameBoard?.getScore().toString())
        }
        this.soundManager.play(SOUND.CRASH);
        this.gameBoard?.runGameOver();
        // this.scheduleOnce(() => {
        //     director.loadScene(SCENE_NAME.TITLE);
        // }, 3)
    }

    private directionToEuler(direction: {x: number, y: number}) {
        if (direction.y === -1) {
            return(v3(0, 0, 0));
        } else if (direction.x === 1) {
            return(v3(0, 0, -90));
        } else if (direction.y === 1) {
            return(v3(0, 0, -180));
        } else if (direction.x === -1) {
            return(v3(0, 0, -270));
        }   
    }

    private changeSnakeDirection(direction: SNAKE_DIRECTION) {
        switch(direction) {
            case SNAKE_DIRECTION.UP:
                if (this.snakeParts[0].getDirection().y === 0) {
                    this.soundManager.play(SOUND.TURN);
                    this.snakeParts[0].setDirection(0, -1);
                    this.isTurning = true;
                }
                break;
            case SNAKE_DIRECTION.DOWN:
                if (this.snakeParts[0].getDirection().y === 0) {
                    this.soundManager.play(SOUND.TURN);
                    this.snakeParts[0].setDirection(0, 1);
                    this.isTurning = true;
                }
                break;
            case SNAKE_DIRECTION.LEFT:
                if (this.snakeParts[0].getDirection().x === 0) {
                    this.soundManager.play(SOUND.TURN);
                    this.snakeParts[0].setDirection(-1, 0);
                    this.isTurning = true;
                }
                break;
            case SNAKE_DIRECTION.RIGHT:
                if (this.snakeParts[0].getDirection().x === 0) {
                    this.soundManager.play(SOUND.TURN);
                    this.snakeParts[0].setDirection(1, 0);
                    this.isTurning = true;
                }
                break;
        }
    }
    
    public getSnakePositions() {
        const snakePos = [];
        this.snakeParts.forEach((part) => {
            snakePos.push(part.getPosition());
        })
        return snakePos;
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
