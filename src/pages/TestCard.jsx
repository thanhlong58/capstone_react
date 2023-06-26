import React from 'react'
import { Carousel } from 'antd';
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const TestCard = () => {
  return (
    <div>
    <video controls>
  <source src="../assets/videos/sneaker.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>


    </div>
  )
}

export default TestCard