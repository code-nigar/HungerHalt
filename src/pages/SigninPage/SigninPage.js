import React, { useContext, useState } from "react";
import Headerr from "../../components/Header/Header";
import "./SignIn.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {app} from '../../config/config.js'
import { useNavigate } from "react-router-dom";
import { userContext } from '../../App'

function SigninPage() {
  const {state, dispatch} = useContext(userContext );

  const [Bemail, setBemail] = useState("");
  const [Bpass, setBpass] = useState("");

  const navigate = useNavigate();

  const signInfunc = (e) => {
    e.preventDefault();

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, Bemail, Bpass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user signed in as", user)
        //dispatch trigger the action to replace login switch from navbar with logout switch
        dispatch({type:"USER", payload:true})
        //navigate user to business-profile page
        navigate(`/BusinessProfile/${user.uid}`)
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
    <div className="signin-page">
      <Headerr />
      <div className="form-container">
        <p className="sign-in-text d-flex justify-content-center align-items-center">
          LET'S DO THIS !!
        </p>
        <form className="signin-form p-4 d-flex flex-column align-items-center">
          <div className="form-heading mb-4">
            <h3>Sign In As a Business</h3>
          </div>
          <div className="fields d-flex flex-column justify-content-center px-4">
            <div className="input-field d-flex flex-row justify-content-between mt-3">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id=""
                value={Bemail}
                onChange={(e) => setBemail(e.target.value)}
              />
            </div>
            <div className="input-field d-flex flex-row justify-content-between mt-3">
              <label htmlFor="Bpass">Password: </label>
              <input
                type="password"
                name="Bpass"
                id=""
                value={Bpass}
                onChange={(e) => setBpass(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary m-4" onClick={(e) => signInfunc(e)}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SigninPage