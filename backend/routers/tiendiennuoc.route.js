const express = require("express")
const tienDienNuoc = require("../controllers/tiendiennuoc.controller")

const router = express.Router()

router.route("/")
    .get(tienDienNuoc.getAll)

router.route("/getallhoadon")
    .get(tienDienNuoc.getAllHoaDon)

router.route("/them")
    .post(tienDienNuoc.them)

router.route("/themhoadon")
    .post(tienDienNuoc.themHoaDon)

router.route("/xoa")
    .post(tienDienNuoc.xoa)

router.route("/xoahoadon")
    .post(tienDienNuoc.xoaHoaDon)

router.route("/sua")
    .post(tienDienNuoc.sua)

router.route("/suahoadon")
    .post(tienDienNuoc.suaHoaDon)

router.route("/chiphi")
    .get(tienDienNuoc.chiPhi)
    
module.exports = router