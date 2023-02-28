import React, { useContext } from "react";
import "../Header/Header.css";
import { NavLink, Outlet } from "react-router-dom";
import { userContext } from "../../App";
import { getAuth, signOut } from "firebase/auth";
// import { Breadcrumb, Layout, Menu, theme } from 'antd';
// import 'antd/dist/reset.css';
// const { Header, Content, Footer } = Layout;

function Headerr() {
  const { state, dispatch } = useContext(userContext);

  const signOutfunc = (e) => {
    state = !state;
    e.preventDefault();
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful")
      })
      .catch((error) => {
        // An error happened.
        console.log("sign-out error >> ",error);
      });
  };
  

  const RenderListItems = () => {
    if (state) {
      return (
        <>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/donate">Donate</NavLink>
          </li>
          <li>
            <NavLink to="/blogs">Blogs</NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              onClick={(e) => {
                signOutfunc(e);
              }}
            >
              Sign-out
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/donate">Donate</NavLink>
          </li>
          <li>
            <NavLink to="/blogs">Blogs</NavLink>
          </li>
          <li>
            <NavLink to="/sign-in">Sign-in</NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <div>
      <header className="header d-flex flex-row justify-content-between p-2 align-items-center bg-dark shadow">
        <div className="d-flex flex-row justify-content-center align-items-center">
          <img
            src="hungerHaltIcon.png"
            alt="hungerhalt logo"
            className="logo-img"
          />
          <p className="logo fw-800 fs-3">HungerHalt</p>
        </div>
        <div>
          <ul>
            {/* <li><a href="#">Home</a></li>
          <li><a href="#">Blogs</a></li>
          <li><a href="#">Donate</a></li>
          <li><a href="#">Sign-in</a></li> */}
            <RenderListItems />
          </ul>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
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
