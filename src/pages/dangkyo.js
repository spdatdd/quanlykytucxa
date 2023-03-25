import { useState, useRef } from "react"

const DangKyO = ({dangKyNguyenVong, dulieuSV}) => {
  const [nguyenVong, setNguyenVong] = useState({
    khuDangKy: "KhuA",
    noiDung: "",
    maSinhVien: dulieuSV.maSinhVien,
    hoTen: dulieuSV.ho + ' ' + dulieuSV.tenLot + ' '
          + dulieuSV.ten,
    email: dulieuSV.email
  })

  const modal = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    modal.current.style.display = 'block'
  }

  const hideModal = () => {
    modal.current.style.display = 'none'
  }

  const thucHienDangKy = () => {
    dangKyNguyenVong(nguyenVong)
    hideModal()
  } 

  return (
    <div className="w3-container w3-center">
      <h3>Chọn khu thực hiện đăng ký</h3>
      <form onSubmit={handleSubmit}>
          <div className="w3-margin-bottom">
            <label className="w3-margin-right" htmlFor="DangKyKTX">Khu KTX: </label>
            <select onChange={(e) => setNguyenVong(pre => ({...pre, khuDangKy: e.target.value}))} className="w3-card" id="DangKyKTX" name="DangKyKTX" size="1">
                <option value="khuA">KhuA</option>
                <option value="KhuB">KhuB</option>
            </select>
          </div>
          <div>
            <label className="w3-clear" htmlFor="nguyenVong">Nguyện vọng: </label>
            <textarea onBlur={(e) => setNguyenVong(pre => ({...pre, noiDung : e.target.value}))} id="nguyenVong" name="nguyenVong" rows="5" cols="30"></textarea>
          </div>
          <button 
          className="w3-padding w3-hover-grey w3-border-0 w3-card-2">
            <i className="fa-solid fa-arrow-right-to-bracket"></i>
            <span className="w3-margin-left">Thực hiện</span>
          </button>
      </form>

      {/* Hộp thoại */}
      <div ref={modal} className="w3-modal">
        <div className="w3-modal-content">
          <div className="w3-container w3-padding">
            <span className="w3-right w3-text-red w3-bold"
             onClick={hideModal}>&times;
            </span>
            <p>Bạn có chăc muốn đăng ký ở ?</p>
            <span onClick={hideModal} 
            className="w3-right w3-padding w3-card">
              Không
            </span>
            <span 
            className="w3-right w3-padding w3-card w3-margin-right"
            onClick={thucHienDangKy}
            >
              Có
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DangKyO