export class User {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: number;
    street: string;
    zipCode: number;
    city: string;
    phoneNumber: number;
    registrationDate: number; // Neues Feld für das Registrierungsdatum


    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.phoneNumber = obj ? obj.phoneNumber : '';
        this.registrationDate = obj ? obj.registrationDate : '';
    }

    // Füge eine Methode hinzu, um den vollen Namen abzurufen
    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            birthDate: this.birthDate,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
            phoneNumber: this.phoneNumber,
            registrationDate: this.registrationDate
        }
    }
}