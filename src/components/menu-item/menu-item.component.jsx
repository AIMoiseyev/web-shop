import React from "react";
import './menu-item.styles.scss'
import {withRouter} from "../../HOC/withRouter";

const MenuItem = ({ title, imageUrl, size, router, linkUrl }) => {
  const {location, navigate} = router
  return (
    <div className={`${size} menu-item`} onClick={() => navigate(`${location.pathname}${linkUrl}`)}>
      <div style={{
        backgroundImage: `url(${imageUrl})`
      }} className='background-image'/>
      <div className='content'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <span className='subtitle'>Shop now</span>
      </div>
    </div>
  )

}


export default withRouter(MenuItem)
