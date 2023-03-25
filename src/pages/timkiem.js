import { useState, memo } from 'react'
import '../css/timkiem.css'

const TimKiem = ({hamTim}) => {
    const [tTPhong, setTTPhong] = useState('Đang sử dụng')
    const [maDay, setMaDay] = useState('Tất cả')
    const [maLoaiPhong, setMaLoaiPhong] = useState('Tất cả')
    const [phongNamOrNu, setPhongNamOrNu] = useState('Tất cả')

    const handleSubmit = (event) => {
        event.preventDefault()
        //xử lý để tìm kiếm theo các filter

        const x = {
          trangThaiSuDung:tTPhong,
          maDay: maDay, 
          maLoaiPhong: maLoaiPhong, 
          phongNamNu: phongNamOrNu
        }

        hamTim(x)
    }

    return(
      <form 
      onSubmit={handleSubmit}
      className="w3-row w3-content w3-margin-top w3-padding-top-48">
          {/* Trạng thái sử dụng */}
          <span className="w3-half">
              <label className="w3-margin-right" 
              htmlFor="cars">Trạng thái sử dụng: </label>
              <select style={{width: '150px'}}
              className="w3-card  w3-right w3-margin-right" id="cars" name="cars" size="1"
              onChange={(e)=>setTTPhong(e.target.value)}
              >
                <option value="Đang sử dụng">Đang sử dụng</option>
                <option value="Không còn sử dụng">Không còn sử dụng</option>
              </select>
          </span>
          {/* Mã dãy */}
          <span className="w3-half">
              <label className="w3-margin-right" htmlFor="cars">Mã dãy: </label>
              <select style={{width: '150px'}}
              className="w3-card w3-right w3-margin-right" id="cars" name="cars" size="1"
              onChange={(e)=>setMaDay(e.target.value)}
              >
                <option value="Tất cả">Tất cả</option>
                <option value="AA01">AA01</option>
                <option value="AA02">AA02</option>
                <option value="AB01">AB01</option>
                <option value="AB02">AB02</option>
                <option value="AB08">AB08</option>
                <option value="AB09">AB09</option>
                <option value="AB11">AB11</option>
                <option value="AB12">AB12</option>
                <option value="AB13">AB13</option>
                <option value="AB14">AB14</option>
                <option value="AB15">AB15</option>
                <option value="AB19">AB19</option>
                <option value="AB20">AB20</option>
                <option value="AB21">AB21</option>
                <option value="AB22">AB22</option>
                <option value="AB23">AB23</option>
                <option value="AC01">AC01</option>
                <option value="AC02">AC02</option>
                <option value="AC03">AC03</option>
                <option value="AC04">AC04</option>
                <option value="AC05">AC05</option>
                <option value="AC06">AC06</option>
                <option value="AC07">AC07</option>
                <option value="AC08">AC08</option>
                <option value="AC09">AC09</option>
                <option value="AC10">AC10</option>
                <option value="AC11">AC11</option>
                <option value="AC12">AC12</option>
                <option value="AC15">AC15</option>
                <option value="AD01">AD01</option>
                <option value="AD02">AD02</option>
                <option value="BB01">BB01</option>
                <option value="BB02">BB02</option>
                <option value="BB03">BB03</option>
                <option value="BB04">BB04</option>
                <option value="BB05">BB05</option>
                <option value="BB06">BB06</option>
                <option value="BB07">BB07</option>
              </select>
          </span>
          {/* Mã loại phòng */}
          <span className="w3-half">
              <label className="w3-margin-right" htmlFor="cars">Mã loại phòng: </label>
              <select style={{width: '150px'}}
              className="w3-card w3-right w3-margin-right" id="cars" name="cars" size="1"
              onChange={(e)=>setMaLoaiPhong(e.target.value)}
              >
                <option value="Tất cả">Tất cả</option>
                <option value="AA0">AA0 - Phòng không được phép nấu ăn, được sử dụng ấm đun siêu tốc, giường tầng (8 người ở)</option>
                <option value="BB5">BB5 - Phòng không được phép nấu ăn, được sử dụng ấm đun siêu tốc, giường tầng (5 người ở)</option>
                <option value="BB4">BB4 - Phòng không được phép nấu ăn, được sử dụng ấm đun siêu tốc, ít người, giường tầng (4 người ở)</option>
                <option value="P3">P3 - Phòng 3 người</option>
                <option value="P5">P5 - Phòng 5 người</option>
                <option value="BB6">BB6 - Phòng không được phép nấu ăn, được sử dụng ấm đun siêu tốc, giường tầng (6 người ở)</option>
                <option value="AT4">AT4 - Phòng được phép nấu ăn, giường tầng (4 người ở)</option>
                <option value="AA3">AA3 - Phòng được phép nấu ăn, giường bộ (3 người ở)</option>
                <option value="AA5">AA5 - Phòng được phép nấu ăn, giường bộ (5 người ở)</option>
                <option value="AA6">AA6 - Phòng được phép nấu ăn, giường bộ (6 người ở)</option>
                <option value="AT6">AT6 - Phòng được phép nấu ăn, giường tầng (6 người ở)</option>
                <option value="AT8">AT8 - Phòng được phép nấu ăn, giường tầng (8 người ở)</option>
                <option value="A4T">A4T - Được phép nấu ăn, giường tầng ở 4 người</option>
                <option value="BCH">BCH - Phòng dành cho học viên cao học, nghiên cứu sinh, không được phép nấu ăn (6 người ở)</option>
                <option value="BB0">BB0 - Phòng không được phép nấu ăn, được sử dụng ấm đun siêu tốc, giường tầng (8 người ở)</option>
                <option value="BB3">BB3 - Phòng không được phép nấu ăn, được sử dụng ấm đun siêu tốc, ít người, giường tầng (4 người ở)</option>
              </select>
          </span>
          {/* Phòng nam/nữ */}
          <span className="w3-half">
            <label className="w3-margin-right" 
            htmlFor="cars">Phòng cho Nam/Nữ: </label>
            <select style={{width: '150px'}}
            className="w3-card w3-right w3-margin-right" id="cars" name="cars" size="1"
            onChange={(e)=>setPhongNamOrNu(e.target.value)}
            >
            <option value="Tất cả">Tất cả</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            </select>
          </span>
          <button className="w3-margin w3-right w3-padding w3-hover-grey w3-border-0 w3-card"><i className="fa-solid fa-magnifying-glass"></i> Tìm</button>
      </form>
    )
}

export default memo(TimKiem)


