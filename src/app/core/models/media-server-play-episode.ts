import { Episode } from "./episode";
import { Media } from "./media";
import { ServerPlay } from "./server-play";

export interface MediaServerPlayEpisode {
    id: number;
    mediaPath: string;
    media: Media; // Assuming Media is another class/interface
    serverPlay: ServerPlay; // Assuming ServerPlay is another class/interface
    episode: Episode; // Assuming Episode is another class/interface
  }