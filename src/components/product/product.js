import { useEffect, useState } from 'react';
import "./product.css";
import "../main/main.css";
import "../inputFormProduct/inputFormProduct.css"
import axios from 'axios';
import TableRow from '../tableRow/tableRow';
import InputFormProduct from '../inputFormProduct/inputFormProduct';

const addProductPost = async (product) => {
  return await axios.post('http://localhost:8080/products', product);
}

const Product = (props) => {
  const [result, setResult] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [tableChange, setTableChange] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8080/products')
      .then((res) => setResult(res.data))
      .catch((e) => console.log(e.message));
  }, [tableChange]);

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

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
                <th>Discount Price</th>
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
                    main_category={obj.category?.main_category}
                    secondary_category={obj.category?.secondary_category}
                    solds={obj.sold_number}
                    weight={obj.weight}
                    stock={obj.stock}
                    price={obj.price}
                    discount_price={obj.discount_price}
                    tableChange={tableChange}
                    setTableChange={setTableChange}
                  />
                )
              })}
            </tbody>
          </table>
        </div>
        <input type="button" value="Add Product" className="main-button" onClick={openModal} />
        <InputFormProduct 
          modalOpen={modalOpen}
          modalClose={closeModal}
          submitFunction={addProductPost}
          setTableChange={setTableChange}
          tableChange={tableChange}
          title='Add a product'
        />
      </div>
    </div>
  )
};

export default Product;
