const db = require("../data/db");
const mongodb = require("mongodb");

class Orders{
    constructor(cart, userData, status = 'pending', date, orderId) {
        this.productData = cart;
        this.userData = userData;
        this.status = status;
        this.date = new Date(date);
        if (this.date) {
          this.formattedDate = this.date.toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });
        }
        this.id = orderId;
    }

    static transformOrderDocument(orderDoc) {
        return new Orders(
            orderDoc.productData,
            orderDoc.userData,
            orderDoc.status,
            orderDoc.date,
            orderDoc._id
        );
    }
    
    static transformOrderDocuments(orderDocs) {
        return orderDocs.map(this.transformOrderDocument);
    }

    async save(){
        if(this.id){

        } else {
            const orderData = {
                userData: this.userData,
                productData: this.productData,
                status: this.status,
                date: new Date()
            };

            return await db.getDB().collection("orders").insertOne(orderData);
        }
    }

    static async getAllOrders(){
        const orders = await db.getDB().collection("orders").find().sort("_id: -1").toArray();
        return this.transformOrderDocument(orders);
    }

    static async getUserOrders(uid){
        const userid = new mongodb.ObjectId(uid);

        const orders = await db
        .getDB()
        .collection('orders')
        .find({ 'userData._id': userid })
        .sort({ _id: -1 })
        .toArray();

        return this.transformOrderDocuments(orders);
    }
}

module.exports = Orders;