function createSession(req, user, action){
    req.session.uid = user._id.toString();
    req.session.isAdmin = user.isAdmin;
    req.session.save(action);
}

function destroySession(req){
    req.session.uid = null;
}

module.exports = {
    createSession: createSession,
    destroySession: destroySession
};
