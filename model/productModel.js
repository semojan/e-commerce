const db = require("../data/db");
const mongodb = require("mongodb");

class Product{
    constructor(productData) {
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = +productData.price;
        this.description = productData.description;
        this.image = productData.image;
        this.imagePath = `images/${this.image}`;
        this.imageUrl = `/product/assets/images/${this.image}`;
        if (productData._id) {
            this.id = productData._id.toString();
        }
    }

    static async findAll (){
        const products = await db.getDB().collection("products").find().toArray();

        return products.map(function (productData){
            return new Product(productData);
        });
    }

    async save(){
        let price;
        if(!this.price){
            price = -1;
        }else{
            price = this.price;
        }
        
        const prodData = {
            title: this.title,
            image: this.image,
            summary: this.summary,
            price: price,
            description: this.description
        };


        if (this.id){} else {
            await db.getDB().collection("products").insertOne(prodData);
        }
    }

    static async findProdById(id){
        let pid;
        try{
            pid = new mongodb.ObjectId(id);
        }catch(e){
            e.code = 404;
            throw e;
        }

        const product = await db.getDB().collection("products").findOne({_id: pid});

        if(!product){
            const error = new Error("product not found");
            error.code = 404;
            throw error;
        }

        return product;
    }
}

module.exports = Product;