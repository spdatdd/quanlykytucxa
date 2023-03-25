const express = require("express")
const tienPhong = require("../controllers/tienphong.controller")

const router = express.Router()

router.route("/")
    .get(tienPhong.getAll)

router.route("/getAllhoadon")
    .get(tienPhong.getAllHoaDon)

router.route("/them")
    .post(tienPhong.them)

router.route("/themhoadon")
    .post(tienPhong.themHoaDon)

router.route("/xoa")
    .post(tienPhong.xoa)

router.route("/xoahoadon")
    .post(tienPhong.xoaHoaDon)

router.route("/sua")
    .post(tienPhong.sua)

router.route("/suahoadon")
    .post(tienPhong.suaHoaDon)

module.exports = router