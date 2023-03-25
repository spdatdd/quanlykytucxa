const { ObjectId } = require("mongodb")

class SinhVienService {
    constructor(client) {
        this.SinhVien = client.db().collection("SinhVien")
        this.NguyenVong = client.db().collection("NguyenVong")
        this.ChoO = client.db().collection("ChoO")
        this.TienDienNuoc = client.db().collection("TienDienNuoc")
        this.TienPhong = client.db().collection("TienPhong")
        this.HocKy = client.db().collection("HocKy")
    }

    async findOne(payload) {
        const sinhVien = await this.SinhVien.findOne({
            email: payload.email, matKhau: payload.password
        })
        const choO = await this.ChoO.findOne({
            maSinhVien: sinhVien.maSinhVien
        })
        if(choO){
            sinhVien.tenPhong = choO.tenPhong
            sinhVien.maDay = choO.maDay
            sinhVien.ngayDangKyO = choO.ngayDangKyO
            sinhVien.ngayDuocDuyet = choO.ngayDuocDuyet
            let thangGhi = year + "-" + month
            const dienNuoc = await this.TienDienNuoc.findOne({
                maPhong: choO.maPhong, thangGhi: thangGhi
            })
            if(dienNuoc){
                sinhVien.ngayDongTienDN = dienNuoc.ngayThanhToan
                sinhVien.tongTien = dienNuoc.tongTien
                sinhVien.trangThaiDN = dienNuoc.trangThai
            }
        }
        
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        if (month < 10) {
        month = "0" + month
        }
        
        const hocKy = await this.HocKy.findOne({}, {sort: {_id: -1}})
        let tienPhong = await this.TienPhong.findOne({
            maSinhVien: sinhVien.maSinhVien,
            hocKy: hocKy.hocKy,
            namHoc: hocKy.namHoc
        })
        if(tienPhong){
            sinhVien.ngayDongTienP = tienPhong.ngayDongTien
            sinhVien.phiPhong = tienPhong.phiPhong
            sinhVien.trangThaiP = tienPhong.trangThai
        }

        return sinhVien
        
    }

    async dangKyO(payload) {
        const result = await this.NguyenVong.insertOne({
            hoTen: payload.hoTen,
            maSinhVien: payload.maSinhVien,
            khuDangKy: payload.khuDangKy,
            noiDungNV: payload.noiDungNV,
            email: payload.email,
            thoiGian: new Date().toLocaleDateString()
        })
        return result
    }

    async getAllNguyenVong(){
        return await this.NguyenVong.find({}).toArray()
    }
}

module.exports = SinhVienService