const emailValidation = require("../helpers/emailValidation");
const usersSchema = require("../models/usersSchema");
const bcrypt = require('bcrypt');

async function loginController(req, res) {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email) {
            return res.status(400).json({ error: "Please provide your email" });
        }

        if (!emailValidation(email)) {
            return res.status(400).json({ error: "Email is not valid" });
        }

        if (!password) {
            return res.status(400).json({ error: "Please provide your password" });
        }

        
        const existingUser = await usersSchema.find({ email });
        if (!existingUser.length === 0 ) {
            return res.status(404).json({ error: "User is not found" });
        }

        if (!existingUser[0].isVerified) {
            return res.status(403).json({ error: "Email is not verified" });
        }

        
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }

        // Set session
        req.session.isAuth = true;
        req.session.user = {
            id: existingUser._id,
            email: existingUser.email,
            firstName: existingUser.firstName,
            role: existingUser.role,
        };

        // Successful login response
        res.status(200).json({
            message: "Login successful",
            user: {
                id: existingUser._id,
                email: existingUser.email,
                firstName: existingUser.firstName
            }
        });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}

    

function logOut(req, res) {
    req.session.destroy(function (err) {
        if (err) {
            res.status(400).json({ erorr: "something is error"})
        }
    })
    res.status(200).json({
        error: "Logout successfully done"
    })
}


function dashBoard(req,res) {
  if (!req.session.isAuth) {
    return res.json({error: "Unauthorized user"})    
  };
  if (!req.session.user.role === "admin") {
    return res.json({error: `Welcome to Admin Dashboard :${req.session.user.firstName}`});    
  };

}

module.exports = {loginController, dashBoard, logOut };