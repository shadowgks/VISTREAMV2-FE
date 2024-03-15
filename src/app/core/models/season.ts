import { Episode } from "./episode";
import { Media } from "./media";

export interface Season{
    id: number;
    idTmdb: number;
    title: string;
    seasonNumber: number;
    picture: string;
    voteAverage: number;
    airDate: Date;
    episodeCount: number;
    overview: string;
    media: Media; // Assuming Media is another class/interface
    episodes: Episode[];
}