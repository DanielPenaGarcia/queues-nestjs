import { User } from "@core/interfaces";

export interface Session {
    accessToken: string;
    user: User;
}