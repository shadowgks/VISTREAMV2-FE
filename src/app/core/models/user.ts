import { Role } from "./role";

export interface User {
    firstName:     string;
    lastName:      string;
    userNamee:     string;
    email:         string;
    accessionDate: Date;
    roles:         Role[];
    watchlists:    any[];
}