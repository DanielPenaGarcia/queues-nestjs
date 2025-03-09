import { UserInfoDTO } from "./user-info.interface";

export interface Credentials {
    accessToken: string;
    user: UserInfoDTO;
}