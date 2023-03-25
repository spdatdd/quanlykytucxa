
const ThongTinSinhVien = ({dulieuSV}) => {

  console.log('render thông tin sinh viên')

  return (
    <div className="w3-card w3-margin-top w3-padding-16 w3-content w3-row ">
      
      <h3 className="w3-center">Thông tin sinh viên</h3>
      <div className="w3-padding w3-half w3-mobile w3-border-right">
        <div>
          <span>Tên: </span>
          <span>{dulieuSV.ho+" "+dulieuSV.tenLot+" "+dulieuSV.ten}</span>
        </div>
        <div>
          <span>Mã sinh viên: </span>
          <span>{dulieuSV.maSinhVien}</span>
        </div>
        <div>
          <span>Ngành học: </span>
          <span>{dulieuSV.nganhHoc}</span>
        </div>
        <div>
          <span>Hộ khẩu Tỉnh/TP: </span>
          <span>{dulieuSV.hoKhauTinhTP}</span>
        </div>
        <div>
          <span>Số điện thoại cá nhân: </span>
          <span>{dulieuSV.soDT}</span>
        </div>
      </div>
      <div className="w3-padding w3-half w3-mobile w3-margin-bottom">
        <div>
          <span>Ngày sinh: </span>
          <span>{dulieuSV.ngaySinh}</span>
        </div>
        <div>
          <span>Lớp: </span>
          <span>{dulieuSV.lop}</span>
        </div>
        <div>
          <span>Khóa học: </span>
          <span>{dulieuSV.khoaHoc}</span>
        </div>
        <div>
          <span>Email: </span>
          <span>{dulieuSV.email}</span>
        </div>
        <div>
          <span>Diện chính sách: </span>
          <span>{dulieuSV.dienChinhSach}</span>
        </div>
      </div>

      <h3 className="w3-clear w3-center">Thông tin ký túc xá</h3>
      <div className="w3-padding w3-mobile ">
        <div>
          <span>Phòng: </span>
          <span>{dulieuSV.tenPhong}</span>
        </div>
        <div>
          <span>Dãy: </span>
          <span>{dulieuSV.maDay}</span>
        </div>
        <div>
          <span>Ngày đăng ký ở: </span>
          <span>{dulieuSV.ngayDangKyO}</span>
        </div>
        <div>
          <span>Ngày rút đơn ở KTX: </span>
          <span>{dulieuSV.ngayRutDonO}</span>
        </div>
        <div>
          <span>Ngày được duyệt: </span>
          <span>{dulieuSV.ngayDuocDuyet}</span>
        </div>
      </div>
      
        


      <h3 className="w3-center w3-clear" >Thông tin đóng phí điện nước</h3>
      <div className="w3-mobile w3-padding">
          <div><span>Ngày thanh toán điện nước: </span>
            {dulieuSV.ngayDongTienDN}
          </div>

          <div><span>Tổng tiền điện nước: </span>
            {dulieuSV.tongTien}
          </div>

          <div><span>Trạng thái thanh toán: </span>
            {dulieuSV.trangThaiDN}
          </div>
      </div>

      <h3 className="w3-center w3-clear">Thông báo đóng phí</h3>
      <div className="w3-padding">
        <div>
          <span>Ngày thanh toán phòng: </span>
          {dulieuSV.ngayDongTienP}
        </div>

        <div>
          <span>Trạng thái thanh toán: </span>
          {dulieuSV.trangThaiP}
        </div>

        <div>
          <span>Tổng tiền phòng: </span>
          {dulieuSV.phiPhong}
        </div>

        <div>
          <span>Nơi đóng phí: Văn phòng ký túc xá</span>
          
        </div>
      </div>
    </div>
  )
}

export default ThongTinSinhVien