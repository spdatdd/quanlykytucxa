const { ObjectId } = require("mongodb")

class CanBoService {
    constructor(client) {
        this.canBo = client.db().collection("CanBo")
    }

    async findOne(payload) {
        const result = await this.canBo.findOne({email: payload.email, matKhau: payload.matKhau})
        return result
    }
}

module.exports = CanBoService