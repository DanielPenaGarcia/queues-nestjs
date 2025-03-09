import { Credentials } from "@core/interfaces";

export interface SignUp extends Credentials {
    names: string;
    lastNames: string;
    sexId: string;
}