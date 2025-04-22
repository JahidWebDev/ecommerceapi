// function registratioController() {
//    console.log("ami registration");
       
// }


const emailValidation = require("../helpers/emailValidation");
const usersSchema = require("../models/usersSchema");


function registrationController(req,res) {
   const {firstName, lastName, email, password} = req.body
       if(!firstName || !lastName){
         return res.json({error: "Firstname & lastName is required"})
       }
       if(!email){
         return res.json({error: "Email is required"})
       }
       if (!emailValidation(email)) {
         return res.json({error: "Email is not valid"})
       }
       const users = new usersSchema({
         firstName,
         lastName,
         email,
         password
       })
       users.save()
       res.json({
         message: "Registration successfully done",
         status: "success",
         data: users
       })
}

module.exports =  registrationController;