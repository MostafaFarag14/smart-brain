import React from 'react'
import { Image } from 'react-bootstrap'
import './OutputImage.css'

const getPostition = side => {
  return (side * 100).toString() + '%'
}
export default function OutputImage({ imageUrl, regions, ready }) {
  return (
    <div className="face_detect">
      {imageUrl && <Image className='image_box' alt='image contains faces' src={imageUrl} />}
      {regions && ready && <div className="boxes">
        {regions.map((region, index) => {
          const box_style = {
            display: 'flex',
            position: 'absolute',
            top: getPostition(region.region_info.bounding_box.top_row),
            left: getPostition(region.region_info.bounding_box.left_col),
            bottom: getPostition(1 - region.region_info.bounding_box.bottom_row),
            right: getPostition(1 - region.region_info.bounding_box.right_col),
            boxShadow: '0 0 0 2px turquoise',
          }
          return (
            <div key={index} style={box_style}></div>
          )
        })
        }
      </div>}
    </div>
  )
}

