import { useEffect, useState } from 'react';
import "../main/main.css";
import axios from 'axios';
import TableRowTransaction from './tableRowTransaction/tableRowTransaction';

const Transaction = (props) => {
  const { token } = props;
  const [result, setResult] = useState([]);
  const [tableChange, setTableChange] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8080/checkout/all/admin', {
      headers: {
        'auth-token': token
      }
    })
      .then((res) => setResult(res.data))
      .catch((e) => console.log(e.message))
  }, [tableChange]);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return (
    <div className={props.menuFlag ? 'main-content-sidebar' : 'main-content-full'}>
      <div className='main-content-wrapper'>
        <h2>Transaction Page</h2>
        <div className="fixedHeaderTable">
          <table className="styled-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>City</th>
                <th>Payment Method</th>
                <th>Buy Date</th>
                <th>Product Names</th>
                <th>Product Prices</th>
                <th>Shipment Cost</th>
                <th>Total Price</th>
                <th>isArrive</th>
                <th>isDone</th>
              </tr>
            </thead>
            <tbody>
              {result.map((obj) => {
                return (
                  <TableRowTransaction
                    key={obj._id}
                    id={obj._id}
                    first_name={obj.first_name}
                    email={obj.email}
                    phone_number={obj.phone_number}
                    city={obj.address?.city}
                    payment_method={obj.payment_method}
                    buy_date={obj.buy_date}
                    product_name={obj.product_name}
                    price={ obj.price}
                    shipment_cost={ formatter.format(obj.shipment_cost) }
                    total_price={ formatter.format(obj.total_price) }
                    isArrive={obj.isArrive ? 'Yes' : 'No'}
                    isDone={obj.isDone ? 'Yes' : 'No'}
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

export default Transaction;
