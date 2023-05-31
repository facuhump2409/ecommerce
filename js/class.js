export class Beverage {
    constructor(name, price, quantity, id) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.id = id;
    }

    calculateTotalAmount() {
        return this.price * this.quantity;
    }
}