const express = require("express")
const cors = require("cors")
const phongRouter = require("./routers/phong.route")
const sinhVienRouter = require("./routers/sinhvien.route")
const canBoRouter = require("./routers/canbo.route")
const choORouter = require("./routers/choo.route")
const tienDienNuocRouter = require("./routers/tiendiennuoc.route")
const tienPhongRouter = require("./routers/tienphong.route")

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json({ message: "Welcom to contact book application"})
})

app.use("/api/phong", phongRouter)
app.use("/api/sinhvien", sinhVienRouter)
app.use("/api/canbo", canBoRouter)
app.use("/api/choo", choORouter)
app.use("/api/tiendiennuoc", tienDienNuocRouter)
app.use("/api/tienphong", tienPhongRouter)

module.exports = app