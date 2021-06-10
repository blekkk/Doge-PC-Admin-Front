import './header.css';
import { IoMenu } from "react-icons/io5";
import {
  Link,
} from "react-router-dom";

const sampleName = "Sultan Salman";

const Header = (props) => {
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
          <h2>Hello, {sampleName}</h2>
        </nav>
      </div>
    </header>
  )
}

export default Header;