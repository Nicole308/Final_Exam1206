const { append } = require("express/lib/response");

// To check if the user is logged in or not
function isAuth(req, res, next){
    if(req.session.user){
        next();
        // res.status(403)
        // return res.send("You need to sign in")
    } else {
        res.redirect('/')
    }
}


module.exports = {
    isAuth
}