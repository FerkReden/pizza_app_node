export class Order {
    public userId: number;
    public products: Array<string>;  
    public totalAmount: number;
    public date: string;

    constructor(userId: number, products: Array<string>, totalAmount: number, date: string) {
        this.userId = userId;
        this.products = products;
        this.totalAmount = totalAmount;
        this.date = date;
    }
}
