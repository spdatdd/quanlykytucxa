const { ObjectId } = require("mongodb")

class TienDienNuoc {
    constructor(client) {
      this.TienDienNuoc = client.db().collection("TienDienNuoc")
      this.HoaDonDN = client.db().collection("HoaDonDienNuoc")
      this.ChiPhi = client.db().collection("ChiPhi")
    }

    async getAll() {
      return await this.TienDienNuoc.find({}).toArray()
    }

    async them(loaded) {
      return await this.TienDienNuoc.insertOne({
        maPhong: loaded.maPhong,
        tenPhong: loaded.tenPhong,
        giaDien: loaded.giaDien,
        soKyDien: loaded.soKyDien,
        soKyNuoc: loaded.soKyNuoc,
        giaNuoc: loaded.giaNuoc,
        tongTien: loaded.tongTien,
        trangThai: loaded.trangThai,
        thangGhi: loaded.thangGhi,
        ngayThanhToan: loaded.ngayThanhToan,

        maCanBo: loaded.maCanBo
      })
    }

    async sua(loaded) {
      return await this.TienDienNuoc.updateOne({
            maPhong: loaded.maPhong,
            tenPhong: loaded.tenPhong,
            thangGhi: loaded.thangGhi
        },
        {
          $set: {
            maPhong: loaded.maPhongS,
            tenPhong: loaded.tenPhongS,
            giaDien: loaded.giaDienS,
            soKyDien: loaded.soKyDienS,
            soKyNuoc: loaded.soKyNuocS,
            giaNuoc: loaded.giaNuocS,
            tongTien: loaded.tongTienS,
            trangThai: loaded.trangThaiS,
            thangGhi: loaded.thangGhiS,
            ngayThanhToan: loaded.ngayThanhToanS,

            maCanBo: loaded.maCanBo
          }
        }
      )
    }

    async xoa(loaded) {
      return await this.TienDienNuoc.deleteOne({
        maPhong: loaded.maPhong,
        tenPhong: loaded.tenPhong,
        thangGhi: loaded.thangGhi
      })
    }

    async getAllHoaDon() {
        return await this.HoaDonDN.find({}).toArray()
    }

    async themHoaDon(loaded) {
      return await this.HoaDonDN.insertOne({
        ngayLapHD: loaded.ngayLapHD,
        maPhong: loaded.maPhong,
        soKyDien: loaded.soKyDien,
        tienDien: loaded.tienDien,
        soKyNuoc: loaded.soKyNuoc,
        tienNuoc: loaded.tienNuoc,
        tongTien: loaded.tongTien,
        thangGhi: loaded.thangGhi,

        maCanBo: loaded.maCanBo
  })
    }

    async suaHoaDon(loaded) {
        return await this.HoaDonDN.updateOne({
            ngayLapHD: loaded.ngayLapHD,
            maPhong: loaded.maPhong,
            thangGhi: loaded.thangGhi
          },
          {
            $set: {
              ngayLapHD: loaded.ngayLapHDS,
              maPhong: loaded.maPhongS,
              soKyDien: loaded.soKyDienS,
              tienDien: loaded.tienDienS,
              soKyNuoc: loaded.soKyNuocS,
              tienNuoc: loaded.tienNuocS,
              tongTien: loaded.tongTienS,
              thangGhi: loaded.thangGhiS,
            }
          }
        )
    }

    async xoaHoaDon(loaded) {
        return await this.HoaDonDN.deleteOne({
            ngayLapHD: loaded.ngayLapHD,
            maPhong: loaded.maPhong,
            thangGhi: loaded.thangGhi
        })
    }

    async chiPhi() {
      const result = await this.ChiPhi.findOne()
      return result
    }

}

module.exports = TienDienNuoc