import { Country } from "./country";
import { Credit } from "./credit";
import { Genre } from "./genre";
import { Production } from "./production";
import { Video } from "./video";

export interface Media{
    id:               number;
    idTmdb:           number;
    idImdb:           string;
    title:            string;
    originalTitle:    string;
    duration:         number;
    posterPath:       string;
    backDropPath:     string;
    status:           string;
    releaseDate:      Date;
    overview:         string;
    shortLink:        string;
    originalLanguage: string;
    adult:            boolean;
    popularity:       number;
    voteAverage:      number;
    voteCount:        number;
    typeMedia:        string;
    typeQuality:      null;
    genres:           Genre[];
    countries:        Country[];
    productions:      Production[];
    videos:           Video[];
    credits:          Credit[];
    seasons:          any[];
    watchlists:       any[];
    serverPlays:      any[];
    sliders:          any[];
}