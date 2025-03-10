const db = require("../data/db");
const mongo = require("mongodb");
const bcrypt = require("bcrypt");

class User {
    constructor(email, pass, fullName, street, city){
        this.email = email;
        this.pass = pass;
        this.fullName = fullName;
        this.address = {
            street: street,
            city: city
        };
    }
    
    async existsAlready(){
        const existingUser = await this.getUserWithSameEmail();
        if(existingUser){
            return true;
        }
        return false;
    }

    async getUserWithSameEmail(){
        return db.getDB().collection("users").findOne({email: this.email});
    }

    static getById(uid){
        const userid = new mongo.ObjectId(uid);
        return db.getDB().collection("users").findOne({_id: userid},  {projection: {pass: 0}});
    }

    async signup(){
        const hashedPass = await bcrypt.hash(this.pass, 12);

        console.log(hashedPass)
        await db.getDB().collection("users").insertOne({
            email: this.email,
            pass: hashedPass,
            fullName: this.fullName,
            address: this.address
        });
    }

    async comparePass(pass){
        return await bcrypt.compare(this.pass, pass);
    }
}

module.exports = User;