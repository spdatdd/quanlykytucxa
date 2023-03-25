const express = require("express")
const hoaDonPhong = require("../controllers/hoadonphong.controller")

const router = express.Router()

router.route("/")
    .get(hoaDonPhong.getAll)

router.route("/them")
    .post(hoaDonPhong.insertOne)

router.route("/xoa")
    .post(hoaDonPhong.deleteOne)

router.route("/sua")
    .post(hoaDonPhong.updateOne)


module.exports = router