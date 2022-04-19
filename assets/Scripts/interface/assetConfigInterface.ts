import { ASSET_EXTENSION, ASSET_TYPE } from '../enum/assetEnum'
export interface AssetConfig {
    key: string;
    type: ASSET_TYPE;
    localUrl: string;
    url: string;
    ext?: ASSET_EXTENSION;
    config?: AssetTypeConfig;
}

export interface AssetTypeConfig {
    frameWidth?: number;
    frameHeight?: number;
    paddingX?: number;
    paddingY?: number;
}