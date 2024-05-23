//importing express for using the express router
const express = require("express")
const router = express.Router()

//importing controller functions from controller directory
const {SignUpController, LoginController} = require("../controllers/AuthControllers")

//sign up route here
router.post("/signup", SignUpController)

//login route here
router.post("/login", LoginController)

//exporting the routes here
module.exports = router