import { useEffect, useState } from 'react';
import "./product.css";
import "../main/main.css"
import axios from 'axios';
import TableRow from '../tableRow/tableRow';



const Product = (props) => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/products')
      .then((res) => setResult(res.data))
      .catch((e) => console.log(e.message));
  }, []);

  return (
    <div className={props.menuFlag ? 'main-content-sidebar' : 'main-content-full'}>
      <div className='main-content-wrapper'>
        <h2>PRODUCT PAGE</h2>
        <div className="fixedHeaderTable">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Img Url</th>
                <th>Brand</th>
                <th>Main Category</th>
                <th>Sec Category</th>
                <th>Solds</th>
                <th>Weight</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {result.map((obj) => {
                return (
                  <TableRow
                    key={obj._id}
                    id={obj._id}
                    product_name={obj.product_name}
                    product_picture={obj.product_picture}
                    brand={obj.brand}
                    main_category={obj.category.main_category}
                    secondary_category={obj.category.secondary_category}
                    solds={obj.sold_number}
                    weight={obj.weight}
                    stock={obj.stock}
                    price={obj.price}
                  />
                )
              })}
            </tbody>
          </table>
        </div>
        <input type="button" value="Add Product" className="main-button"/>
      </div>
    </div>
  )
};

export default Product;
