import { MediaServerPlayEpisode } from "./media-server-play-episode";
import { Season } from "./season";

export interface Episode {
    id: number;
    title: string;
    episodeNumber: number;
    picture: string;
    season: Season; 
    serverPlays: MediaServerPlayEpisode[]; 
  }