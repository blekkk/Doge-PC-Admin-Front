import React from 'react';
import "./product.css";
import "../main/main.css"

const Product = (props) => {
  return (
    <div className = { props.menuFlag ? 'main-content-sidebar' : 'main-content-full' }>
      <div className='main-content-wrapper'>
        <h2>INI PRODUCT PAGE</h2>
      </div>
    </div>
  )
};

export default Product;
