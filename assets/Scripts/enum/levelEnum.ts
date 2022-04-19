export enum SNAKE_FRAME {
    HEAD = 0,
    BODY_THIN = 3,
    BODY_FAT = 1,
    TAIL = 2
}

export enum SNAKE_DIRECTION {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right'
}

export enum MOVE_EVENT {
    MOVE = 'move',
    EAT = 'eat',
}

export enum GAME_EVENT {
    GAME_OVER = 'gameover',
    ERROR = 'error',
    START_PLAYING = 'start_playing'
}

export enum SOUND_CONF {
    ON = 'on',
    OFF = 'off'
}

export enum SOUND {
    EAT = 'eat',
    TURN = 'turn',
    CRASH = 'crash',
    BUTTON = 'button',
}