const TienPhongService = require("../services/tienphong.service")
const MongoDB = require("../utils/mongodb.util")
const ApiError = require("../api-error")

exports.them = async (req, res, next) => {
  try {
    const tienphong = new TienPhongService(MongoDB.client)

    const document = await tienphong.them(req.body)
    if(!document) {
      return next(new ApiError(404, "no record!"))
    }
    return res.send(JSON.stringify(document))
  } catch (error) {
    return next(
      new ApiError(
        500,  `error them tien dien nuoc`
      )
    )
  }
}

exports.themHoaDon = async (req, res, next) => {
  try {
    const tienphong = new TienPhongService(MongoDB.client)

    const document = await tienphong.themHoaDon(req.body)
    if(!document) {
      return next(new ApiError(404, "no record!"))
    }
    return res.send(JSON.stringify(document))
  } catch (error) {
    return next(
      new ApiError(
        500,  `error them hoa don phong`
      )
    )
  }
}

exports.sua = async (req, res, next) => {
  try {
    const tienphong = new TienPhongService(MongoDB.client)

    const document = await tienphong.sua(req.body)
    if(!document) {
      return next(new ApiError(404, "no record!"))
    }
    return res.send(JSON.stringify(document))
  } catch (error) {
    return next(
      new ApiError(
        500,  `error sua tien dien nuoc`
      )
    )
  }
}

exports.suaHoaDon = async (req, res, next) => {
  try {
    const tienphong = new TienPhongService(MongoDB.client)

    const document = await tienphong.suaHoaDon(req.body)
    if(!document) {
      return next(new ApiError(404, "no record!"))
    }
    return res.send(JSON.stringify(document))
  } catch (error) {
    return next(
      new ApiError(
        500,  `error sua hoa don phong`
      )
    )
  }
}

exports.xoa = async (req, res, next) => {
  try {
    const tienphong = new TienPhongService(MongoDB.client)

    const document = await tienphong.xoa(req.body)
    if(!document) {
      return next(new ApiError(404, "no record!"))
    }
    return res.send(JSON.stringify(document))
  } catch (error) {
    return next(
      new ApiError(
        500,  `error xoa tien dien nuoc`
      )
    )
  }
}

exports.xoaHoaDon = async (req, res, next) => {
  try {
    const tienphong = new TienPhongService(MongoDB.client)

    const document = await tienphong.xoaHoaDon(req.body)
    if(!document) {
      return next(new ApiError(404, "no record!"))
    }
    return res.send(JSON.stringify(document))
  } catch (error) {
    return next(
      new ApiError(
        500,  `error xoa hoa don phong`
      )
    )
  }
}

exports.getAll = async (req, res, next) => {
  try {
    const tienphong = new TienPhongService(MongoDB.client)

    const document = await tienphong.getAll()
    if(!document) {
      return next(new ApiError(404, "no record!"))
    }
    return res.send(JSON.stringify(document))
  } catch (error) {
    return next(
      new ApiError(
        500,  `error get all tien phong`
      )
    )
  }
}

exports.getAllHoaDon = async (req, res, next) => {
  try {
    const tienphong = new TienPhongService(MongoDB.client)

    const document = await tienphong.getAllHoaDon()
    if(!document) {
      return next(new ApiError(404, "no record!"))
    }
    return res.send(JSON.stringify(document))
  } catch (error) {
    return next(
      new ApiError(
        500,  `error get all hoa don phong`
      )
    )
  }
}

exports.chiPhi = async (req, res, next) => {
  try {
    const tienphong = new TienPhongService(MongoDB.client)

    const document = await tienphong.chiPhi()
    if(!document) {
      return next(new ApiError(404, "no record!"))
    }
    return res.send(JSON.stringify(document))
  } catch (error) {
    return next(
      new ApiError(
        500,  `error chi phi`
      )
    )
  }
}
