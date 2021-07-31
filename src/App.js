import './App.css';
import { useState } from 'react';
import Header from './components/header/header';
import Main from './components/main/main';
import Login from './components/login/login';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import useToken from './hooks/useToken';

const App = () => {
  const [menuFlag, setMenuFlag] = useState(false);
  const {token, setToken} = useToken();

  const handleSetMenuFlag = () => { setMenuFlag(!menuFlag) };

  if (!token) {
    return (
      <Login setToken={setToken} />
    )
  }

  return (
    <div className="App">
      <Router>
        <Header setMenuFlag={handleSetMenuFlag} />
        <Main token={token} menuFlag={menuFlag} />
      </Router>
    </div>
  );
}

export default App;
