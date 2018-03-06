import { IDictionaryItem } from '../dictionary-item';

export interface IAsset {
    aclass: string;
    altname: string;
    decimals: number;
    display_decimals: number;
}

export type AssetDictionary = IDictionaryItem<IAsset>;
