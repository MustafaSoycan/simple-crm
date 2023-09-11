export class Event {
    title: string = '';
    description: string = '';
    date: Date = new Date();
    assignedUsers: string[]; // Verwende ein Array von Benutzer-IDs
    assignedCompanys: string[]; 


    constructor(obj?: any) {
        this.title = obj ? obj.title : '';
        this.description = obj ? obj.description : '';
        this.date = obj ? obj.date : '';
        this.assignedUsers = obj ? obj.assignedUsers || [] : []; // Initialisiere es mit einem leeren Array
        this.assignedCompanys = obj ? obj.assignedCompanys || [] : []; // Initialisiere es mit einem leeren Array
    }


    public toJSON() {
        return {
            title: this.title,
            description: this.description,
            date: this.date,
            assignedUsers: this.assignedUsers,
            assignedCompanys: this.assignedCompanys,
        }
    }
}