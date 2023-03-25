const ChoOService = require("../services/choo.service")
const MongoDB = require("../utils/mongodb.util")
const ApiError = require("../api-error")

exports.them = async (req, res, next) => {
  try {
    const choOService = new ChoOService(MongoDB.client)

    const document = await choOService.them(req.body)
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
    const choOService = new ChoOService(MongoDB.client)

    const document = await choOService.sua(req.body)
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
    const choOService = new ChoOService(MongoDB.client)

    const document = await choOService.xoa(req.body)
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

exports.xoa = async (req, res, next) => {
  try {
    const choOService = new ChoOService(MongoDB.client)

    const document = await choOService.xoa(req.body)
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

exports.getAll = async (req, res, next) => {
  try {
    const choOService = new ChoOService(MongoDB.client)

    const document = await choOService.getAll()
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

exports.mail = (req, res, next) => {
  const choOService = new ChoOService(MongoDB.client)
  const document = choOService.mail(req.body)
}