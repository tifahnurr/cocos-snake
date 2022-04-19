import { AssetConfig, AssetTypeConfig } from '../interface/assetConfigInterface';
import { ASSET_TYPE, ASSET_EXTENSION, ASSET_KEY } from '../enum/assetEnum';

export function getAssets() {
    const assets = Array<AssetConfig>();
    
    assets.push({
        key: ASSET_KEY.LOGO,
        type: ASSET_TYPE.IMAGE,
        localUrl: 'Assets/logo_shopee_ular',
        url: ''
    });

    assets.push({
        key: ASSET_KEY.SNAKE,
        type: ASSET_TYPE.SPRITESHEET,
        localUrl: 'Assets/spritesheet_round',
        url: '',
        config: {
          frameWidth: 96.75,
          frameHeight: 96,
        },    
    });

    assets.push({
        key: ASSET_KEY.KEYPAD,
        type: ASSET_TYPE.SPRITESHEET,
        localUrl: 'Assets/keypad',
        url: '',
        config: {
            frameWidth: 124,
            frameHeight: 124,
            paddingX: 20,
            paddingY: 16
        }
    });

    assets.push({
        key: ASSET_KEY.TILE,
        type: ASSET_TYPE.SPRITESHEET,
        localUrl: 'Assets/sprite_tile',
        url: '',
        config: {
          frameWidth: 48,
          frameHeight: 48,
        },    
    });

    assets.push({
        key: ASSET_KEY.APPLE,
        type: ASSET_TYPE.IMAGE,
        localUrl: 'Assets/sprite_apple',
        url: ''
    });
    
    assets.push({
        key: ASSET_KEY.SOUND_OFF,
        type: ASSET_TYPE.IMAGE,
        localUrl: 'Assets/sprite_sound_off',
        url: ''
    });

    assets.push({
        key: ASSET_KEY.SOUND_ON,
        type: ASSET_TYPE.IMAGE,
        localUrl: 'Assets/sprite_sound_on',
        url: ''
    });

    assets.push({
        key: ASSET_KEY.TROPHY,
        type: ASSET_TYPE.IMAGE,
        localUrl: 'Assets/sprite_trophy',
        url: ''
    });
    
    assets.push({
        key: ASSET_KEY.WALL,
        type: ASSET_TYPE.IMAGE,
        localUrl: 'Assets/sprite_wall',
        url: ''
    });

    assets.push({
        key: ASSET_KEY.BG_SOUND,
        type: ASSET_TYPE.AUDIO,
        localUrl: 'Audio/bg-music',
        url: ''
    })

    assets.push({
        key: ASSET_KEY.BUTTON_SFX,
        type: ASSET_TYPE.AUDIO,
        localUrl: 'Audio/button-sfx',
        url: ''
    })

    assets.push({
        key: ASSET_KEY.CRASH_SFX,
        type: ASSET_TYPE.AUDIO,
        localUrl: 'Audio/crash',
        url: ''
    })

    assets.push({
        key: ASSET_KEY.EAT_SFX,
        type: ASSET_TYPE.AUDIO,
        localUrl: 'Audio/eat',
        url: ''
    })

    assets.push({
        key: ASSET_KEY.TURN_SFX,
        type: ASSET_TYPE.AUDIO,
        localUrl: 'Audio/turn',
        url: ''
    })

    assets.push({
        key: ASSET_KEY.SILENCE_SFX,
        type: ASSET_TYPE.AUDIO,
        localUrl: 'Audio/silence',
        url: ''
    })

    return assets;
}