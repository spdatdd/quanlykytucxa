const { ObjectId } = require("mongodb")

class PhongService {
    constructor(client) {
        this.Phong = client.db().collection("Phong")
    }

    async getAll() {
      return await this.Phong.find({}).toArray()
    }

    async them(loaded) {
      return await this.Phong.insertOne({
        maPhong: loaded.maPhong, 
        tenPhong: loaded.tenPhong, 
        maDay: loaded.maDay, 
        maLoaiPhong: loaded.maLoaiPhong,
        donGia: loaded.donGia, 
        phongNamNu: loaded.phongNamNu, 
        sucChua: loaded.sucChua,
        trangThaiSuDung: loaded.trangThaiSuDung,
        soChoOThucTe: loaded.soChoOThucTe,
        maCanBo: loaded.maCanBo
      })
    }

    async sua(loaded) {
      return await this.Phong.updateOne({
          maPhong: loaded.maPhong, 
          tenPhong: loaded.tenPhong, 
          maDay: loaded.maDay, 
          maLoaiPhong: loaded.maLoaiPhong,
        },
        {
          $set: {
            maPhong: loaded.maPhongSua, 
            tenPhong: loaded.tenPhongSua, 
            maDay: loaded.maDaySua, 
            maLoaiPhong: loaded.maLoaiPhongSua,
            donGia: loaded.donGiaSua, 
            phongNamNu: loaded.phongNamNuSua, 
            sucChua: loaded.sucChuaSua,
            trangThaiSuDung: loaded.trangThaiSuDungSua,
            soChoOThucTe: loaded.soChoOThucTeSua,

            maCanBo: loaded.maCanBo
          }
        }
      )
    }

    async xoa(loaded) {
      return await this.Phong.deleteOne({
        maPhong: loaded.maPhong, 
        tenPhong: loaded.tenPhong, 
        maDay: loaded.maDay, 
        maLoaiPhong: loaded.maLoaiPhong
      })
    }

    async choO() {
      return await this.Phong.aggregate([
          {
            $lookup: {
              from: "ChoO",
              let: { maPhong: "$maPhong" },
              pipeline: [
                {
                  $match: {
                    $and: [
                      { $expr: { $eq: ["$maPhong", "$$maPhong"] } },
                      { ngayRutDonO: null }
                    ]
                  }
                },
                {
                  $count: "daO"
                }
              ],
              as: "tinhTrangPhong"
            }
          },
          {
            $project: {
              _id: 0,
              maPhong: 1,
              tenPhong: 1,
              maDay: 1,
              maLoaiPhong: 1,
              phongNamNu: 1,
              donGia: 1,
              trangThaiSuDung: 1,
              soChoOThucTe: 1,
              sucChua: 1,
              daO: { $ifNull: [{ $arrayElemAt: ["$tinhTrangPhong.daO", 0] }, 0] },
              conTrong: { $subtract: ["$sucChua", { $ifNull: [{ $arrayElemAt: ["$tinhTrangPhong.daO", 0] }, 0] }] }
            }
          },
          {
            $sort: { maPhong: 1 }
          }
      ]).toArray()
    }
}

module.exports = PhongService