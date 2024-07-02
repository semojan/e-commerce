const sessionFlash = require("../ConfigAndAssets/sessionFlash");

const User = require("../model/userModel");
const valid = require("../ConfigAndAssets/validations");
const authUtil = require("../ConfigAndAssets/authUtil");

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

async function postSignup(req, res, next){
    let inputData = {
        email: req.body.email,
        pass: req.body.pass,
        confirmPass: req.body.confirmPass,
        fullName: req.body.fullName,
        street: req.body.street,
        city: req.body.city
    };

    if (!valid.validUserInput(
        req.body.email,
        req.body.pass,
        req.body.confirmPass,
        req.body.fullName,
        req.body.street,
        req.body.city
    )){
        sessionFlash.FlashToSession(req,
            {
                ...inputData,
                message: "invalid input, please make sure to insert valid data."
            },
            function(){
                res.redirect("/signup");
            }
        );
        
        return;
    }

    const user = new User(
        req.body.email,
        req.body.pass,
        req.body.fullName,
        req.body.street,
        req.body.city
    );

    try {
        const existsAlready = await user.existsAlready();
        
        if (existsAlready){
            sessionFlash.FlashToSession(req,
                {
                    ...inputData,
                    message: "there is already a user with this email."
                },
                function(){
                    res.redirect("/signup");
                }
            );
            return;
        }

        await user.signup();

        res.redirect("/login");
    } catch(e){
        next(e);
        return;
    }
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

async function postLogin(req, res, next){
    const user = new User(req.body.email, req.body.pass);

    let existingUser;
    try{
        existingUser = await user.getUserWithSameEmail();
    }catch(e){
            next(e);
            return;
    }

    if (!existingUser){
        sessionFlash.FlashToSession(req, {
            email: req.body.email,
            message: "there is no account with this email."
        },
        function(){
            res.redirect("/login");
        });
        return;
    }

    const correctPass = await user.comparePass(existingUser.pass.toString());

    if(!correctPass){
        sessionFlash.FlashToSession(req, {
            email: req.body.email,
            message: "incorrect password."
        },
        function(){
            res.redirect("/login");
        });
        return;
    }

    authUtil.createSession(req, existingUser, function(){
        if(res.locals.isAdmin){
            res.redirect("/admin/product");
        }else{
            res.redirect("/");
        }      
    });
}

function getLogout(req, res, next){
    authUtil.destroySession(req);
    res.redirect("/login");
}

module.exports = {
    getSignup: getSignup,
    postSignup: postSignup,
    getLogin: getLogin,
    postLogin: postLogin,
    getLogout: getLogout
};