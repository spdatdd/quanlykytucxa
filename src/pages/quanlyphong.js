
import { useCallback, useEffect, useRef, useState } from "react"
import BangKetQuaPhong from './bangketquaphong'

function QuanLyPhong ({canBo}) {
  const duLieuPhong = useRef([])
  const [duLieuChucNang, setDLChucNang] = useState({
    _id: '',
    maPhong: '', 
    tenPhong: '', 
    maDay: '', 
    maLoaiPhong: '',
    donGia: '', 
    phongNamNu: '', 
    sucChua: 0,
    trangThaiSuDung: '',
    soChoOThucTe: 0
  })
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
    const maP = document.getElementById('maPhong').value
    const tenP = document.getElementById('tenPhong').value
    const maD = document.getElementById('maDay').value
    const maL = document.getElementById('maLoaiPhong').value
    const donG = document.getElementById('donGia').value
    const sucC = document.getElementById('sucChua').value
    const soCOTT = document.getElementById('soChoOThucTe').value
    var inputPhongNam = document.getElementsByName('phongNamNu')[0]
    var inputPhongNu = document.getElementsByName('phongNamNu')[1]
    var inputDangSuDung = document.getElementsByName('trangThaiSuDung')[0]
    var inputKhongConSuDung = document.getElementsByName('trangThaiSuDung')[1]
    
    // Thực hiện chức năng
    if(type==='timKiem')
      timPhong()
    else if(type==='reset'){
      document.getElementById('maPhong').value = ''
      document.getElementById('tenPhong').value = ''
      document.getElementById('maDay').value = ''
      document.getElementById('maLoaiPhong').value = ''
      document.getElementById('donGia').value = ''
      document.getElementById('sucChua').value = ''
      document.getElementById('soChoOThucTe').value = ''
      if(inputPhongNam.checked === true)
        inputPhongNam.checked = !inputPhongNam.checked
      if(inputPhongNu.checked === true)
        inputPhongNu.checked = !inputPhongNu.checked
      if(inputDangSuDung.checked === true)
        inputDangSuDung.checked = !inputDangSuDung.checked
      if(inputKhongConSuDung.checked === true)
        inputKhongConSuDung.checked = !inputKhongConSuDung.checked

      setDLChucNang({
        _id: '',
        maPhong: '', 
        tenPhong: '', 
        maDay: '', 
        maLoaiPhong: '',
        donGia: '', 
        phongNamNu: '', 
        sucChua: 0,
        trangThaiSuDung: '',
        soChoOThucTe: 0
      })

      var x = false
      if(duLieuKetQua.length>duLieuPhong.current.length)
        x = true
      if(duLieuPhong.current.length>duLieuKetQua.length)
        setDuLieuKetQua(duLieuPhong.current)
    }
    // Hiện hợp thoại cảnh báo nếu không có dữ liệu
    else if(type!=='timKiem' && type!=='reset' && (
      maP==='' || tenP==='' || maD==='' || maL==='' || donG==='' || sucC==='' || soCOTT===''
      || donG==='' || sucC==='' || soCOTT==='' || (inputPhongNam.checked===false && inputPhongNu.checked===false)
      || (inputDangSuDung.checked===false && inputKhongConSuDung.checked===false)
      || sucC==='' || soCOTT===''
    )){
      openModal('Vui lòng điền đầy đủ thông tin!')
    } 
    else {
      if(type==='them'){
        var tonTai = 0
        if(duLieuKetQua.length!==0)
          duLieuKetQua.forEach(val => {
            if(val.maPhong===duLieuChucNang.maPhong &&
            val.maDay===duLieuChucNang.maDay && 
            val.tenPhong===duLieuChucNang.tenPhong){
              openModal('Phòng đã tồn tại!')
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
            if(val.maPhong===duLieuChucNang.maPhong && 
              val.maDay===duLieuChucNang.maDay &&
              val.maLoaiPhong===duLieuChucNang.maLoaiPhong)
                test=1
          })
          if(test===1){
            featchToServer('xoa', duLieuChucNang)
            setDuLieuKetQua(duLieuKetQua.filter(item =>item.maPhong!==duLieuChucNang.maPhong
              || item.maDay!==duLieuChucNang.maDay || item.tenPhong!==duLieuChucNang.tenPhong
              || item.maLoaiPhong!==duLieuChucNang.maLoaiPhong))
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
          
          setDuLieuKetQua(duLieuKetQua.map(
            item=> item._id===duLieuChucNang._id 
            ? duLieuChucNang : item
          ))

          loaded.maPhongSua = duLieuSua.maPhong
          loaded.tenPhongSua = duLieuSua.tenPhong
          loaded.maDaySua = duLieuSua.maDay
          loaded.donGiaSua = duLieuSua.donGia
          loaded.maLoaiPhongSua = duLieuSua.maLoaiPhong
          loaded.phongNamNuSua = duLieuSua.phongNamNu
          loaded.soChoOThucTeSua = duLieuSua.soChoOThucTe
          loaded.sucChuaSua = duLieuSua.sucChua
          loaded.trangThaiSuDungSua = duLieuSua.trangThaiSuDung
          
          featchToServer('sua', loaded)
        }
        else openModal('Dữ liệu rỗng!')
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
    fetch(`http://localhost:3001/api/phong/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        maPhong: loaded.maPhong, 
        tenPhong: loaded.tenPhong, 
        maDay: loaded.maDay, 
        maLoaiPhong: loaded.maLoaiPhong,
        donGia: loaded.donGia, 
        phongNamNu: loaded.phongNamNu, 
        sucChua: loaded.sucChua,
        trangThaiSuDung: loaded.trangThaiSuDung,
        soChoOThucTe: loaded.soChoOThucTe,
        
        // Dữ liệu cần chỉnh sửa
        maPhongSua: loaded.maPhongSua,
        tenPhongSua: loaded.tenPhongSua,
        maDaySua: loaded.maDaySua,
        maLoaiPhongSua: loaded.maLoaiPhongSua,
        donGiaSua: loaded.donGiaSua,
        phongNamNuSua: loaded.phongNamNuSua,
        sucChuaSua: loaded.sucChuaSua,
        trangThaiSuDungSua: loaded.trangThaiSuDungSua,
        soChoOThucTeSua: loaded.soChoOThucTeSua,

        maCanBo: canBo.maCanBo
    })
    })
    .then(res => {
      if(res.ok)
        thucHienThanhCong()
    })
    .catch(err => console.log(err))
  }

  // Lấy dữ liệu từ bảng khi click vào 1 hàng
  const chonDuLieu = useCallback((obj, idx) => {
    document.getElementsByName('maPhong')[0].value = obj.maPhong
    document.getElementsByName('tenPhong')[0].value = obj.tenPhong
    document.getElementsByName('maDay')[0].value = obj.maDay
    document.getElementsByName('maLoaiPhong')[0].value = obj.maLoaiPhong
    document.getElementsByName('donGia')[0].value = obj.donGia
    var inputPhongNam = document.getElementsByName('phongNamNu')[0]
    var inputPhongNu = document.getElementsByName('phongNamNu')[1]
    if(obj.phongNamNu.includes('Nam'))
      inputPhongNam.checked = true
    if(obj.phongNamNu.includes('Nữ'))
      inputPhongNu.checked = true
    document.getElementsByName('sucChua')[0].value = obj.sucChua
    document.getElementsByName('soChoOThucTe')[0].value = obj.soChoOThucTe

    var inputDangSuDung = document.getElementsByName('trangThaiSuDung')[0]
    var inputKhongConSuDung = document.getElementsByName('trangThaiSuDung')[1]
    if(obj.trangThaiSuDung.includes('Đang sử dụng'))
      inputDangSuDung.checked = true
    if(obj.trangThaiSuDung.includes('Không còn sử dụng'))
      inputKhongConSuDung.checked = true
    const {donGia, maDay, maLoaiPhong, maPhong, phongNamNu, 
    soChoOThucTe, sucChua, tenPhong, trangThaiSuDung} = obj
    setDLChucNang(()=>({donGia, maDay, maLoaiPhong, maPhong, phongNamNu, 
      soChoOThucTe, sucChua, tenPhong, trangThaiSuDung, _id: idx}))
  },[])

  // Lấy toàn bộ dữ liệu phòng
  useEffect(() => {
    fetch('http://localhost:3001/api/phong/')
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
        <div className="w3-half">
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
              <label htmlFor="tenPhong" className="w3-col l4 m3 s4">Tên phòng </label>
              <input 
              className="w3-col l7 m3 s7 w3-margin-right" 
              name="tenPhong" type="text" id="tenPhong"
              onBlur={(e) => setDLChucNang(pre => ({...pre, tenPhong: e.target.value}))} 
              ></input>
          </div>

          <div className="w3-row w3-mobile">
              <label htmlFor="maDay" className="w3-col l4 m3 s4">Mã dãy </label>
              <input 
              className="w3-col l7 m3 s7 w3-margin-right" 
              name="maDay" type="text" id="maDay"
              onBlur={(e) => setDLChucNang(pre => ({...pre, maDay: e.target.value}))} 
              ></input>
          </div>

          <div className="w3-row w3-mobile">
              <label htmlFor="maLoaiPhong" className="w3-col l4 m3 s4">Mã loại phòng </label>
              <input className="w3-col l7 m3 s7 w3-margin-right" 
              name="maLoaiPhong" type="text" id="maLoaiPhong"
              onBlur={(e) => setDLChucNang(pre => ({...pre, maLoaiPhong: e.target.value}))} 
              ></input>
          </div>
        </div>
        
        <div className="w3-half">
          <div className="w3-row w3-mobile">
              <label htmlFor="donGia" className="w3-col l4 m3 s4">Đơn giá </label>
              <input className="w3-col l7 m3 s7 w3-margin-right" 
              name="donGia" 
              type="text"
              id="donGia"
              onBlur={(e) => setDLChucNang(pre => ({...pre, donGia: e.target.value}))} 
              ></input>
          </div>  

          <div className="w3-row w3-mobile">
            <label className="w3-col l4 m3 s4">Phòng nam nữ </label>

            <input
            className="w3-margin-right w3-margin-left"  
            onBlur={(e) => setDLChucNang(pre => ({...pre, phongNamNu: e.target.value}))} 
            type="radio" id="phongNam" name="phongNamNu" value="Nam"/>
            <label htmlFor="phongNam" >Nam</label>
            <input 
            className="w3-margin-right w3-margin-left"
            onBlur={(e) => setDLChucNang(pre => ({...pre, phongNamNu: e.target.value}))} 
            type="radio" id="phongNu" name="phongNamNu" value="Nữ" />
            <label htmlFor="phongNu">Nữ</label>
          </div>  

          <div className="w3-row w3-mobile">
            <label htmlFor="sucChua" className="w3-col l4 m3 s4">Sức chứa </label>
            <input className="w3-col l7 m3 s7 w3-margin-right" 
            name="sucChua" type="number" min="0" max="8" id="sucChua"
            defaultValue="0"
            onBlur={(e) => setDLChucNang(pre => ({...pre, sucChua: parseInt(e.target.value)}))} 
            ></input>
          </div>

          <div className="w3-row w3-mobile">
              <label htmlFor="soChoOThucTe" className="w3-col l4 m3 s4">Số chổ ở thực tế</label>
              <input className="w3-col l7 m3 s7 w3-margin-right" 
              name="soChoOThucTe" type="number" min="0" max="8" id="soChoOThucTe"
              defaultValue="0"
              onBlur={(e) => setDLChucNang(pre => ({...pre, soChoOThucTe: parseInt(e.target.value)}))} 
              ></input>
          </div>

          <div className="w3-row w3-mobile">
            <div className="w3-col l4 m3 s4 w3-cell w3-cell-middle">
              <p>Trạng thái sử dụng</p>
            </div>

            <div className="w3-rest w3-padding-small">
              <input
              className="w3-margin-right w3-margin-left"  
              onBlur={(e) => setDLChucNang(pre => ({...pre, trangThaiSuDung: e.target.value}))} 
              type="radio" id="dangSuDung" name="trangThaiSuDung" value="Đang sử dụng"/>
              <label htmlFor="dangSuDung" >Đang sử dụng</label>
              <br/>
              <input 
              className="w3-margin-right w3-margin-left"
              onBlur={(e) => setDLChucNang(pre => ({...pre, trangThaiSuDung: e.target.value}))} 
              type="radio" id="khongConSuDung" name="trangThaiSuDung" value="Không còn sử dụng" />
              <label htmlFor="khongConSuDung">Không còn sử dụng</label>
            </div>
          </div> 
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
          onClick={()=>chucNang('reset')}
          >Đặt lại
          </button>
        
      </div>

      {/* Bảng dữ liệu phòng */}
      <BangKetQuaPhong duLieu={duLieuKetQua} chonDuLieu={chonDuLieu}/>
      
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

export default QuanLyPhong