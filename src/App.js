import './App.css';
import { useState } from 'react';
import Header from './components/header/header';
import Main from './components/main/main';
import {
  BrowserRouter as Router,
} from "react-router-dom";

const App = () => {
  const [menuFlag, setMenuFlag] = useState(false);

  const handleSetMenuFlag = () => { setMenuFlag(!menuFlag) };

  return (
    <div className="App">
      <Router>
        <Header setMenuFlag={handleSetMenuFlag} />
        <Main menuFlag={menuFlag} />
      </Router>
    </div>
  );
}

export default App;
