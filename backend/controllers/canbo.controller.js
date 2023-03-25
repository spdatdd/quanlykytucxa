const CanBoService = require("../services/canbo.service")
const MongoDB = require("../utils/mongodb.util")
const ApiError = require("../api-error")

exports.findOne = async (req, res, next) => {
    try {
      const canBoService = new CanBoService(MongoDB.client)
      const document = await canBoService.findOne(req.body)
      if(!document) {
        return next(new ApiError(404, "no record!"))
      }
      return res.send(JSON.stringify(document))
    } catch (error) {
      return next(
        new ApiError(
          500,  `error get one cán bộ`
        )
      )
    }
}