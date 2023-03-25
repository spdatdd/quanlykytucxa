import { useCallback, useEffect, useRef, useState } from "react"
import BangKetQuaHoaDonPhong from "./bangketquahoadonphong"
import jsPDF from "jspdf"

function QuanLyHoaDonPhong ({canBo}) {
  const [duLieuChucNang, setDLChucNang] = useState({
    _id: '',
    hocKy: '',
    maPhong: '',
    maSinhVien: '',
    namHoc: '',
    ngayLapHD: '',
    tongTien: 0
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
    const hocKy = document.getElementById('hocKy').value 
    const maPhong = document.getElementById('maPhong').value 
    const maSinhVien = document.getElementById('maSinhVien').value 
    const namHoc = document.getElementById('namHoc').value
    const tongTien = document.getElementById('tongTien').value
    const ngayLapHD = document.getElementById('ngayLapHD').value 
    // Thực hiện chức năng
    if(type.includes('timKiem'))
      timPhong()
    else if(type.includes('reset')){
        document.getElementById('hocKy').value = ''
        document.getElementById('maPhong').value = ''
        document.getElementById('maSinhVien').value = ''
        document.getElementById('namHoc').value =  ''
        document.getElementById('tongTien').value = ''
        document.getElementById('ngayLapHD').value =  ''
        if(duLieu.current.length>0)
          setDuLieuKetQua(duLieu.current)
        else
          setDuLieuKetQua(duLieuKetQua)
    }
    // Hiện hợp thoại cảnh báo nếu không có dữ liệu
    else if(type!=='timKiem' && type!=='reset'
    && (hocKy==='' || namHoc==='' || maPhong==='' || maSinhVien==='' 
        || tongTien==='' || ngayLapHD===''))
        openModal('Vui lòng điền đầy đủ thông tin!')
        
    else {
      if(type==='them'){
        var tonTai = 0
        if(duLieuKetQua.length!==0)
          duLieuKetQua.forEach(val => {
            if(val.maPhong===duLieuChucNang.maPhong &&
            val.maSinhVien===duLieuChucNang.maSinhVien &&
            val.hocKy===duLieuChucNang.hocKy &&
            val.namHoc===duLieuChucNang.namHoc){
              openModal('Dữ liệu đã tồn tại!')
              tonTai=1
            }
          })
        if(tonTai===0){
          featchToServer('themhoadon', duLieuChucNang)
          setDuLieuKetQua(pre=>[...pre, duLieuChucNang])
        }
      }
      if(type==='xoa'){
        if(duLieuKetQua.length!==0){
          var test = 0
          duLieuKetQua.forEach(val => {
            if(val.maPhong===duLieuChucNang.maPhong &&
              val.maSinhVien===duLieuChucNang.maSinhVien &&
              val.hocKy===duLieuChucNang.hocKy &&
              val.namHoc===duLieuChucNang.namHoc)
                test=1
          })
          if(test===1){
            featchToServer('xoahoadon', duLieuChucNang)
            setDuLieuKetQua(duLieuKetQua.filter(item =>item.maPhong!==duLieuChucNang.maPhong
            || item.maSinhVien!==duLieuChucNang.maSinhVien 
            || item.hocKy!==duLieuChucNang.hocKy
            || item.namHoc!==duLieuChucNang.namHoc))
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
            (item, idx) => idx===duLieuChucNang._id 
            ? duLieuSua : item
          ))

          loaded = duLieuBanDau
          loaded.maPhongS = duLieuSua.maPhong
          loaded.maSinhVienS = duLieuSua.maSinhVien
          loaded.hocKyS = duLieuSua.hocKy
          loaded.namHocS = duLieuSua.namHoc
          loaded.ngayLapHDS = duLieuSua.ngayLapHD
          loaded.tongTienS = duLieuSua.tongTien
          featchToServer('suahoadon', loaded)
        }
        else openModal('Dữ liệu rỗng!')
      }

      if(type==='inHoaDon'){
        var doc = new jsPDF('p', 'cm', 'a5')
        doc.setFont('font-times-new-roman', 'normal')
        doc.setFontSize('12')
        doc.text(
          'Ngày  '+duLieuChucNang.ngayLapHD.slice(8,)
          + '  tháng  '+duLieuChucNang.ngayLapHD.slice(5, 7)
          + '  năm  '+duLieuChucNang.ngayLapHD.slice(0,4)
          , 6, 1)
        doc.setFontSize('18')
        doc.text('Hóa đơn phòng', 4, 2.5)
        doc.setFontSize('12')
        doc.text('Mã phòng: '+duLieuChucNang.maPhong+
        '\n\nMã sinh viên: '+duLieuChucNang.maSinhVien+
        '\n\nHọc kỳ: '+ duLieuChucNang.hocKy+
        '\n\nNăm học: '+ duLieuChucNang.namHoc+
        '\n\nTổng số tiền: '+ duLieuChucNang.tongTien+'vnđ'
        ,2,4)
        doc.text('Người lập hóa đơn',8,9)
        doc.output('dataurlnewwindow')
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
      val.maSinhVien.includes(duLieuChucNang.maSinhVien) &&
      val.maPhong.includes(duLieuChucNang.maPhong) &&
      val.ngayLapHD.includes(duLieuChucNang.ngayLapHD))
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
        maPhong: loaded.maPhong,
        maSinhVien: loaded.maSinhVien,
        hocKy: loaded.hocKy,
        namHoc: loaded.namHoc,
        ngayLapHD: loaded.ngayLapHD,
        tongTien: loaded.tongTien,

        // Dữ liệu đã chỉnh sửa
        maPhongS: loaded.maPhongS,
        maSinhVienS: loaded.maSinhVienS,
        hocKyS: loaded.hocKyS,
        namHocS: loaded.namHocS,
        ngayLapHDS: loaded.ngayLapHDS,
        tongTienS: loaded.tongTienS,

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
    document.getElementById('hocKy').value = obj.hocKy
    document.getElementById('maPhong').value = obj.maPhong
    document.getElementById('maSinhVien').value = obj.maSinhVien
    document.getElementById('namHoc').value =  obj.namHoc
    document.getElementById('tongTien').value = obj.tongTien
    document.getElementById('ngayLapHD').value =  new Date(obj.ngayLapHD).toISOString().slice(0,10)
    
    const {hocKy, namHoc, maSinhVien, maPhong, tongTien, ngayLapHD} = obj
    setDLChucNang(()=>({hocKy, namHoc, maSinhVien, maPhong, tongTien, ngayLapHD, _id: idx}))
  },[])

  // Lấy toàn bộ dữ liệu phòng
  useEffect(() => {
    fetch('http://localhost:3001/api/tienphong/getAllHoaDon')
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
            <label htmlFor="maSinhVien" className="w3-col l4 m3 s4">Mã Sinh Viên </label>
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
            <label htmlFor="ngayLapHD" className="w3-col l4 m3 s4">Ngày lập hóa đơn</label>
            <input 
            className="w3-col l7 m3 s7 w3-margin-right" 
            name="ngayLapHD" id="ngayLapHD"
            type="date"
            onBlur={(e) => setDLChucNang(pre => ({...pre, ngayLapHD: e.target.value}))} 
            >
            </input>
        </div>

        <div className="w3-row w3-mobile">
            <label htmlFor="tongTien" className="w3-col l4 m3 s4">Tổng tiền </label>
            <input 
            className="w3-col l7 m3 s7 w3-margin-right" 
            name="tongTien" id="tongTien"
            type="number" min="0"
            onBlur={(e) => setDLChucNang(pre => ({...pre, tongTien: e.target.value}))} 
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
          className="w3-button w3-card w3-margin"
          onClick={()=>chucNang('inHoaDon')}
          >In hóa đơn</button>
          <button 
          className="w3-button  w3-card w3-margin"
          onClick={()=>chucNang('reset')}
          >Đặt lại
          </button>
      </div>

      {/* Bảng dữ liệu phòng */}
      <BangKetQuaHoaDonPhong duLieu={duLieuKetQua} chonDuLieu={chonDuLieu}/>
      
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

export default QuanLyHoaDonPhong