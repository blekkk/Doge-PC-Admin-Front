import axios from "axios";
import "./tableRow.css"

const loopObj = (objs) => {
  let result = [];
  for (let obj in objs) {
    if (obj !== 'id')
      result.push(<td>{objs[obj]}</td>);
  }
  return result;
}

const deleteRow = (id) => {
  axios.delete(`http://localhost:8080/product/${id}`)
    .catch((e) => console.log(e.message));
  window.location.reload();
}

const TableRow = (props) => {
  return (
    <tr>
      {loopObj(props)}
      <td className="row-action">
        <input type="button" value="Edit" />
        <input type="button" value="Delete" onClick={() => {deleteRow(props.id)}} />
      </td>
    </tr>
  )
}

export default TableRow