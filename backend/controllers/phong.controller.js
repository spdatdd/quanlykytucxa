const PhongService = require("../services/phong.service")
const MongoDB = require("../utils/mongodb.util")
const ApiError = require("../api-error")


exports.getAll = async (req, res, next) => {
  try {
    const phongService = new PhongService(MongoDB.client)

    const document = await phongService.getAll()
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

exports.them = async (req, res, next) => {
  try {
    const phongService = new PhongService(MongoDB.client)

    const document = await phongService.them(req.body)
    if(!document) {
      return next(new ApiError(404, "no record!"))
    }
    return res.send(JSON.stringify(document))
  } catch (error) {
    return next(
      new ApiError(
        500,  `error them`
      )
    )
  }
}

exports.sua = async (req, res, next) => {
  try {
    const phongService = new PhongService(MongoDB.client)

    const document = await phongService.sua(req.body)
    if(!document) {
      return next(new ApiError(404, "no record!"))
    }
    return res.send(JSON.stringify(document))
  } catch (error) {
    return next(
      new ApiError(
        500,  `error sua`
      )
    )
  }
}

exports.xoa = async (req, res, next) => {
  try {
    const phongService = new PhongService(MongoDB.client)

    const document = await phongService.xoa(req.body)
    if(!document) {
      return next(new ApiError(404, "no record!"))
    }
    return res.send(JSON.stringify(document))
  } catch (error) {
    return next(
      new ApiError(
        500,  `error xoa`
      )
    )
  }
}

exports.choO = async (req, res, next) => {
  try {
    const phongService = new PhongService(MongoDB.client)

    const document = await phongService.choO()
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