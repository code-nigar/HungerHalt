import React from "react";
import '../Header/Header.css'
// import { Breadcrumb, Layout, Menu, theme } from 'antd';
// import 'antd/dist/reset.css';
// const { Header, Content, Footer } = Layout;


function Headerr() {
  return (
    <div className="header d-flex flex-row justify-content-between p-2 align-items-center bg-dark shadow">
      <div className="d-flex flex-row justify-content-center align-items-center">
        <img src="hungerHaltIcon.png" alt="hungerhalt logo" className="logo-img"/>
        <p className="logo fw-800 fs-3">HungerHalt</p>
      </div>
      <div>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Blogs</a></li>
          <li><a href="#">Donate</a></li>
          <li><a href="#">Sign-in</a></li>
        </ul>
      </div>
    </div>
      // <Header>
      //   <div>
      //     <Menu
      //     theme="dark"
      //     mode="horizontal"
      //     defaultSelectedKeys={['2']}
      //     items={new Array(15).fill(null).map((_, index) => {
      //       const key = index + 1;
      //       return {
      //         key,
      //         label: `nav ${key}`,
      //       };
      //     })}
      //   />
      //   </div>
        
      // </Header>
  );
}

export default Headerr;
