
import { _decorator, Component, Node, UITransform, instantiate, v3, RichText } from 'cc';
import { getRandomLevel } from '../config/levelConfig';
import { GAME_EVENT, MOVE_EVENT, SNAKE_FRAME } from '../enum/levelEnum';
import { snake } from '../object/snake';
import { AppleSprite } from '../sprite/appleSprite';
import { SnakeSprite } from '../sprite/snakeSprite';
import { TileSprite } from '../sprite/tileSprite';
import { WallSprite } from '../sprite/wallSprite';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = gameBoard
 * DateTime = Wed Apr 06 2022 16:23:23 GMT+0700 (Western Indonesia Time)
 * Author = lthfh503
 * FileBasename = gameBoard.ts
 * FileBasenameNoExtension = gameBoard
 * URL = db://assets/Scripts/object/gameBoard.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 

@ccclass('GameBoard')
export class GameBoard extends Component {
    // [1]
    // dummy = '';

    @property(TileSprite)
    tileSprite: TileSprite;

    @property(WallSprite)
    wallSprite: WallSprite;

    @property(SnakeSprite)
    snakeSprite: SnakeSprite;

    @property(snake)
    snake: snake;

    @property(AppleSprite)
    apple: AppleSprite;

    @property(RichText)
    scoreText: RichText;

    private levelConfig: any;
    private tileSize: {x: number, y: number};
    private currentApple: Node;
    private applePosition: {x: number, y: number} = {x: -1, y: -1};

    private score = 0;

    private isError: boolean;

    // private snakeList: Array<Snake>;

    start () {
        this.levelConfig = getRandomLevel();
        this.initBoard();
        this.initSnake();
        // this.snake.startMoving(this);
        this.spawnApple();
        if (!this.isError) {
            console.log('emitted')
            this.node.emit(GAME_EVENT.START_PLAYING)
        }
        this.node.on(MOVE_EVENT.EAT, this.snakeEat, this)
    }

    private snakeEat() {
        this.score++;
        this.snake.runEat(this.score);
        this.spawnApple();
        this.scoreText.string = this.score.toString();
    }

    public getScore() {
        return this.score;
    }

    private initBoard() {
        this.tileSize = {
            x: this.levelConfig.boardConfig.tiles.length,
            y: this.levelConfig.boardConfig.tiles[0].length
        }
        this.levelConfig.boardConfig.tiles.forEach((row, rowIndex) => {
            row.forEach((tile, colIndex) => {
                if (tile === 1) {
                    const wallSprite = this.wallSprite;
                    if (wallSprite) {
                        const { x, y } = this.getCoordinate(colIndex, rowIndex);
                        const node = instantiate(wallSprite?.node);
                        node.setParent(this.node);
                        node.setPosition(x, y);
                        node.active = true;
                    }
                } else {
                    const tileSprite = this.tileSprite;
                    if (tileSprite) {
                        const { x, y } = this.getCoordinate(colIndex, rowIndex);
                        const node = instantiate(tileSprite?.node);
                        node.setParent(this.node);
                        node.setPosition(x, y);
                        node.active = true;
                        node.getComponent(TileSprite)?.updateTexture((colIndex + rowIndex) % 2 === 0);
                    }
                }
            })
        })
    }

    public getCoordinate(x: number, y: number) {
        const { width, height } = this.getComponent(UITransform);
        return {
            x: width * x,
            y: -height * y
        }
    }

    private checkPart(part, lastPart) {
        console.log(lastPart);
        console.log(part);
        return (lastPart === undefined || (Math.abs(part.x - lastPart.x) <= 1 && Math.abs(part.y - lastPart.y) <= 1))
    }

    private initSnake() {
        const partLength = this.levelConfig.snakeConfig.parts.length;
        this.snake.setGameBoard(this);
        if (this.levelConfig.snakeConfig.parts.length < 3) {
            this.runError();
            return;
        }
        let lastPart;
        this.levelConfig.snakeConfig.parts.forEach((part, index) => {
            if (!this.isTileFree(part.x, part.y) || !this.checkPart(part, lastPart)) {
                this.runError();
                return;
            }
            lastPart = part;
            let frame : SNAKE_FRAME;
            if (index === 0) {
                frame = SNAKE_FRAME.HEAD;
            } else if (index === partLength - 1) {
                frame = SNAKE_FRAME.TAIL;
            } else {
                frame = SNAKE_FRAME.BODY_THIN
            }

            
            const snakeSprite = this.snakeSprite;
            if (snakeSprite) {
                const { x, y } = this.getCoordinate(part.x, part.y);
                const node = instantiate(snakeSprite?.node);
                node.setParent(this.node);
                node.setPosition(x, y);
                node.active = true;
                node.getComponent(SnakeSprite)?.updateTexture(frame);
                if (index > 0) {
                    const partBefore = this.levelConfig.snakeConfig.parts[index - 1]
                    const direction = {
                        x: part.x - partBefore.x,
                        y: part.y - partBefore.y
                    }
                    if (direction.y === 1) {
                        node.setRotationFromEuler(v3(0, 0, 0));
                    } else if (direction.x === -1) {
                        node.setRotationFromEuler(v3(0, 0, -90));
                    } else if (direction.y === -1) {
                        node.setRotationFromEuler(v3(0, 0, -180));
                    } else if (direction.x === 1) {
                        node.setRotationFromEuler(v3(0, 0, -270));
                    }   
                    this.snake.addSnake(node, {x: -direction.x, y: -direction.y}, part);
                } else {
                    const partAfter = this.levelConfig.snakeConfig.parts[index + 1]
                    const direction = {
                        x: part.x - partAfter.x,
                        y: part.y - partAfter.y
                    }
                    if (direction.y === -1) {
                        node.setRotationFromEuler(v3(0, 0, 0));
                    } else if (direction.x === 1) {
                        node.setRotationFromEuler(v3(0, 0, -90));
                    } else if (direction.y === 1) {
                        node.setRotationFromEuler(v3(0, 0, -180));
                    } else if (direction.x === -1) {
                        node.setRotationFromEuler(v3(0, 0, -270));
                    }   
                    this.snake.addSnake(node, direction, part); 
                }
            }
        })
    }

    public isTileFree(x: number, y: number, isSnakeHead?: boolean) {
        // console.log(`${x}  ${y}`)
        // console.log(this.snakeList);
        // console.log(this.snakeList.indexOf({x: x, y: y}))
        if (x < 0 || y < 0 || 
            x >= this.levelConfig.boardConfig.tiles.length ||
            y > this.levelConfig.boardConfig.tiles[0].length) {
                return false;
            }
        const snakeIndex = this.snake.getSnakePositions().findIndex(
            (data) => {
                // console.log(data);
                return (data.x === x && data.y === y)
            })
        if (isSnakeHead) {
            return (this.levelConfig.boardConfig.tiles[y][x] === 0 
                && (snakeIndex === -1 || snakeIndex === 0)
            )
        } else {
            return (this.levelConfig.boardConfig.tiles[y][x] === 0 
                && (snakeIndex === -1)
            )
        }
    }

    private runError() {
        this.isError = true;
        this.node.emit(GAME_EVENT.ERROR);
    }

    public runGameOver() {
        this.node.emit(GAME_EVENT.GAME_OVER)
    }

    private spawnApple() {
        let isEligible: boolean = false;
        let x: number;
        let y: number;
        while (!isEligible) {
            x = Math.floor(Math.random() * this.tileSize.x);
            y = Math.floor(Math.random() * this.tileSize.y);
            if (this.isTileFree(x, y) && !this.isApple(x, y)) {
                isEligible = true;
            }
        }
        
        const coordinate = this.getCoordinate(x, y);
        if (!this.currentApple) {
            const node = instantiate(this.apple?.node);
            node.setParent(this.node);
            node.setPosition(coordinate.x, coordinate.y);
            node.active = true;
            this.currentApple = node;
        } else {
            this.currentApple.setPosition(coordinate.x, coordinate.y);
        }
        this.applePosition = {x: x, y: y};
    }

    public isApple(x: number, y: number){
        return (this.applePosition.x === x && this.applePosition.y === y);
    }

    public getSnakeSpeed() {
        return (this.levelConfig.snakeConfig.interval);
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
