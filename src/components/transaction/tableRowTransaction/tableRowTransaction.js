import { useState, useEffect } from 'react';
import axios from "axios";
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from 'react-icons/io5'

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const loopObj = (objs) => {
  let result = [];
  for (let obj in objs) {
    if (obj !== 'id' && obj !== 'setTableChange' && obj !== 'tableChange' && obj !== 'token') {
      if (obj === 'product_name' || obj === 'price') {
        const tempArr = []
        for (let i = 0; i < objs[obj].length; i++) {
          if (obj === 'price') {
            tempArr.push(<p>{formatter.format(objs[obj][i])}</p>)
          } else {
            tempArr.push(<p>{objs[obj][i]}</p>)
          }
        }
        result.push(<td>{tempArr}</td>);
      } else if (obj === 'isDone' || obj === 'isArrive') {
        if (objs[obj])
          result.push(<td className="table-item-icon" ><IoCheckmarkCircleOutline /></td>);
        else
          result.push(<td className="table-item-icon"><IoCloseCircleOutline /></td>);
      }
      else {
        result.push(<td>{objs[obj]}</td>);
      }
    }
  }
  return result;
}

const TableRowTransaction = (props) => {
  const [result, setResult] = useState([]);
  const { setTableChange, tableChange, id, token } = props;

  // useEffect(() => {
  //   axios.get(`http://localhost:8080/user/${id}`, {
  //     headers: {
  //       'auth-token': token
  //     }
  //   }).then((res) =>
  //     setResult(res.data)
  //   ).catch(e => console.log(e.message));
  // }, [tableChange]);

  return (
    <tr>
      {loopObj(props)}
    </tr>
  )
}

export default TableRowTransaction