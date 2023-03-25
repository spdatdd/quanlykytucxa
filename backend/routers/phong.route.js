const express = require("express")
const phongs = require("../controllers/phong.controller")

const router = express.Router()

router.route("/")
    .get(phongs.getAll)

router.route("/choO")
    .get(phongs.choO)

router.route("/them")
    .post(phongs.them)

router.route("/xoa")
    .post(phongs.xoa)

router.route("/sua")
    .post(phongs.sua)


module.exports = router