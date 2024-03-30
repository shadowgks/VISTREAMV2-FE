import { User } from "./user";

export interface Token {
    accessToken: string,
    refreshToken: string,
    userObj: User;
}