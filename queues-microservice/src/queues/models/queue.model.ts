export class QueueDTO {

    constructor(name: string, expires: Date) {
        this.name = name;
        this.expires = expires;
    }

    name: string;
    expires: Date;
}