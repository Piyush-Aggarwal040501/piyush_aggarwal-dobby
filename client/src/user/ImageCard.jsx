import React from 'react'

const ImageCard = ({image,name}) => {
  return (
    <div className='imageCard'>
        <img src={image} alt="No Image" />
        <div className="text">{name}</div>
    </div>
  )
}

export default ImageCard