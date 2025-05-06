function roleMiddleware(requiredRole) {
    return(req, res, next) =>{
        if(!req.session.isAuth){
            return res.json({error:"Unauthorized user"})
        }
        if (req.session.user.role !== requiredRole) {
            return res.json({error: "Access Denied"})
        }
        next();
    }
}

module.exports = roleMiddleware