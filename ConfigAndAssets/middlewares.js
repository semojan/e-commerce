function checkAuth(req, res, next){
    const uid = req.session.uid;

    if(!uid){
        return next();
    }

    res.locals.uid = uid;
    res.locals.isAuth = true;
    res.locals.isAdmin = req.session.isAdmin;

    next();
}

function errorHandler(error, req, res, next){
    console.log(error);

    if(error.code === 404){
        return res.status(404).render("shared/404");
    }
    
    return res.status(500).render("shared/500");
}

function protectRoutes(req, res, next){
    if (!res.locals.isAuth){
        res.redirect("/401");
    }

    if (req.path.startsWith("/admin") && !res.locals.isAdmin){
        res.redirect("/403");
    }

    next();
}

module.exports  = {
    checkAuth: checkAuth,
    errorHandler:  errorHandler,
    protectRoutes: protectRoutes
};
