export class Company {
    name: string;
    email: string;
    birthDate: number;
    street: string;
    zipCode: number;
    city: string;
    assignedUsers: string[]; // Verwende ein Array von Benutzer-IDs
    phoneNumber: number; // Verwende ein Array von Benutzer-IDs
    monthlySales: number;
    amountEmployees: number;


    constructor(obj?: any) {
        this.name = obj ? obj.name : '';
        this.email = obj ? obj.email : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.assignedUsers = obj ? obj.assignedUsers || [] : []; // Initialisiere es mit einem leeren Array
        this.phoneNumber = obj ? obj.phoneNumber : '';
        this.monthlySales = obj ? obj.monthlySales : '';
        this.amountEmployees = obj ? obj.amountEmployees : '';
    }

    public toJSON() {
        return {
            name: this.name,
            email: this.email,
            birthDate: this.birthDate,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
            assignedUsers: this.assignedUsers,
            phoneNumber: this.phoneNumber,
            monthlySales: this.monthlySales,
            amountEmployees: this.amountEmployees,
        };
    }
}