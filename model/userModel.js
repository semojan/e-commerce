const db = require("../data/db");

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
    
}