import React from 'react';
import "./sidebar.css";
import {
  NavLink,
} from "react-router-dom";
import { IoAirplane, IoBagHandle, IoCard, IoLogOut, IoLogOutOutline, IoPersonCircle } from 'react-icons/io5';

const handleLogout = () => {
  localStorage.removeItem('auth-token');
  window.location.reload();
}

const Sidebar = (props) => {
  return (
    <div className={props.menuFlag ? 'sidebar-open' : 'sidebar-closed'}>
      <NavLink to='/product' className='sidebar-item' activeClassName='sidebar-item focus'>
        <h2><IoBagHandle /></h2>
        <h2>Product</h2>
      </NavLink>
      <NavLink to='/user' className='sidebar-item' activeClassName='sidebar-item focus'>
        <h2><IoPersonCircle /></h2>
        <h2>User</h2>
      </NavLink>
      <NavLink to='/transaction' className='sidebar-item' activeClassName='sidebar-item focus'>
        <h2><IoCard /></h2>
        <h2>Transaction</h2>
      </NavLink>
      <NavLink to='/shipmentuct' className='sidebar-item' activeClassName='sidebar-item focus'>
        <h2><IoAirplane /></h2>
        <h2>Shipment</h2>
      </NavLink>
      <div className='sidebar-item logout'>
        <h2><IoLogOutOutline /></h2>
        <h2 onClick={handleLogout}>Logout</h2>
      </div>
    </div>
  )
};

export default Sidebar;
