import './header.css';
import { IoMenu } from "react-icons/io5";
import {
  Link,
} from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Header = (props) => {

  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/admin', {
      headers: {
        'auth-token': localStorage.getItem('auth-token')
      }
    }).then((res) =>
      setUser(res.data)
    ).catch(e => console.log(e.message));
  }, []);

  return (
    <header>
      <div className="header-wrapper">
        <nav>
          <div>
            <span id="menu-button" onClick={() => { props.setMenuFlag() }}><IoMenu /></span>
          </div>
          <img src={process.env.PUBLIC_URL + 'dogePC.png'} alt="logo" className="logo" />
          <Link to='/'>
            <h2>Doge-PC</h2>
          </Link>
        </nav>
        <nav>
          <h2>Admin Console</h2>
        </nav>
        <nav>
          <h2>Hello, {user.name} </h2>
        </nav>
      </div>
    </header>
  )
}

export default Header;