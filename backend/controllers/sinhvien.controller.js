const SinhvienService = require("../services/sinhvien.service")
const MongoDB = require("../utils/mongodb.util")
const ApiError = require("../api-error")


exports.timSV = async (req, res, next) => {
    try {
      const sinhvienService = new SinhvienService(MongoDB.client)
      const document = await sinhvienService.findOne(req.params)
      if(!document) {
        return next(new ApiError(404, "sinhvien not found"))
      }
      return res.send(document)
    } catch (error) {
      return next(
        new ApiError(
          500,  `error retrieving sinhvien with email=${req.params.email} and password=${req.params.password}`
        )
      )
    }
}

// Đăng ký ở ký túc xá
exports.dangKyO = async (req, res, next) => {
  try {
    const sinhVienService = new SinhvienService(MongoDB.client)
    const document = await sinhVienService.dangKyO(req.body)
    return res.send(document)
  } catch (error) {
    return next(
      new ApiError(
        500,   `lỗi xảy ra khi đăng ký nguyện vọng ở ký túc xá cho 
        `
      )
    )
  }
}

// Lấy tất cả đăng ký ở
exports.getAll = async (req, res, next) => {
  try {
    const sinhVienService = new SinhvienService(MongoDB.client)

    const document = await sinhVienService.getAllNguyenVong()
    if(!document) {
      return next(new ApiError(404, "no record!"))
    }
    return res.send(JSON.stringify(document))
  } catch (error) {
    return next(
      new ApiError(
        500,  `error get all`
      )
    )
  }
}