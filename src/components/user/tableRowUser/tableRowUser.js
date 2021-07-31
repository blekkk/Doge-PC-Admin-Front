import { useState, useEffect } from 'react';
import axios from "axios";
import "./tableRowUser.css"

const loopObj = (objs) => {
  let result = [];
  for (let obj in objs) {
    if (obj !== 'id' && obj !== 'setTableChange' && obj !== 'tableChange' && obj !== 'token')
      result.push(<td>{objs[obj]}</td>);
  }
  return result;
} 

const TableRowUser = (props) => {
  const [result, setResult] = useState([]);
  const { setTableChange, tableChange, id, token } = props;

  const deleteUser = async () => {
    await axios.delete(`http://localhost:8080/user/${id}`, {
      headers: {
        'auth-token': token
      }
    }).catch(e => console.log(e.message));
    alert('An email has been sent to corresponding user');
  }

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
      <td className="row-action">
        <input type="button" value="Delete" onClick={() => {deleteUser(); setTimeout(() => {setTableChange(tableChange + 1)}, 1000)}} />
      </td>
    </tr>
  )
}

export default TableRowUser