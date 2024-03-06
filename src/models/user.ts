export class User {
    public userId: number; 
    public name: string;
    public email: string;
    public password: string;
    public phone: string;
    public token: string;

    constructor(userId: number, name: string, email: string, password: string, phone: string, token: string) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.token = token;
    }
}
