const db = require("../data/db");

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
            await db.getDB().collection("products").insertOne({prodData});
        }
    }
}

module.exports = Product;