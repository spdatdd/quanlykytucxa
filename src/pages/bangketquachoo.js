import { memo, useState, useEffect} from "react"

const BangKetQuaPhong = ({duLieu, chonDuLieu}) => {
  const [soLuongHienThi, setSoLuongHienThi] = useState(100)
  useEffect(() => {
    const handleScroll = () => {
      const div = document.querySelector("div#KQ")
      if (Math.round(div.scrollTop + div.clientHeight +1) >= div.scrollHeight) {
        setSoLuongHienThi(prevSoLuongHienThi => prevSoLuongHienThi + 100);
      }
    }

    const div = document.querySelector("div#KQ")
    div.addEventListener("scroll", handleScroll)

    return () => {
      div.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {/* Số lượng kết quả trả về */}
      <div className="w3-center w3-wide">
        {Object.values(duLieu).length} kết quả
      </div>

      {/* Bảng kết quả */}  
      <div id="KQ" className="w3-content w3-border" 
      style={{overflowX: "auto", height: '400px'}}
      >
        <table id="bangKetQua" 
        className="w3-table w3-striped w3-centered w3-hoverable w3-card"
        >
          <thead className="w3-blue" style={{position: "sticky", top: 0}}>
            <tr>
              <th>STT</th>
              <th>Họ tên</th>
              <th>Mã sinh viên</th>
              <th>Mã phòng</th>
              <th>Mã dãy</th>
              <th>Tên phòng</th>
              <th>Ngày đăng ký ở</th>
              <th>Ngày được duyệt</th>
              <th>Ngày rút đơn ở </th>
            </tr>
          </thead>
          <tbody>
          {duLieu.slice(0, soLuongHienThi).map((item, idx) => (
            <tr key={idx} onClick={()=>chonDuLieu(item, idx)}>
              <td>{idx+1}</td>
              <td>{item.hoTen} </td>
              <td>{item.maSinhVien} </td>
              <td>{item.maPhong} </td>
              <td>{item.maDay} </td>
              <td>{item.tenPhong} </td>
              <td>{item.ngayDangKyO} </td>
              <td>{item.ngayDuocDuyet} </td>
              <td>{item.ngayRutDonO} </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </>
    
  )
}

export default memo(BangKetQuaPhong)