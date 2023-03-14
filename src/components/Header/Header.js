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
        console.log("Sign-out successful");
      })
      .catch((error) => {
        // An error happened.
        console.log("sign-out error >> ", error);
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
            src="https://firebasestorage.googleapis.com/v0/b/hungerhalt-84255.appspot.com/o/images%2FhungerHaltIcon.pngf778bbc1-ac0c-4447-a239-eae4e29081d0?alt=media&token=99c1a242-a739-468a-89c8-ab606db17faa"
            alt="hungerhalt logo"
            className="logo-img"
          />
          <p className="logo">HungerHalt</p>
        </div>
        <div>
          <input type="checkbox" id="check" />
          <label for="check" class="checkbtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </label>
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
