const MongoStore = require('connect-mongo');

function Sconfig(){
    return {
        secret: 'super_duper_secret',
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: 'mongodb://localhost:27017/e-commerce',
            collectionName: "sessions"
        }),
        cookie:{
			      maxAge:  2 * 24 * 60 * 60 * 1000
		    }
    };
}

module.exports = Sconfig;


