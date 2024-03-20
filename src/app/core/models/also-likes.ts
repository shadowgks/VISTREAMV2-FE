export interface AlsoLike{
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
}