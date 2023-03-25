const express = require("express")
const hoaDonDienNuoc = require("../controllers/hoadondiennuoc.controller")

const router = express.Router()

router.route("/")
    .get(hoaDonDienNuoc.getAll)

router.route("/them")
    .post(hoaDonDienNuoc.insertOne)

router.route("/xoa")
    .post(hoaDonDienNuoc.deleteOne)

router.route("/sua")
    .post(hoaDonDienNuoc.updateOne)

router.route("/chiphi")
    .get(hoaDonDienNuoc.getOneCost)


module.exports = router