function authMiddleware(req, res, next) {
    if (req.session.isAuth) {
        next();

    }else{
        res.json({erorr: "Unauthorized user"})
    }
}

module.exports = authMiddleware