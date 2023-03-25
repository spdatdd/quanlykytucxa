
import { useCallback, useEffect, useRef, useState } from "react"
import BangKetQuaChoO from './bangketquachoo'
import BangNguyenVong from "./bangnguyenvong"

function QuanLyChoO ({canBo}) {
  const duLieuPhong = useRef([])
  const [duLieuChucNang, setDLChucNang] = useState({
    _id: '',
    maSinhVien: '',
    hoTen: '',
    maPhong: '',
    maDay: '',
    tenPhong: '',
    ngayDangKyO: '',
    ngayDuocDuyet: '',
    ngayRutDonO: ''
  })

  const [duLieuNguyenVong, setDuLieuNguyenVong] =  useState([])
  const [duLieuKetQua, setDuLieuKetQua] = useState([])

  const modal = useRef(null)
  const hopThoai = useRef(null)

  const openModal = (nd) => {
    hopThoai.current.innerHTML = nd
    modal.current.style.display = 'block'
  }

  const hideModal = () => {
    modal.current.style.display = "none"
  }

  const thucHienThanhCong = () => {
    var success = document.getElementById('success')
    success.style.display = 'block'
    setTimeout(()=>{
      success.style.display = 'none'
    }, 1500)
  }

  // Thực hiện api
  const chucNang = (type) => {
    const hoTen = document.getElementById('hoTen').value
    const maSinhVien = document.getElementById('maSinhVien').value
    const maPhong = document.getElementById('maPhong').value
    const maDay = document.getElementById('maDay').value
    const tenPhong = document.getElementById('tenPhong').value
    const ngayDangKyO = document.getElementById('ngayDangKyO').value
    // Thực hiện chức năng
    if(type==='timKiem')
      timPhong()
    else if(type==='reset'){
      document.getElementById('hoTen').value = ''
      document.getElementById('maSinhVien').value = ''
      document.getElementById('maPhong').value = ''
      document.getElementById('maDay').value = ''
      document.getElementById('tenPhong').value = ''
      document.getElementById('ngayDangKyO').value = ''
      document.getElementById('ngayDuocDuyet').value = ''
      document.getElementById('ngayRutDonO').value = ''

      setDLChucNang({
        _id: '',
        maSinhVien: '',
        hoTen: '',
        maPhong: '',
        maDay: '',
        tenPhong: '',
        ngayDangKyO: '',
        ngayDuocDuyet: '',
        ngayRutDonO: ''
      })

      var x = false
      if(duLieuKetQua.length>duLieuPhong.current.length)
        x = true
      if(duLieuPhong.current.length>duLieuKetQua.length)
        setDuLieuKetQua(duLieuPhong.current)
    }
    // Hiện hợp thoại cảnh báo nếu không có dữ liệu
    else if(type!=='timKiem' && type!=='reset' && (
      hoTen==='' || maSinhVien==='' || maPhong==='' ||
      maDay==='' || tenPhong==='' || ngayDangKyO===''
    )){
      openModal('Vui lòng điền đầy đủ thông tin!')
    } 
    else {
      if(type==='them'){
        var tonTai = 0
        if(duLieuKetQua.length!==0)
          duLieuKetQua.forEach(val => {
            if(val.maSinhVien===duLieuChucNang.maSinhVien){
              openModal('dữ liệu phòng của Sinh viên đã tồn tại!')
              tonTai=1
            }
          })
        if(tonTai===0){
          featchToServer('them', duLieuChucNang)
          setDuLieuKetQua(pre=>[...pre, duLieuChucNang])
        }
      }

      if(type==='xoa'){
        if(duLieuKetQua.length!==0){
          var test = 0
          duLieuKetQua.forEach(val => {
            if(val.maSinhVien===duLieuChucNang.maSinhVien)
                test=1
          })
          if(test===1){
            featchToServer('xoa', duLieuChucNang)
            setDuLieuKetQua(duLieuKetQua.filter(item =>item.maSinhVien!==duLieuChucNang.maSinhVien))
          }
          if(test===0)
            openModal('Dữ liệu cần xóa không tồn tại!')
        }
        else {
          openModal('Dữ liệu rỗng!')
        }
      }

      if(type==='sua'){
        if(duLieuKetQua.length!==0){
          const duLieuBanDau = duLieuKetQua[duLieuChucNang._id]
          let duLieuSua = duLieuChucNang
          let loaded = duLieuBanDau

          duLieuPhong.current = duLieuKetQua.map(
            item=> item._id===duLieuChucNang._id 
            ? duLieuChucNang : item
          )

          setDuLieuKetQua(duLieuPhong.current)

          loaded.maSinhVienS = duLieuSua.maSinhVien
          loaded.hoTenS = duLieuSua.hoTen
          loaded.maPhongS = duLieuSua.maPhong
          loaded.maDayS = duLieuSua.maDay
          loaded.tenPhongS = duLieuSua.tenPhong
          loaded.ngayDangKyOS = duLieuSua.ngayDangKyO
          loaded.ngayDuocDuyetS = duLieuSua.ngayDuocDuyet
          loaded.ngayRutDonOS = duLieuSua.ngayRutDonO
          featchToServer('sua', loaded)
        }
        else openModal('Dữ liệu rỗng!')
      }

      if(type==='mail'){
        const loaded = {}
        loaded.maSinhVien = duLieuChucNang.maSinhVien
        loaded.tieuDe = 'Đăng ký chổ ở thành công'
        loaded.noiDung = 'Mã phòng: '+ duLieuChucNang.maPhong +
        ", mã dãy: " + duLieuChucNang.maDay +
        ', Tên phòng: ' + duLieuChucNang.tenPhong
        featchToServer('mail', loaded)
      }
    }
  }

  // Tìm kiếm theo tên phòng
  const timPhong = () => {
    // Xóa toàn bộ khoảng trắng trong dữ liệu tìm
    const duLieuTimThay = []
    if(duLieuKetQua.length>=duLieuPhong.current.length){
      duLieuPhong.current = duLieuKetQua
    }

    duLieuPhong.current.forEach(val => {
      if(val.tenPhong.includes(duLieuChucNang.tenPhong) && 
      val.maPhong.includes(duLieuChucNang.maPhong) &&
      val.maDay.includes(duLieuChucNang.maDay) &&
      val.maLoaiPhong.includes(duLieuChucNang.maLoaiPhong) &&
      val.phongNamNu.includes(duLieuChucNang.phongNamNu) &&
      val.trangThaiSuDung.includes(duLieuChucNang.trangThaiSuDung))
        duLieuTimThay.push(val)
    })

    setDuLieuKetQua(duLieuTimThay)
  }

  // Gửi yêu cầu lên server
  const featchToServer = (type, loaded) => {
    if(type!=='mail'){
      fetch(`http://localhost:3001/api/choo/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        maSinhVien: loaded.maSinhVien,
        hoTen: loaded.hoTen,
        maPhong: loaded.maPhong,
        maDay: loaded.maDay,
        tenPhong: loaded.tenPhong,
        ngayDangKyO: loaded.ngayDangKyO,
        ngayDuocDuyet: loaded.ngayDuocDuyet,
        ngayRutDonO: loaded.ngayRutDonO,

        // Dữ liệu cần chỉnh sửa
        maSinhVienS: loaded.maSinhVienS,
        hoTenS: loaded.hoTenS,
        maPhongS: loaded.maPhongS,
        maDayS: loaded.maDayS,
        tenPhongS: loaded.tenPhongS,
        ngayDangKyOS: loaded.ngayDangKyOS,
        ngayDuocDuyetS: loaded.ngayDuocDuyetS,
        ngayRutDonOS: loaded.ngayRutDonOS,

        // Cán bộ chỉnh sửa 
        maCanBo: canBo.maCanBo

    })
    })
    .then(res => {
      if(res.ok)
        thucHienThanhCong()
    })
    .catch(err => console.log(err))
    }else{
      fetch(`http://localhost:3001/api/choo/guimail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        maSinhVien: loaded.maSinhVien,
        tieuDe: loaded.tieuDe ,
        noiDung: loaded.noiDung
      })
      })
      .then(res => {
        if(res.ok)
          thucHienThanhCong()
      })
    }
  }

  // Lấy dữ liệu từ bảng khi click vào 1 hàng
  const chonDuLieu = useCallback((obj, idx) => {
    document.getElementById('hoTen').value = obj.hoTen
    document.getElementById('maSinhVien').value = obj.maSinhVien
    document.getElementById('maPhong').value = obj.maPhong
    document.getElementById('maDay').value = obj.maDay
    document.getElementById('tenPhong').value = obj.tenPhong
    document.getElementById('ngayDangKyO').value = obj.ngayDangKyO
    document.getElementById('ngayDuocDuyet').value = obj.ngayDuocDuyet
    document.getElementById('ngayRutDonO').value = obj.ngayRutDonO

    const {hoTen, maSinhVien, maPhong, maDay, tenPhong, ngayDangKyO,
    ngayDuocDuyet, ngayRutDonO} = obj

    setDLChucNang(()=>({hoTen, maSinhVien, maPhong, maDay, tenPhong, ngayDangKyO,
    ngayDuocDuyet, ngayRutDonO, _id: idx}))
  },[])

  // Lấy dữ liệu từ bảng khi click vào 1 hàng
  const chonDuLieuNV = useCallback((obj) => {
    document.getElementById('maPhong').value = ''
    document.getElementById('maDay').value = ''
    document.getElementById('tenPhong').value = ''
    document.getElementById('hoTen').value = obj.hoTen
    document.getElementById('maSinhVien').value = obj.maSinhVien
    var [thang, ngay, nam] = obj.thoiGian.split('/')
    if(ngay.length===1)
      ngay='0' + ngay
    if(thang.length===1)
      thang='0' + thang
    const ngayDangKyO = nam+'-'+thang+'-'+ngay
    document.getElementById('ngayDangKyO').value = ngayDangKyO

    const {hoTen, maSinhVien} = obj
    const maPhong = ''
    const maDay = ''
    const tenPhong = ''

    setDLChucNang(()=>({hoTen, maSinhVien, ngayDangKyO, maPhong, maDay, tenPhong}))
    
  },[])

  // Lấy toàn bộ dữ liệu phòng
  useEffect(() => {
    fetch('http://localhost:3001/api/choo')
    .then(res => res.json())
    .then(data => {
      data.forEach((val, idx) => {
        val._id = idx
      })
      setDuLieuKetQua(data)
    })
    .catch(error => {
        console.log(error)
    })
  },[])

  // Lấy toàn bộ dữ liệu nguyện vọng đăng ký ở
  useEffect(() => {
    fetch('http://localhost:3001/api/sinhvien/dangkyo')
    .then(res => res.json())
    .then(data => {
      data.forEach((val, idx) => {
        val._id = idx
      })
      setDuLieuNguyenVong(data)
    })
    .catch(error => {
        console.log(error)
    })
  },[])
  
  return (
    <>
      {/* Thông báo thực hiện thành công */}
      <div id="success" 
      className="w3-text-green w3-center w3-padding"
      style={{display: 'none'}}
      >Thực hiện thành công !
      </div>

      {/* Giá Trị của 1 record */}
      <div className="w3-row w3-margin-top w3-margin-bottom">
        <div className="w3-row w3-mobile">
            <label htmlFor="hoTen" className="w3-col l4 m3 s4">Họ tên </label>
            <input 
            className="w3-col l7 m3 s7 w3-margin-right" 
            name="hoTen" id="hoTen"
            type="text"
            onBlur={(e) => setDLChucNang(pre => ({...pre, hoTen: e.target.value}))} 
            >
            </input>
        </div>

        <div className="w3-row w3-mobile">
            <label htmlFor="maSinhVien" className="w3-col l4 m3 s4">Mã sinh viên </label>
            <input 
            className="w3-col l7 m3 s7 w3-margin-right" 
            name="maSinhVien" id="maSinhVien"
            type="text"
            onBlur={(e) => setDLChucNang(pre => ({...pre, maSinhVien: e.target.value}))} 
            >
            </input>
        </div>

        <div className="w3-row w3-mobile">
            <label htmlFor="maPhong" className="w3-col l4 m3 s4">Mã phòng </label>
            <input 
            className="w3-col l7 m3 s7 w3-margin-right" 
            name="maPhong" id="maPhong"
            type="text"
            onBlur={(e) => setDLChucNang(pre => ({...pre, maPhong: e.target.value}))} 
            >
            </input>
        </div>

        <div className="w3-row w3-mobile">
            <label htmlFor="maDay" className="w3-col l4 m3 s4">Mã dãy </label>
            <input 
            className="w3-col l7 m3 s7 w3-margin-right" 
            name="maDay" id="maDay"
            type="text"
            onBlur={(e) => setDLChucNang(pre => ({...pre, maDay: e.target.value}))} 
            >
            </input>
        </div>

        <div className="w3-row w3-mobile">
            <label htmlFor="tenPhong" className="w3-col l4 m3 s4">Tên phòng </label>
            <input 
            className="w3-col l7 m3 s7 w3-margin-right" 
            name="tenPhong" id="tenPhong"
            type="text"
            onBlur={(e) => setDLChucNang(pre => ({...pre, tenPhong: e.target.value}))} 
            >
            </input>
        </div>

        <div className="w3-row w3-mobile">
            <label htmlFor="ngayDangKyO" className="w3-col l4 m3 s4">Ngày đăng ký ở</label>
            <input 
            className="w3-col l7 m3 s7 w3-margin-right" 
            name="ngayDangKyO" id="ngayDangKyO"
            type="date"
            onBlur={(e) => setDLChucNang(pre => ({...pre, ngayDangKyO: e.target.value}))} 
            >
            </input>
        </div>

        <div className="w3-row w3-mobile">
            <label htmlFor="ngayDuocDuyet" className="w3-col l4 m3 s4">Ngày được duyệt </label>
            <input 
            className="w3-col l7 m3 s7 w3-margin-right" 
            name="ngayDuocDuyet" id="ngayDuocDuyet"
            type="date"
            onBlur={(e) => setDLChucNang(pre => ({...pre, ngayDuocDuyet: e.target.value}))} 
            >
            </input>
        </div>

        <div className="w3-row w3-mobile">
            <label htmlFor="ngayRutDonO" className="w3-col l4 m3 s4">Ngày rút đơn ở </label>
            <input 
            className="w3-col l7 m3 s7 w3-margin-right" 
            name="ngayRutDonO" id="ngayRutDonO"
            type="date"
            onBlur={(e) => setDLChucNang(pre => ({...pre, ngayRutDonO: e.target.value}))} 
            >
            </input>
        </div>

      </div>
      
      {/* Chức năng */}
      <div className="w3-mobile">

          <button 
          className="w3-button w3-card w3-margin"
          onClick={()=>chucNang('them')}
          >Thêm</button>
          <button 
          className="w3-button  w3-card w3-margin"
          onClick={()=>chucNang('sua')}
          >Sửa</button>
        
          <button 
          className="w3-button w3-card w3-margin "
          onClick={()=>chucNang('xoa')}
          >Xóa</button>

          <button 
          className="w3-button w3-card w3-margin "
          onClick={()=>chucNang('timKiem')}
          >Tìm</button>

          <button 
          className="w3-button w3-card w3-margin "
          onClick={()=>chucNang('mail')}
          >Gửi mail</button>

          <button 
          className="w3-button w3-card w3-margin "
          onClick={()=>chucNang('reset')}
          >Đặt lại
          </button>
        
      </div>


      {/* Bảng dữ liệu */}

      <div className="w3-row">
        <div className="w3-col w3-half">
          <h3 className="w3-center">Bảng nguyện vọng của sinh viên</h3>
          <BangNguyenVong duLieu={duLieuNguyenVong} chonDuLieu={chonDuLieuNV}/>
        </div>

        <div className="w3-col w3-half">
          <h3 className="w3-center">Bảng chổ ở của sinh viên</h3>
          <BangKetQuaChoO duLieu={duLieuKetQua} chonDuLieu={chonDuLieu}/>
        </div>
      </div>

        
      
      <br/>
      
      
      {/* Hộp thoại */}
      <div ref={modal} className="w3-modal">
        <div className="w3-modal-content">
          <div className="w3-container w3-padding">
            <span className="w3-right w3-bold"
             onClick={hideModal}>Đóng &times;
            </span>
            <p id="noiDungHopThoai" ref={hopThoai} className="w3-center"></p>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default QuanLyChoO