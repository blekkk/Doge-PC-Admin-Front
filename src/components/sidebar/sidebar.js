import React from 'react';
import "./sidebar.css";
import {
  NavLink,
} from "react-router-dom";

const Sidebar = (props) => {
  console.log(window.location.pathname);
  return (
    <div className={props.menuFlag ? 'sidebar-open' : 'sidebar-closed'}>
      <NavLink to='/product' className='sidebar-item' activeClassName='sidebar-item focus'>
        <h2>Product</h2>
      </NavLink>
      <NavLink to='/user' className='sidebar-item' activeClassName='sidebar-item focus'>
        <h2>User</h2>
      </NavLink>
      <NavLink to='/transaction' className='sidebar-item' activeClassName='sidebar-item focus'>
        <h2>Transaction</h2>
      </NavLink>
      <NavLink to='/shipmentuct' className='sidebar-item' activeClassName='sidebar-item focus'>
        <h2>Shipment</h2>
      </NavLink>
    </div>
  )
};

export default Sidebar;
