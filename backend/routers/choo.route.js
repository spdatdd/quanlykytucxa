const express = require("express")
const choO = require("../controllers/choo.controller")

const router = express.Router()

router.route("/")
    .get(choO.getAll)

router.route("/them")
    .post(choO.them)

router.route("/xoa")
    .post(choO.xoa)

router.route("/sua")
    .post(choO.sua)

router.route("/guimail")
    .post(choO.mail)


module.exports = router