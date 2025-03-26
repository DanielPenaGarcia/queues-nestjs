export class TurnInProgressDTO {

    constructor(listen: string, data: any){
        this.listen = listen;
        this.data = data;
    }

    listen: string;
    data: any;
}