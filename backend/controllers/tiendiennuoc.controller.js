const TienDienNuocService = require("../services/tiendiennuoc.service")
const MongoDB = require("../utils/mongodb.util")
const ApiError = require("../api-error")

exports.them = async (req, res, next) => {
  try {
    const tienDienNuoc = new TienDienNuocService(MongoDB.client)

    const document = await tienDienNuoc.them(req.body)
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
    const tienDienNuoc = new TienDienNuocService(MongoDB.client)

    const document = await tienDienNuoc.themHoaDon(req.body)
    if(!document) {
      return next(new ApiError(404, "no record!"))
    }
    return res.send(JSON.stringify(document))
  } catch (error) {
    return next(
      new ApiError(
        500,  `error them hoa don dien nuoc`
      )
    )
  }
}

exports.sua = async (req, res, next) => {
  try {
    const tienDienNuoc = new TienDienNuocService(MongoDB.client)

    const document = await tienDienNuoc.sua(req.body)
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
    const tienDienNuoc = new TienDienNuocService(MongoDB.client)

    const document = await tienDienNuoc.suaHoaDon(req.body)
    if(!document) {
      return next(new ApiError(404, "no record!"))
    }
    return res.send(JSON.stringify(document))
  } catch (error) {
    return next(
      new ApiError(
        500,  `error sua hoa don`
      )
    )
  }
}

exports.xoa = async (req, res, next) => {
  try {
    const tienDienNuoc = new TienDienNuocService(MongoDB.client)

    const document = await tienDienNuoc.xoa(req.body)
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
    const tienDienNuoc = new TienDienNuocService(MongoDB.client)

    const document = await tienDienNuoc.xoaHoaDon(req.body)
    if(!document) {
      return next(new ApiError(404, "no record!"))
    }
    return res.send(JSON.stringify(document))
  } catch (error) {
    return next(
      new ApiError(
        500,  `error xoa hoa don dien nuoc`
      )
    )
  }
}

exports.getAll = async (req, res, next) => {
  try {
    const tienDienNuoc = new TienDienNuocService(MongoDB.client)

    const document = await tienDienNuoc.getAll()
    if(!document) {
      return next(new ApiError(404, "no record!"))
    }
    return res.send(JSON.stringify(document))
  } catch (error) {
    return next(
      new ApiError(
        500,  `error get all tien dien nuoc`
      )
    )
  }
}

exports.getAllHoaDon = async (req, res, next) => {
  try {
    const tienDienNuoc = new TienDienNuocService(MongoDB.client)

    const document = await tienDienNuoc.getAllHoaDon()
    if(!document) {
      return next(new ApiError(404, "no record!"))
    }
    return res.send(JSON.stringify(document))
  } catch (error) {
    return next(
      new ApiError(
        500,  `error get all hoa don dien nuoc`
      )
    )
  }
}

exports.chiPhi = async (req, res, next) => {
  try {
    const tienDienNuoc = new TienDienNuocService(MongoDB.client)

    const document = await tienDienNuoc.chiPhi()
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
