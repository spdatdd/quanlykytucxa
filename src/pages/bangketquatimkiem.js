import { memo, useState, useEffect} from "react"

const BangKetQuaTimKiem = ({duLieu}) => {
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
              <th>Mã phòng</th>
              <th>Tên phòng</th>
              <th>Mã dãy</th>
              <th>Mã loại</th>
              <th>Đơn giá</th>
              <th>Phòng nam/nữ</th>
              <th>Trạng thái sử dụng</th>
              <th>Sức chứa</th>
              <th>Số chỗ thực tế</th>
              <th>Đã ở</th>
              <th>Còn trống</th>
            </tr>
          </thead>
          <tbody>
          {duLieu.slice(0, soLuongHienThi).map((item, idx) => (
            <tr key={idx}>
              <td>{idx+1}</td>
              <td>{item.maPhong}</td>
              <td>{item.tenPhong}</td>
              <td>{item.maDay}</td>
              <td>{item.maLoaiPhong}</td>
              <td>{item.donGia}</td>
              <td>{item.phongNamNu}</td>
              <td>{item.trangThaiSuDung}</td>
              <td>{item.sucChua}</td>
              <td>{item.soChoOThucTe}</td>
              <td>{item.daO}</td>
              <td>{item.conTrong}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </>
    
  )
}

export default memo(BangKetQuaTimKiem)