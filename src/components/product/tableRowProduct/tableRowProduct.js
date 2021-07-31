import { useState, useEffect } from 'react';
import axios from "axios";
import "./tableRowProduct.css"
import InputFormProduct from '../../inputFormProduct/inputFormProduct';

const addProductPost = async (product, id) => {
  return await axios.put(`http://localhost:8080/product/${id}`, product);
}

const loopObj = (objs) => {
  let result = [];
  for (let obj in objs) {
    if (obj !== 'id' && obj !== 'setTableChange' && obj !== 'tableChange')
      result.push(<td>{objs[obj]}</td>);
  }
  return result;
} 

const deleteRow = (id) => {
  axios.delete(`http://localhost:8080/product/${id}`)
    .catch((e) => console.log(e.message));
}

const TableRowProduct = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [result, setResult] = useState([]);
  const { setTableChange, tableChange, id } = props;

  useEffect(() => {
    axios.get(`http://localhost:8080/product/${id}`)
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
    <tr>
      {loopObj(props)}
      <td className="row-action">
        <input type="button" value="Edit" onClick={openModal}/>
        <input type="button" value="Delete" onClick={() => {deleteRow(props.id); setTimeout(() => {setTableChange(tableChange + 1)}, 1000)}} />
      </td>
      <InputFormProduct 
          modalOpen={modalOpen}
          modalClose={closeModal}
          submitFunction={addProductPost}
          setTableChange={setTableChange}
          tableChange={tableChange}
          title='Update a product'
          data={result}
          id={id}
        />
    </tr>
  )
}

export default TableRowProduct