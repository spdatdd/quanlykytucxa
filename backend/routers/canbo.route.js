const express = require("express")
const canbo = require("../controllers/canbo.controller")

const router = express.Router()

router.route("/")
    .post(canbo.findOne)
    
module.exports = router