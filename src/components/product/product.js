import { useEffect, useState } from 'react';
import "./product.css";
import "../main/main.css";
import "../inputFormProduct/inputFormProduct.css"
import axios from 'axios';
import TableRowProduct from './tableRowProduct/tableRowProduct';
import InputFormProduct from '../inputFormProduct/inputFormProduct';


const Product = (props) => {
  const { token } = props;
  const [result, setResult] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [tableChange, setTableChange] = useState(0);
  const [category, setCategory] = useState('Processor');
  
  useEffect(() => {
    axios.get(`http://localhost:8080/products/${category}`)
    .then((res) => setResult(res.data))
    .catch((e) => console.log(e.message));
  }, [tableChange, category]);
  
  const addProductPost = async (product) => {
    return await axios.post('http://localhost:8080/products', product, {
      headers: {
        'auth-token': token
      }
    });
  }

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  }

  return (
    <div className={props.menuFlag ? 'main-content-sidebar' : 'main-content-full'}>
      <div className='main-content-wrapper'>
        <h2>PRODUCT PAGE</h2>
        <label htmlFor="category">Category</label>
        <select name="category" onChange={(e) => handleCategoryChange(e)}>
          <option value="Processor">Processor</option>
          <option value="GPU">GPU</option>
          <option value="Motherboard">Motherboard</option>
          <option value="Storage">Storage</option>
          <option value="RAM">RAM</option>
          <option value="PSU">PSU</option>
        </select>
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
                  <TableRowProduct
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
                    token={token}
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
