const sessionFlash = require("../ConfigAndAssets/sessionFlash");

function getSignup(req, res, next){
    let sessionData = sessionFlash.getSessionData(req);

    if(!sessionData){
        sessionData = {
            email: "",
            fullName: "",
            street: "",
            city:""
        };
    }

    res.render("./shared/signup", {inputData: sessionData});
}

function postSignup(req, res, next){
    console.log("hi")
}

function getLogin(req, res, next){
    let sessionData = sessionFlash.getSessionData(req);

    if(!sessionData){
        sessionData = {
            email: ""
        };
    }

    res.render("./shared/login", {inputData: sessionData});
}

function postLogin(req, res, next){
    console.log("hi")
}

module.exports = {
    getSignup: getSignup,
    postSignup: postSignup,
    getLogin: getLogin,
    postLogin: postLogin
};