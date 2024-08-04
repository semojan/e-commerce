const db = require("../data/db");
const Product = require("./productModel");

class Cart {
    constructor(items = [], totalQuantity = 0, totalPrice = 0) {
        this.items = items;
        this.totalQuantity = totalQuantity;
        this.totalPrice = totalPrice;
    }

    addItem(product) {
        const cartItem = {
            product: product,
            quantity: 1,
            totalPrice: +product.price
        };

        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (this.items[i].product.id === product.id) {
                cartItem.quantity = +item.quantity + 1;
                cartItem.totalPrice = +item.totalPrice + product.price;
                this.items[i] = cartItem;
                this.totalQuantity++;
                this.totalPrice += product.price;
                return;
            }
        }

        this.items.push(cartItem);
        this.totalQuantity++;
        this.totalPrice += product.price;
    }

    updateItem(pid, newQuantity) {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (item.product.id === pid) {
                if (newQuantity > 0) {
                    const cartItem = { ...item };
                    const quantityChange = newQuantity - item.quantity;
                    cartItem.quantity = newQuantity;
                    cartItem.totalPrice = newQuantity * item.product.price;
                    this.items[i] = cartItem;

                    this.totalQuantity += quantityChange;
                    this.totalPrice += quantityChange * item.product.price;
                    return { updatedItemPrice: cartItem.totalPrice };
                } else {
                    this.items.splice(i, 1);
                    this.totalQuantity -= item.quantity;
                    this.totalPrice -= item.totalPrice;
                    return { updatedItemPrice: 0 };
                }
            }
        }
    }

    async updatePrices() {
        const pids = this.items.map(function (item) {
            return item.product.id;
        });

        const products = await Product.findMultiple(pids);
        const deletableids = [];

        for (const item of this.items) {
            const product = products.find(function (prod) {
                return item.product.id === prod.id;
            });

            if (!product) {
                deletableids.push(item.product.id);
                continue;
            }

            item.product = product;
            item.totalPrice = item.quantity * item.product.price;
        }

        if (deletableids.length > 0) {
            this.items = this.items.filter(function(item){
                return deletableids.indexOf(item.product.id) < 0;
            });
        }

        this.totalPrice = 0;
        this.totalQuantity = 0;

        for(const item of this.items){
            this.totalPrice += item.totalPrice;
            this.totalQuantity += item.quantity;
        }
    }
}

module.exports = Cart;