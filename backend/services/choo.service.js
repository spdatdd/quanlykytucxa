const { ObjectId } = require("mongodb")

class ChoOService {
    constructor(client) {
        this.ChoO = client.db().collection("ChoO")
        this.SinhVien = client.db().collection("SinhVien")
    }

    async getAll() {
      return await this.ChoO.find({}).toArray()
    }

    async them(loaded) {
      console.log(loaded)
      return await this.ChoO.insertOne({
        maSinhVien: loaded.maSinhVien,
        hoTen: loaded.hoTen,
        maPhong: loaded.maPhong,
        maDay: loaded.maDay,
        tenPhong: loaded.tenPhong,
        ngayDangKyO: loaded.ngayDangKyO,
        ngayDuocDuyet: loaded.ngayDuocDuyet,
        ngayRutDonO: loaded.ngayRutDonO,

        maCanBo: loaded.maCanBo
      })
    }

    async sua(loaded) {
      return await this.ChoO.updateOne({
            maSinhVien: loaded.maSinhVien,
        },
        {
          $set: {
            maSinhVien: loaded.maSinhVienS,
            hoTen: loaded.hoTenS,
            maPhong: loaded.maPhongS,
            maDay: loaded.maDayS,
            tenPhong: loaded.tenPhongS,
            ngayDangKyO: loaded.ngayDangKyOS,
            ngayDuocDuyet: loaded.ngayDuocDuyetS,
            ngayRutDonO: loaded.ngayRutDonOS,

            maCanBo: loaded.maCanBo
          }
        }
      )
    }

    async xoa(loaded) {
      return await this.ChoO.deleteOne({
        maSinhVien: loaded.maSinhVien
      })
    }

    async mail(loaded) {
      const nodemailer = require('nodemailer')

      const sinhvien = await this.SinhVien.findOne({maSinhVien: loaded.maSinhVien})
      const userMail = sinhvien.email

      // tạo transporter sử dụng SMTP
      let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'ngod2810@gmail.com',
              pass: 'djzgpeczenzrfdha'
          }
      })

      // thiết lập thông tin người gửi và người nhận
      let mailOptions = {
          from: 'ngod2810@gmail.com',
          to: userMail,
          subject: loaded.tieuDe,
          text: loaded.noiDung
      }

      // gửi email
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.log(error)
          } else {
              console.log('Email sent: ' + info.response)
          }
      })
    }

}

module.exports = ChoOService