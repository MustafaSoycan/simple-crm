export class Note {
    title: string;
    description: string;
    


    constructor(obj?: any) {
        this.title = obj ? obj.firstName : '';
        this.description = obj ? obj.description : '';
    }


    public toJSON() {
        return {
            title: this.title,
            description: this.description
        }
    }
}