export class TurnInProgressDTO {

    constructor(key: string, event: string){
        this.key = key;
        this.event = event;
    }

    key: string;
    event: string;
}