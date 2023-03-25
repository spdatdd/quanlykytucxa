
import { useCallback, useEffect, useRef, useState } from "react"
import BangKetQuaTienPhong from './bangketquatienphong'
import jsPDF from "jspdf"
import '../font/font-times-new-roman/font-times-new-roman-normal'

export default function QuanLyTienPhong ({canBo}) {
  const [duLieuChucNang, setDLChucNang] = useState({
    _id: '',
    hocKy: '',
    namHoc: '',
    phiPhong: 0,
    trangThai: '',
    ngayDongTien: '',
    maSinhVien: ''
  })

  const [duLieuKetQua, setDuLieuKetQua] = useState([])

  const duLieu = useRef([])
  const modal = useRef(null)
  const hopThoai = useRef(null)

  const openModal = (nd) => {
    hopThoai.current.innerHTML = nd
    modal.current.style.display = 'block'
  }

  const hideModal = () => {
    modal.current.style.display = "none"
  }
  
  // Thực hiện api
  const chucNang = (type) => {
    var hocKy = document.getElementById('hocKy').value
    var namHoc = document.getElementById('namHoc').value
    var phiPhong = document.getElementById('phiPhong').value
    var maSinhVien = document.getElementById('maSinhVien').value
    var trangThaiDaDong = document.getElementsByName('trangThai')[0].checked
    var trangThaiChuaDong = document.getElementsByName('trangThai')[1].checked
    var ngayDongTien = document.getElementById('ngayDongTien').value
    
    // Thực hiện chức năng
    if(type.includes('timKiem'))
      timPhong()
    else if(type.includes('reset')){
      document.getElementById('hocKy').value = ''
      document.getElementById('namHoc').value = ''
      document.getElementById('phiPhong').value = ''
      document.getElementById('maSinhVien').value = ''
      
      if(trangThaiDaDong === true)
        document.getElementsByName('trangThai')[0].checked = false
      if(trangThaiChuaDong=== true)
        document.getElementsByName('trangThai')[1].checked = false
      document.getElementById('ngayDongTien').value = ''
      if(duLieu.current.length>0)
        setDuLieuKetQua(duLieu.current)
      else
        setDuLieuKetQua(duLieuKetQua)
    }
    // Hiện hợp thoại cảnh báo nếu không có dữ liệu
    else if(type!=='timKiem' && type!=='reset'
    && (hocKy==='' || namHoc==='' || phiPhong==='' || maSinhVien==='' 
        || ngayDongTien==='' || (trangThaiDaDong===false && trangThaiChuaDong===false)))
        openModal('Vui lòng điền đầy đủ thông tin!')
        
    else {
      if(type==='them'){
        var tonTai = 0
        if(duLieuKetQua.length!==0)
          duLieuKetQua.forEach(val => {
            if(val.hocKy===duLieuChucNang.hocKy &&
              val.namHoc===duLieuChucNang.namHoc &&
              val.phiPhong===duLieuChucNang.phiPhong &&
              val.trangThai===duLieuChucNang.trangThai &&
              val.maSinhVien===duLieuChucNang.maSinhVien &&
              val.ngayDongTien===duLieuChucNang.ngayDongTien){
              openModal('Dữ liệu đã tồn tại!')
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
            if(val.hocKy===duLieuChucNang.hocKy && 
              val.namHoc===duLieuChucNang.namHoc &&
              val.maSinhVien===duLieuChucNang.maSinhVien &&
              val.ngayDongTien===duLieuChucNang.ngayDongTien)
                test=1
          })
          if(test===1){
            featchToServer('xoa', duLieuChucNang)
            setDuLieuKetQua(duLieuKetQua.filter(item =>
              item.hocKy!==duLieuChucNang.hocKy || item.namHoc!==duLieuChucNang.namHoc
              || item.maSinhVien!==duLieuChucNang.maSinhVien || 
              item.ngayDongTien!==duLieuChucNang.ngayDongTien))
          }
          if(test===0)
            openModal('Dữ liệu cần xóa không tồn tại!')
        }
        else {
          openModal('Dữ liệu rỗng!')
        }
      }

      if(type==='sua'){
        var tim = 0
        if(duLieuKetQua.length!==0){
          duLieuKetQua.forEach((val, idx)=>{
            if(idx===duLieuChucNang._id){
              tim = 1
            }
          })
        }
        else openModal('Dữ liệu rỗng!')

        if(tim===1){
          setDuLieuKetQua(duLieuKetQua.map(
            (item, idx)=>idx===duLieuChucNang._id 
            ? duLieuChucNang : item
          ))
          let duLieuBanDau = {}
          let duLieuSua = duLieuChucNang
          duLieuKetQua.forEach((val, idx) => {
            if(idx === duLieuChucNang._id)
              duLieuBanDau = val
          })
          let loaded = {}
          loaded = duLieuBanDau
          loaded.hocKyS = duLieuSua.hocKy
          loaded.namHocS = duLieuSua.namHoc
          loaded.phiPhongS = duLieuSua.phiPhong
          loaded.trangThaiS = duLieuSua.trangThai
          loaded.maSinhVienS = duLieuSua.maSinhVien
          loaded.ngayDongTienS = duLieuSua.ngayDongTien
          featchToServer('sua', loaded)
        }
      }
    }
  }

  // Tìm kiếm theo tên phòng
  const timPhong = () => {
    const duLieuTimThay = []

    if(duLieuKetQua.length >= duLieu.current.length){
      duLieu.current = duLieuKetQua
    }

    duLieu.current.forEach(val=>{
      if(val.hocKy.includes(duLieuChucNang.hocKy) &&
      val.namHoc.includes(duLieuChucNang.namHoc) &&
      val.trangThai.includes(duLieuChucNang.trangThai) && 
      val.maSinhVien.includes(duLieuChucNang.maSinhVien) &&
      val.ngayDongTien.includes(duLieuChucNang.ngayDongTien))
       duLieuTimThay.push(val)
    })

    setDuLieuKetQua(duLieuTimThay)
  }

  // Gửi yêu cầu lên server
  const featchToServer = (type, loaded) => {
    fetch(`http://localhost:3001/api/tienphong/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: loaded._id,
        hocKy: loaded.hocKy,
        namHoc: loaded.namHoc,
        phiPhong: loaded.phiPhong,
        trangThai: loaded.trangThai,
        ngayDongTien: loaded.ngayDongTien,
        maSinhVien: loaded.maSinhVien,

        // Dữ liệu đã chỉnh sửa
        hocKyS: loaded.hocKyS,
        namHocS: loaded.namHocS,
        phiPhongS: loaded.phiPhongS,
        trangThaiS: loaded.trangThaiS,
        ngayDongTienS: loaded.ngayDongTienS,
        maSinhVienS: loaded.maSinhVienS,

        maCanBo: canBo.maCanBo
    })
    })
    .then(res => {
      if(res.ok){
        const x = document.getElementById('success')
        x.style.display = 'block'
        setTimeout(() => {x.style.display = 'none'}, 2000)
      }
    })
    .catch(err => console.log(err))
  }

  // Lấy dữ liệu từ bảng khi click vào 1 hàng
  const chonDuLieu = useCallback((obj, idx) => {
    var inputHocKy = document.getElementById('hocKy')
    inputHocKy.value = obj.hocKy

    var inputPhiPhong = document.getElementById('phiPhong')
    inputPhiPhong.value = parseInt(obj.phiPhong)

    var inputTrangThaiDaThu = document.getElementById('trangThaiDaThu')
    var inputTrangThaiChuaThu = document.getElementById('trangThaiChuaThu')
    if(obj.trangThai==='Đã thu')
      inputTrangThaiDaThu.checked = true
    if(obj.trangThai==='Chưa thu')
    inputTrangThaiChuaThu.checked = true

    var inputMaSinhVien = document.getElementById('maSinhVien')
    inputMaSinhVien.value = obj.maSinhVien

    var inputNamHoc = document.getElementById('namHoc')
    inputNamHoc.value = obj.namHoc

    var inputNgayDong = document.getElementById('ngayDongTien')
    inputNgayDong.value =  new Date(obj.ngayDongTien).toISOString().slice(0,10)
    

    const {hocKy, namHoc, phiPhong, trangThai, maSinhVien, ngayDongTien} = obj
    setDLChucNang(()=>({hocKy, namHoc, phiPhong, trangThai, maSinhVien, ngayDongTien, _id: idx}))
  },[])

  // Lấy toàn bộ dữ liệu phòng
  useEffect(() => {
    fetch('http://localhost:3001/api/tienphong')
    .then(res => res.json())
    .then(data => {
      setDuLieuKetQua(data)
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
            <label htmlFor="hocKy" className="w3-col l4 m3 s4">Học kỳ </label>
            <select
            className="w3-col l7 m3 s7 w3-margin-right" 
            name="hocKy" id="hocKy"
            onBlur={(e) => setDLChucNang(pre => ({...pre, hocKy: e.target.value}))} 
            >
              <option></option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="hè">hè</option>
            </select>
        </div>

        <div className="w3-row w3-mobile">
            <label htmlFor="namHoc" className="w3-col l4 m3 s4">Năm học </label>
            <input 
            className="w3-col l7 m3 s7 w3-margin-right" 
            name="namHoc" id="namHoc"
            type="text"
            onBlur={(e) => setDLChucNang(pre => ({...pre, namHoc: e.target.value}))} 
            >
            </input>
        </div>

        <div className="w3-row w3-mobile">
            <label htmlFor="phiPhong" className="w3-col l4 m3 s4">Phí phòng </label>
            <input 
            className="w3-col l7 m3 s7 w3-margin-right" 
            name="phiPhong" id="phiPhong"
            type="number"
            onBlur={(e) => setDLChucNang(pre => ({...pre, phiPhong: parseInt(e.target.value)}))} 
            >
            </input>
        </div>

        <div className="w3-row w3-mobile">
            <label className="w3-col l4 m3 s4">Trạng thái</label>

            <input
            className="w3-margin-right w3-margin-left"  
            onBlur={(e) => setDLChucNang(pre => ({...pre, trangThai: e.target.value}))} 
            type="radio" id="trangThaiDaThu" name="trangThai" value="Đã thu"/>
            <label htmlFor="trangThaiDaThu" >Đã thu</label>

            <input 
            className="w3-margin-right w3-margin-left"
            onBlur={(e) => setDLChucNang(pre => ({...pre, trangThai: e.target.value}))} 
            type="radio" id="trangThaiChuaThu" name="trangThai" value="Chưa thu" />
            <label htmlFor="trangThaiChuaThu">Chưa thu</label>
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
            <label htmlFor="ngayDongTien" className="w3-col l4 m3 s4">Ngày đóng tiền</label>
            <input 
            className="w3-col l7 m3 s7 w3-margin-right" 
            name="ngayDongTien" id="ngayDongTien"
            type="date"
            onBlur={(e) => setDLChucNang(pre => ({...pre, ngayDongTien: e.target.value}))} 
            >
            </input>
        </div>
        
      </div>
      
      {/* Chức năng */}
      <div className="w3-margin w3-row">
          <button 
          className="w3-button  w3-card w3-margin"
          onClick={()=>chucNang('them')}
          >Thêm</button>
          <button 
          className="w3-button  w3-card w3-margin"
          onClick={()=>chucNang('sua')}
          >Sửa</button>
          <button 
          className="w3-button  w3-card w3-margin"
          onClick={()=>chucNang('xoa')}
          >Xóa</button>
          <button
          className="w3-button w3-card w3-margin"
          onClick={()=>chucNang('timKiem')}
          >Tìm</button>
          <button 
          className="w3-button  w3-card w3-margin"
          onClick={()=>chucNang('reset')}
          >Đặt lại
          </button>
      </div>

      {/* Bảng dữ liệu phòng */}
      <BangKetQuaTienPhong duLieu={duLieuKetQua} chonDuLieu={chonDuLieu}/>
      
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
