import React, { useState, useEffect, memo, useCallback, useRef } from "react"
import '../css/navigation.css'
import ThongTinKyTucXa from './thongtinktx'
import ThongTinSinhVien from './thongtinsinhvien'
import DangKyO from './dangkyo'
import Login from "./login"
import Dashboard from './dashboard'

const Navigation = () => {
  // liên quan đến thanh nav
  const [activeTab, setActiveTab] = useState(1)
  const handleTabClick = useCallback((tabIndex) => {
    setActiveTab(tabIndex);
  },[])
  

  // liên quan đến thông tin sinh viên
  const [dulieuSV, setDuLieuSV] = useState({})

  // sau khi có dữ liệu đặt validate=1 để render thông tin SV và đăng ký ở
  const [validate, setValidate] = useState()

  const [user, setUser] = useState({
    email: '',
    matKhau: ''
  })
  
  const [canBo, setCanBo] = useState({})

  // liên quan đến thông báo đăng nhập
  const hopThoaiDangNhap = useRef(null)
  const thongBaoDangNhap = (nd, type) => {
    hopThoaiDangNhap.current.innerHTML = nd
    hopThoaiDangNhap.current.classList.remove('w3-hide')

    if (type==='err')
      hopThoaiDangNhap.current.classList.add('w3-text-red')
    else hopThoaiDangNhap.current.classList.add('w3-text-green')

    setTimeout(() => {
      hopThoaiDangNhap.current.classList.add('w3-hide')
      hopThoaiDangNhap.current.classList.remove('w3-text-red')
      hopThoaiDangNhap.current.classList.remove('w3-text-green')
    }, 2000)
  }

  //lấy dữ liệu 
  useEffect(() => {
    if(user.email!=='' && user.matKhau!==''){
      if(user.email.includes('@student.ctu.edu.vn')){
        fetch(`http://localhost:3001/api/sinhvien/${user.email}-${user.matKhau}`)
        .then(response => {
          if(response.ok)
            return response.json()
          else
            throw new Error(response.status)
        })
        .then(data => {
          thongBaoDangNhap('Đăng nhập thành công', 'success')
          setDuLieuSV(data)
          setValidate(1)
        })
        .catch(error => {
          thongBaoDangNhap('Vui lòng kiễm tra lại thông tin đăng nhập', 'err')
        })
      }else{
        fetch(`http://localhost:3001/api/canbo`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: user.email,
            matKhau: user.matKhau
          })
          })
          .then(res => res.json())
          .then(data => {
            setCanBo(data)
          })
          .catch(error => {
        thongBaoDangNhap('Vui lòng kiễm tra lại thông tin đăng nhập', 'err')
      })
      }
    }
  }, [user])

  
  const dangKyNguyenVong = useCallback((nguyenVong) => {
    fetch('http://localhost:3001/api/sinhvien/dangkyo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        hoTen: nguyenVong.hoTen,
        maSinhVien: nguyenVong.maSinhVien,
        khuDangKy: nguyenVong.khuDangKy,
        noiDungNV: nguyenVong.noiDung,
        email: nguyenVong.email
    })
    })
    .then(response => {
      if(response.ok){
        hopThoaiDangNhap.current.innerHTML = 'Đã đăng ký nguyện vọng thành công!'
        hopThoaiDangNhap.current.classList.remove('w3-hide')
        hopThoaiDangNhap.current.classList.add('w3-text-green')
        setTimeout(() => {
          hopThoaiDangNhap.current.classList.add('w3-hide')
          hopThoaiDangNhap.current.classList.remove('w3-text-green')
        }, 3000);
      }
    })
    .catch(error => console.error(error))
  },[])

  return (
    <>
      {!canBo.maCanBo &&
      <> 
        <div className="w3-bar w3-blue w3-card navbar">
          <button
          onClick={() => handleTabClick(1)}
          className="w3-bar-item w3-button w3-mobile">
          Thông tin phòng ký túc xá
          </button>
          <button
          onClick={() => handleTabClick(2)}
          className="w3-bar-item w3-button w3-mobile">
          Thông tin tài khoản
          </button>
          <button 
          onClick={() => handleTabClick(3)}
          className="w3-bar-item w3-button w3-mobile">
          Đăng ký ở
          </button>
        </div>  
        
        <div 
        className="w3-panel w3-center w3-margin-top w3-hide" 
        ref={hopThoaiDangNhap}>
        </div>

        {activeTab === 1 && 
          <ThongTinKyTucXa />}

        {activeTab === 2 && !validate && <Login setTaiKhoan={setUser}/>}
        {activeTab === 2 && validate && <ThongTinSinhVien dulieuSV={dulieuSV}/>}
        
        {activeTab === 3 && !validate && <Login setTaiKhoan={setUser}/>}
        {activeTab === 3 && validate &&
          <DangKyO dulieuSV={dulieuSV} dangKyNguyenVong={dangKyNguyenVong}
        />}
      </>
      }

      {/* Nếu tài khoản đăng nhập là admin thì render trang Dashboard */}
      {canBo.maCanBo && 
        <Dashboard setCanBo={setCanBo} canBo={canBo}/>}
    </>
  )
}

export default memo(Navigation)