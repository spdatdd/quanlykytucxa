const express = require("express")
const sinhviens = require("../controllers/sinhvien.controller")

const router = express.Router()

router.route("/:email-:password")
    .get(sinhviens.timSV)

router.route("/dangkyo")
    .post(sinhviens.dangKyO)
    .get(sinhviens.getAll)

module.exports = router