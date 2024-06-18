function getSignup(req, res, next){
    res.render("./shared/signup");
}

function postSignup(req, res, next){
    console.log("hi")
}

function getLogin(req, res, next){
    res.render("./shared/login");
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