import { memo } from 'react'

const Footer = () => {

  return (
    <div className="w3-card w3-margin-top w3-center w3-padding w3-blue w3-hover-grey">
      <b><i>Copyright</i></b> &copy; 2023
    </div>
  )
}

export default memo(Footer)