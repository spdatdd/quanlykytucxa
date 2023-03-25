const { ObjectId } = require("mongodb")

class TienPhongService {
    constructor(client) {
      this.TienPhong = client.db().collection("TienPhong")
      this.HoaDonP = client.db().collection("HoaDonPhong")
      this.ChiPhi = client.db().collection("ChiPhi")
    }

    async getAll() {
      return await this.TienPhong.find({}).toArray()
    }

    async them(loaded) {
      return await this.TienPhong.insertOne({
        hocKy: loaded.hocKy,
        namHoc: loaded.namHoc,
        phiPhong: loaded.phiPhong,
        trangThai: loaded.trangThai,
        ngayDongTien: loaded.ngayDongTien,
        maSinhVien: loaded.maSinhVien,

        maCanBo: loaded.maCanBo
      })
    }

    async sua(loaded) {
      return await this.TienPhong.updateOne({
            hocKy: loaded.hocKy,
            namHoc: loaded.namHoc,
            maSinhVien: loaded.maSinhVien,
        },
        {
          $set: {
            hocKy: loaded.hocKyS,
            namHoc: loaded.namHocS,
            phiPhong: loaded.phiPhongS,
            trangThai: loaded.trangThaiS,
            ngayDongTien: loaded.ngayDongTienS,
            maSinhVien: loaded.maSinhVienS,

            maCanBo: loaded.maCanBo
          }
        }
      )
    }

    async xoa(loaded) {
      return await this.TienPhong.deleteOne({
        hocKy: loaded.hocKy,
        namHoc: loaded.namHoc,
        maSinhVien: loaded.maSinhVien,
      })
    }

    async getAllHoaDon() {
        return await this.HoaDonP.find({}).toArray()
    }

    async themHoaDon(loaded) {
      return await this.HoaDonP.insertOne({
        maPhong: loaded.maPhong,
        maSinhVien: loaded.maSinhVien,
        hocKy: loaded.hocKy,
        namHoc: loaded.namHoc,
        ngayLapHD: loaded.ngayLapHD,
        tongTien: loaded.tongTien,

        maCanBo: loaded.maCanBo
    })
    }

    async suaHoaDon(loaded) {
        return await this.HoaDonP.updateOne({
            maSinhVien: loaded.maSinhVien,
            hocKy: loaded.hocKy,
            namHoc: loaded.namHoc,
          },
          {
            $set: {
                maPhong: loaded.maPhongS,
                maSinhVien: loaded.maSinhVienS,
                hocKy: loaded.hocKyS,
                namHoc: loaded.namHocS,
                ngayLapHD: loaded.ngayLapHDS,
                tongTien: loaded.tongTienS,
                
                maCanBo: loaded.maCanBo
            }
          }
        )
    }

    async xoaHoaDon(loaded) {
        return await this.HoaDonP.deleteOne({
            maSinhVien: loaded.maSinhVien,
            hocKy: loaded.hocKy,
            namHoc: loaded.namHoc,
        })
    }

}

module.exports = TienPhongService