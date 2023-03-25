import { memo, useState, useEffect} from "react"

const BangKetQuaHoaDonPhong = ({duLieu, chonDuLieu}) => {
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
      <div id="KQ" className="w3-content" 
      style={{overflowX: "auto", height: '400px'}}
      >
        <table id="bangKetQua" 
        className="w3-table w3-striped w3-centered w3-hoverable w3-card"
        >
          <thead className="w3-blue" style={{position: "sticky", top: 0}}>
            <tr>
              <th>STT</th>
              <th>Mã sinh viên</th>
              <th>Mã phòng</th>
              <th>Học kỳ</th>
              <th>Năm học</th>
              <th>Ngày lập</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
          {duLieu.slice(0, soLuongHienThi).map((item, idx) => (
            <tr key={idx} onClick={()=>chonDuLieu(item, idx)}>
              <td>{idx+1}</td>
              <td>{item.maSinhVien} </td>
              <td>{item.maPhong} </td>
              <td>{item.hocKy} </td>
              <td>{item.namHoc} </td>
              <td>{item.ngayLapHD} </td>
              <td>{item.tongTien} </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </>
    
  )
}

export default memo(BangKetQuaHoaDonPhong)