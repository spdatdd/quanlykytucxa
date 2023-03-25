import { memo, useState } from "react";

const Login = ({setTaiKhoan}) => {
  const [duLieuNhap, setduLieuNhap] = useState(()=> {
    if(sessionStorage.getItem('email') && sessionStorage.getItem('matKhau')){
      const matKhau = sessionStorage.getItem('matKhau')
      const email = sessionStorage.getItem('email')
      return {email: email, matKhau: matKhau}
    }
    return {email: '', matKhau: ''}
  })

  const handleSubmit = event => {
    event.preventDefault();
    const email = duLieuNhap.email
    const matKhau = duLieuNhap.matKhau
    sessionStorage.setItem('email', email)
    sessionStorage.setItem('matKhau', matKhau)
    setTaiKhoan({email: email, matKhau: matKhau})
  };
  
  
  return (
    <form 
    className="w3-content w3-margin-top w3-padding w3-card" 
    style={{maxWidth:"500px",overflow:"auto"}}
    onSubmit={handleSubmit}
    >
      <div className="w3-row w3-margin-bottom">
        <label className="w3-third">Email:</label>
        <input 
        className="w3-twothird w3-border-0 w3-card"
        type="text"
        value={duLieuNhap.email}
        onChange={(e) => setduLieuNhap(pre => ({...pre, email: e.target.value}))}
        name="email"
        required
        ></input>
      </div>
      
      <div className="w3-row w3-margin-bottom">
        <label className="w3-third">Mật khẩu:</label>
        <input 
        className="w3-twothird w3-border-0 w3-card"
        type="password"
        value={duLieuNhap.matKhau}
        onChange={(e) => setduLieuNhap(pre => ({...pre, matKhau: e.target.value}))}
        name="password"
        required
        ></input>
      </div>
      <button 
      className="w3-right w3-blue w3-border-0 w3-card w3-button"
      >
        <i className="fa-solid fa-right-to-bracket">
        </i> Đăng nhập
      </button>
    </form>
  )
}

export default memo(Login)