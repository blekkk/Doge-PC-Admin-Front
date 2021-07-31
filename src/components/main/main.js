import "./main.css";
import Sidebar from '../sidebar/sidebar';
import Product from '../product/product';
import Dashboard from '../dashboard/dashboard';
import User from "../user/user";
import {
  Switch,
  Route,
} from "react-router-dom";

const Main = (props) => {
  const { token } =  props
  return (
    <main>
      <Sidebar menuFlag={props.menuFlag} />
      <Switch>
        <Route path='/product'>
          <Product menuFlag={props.menuFlag} />
        </Route>
        <Route path='/user'>
          <User token={token} menuFlag={props.menuFlag} />
        </Route>
        <Route path='/'>
          <Dashboard menuFlag={props.menuFlag} />
        </Route>
      </Switch>
    </main>
  )
};

export default Main;
