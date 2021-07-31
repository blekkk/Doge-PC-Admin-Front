import { useEffect, useState } from 'react';
import "./user.css";
import "../main/main.css";
import axios from 'axios';
import TableRowUser from './tableRowUser/tableRowUser';

const User = (props) => {
  const { token } = props;
  const [result, setResult] = useState([]);
  const [tableChange, setTableChange] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8080/users')
      .then((res) => setResult(res.data))
      .catch((e) => console.log(e.message))
  }, [tableChange]);

  return (
    <div className={props.menuFlag ? 'main-content-sidebar' : 'main-content-full'}>
      <div className='main-content-wrapper'>
        <h2>USER PAGE</h2>
        <div className="fixedHeaderTable">
          <table className="styled-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Province</th>
                <th>City</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {result.map((obj) => {
                return (
                  <TableRowUser
                    key={obj._id}
                    id={obj._id}
                    first_name={obj.first_name}
                    last_name={obj.last_name}
                    email={obj.email}
                    phone_number={obj.phone_number}
                    province={obj.address?.province}
                    city={obj.address?.city}
                    tableChange={tableChange}
                    setTableChange={setTableChange}
                    token={token}
                  />
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
};

export default User;
