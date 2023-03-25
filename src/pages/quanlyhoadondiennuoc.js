import { useCallback, useEffect, useRef, useState } from "react"
import BangKetQuaHoaDonDienNuoc from "./bangketquahoadondiennuoc"
import jsPDF from "jspdf"

function QuanLyHoaDonDienNuoc({canBo}) {
  const [duLieuChucNang, setDLChucNang] = useState({
    _id: '',
    ngayLapHD: '',
    maPhong: '',
    soKyDien: 0,
    soKyNuoc: 0,
    thangGhi: '',
    giaDien: 0,
    giaNuoc: 0,
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
    const thangGhi = document.getElementById('thangGhi').value 
    const ngayLapHD = document.getElementById('ngayLapHD').value 
    const maPhong = document.getElementById('maPhong').value 
    const soKyDien = document.getElementById('soKyDien').value  
    const soKyNuoc = document.getElementById('soKyNuoc').value 

    
    // Thực hiện chức năng
    if(type.includes('timKiem'))
      timPhong()
    else if(type.includes('reset')){
      document.getElementById('thangGhi').value = ''
      document.getElementById('ngayLapHD').value = ''
      document.getElementById('maPhong').value = ''
      document.getElementById('soKyDien').value = ''
      document.getElementById('soKyNuoc').value = ''

      if(duLieu.current.length>0)
        setDuLieuKetQua(duLieu.current)
      else
        setDuLieuKetQua(duLieuKetQua)

      setDLChucNang((pre) => ({...pre,
        _id: '',
        ngayLapHD: '',
        maPhong: '',
        soKyDien: 0,
        soKyNuoc: 0,
        thangGhi: '',
      }))
    }
    // Hiện hợp thoại cảnh báo nếu không có dữ liệu
    else if(type!=='timKiem' && type!=='reset'
    && (thangGhi==='' || ngayLapHD==='' || maPhong==='' || soKyDien===''
       || soKyNuoc===''))
        openModal('Vui lòng điền đầy đủ thông tin!')
        
    else {
      const tienDien = duLieuChucNang.soKyDien * duLieuChucNang.giaDien
      const tienNuoc = duLieuChucNang.soKyNuoc * duLieuChucNang.giaNuoc
      const tongTien = tienDien + tienNuoc
      const {thangGhi, ngayLapHD, maPhong, soKyDien, soKyNuoc} = duLieuChucNang
      const obj = {thangGhi, ngayLapHD, maPhong, soKyDien, soKyNuoc, tienDien: tienDien, tienNuoc: tienNuoc, tongTien: tongTien}

      if(type==='them'){
        var tonTai = 0
        if(duLieuKetQua.length!==0)
          duLieuKetQua.forEach(val => {
            if(val.thangGhi===duLieuChucNang.thangGhi &&
              val.maPhong===duLieuChucNang.maPhong){
              openModal('Dữ liệu đã tồn tại!')
              tonTai=1
            }
          })
        if(tonTai===0){
          featchToServer('themhoadon', obj)
          setDuLieuKetQua(pre=>[...pre, obj])
        }
      }

      if(type==='xoa'){
        if(duLieuKetQua.length!==0){
          var test = 0
          duLieuKetQua.forEach(val => {
            if(val.thangGhi===duLieuChucNang.thangGhi &&
              val.maPhong===duLieuChucNang.maPhong)
                test=1
          })
          if(test===1){
            featchToServer('xoahoadon', duLieuChucNang)
            setDuLieuKetQua(duLieuKetQua.filter(item => item.thangGhi!==duLieuChucNang.thangGhi 
              || item.maPhong!==duLieuChucNang.maPhong))
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
          duLieuSua.tienDien = tienDien
          duLieuSua.tienNuoc = tienNuoc
          duLieuSua.tongTien = tongTien
          let loaded = duLieuBanDau

          setDuLieuKetQua(duLieuKetQua.map(
            (item, idx) => idx===duLieuChucNang._id 
            ? duLieuSua : item
          ))

          loaded.ngayLapHDS = duLieuSua.ngayLapHD
          loaded.maPhongS = duLieuSua.maPhong
          loaded.soKyDienS = duLieuSua.soKyDien
          loaded.soKyNuocS = duLieuSua.soKyNuoc
          loaded.thangGhiS = duLieuSua.thangGhi
          loaded.tienDienS = duLieuSua.tienDien
          loaded.tienNuocS = duLieuSua.tienNuoc
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
        doc.text('Hóa đơn điện nước', 4, 2.5)
        doc.setFontSize('12')
        doc.text('Mã phòng: '+duLieuChucNang.maPhong+
        '\n\nTháng ghi: '+ duLieuChucNang.thangGhi+
        '\n\nSố ký điện: '+ duLieuChucNang.soKyDien+
        ' - tiền điện: '+ tienDien +'vnđ'+
        '\n\nSố ký nước: ' + duLieuChucNang.soKyNuoc+
        ' - tiền nước: '+ tienNuoc +'vnđ'+
        '\n\nTổng số tiền: '+ tongTien +'vnđ'
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
      if(val.thangGhi.includes(duLieuChucNang.thangGhi) &&
      val.maPhong.includes(duLieuChucNang.maPhong))
       duLieuTimThay.push(val)
    })

    setDuLieuKetQua(duLieuTimThay)
  }

  // Gửi yêu cầu lên server
  const featchToServer = (type, loaded) => {
    fetch(`http://localhost:3001/api/tiendiennuoc/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: loaded._id,
        ngayLapHD: loaded.ngayLapHD,
        maPhong: loaded.maPhong,
        soKyDien: loaded.soKyDien,
        tienDien: loaded.tienDien,
        soKyNuoc: loaded.soKyNuoc,
        tienNuoc: loaded.tienNuoc,
        tongTien: loaded.tongTien,
        thangGhi: loaded.thangGhi,


        // Dữ liệu đã chỉnh sửa
        ngayLapHDS: loaded.ngayLapHDS,
        maPhongS: loaded.maPhongS,
        soKyDienS: loaded.soKyDienS,
        tienDienS: loaded.tienDienS,
        soKyNuocS: loaded.soKyNuocS,
        tienNuocS: loaded.tienNuocS,
        tongTienS: loaded.tongTienS,
        thangGhiS: loaded.thangGhiS,

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
    document.getElementById('thangGhi').value = obj.thangGhi
    document.getElementById('ngayLapHD').value = obj.ngayLapHD
    document.getElementById('maPhong').value = obj.maPhong
    document.getElementById('soKyDien').value = obj.soKyDien
    document.getElementById('soKyNuoc').value = obj.soKyNuoc
    
    const {thangGhi, ngayLapHD, maPhong, soKyDien, soKyNuoc} = obj
    setDLChucNang((pre)=>({...pre, thangGhi, ngayLapHD, maPhong, soKyDien, soKyNuoc, _id: idx}))
  },[])

  // Lấy toàn bộ dữ liệu phòng
  useEffect(() => {
    fetch('http://localhost:3001/api/tiendiennuoc/getallhoadon')
    .then(res => res.json())
    .then(data => {
      setDuLieuKetQua(data)
    })
    .catch(error => {
        console.log(error)
    })
  },[])

  // Lấy chi phí 
  useEffect(() => {
    fetch('http://localhost:3001/api/tiendiennuoc/chiphi')
    .then(res => res.json())
    .then(data => {
      setDLChucNang(pre => ({...pre, 
        giaDien: data.giaDien,
        giaNuoc: data.giaNuoc
      }))
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
            <label htmlFor="thangGhi" className="w3-col l4 m3 s4">Tháng ghi </label>
            <input 
            className="w3-col l7 m3 s7 w3-margin-right" 
            name="thangGhi" id="thangGhi"
            type="month"
            onBlur={(e) => setDLChucNang(pre => ({...pre, thangGhi: e.target.value}))} 
            >
            </input>
        </div>

        <div className="w3-row w3-mobile">
            <label htmlFor="ngayLapHD" className="w3-col l4 m3 s4">Ngày lập hóa đơn </label>
            <input 
            className="w3-col l7 m3 s7 w3-margin-right" 
            name="ngayLapHD" id="ngayLapHD"
            type="date"
            onBlur={(e) => setDLChucNang(pre => ({...pre, ngayLapHD: e.target.value}))} 
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
            <label htmlFor="soKyDien" className="w3-col l4 m3 s4">Số ký điện </label>
            <input 
            className="w3-col l7 m3 s7 w3-margin-right" 
            name="soKyDien" id="soKyDien"
            type="number"
            onBlur={(e) => setDLChucNang(pre => ({...pre, soKyDien: parseInt(e.target.value)}))} 
            >
            </input>
        </div>

        <div className="w3-row w3-mobile">
            <label htmlFor="soKyNuoc" className="w3-col l4 m3 s4">Số ký nước </label>
            <input 
            className="w3-col l7 m3 s7 w3-margin-right" 
            name="soKyNuoc" id="soKyNuoc"
            type="number"
            onBlur={(e) => setDLChucNang(pre => ({...pre, soKyNuoc: parseInt(e.target.value)}))} 
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
      <BangKetQuaHoaDonDienNuoc duLieu={duLieuKetQua} chonDuLieu={chonDuLieu}/>
      
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

export default QuanLyHoaDonDienNuoc