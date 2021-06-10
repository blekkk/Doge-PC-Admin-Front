import React from 'react';
import "./dashboard.css";
import "../main/main.css"

const Dashboard = (props) => {
  return (
    <div className={props.menuFlag ? 'main-content-sidebar' : 'main-content-full'}>
      <div className='main-content-wrapper'>
        <h2>WELCOME</h2>
      </div>
    </div>
  )
};

export default Dashboard;