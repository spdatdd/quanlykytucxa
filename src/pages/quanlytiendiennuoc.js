import { useCallback, useEffect, useRef, useState } from "react"
import BangKetQuaTienDienNuoc from './bangketquatiendiennuoc'
import jsPDF from "jspdf"


function QuanLyTienDienNuoc ({canBo}) {
  const [duLieuChucNang, setDLChucNang] = useState({
    _id: '',
    ngayThanhToan: '',
    thangGhi: '',
    soKyDien: 0, 
    giaDien: 0,
    maPhong: '',
    tenPhong: '',
    soKyNuoc: 0,
    giaNuoc: 0,
    trangThai: '',
    tongTien: 0
  })
  const [duLieuKetQua, setDuLieuKetQua] = useState([])

  const duLieuPhong = useRef([])
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
    const maP = document.getElementById('maPhong').value
    const tenP = document.getElementById('tenPhong').value
    const giaDien = document.getElementById('giaDien').value
    const soKyDien = document.getElementById('soKyDien').value
    const giaNuoc = document.getElementById('giaNuoc').value
    const soKyNuoc = document.getElementById('soKyNuoc').value
    const trangThaiDaThu = document.getElementById('trangThaiDaThu')
    const trangThaiChuaThu = document.getElementById('trangThaiChuaThu')
    const tongTien = document.getElementById('tongTien').value
    const thangGhi = document.getElementById('thangGhi').value
    // Thực hiện chức năng
    if(type.includes('timKiem'))
      timPhong()
    else if(type.includes('reset')){
      document.getElementById('tongTien').value = ''
      document.getElementById('maPhong').value = ''
      document.getElementById('tenPhong').value = ''
      document.getElementById('giaDien').value = ''
      document.getElementById('giaNuoc').value = ''
      document.getElementById('soKyDien').value = ''
      document.getElementById('soKyNuoc').value = ''
      document.getElementById('thangGhi').value = ''
      document.getElementById('ngayThanhToan').value = ''
      
      if(trangThaiDaThu.checked)
        document.getElementById('trangThaiDaThu').checked = false
      if(trangThaiChuaThu.checked)
        document.getElementById('trangThaiChuaThu').checked = false
      if(duLieuKetQua.length<duLieuPhong.current.length)
        setDuLieuKetQua(duLieuPhong.current)
      if(duLieuKetQua.length>duLieuPhong.current.length)
        setDuLieuKetQua(duLieuKetQua)

      setDLChucNang({
        _id: '',
        thangGhi: '',
        soKyDien: 0, 
        giaDien: 0,
        maPhong: '',
        tenPhong: '',
        soKyNuoc: 0,
        giaNuoc: 0,
        trangThai: '',
        tongTien: 0,
        ngayThanhToan: ''
      })
    }
    // Hiện hợp thoại cảnh báo nếu không có dữ liệu
    else if(type!=='timKiem' && type!=='reset'
    && (giaDien==='' || giaNuoc==='' || maP===''
      || soKyDien==='' || soKyNuoc==='' || tenP===''
      || (trangThaiChuaThu.checked===false && trangThaiDaThu.checked===false)
      || tongTien==='' || thangGhi===''))
        openModal('Vui lòng điền đầy đủ thông tin!')
        
    else {
      if(type==='them'){
        var tonTai = 0
        if(duLieuKetQua.length!==0)
          duLieuKetQua.forEach(val => {
            if(val.maPhong===duLieuChucNang.maPhong &&
            val.tenPhong===duLieuChucNang.tenPhong &&
            val.thangGhi===duLieuChucNang.thangGhi){
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
            if(val.maPhong===duLieuChucNang.maPhong && 
              val.tenPhong===duLieuChucNang.tenPhong &&
              val.thangGhi===duLieuChucNang.thangGhi)
                test=1
          })
          if(test===1){
            featchToServer('xoa', duLieuChucNang)
            setDuLieuKetQua(duLieuKetQua.filter(item =>item.maPhong!==duLieuChucNang.maPhong
            || item.tenPhong!==duLieuChucNang.tenPhong 
            || item.thangGhi!==duLieuChucNang.thangGhi))
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
          loaded.maPhongS = duLieuSua.maPhong
          loaded.tenPhongS = duLieuSua.tenPhong
          loaded.soKyDienS = duLieuSua.soKyDien
          loaded.giaDienS = duLieuSua.giaDien
          loaded.soKyNuocS = duLieuSua.soKyNuoc
          loaded.giaNuocS = duLieuSua.giaNuoc
          loaded.trangThaiS = duLieuSua.trangThai
          loaded.tongTienS = duLieuSua.tongTien
          loaded.thangGhiS = duLieuSua.thangGhi
          loaded.ngayThanhtoanS = duLieuSua.ngayThanhToan
          featchToServer('sua', loaded)
        }
      }

      if(type==='thongBao'){
        var doc = new jsPDF('p', 'cm', 'a5')
        doc.setFont('font-times-new-roman', 'normal')
        doc.setFontSize('12')
        const date = new Date()
        var [ngay, thang, nam] = date.toLocaleDateString().split('/')
        if(ngay.length===1)
          ngay = '0' + ngay
        if(thang.length===1)
          thang = '0' + thang
        
        doc.text('Ngày '+ngay+'  tháng '+thang+'  năm '+nam, 7, 1)
        doc.setFontSize('16')
        doc.text('Thông báo đóng phí điện nước', 3.5, 3)
        
        doc.setFontSize('12')
        doc.text('Mã phòng: '+duLieuChucNang.maPhong+
        '\n\nTên phòng: '+duLieuChucNang.tenPhong+
        '\n\nSố ký điện: '+duLieuChucNang.soKyDien+
        '\n\nSố ký nước: '+duLieuChucNang.soKyNuoc+
        '\n\nTổng tiền: '+duLieuChucNang.tongTien
        , 2.5, 5)
        doc.text('Người lập hóa đơn', 9, 10)
        
        doc.output('dataurlnewwindow')
      }

      if(type==='inHoaDon'){
        var doc = new jsPDF('p', 'cm', 'a5')
        doc.setFont('font-times-new-roman', 'normal')
        doc.setFontSize('12')
        const date = new Date()
        var [ngay, thang, nam] = date.toLocaleDateString().split('/')
        if(ngay.length===1)
          ngay = '0' + ngay
        if(thang.length===1)
          thang = '0' + thang

        doc.text('Ngày '+ngay+'  tháng '+thang+'  năm '+nam, 7, 1)
        doc.setFontSize('16')
        doc.text('Hóa đơn điện nước', 4.5, 3)

        doc.setFontSize('12')
        const tienDien = duLieuChucNang.soKyDien * duLieuChucNang.giaDien
        const tienNuoc = duLieuChucNang.soKyNuoc * duLieuChucNang.giaNuoc
        const tongTien = tienDien + tienNuoc

        doc.text('Mã phòng: '+duLieuChucNang.maPhong+
        '\n\nTháng ghi: '+ duLieuChucNang.thangGhi+
        '\n\nSố ký điện: '+ duLieuChucNang.soKyDien+
        ' - tiền điện: '+ tienDien+'vnđ'+
        '\n\nSố ký nước: ' + duLieuChucNang.soKyNuoc+
        ' - tiền nước: '+ tienNuoc+'vnđ'+
        '\n\nTổng số tiền: '+ tongTien+'vnđ'
        ,2,4)
        doc.text('Người lập hóa đơn', 9, 10)
        doc.output('dataurlnewwindow')

        // thêm hóa đơn vào cơ sở dữ liệu
        fetch(`http://localhost:3001/api/tiendiennuoc/themhoadon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ngayLapHD: nam+'-'+thang+'-'+ngay,
          maPhong: duLieuChucNang.maPhong,
          soKyDien: duLieuChucNang.soKyDien,
          tienDien: tienDien,
          soKyNuoc: duLieuChucNang.soKyNuoc,
          tienNuoc: tienNuoc,
          tongTien: tongTien,
          thangGhi: duLieuChucNang.thangGhi,

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

        document.getElementById('trangThaiDaThu').checked = true
        duLieuChucNang.trangThai ='Đã thu'
        chucNang('sua')
      }
    }
  }

  // Tìm kiếm theo tên phòng
  const timPhong = () => {
    const duLieuTimThay = []
    if(duLieuKetQua.length >= duLieuPhong.current.length){
      duLieuPhong.current = duLieuKetQua
    }

    duLieuPhong.current.forEach(val => {
      if(val.tenPhong.includes(duLieuChucNang.tenPhong) &&
      val.maPhong.includes(duLieuChucNang.maPhong) &&
      val.trangThai.includes(duLieuChucNang.trangThai) &&
      val.thangGhi.includes(duLieuChucNang.thangGhi))
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
        maPhong: loaded.maPhong,
        tenPhong: loaded.tenPhong,
        giaDien: loaded.giaDien,
        soKyDien: loaded.soKyDien,
        soKyNuoc: loaded.soKyNuoc,
        giaNuoc: loaded.giaNuoc,
        tongTien: loaded.tongTien,
        trangThai: loaded.trangThai,
        thangGhi: loaded.thangGhi,
        ngayThanhToan: loaded.ngayThanhToan,

        // Dữ liệu đã chỉnh sửa
        maPhongS: loaded.maPhongS,
        tenPhongS: loaded.tenPhongS,
        giaDienS: loaded.giaDienS,
        soKyDienS: loaded.soKyDienS,
        soKyNuocS: loaded.soKyNuocS,
        giaNuocS: loaded.giaNuocS,
        tongTienS: loaded.tongTienS,
        trangThaiS: loaded.trangThaiS,
        thangGhiS: loaded.thangGhiS,
        ngayThanhtoanS: loaded.ngayThanhtoanS,

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
    document.getElementById('maPhong').value = obj.maPhong
    document.getElementById('tenPhong').value = obj.tenPhong
    document.getElementById('soKyDien').value = obj.soKyDien
    document.getElementById('giaDien').value = obj.giaDien
    document.getElementById('soKyNuoc').value = obj.soKyNuoc
    document.getElementById('giaNuoc').value = obj.giaNuoc
    document.getElementById('tongTien').value = obj.tongTien
    document.getElementById('thangGhi').value = obj.thangGhi
    document.getElementById('ngayThanhToan').value = obj.ngayThanhToan
    var inputTrangThaiDaThu = document.getElementById('trangThaiDaThu')
    if(obj.trangThai==='Đã thu')
      inputTrangThaiDaThu.checked=true
    var inputTrangThaiChuaThu = document.getElementById('trangThaiChuaThu')
    if(obj.trangThai==='Chưa thu')
      inputTrangThaiChuaThu.checked=true

    const {thangGhi, maPhong, tenPhong, giaDien, soKyDien, 
      soKyNuoc, giaNuoc, tongTien, trangThai, ngayThanhToan} = obj
    setDLChucNang(()=>({thangGhi, maPhong, _id: idx, tenPhong, 
      giaDien, soKyDien, soKyNuoc, giaNuoc, tongTien, trangThai
      , ngayThanhToan
    }))
  },[])

  // Lấy toàn bộ dữ liệu phòng
  useEffect(() => {
    fetch('http://localhost:3001/api/tiendiennuoc')
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
            name="tenPhong" id="tenPhong"
            type="text"
            onBlur={(e) => setDLChucNang(pre => ({...pre, tenPhong: e.target.value}))} 
            >
            </input>
        </div>

        <div className="w3-row w3-mobile">
            <label htmlFor="thangGhi" className="w3-col l4 m3 s4">Tháng ghi</label>
            <input 
            className="w3-col l7 m3 s7 w3-margin-right" 
            name="thangGhi" id="thangGhi"
            type="month"
            onBlur={(e) => setDLChucNang(pre => ({...pre, thangGhi: e.target.value}))} 
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
            <label htmlFor="ngayThanhToan" className="w3-col l4 m3 s4">Ngày thanh toán</label>
            <input 
            className="w3-col l7 m3 s7 w3-margin-right" 
            name="ngayThanhToan" id="ngayThanhToan"
            type="date"
            onBlur={(e) => setDLChucNang(pre => ({...pre, ngayThanhToan: e.target.value}))} 
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
            <label htmlFor="giaDien" className="w3-col l4 m3 s4">Giá điện </label>
            <input 
            className="w3-col l7 m3 s7 w3-margin-right" 
            name="giaDien" id="giaDien"
            type="number"
            placeholder="giá điện / 1 kg"
            onBlur={(e) => setDLChucNang(pre => ({...pre, giaDien: parseInt(e.target.value)}))} 
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

        <div className="w3-row w3-mobile">
            <label htmlFor="giaNuoc" className="w3-col l4 m3 s4">Giá nước </label>
            <input 
            className="w3-col l7 m3 s7 w3-margin-right" 
            name="giaNuoc" id="giaNuoc"
            type="number" 
            placeholder="giá nước / 1kg"
            onBlur={(e) => setDLChucNang(pre => ({...pre, giaNuoc: parseInt( e.target.value)}))} 
            >
            </input>
        </div>

        <div className="w3-row w3-mobile">
            <label htmlFor="tongTien" className="w3-col l4 m3 s4">Tổng tiền </label>
            <input 
            className="w3-col l7 m3 s7 w3-margin-right" 
            name="tongTien" id="tongTien"
            type="number"
            onBlur={(e) => setDLChucNang(pre => ({...pre, tongTien: parseInt( e.target.value)}))} 
            >
            </input>
        </div>
      </div>
      
      {/* Chức năng */}
      <div className="w3-mobile">

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
        className="w3-button  w3-card w3-margin"
        onClick={()=>chucNang('timKiem')}
        >Tìm</button>

        <button 
        className="w3-button  w3-card w3-margin"
        onClick={()=>chucNang('thongBao')}
        >In thông báo</button>

        <button 
        className="w3-button  w3-card w3-margin"
        onClick={()=>chucNang('inHoaDon')}
        >In hóa đơn</button>

        <button 
        className="w3-button  w3-card w3-margin"
        onClick={()=>chucNang('reset')}
        >Đặt lại
        </button>

      </div>

      {/* Bảng dữ liệu phòng */}
      <BangKetQuaTienDienNuoc duLieu={duLieuKetQua} chonDuLieu={chonDuLieu}/>
      
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

export default QuanLyTienDienNuoc