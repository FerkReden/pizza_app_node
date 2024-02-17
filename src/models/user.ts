export class User {
    public id: number; 
    public name: string;
    public email: string;
    public password: string;
    public phone: string;
    public token: string;

    constructor(id: number, name: string, email: string, password: string, phone: string, token: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.token = token;
    }
}
