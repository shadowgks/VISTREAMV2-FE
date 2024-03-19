import { Media } from "./media";

export interface Slider{
    name:      string;
    date?:     Date;
    isEnabled: boolean;
    mediaSet:  Media[];
}