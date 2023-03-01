import React, { useContext, useState } from "react";
import Headerr from "../../components/Header/Header";
import "./SignupBusiness.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {app} from '../../config/config.js'
import { useNavigate } from "react-router-dom";
import { userContext } from '../../App'


function SignupNGO() {

    const {state, dispatch} = useContext(userContext );

    const [NGOname, setNGOname] = useState("");
    const [NGOemail, setNGOemail] = useState("");
    const [NGOpass, setNGOpass] = useState("");
  
    const navigate = useNavigate();
  
    const signUpfunc = (e) => {
      e.preventDefault();
  
      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, NGOemail, NGOpass)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("NGO registered as", user)
          //dispatch trigger the action to replace login switch from navbar with logout switch
          dispatch({type:"USER", payload:true})
          //navigate user to ngo-profile page
          navigate(`/NGOPortal/${user.uid}`)
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode, errorMessage);
          // ..
        });
    };
  

  return (
    <div className="signup-page">
    <Headerr />
    <div className="form-container">
      <p className="sign-up-text d-flex justify-content-center align-items-center">
        We are the saviours!
      </p>
      <form className="signup-form p-4 d-flex flex-column align-items-center">
        <div className="form-heading mb-4">
          <h3>SignUp As an NGO</h3>
        </div>
        <div className="fields d-flex flex-column justify-content-center px-4">
          <div className="input-field d-flex flex-row justify-content-between mt-3">
            <label htmlFor="ngo-name">NGO Name:</label>
            <input
              type="text"
              name="ngo-name"
              id=""
              value={NGOname}
              onChange={(e) => setNGOname(e.target.value)}
            />
          </div>
          <div className="input-field d-flex flex-row justify-content-between mt-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id=""
              value={NGOemail}
              onChange={(e) => setNGOemail(e.target.value)}
            />
          </div>
          <div className="input-field d-flex flex-row justify-content-between mt-3">
            <label htmlFor="NGOpass">Password: </label>
            <input
              type="password"
              name="NGOpass"
              id=""
              value={NGOpass}
              onChange={(e) => setNGOpass(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary m-4" onClick={(e) => signUpfunc(e)}>
          Sign Up
        </button>
      </form>
    </div>
  </div>
  )
}

export default SignupNGO