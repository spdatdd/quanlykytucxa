import { useState, useRef } from "react"
import QuanLyHoaDonPhong from "./quanlyhoadonphong"
import QuanLyHoaDonDienNuoc from "./quanlyhoadondiennuoc"
import QuanLyPhong from "./quanlyphong"
import QuanLyTienDienNuoc from "./quanlytiendiennuoc"
import QuanLyTienPhong from "./quanlytienphong"
import QuanLyChoO from "./quanlychoo"

function Dashboard ({canBo, setCanBo}) {
  const [item, setItem] = useState(1)

  const loiDangNhap = useRef(null)

  const dangXuat = () => {
    setCanBo({})
  }

  const w3_open = () => {
    document.getElementById("mySidebar").style.display = "block"
  }
  
  const w3_close = () => {
    document.getElementById("mySidebar").style.display = "none"
  }
  console.log(canBo.chucVu)

  return (
    <>
      {/* sidebar */}
      <div 
      className="w3-sidebar w3-bar-block w3-border-right w3-blue" 
      style={{display: 'none'}} 
      id="mySidebar"
      >
        <button onClick={w3_close} 
        className="w3-bar-item w3-large w3-white w3-hover-text-blue"
        >Close &times;</button>

        {canBo.chucVu==='Quản lý phòng' && <button 
        className="w3-bar-item w3-button"
        onClick={()=>setItem(1)}
        >Quản lý phòng</button>
        }

        {canBo.chucVu==='Quản lý phòng' && <button 
          className="w3-bar-item w3-button"
          onClick={()=>setItem(6)}
        >Quản lý chổ ở</button>
        }

        {canBo.chucVu==='Thu tiền' && <button 
        className="w3-bar-item w3-button"
        onClick={()=>setItem(2)}
        >Quản lý tiền điện nước</button>
        }

        {canBo.chucVu==='Thu tiền' && <button 
          className="w3-bar-item w3-button"
          onClick={()=>setItem(5)}
        >Quản lý Hóa đơn điện nước</button>
        }

        {canBo.chucVu==='Thu tiền' && <button 
        className="w3-bar-item w3-button"
        onClick={()=>setItem(3)}
        >Quản lý tiền phòng</button>
        }

        {canBo.chucVu==='Thu tiền' && <button 
        className="w3-bar-item w3-button"
        onClick={()=>setItem(4)}
        >Quản lý Hóa đơn phòng</button>
        }

        <button
        className="w3-bar-item w3-button"
        onClick={dangXuat}
        >Đăng xuất</button>
      </div>

      {/* content */}
      <div className="w3-blue w3-bar w3-row">
        <a
        className="w3-button w3-bar-item w3-xlarge w3-col m1 s2" 
        onClick={w3_open}>☰
        </a>
        <a
        className="w3-bar-item w3-xlarge w3-col m11 s10 w3-center"
        >Trang admin</a>
      </div> 
      
      <div className="w3-content w3-container w3-white">
        <div ref={loiDangNhap}
        className="w3-center w3-text-red"
        style={{display: 'none'}}
        >Vui lòng kiểm tra lại tài khoản hoặc mật khẩu!
        </div>
        {item === 1 && <QuanLyPhong canBo={canBo} />}
        {item === 6 && <QuanLyChoO canBo={canBo} />}
        {item === 2 && <QuanLyTienDienNuoc canBo={canBo} />}
        {item === 3 && <QuanLyTienPhong canBo={canBo} />}
        {item === 4 && <QuanLyHoaDonPhong canBo={canBo} />}
        {item === 5 && <QuanLyHoaDonDienNuoc canBo={canBo} />}
      </div>
        
    </>
    
  )
}

export default Dashboard