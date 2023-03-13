import React, { useContext, useState } from "react";
import Headerr from "../../components/Header/Header";
import "./SignIn.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../config/config.js";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

function SigninPage() {
  const { state, dispatch } = useContext(userContext);

  const [NGOSignin, setNGOSignin] = useState(false);

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
        console.log("user signed in as", user);
        //dispatch trigger the action to replace login switch from navbar with logout switch
        dispatch({ type: "USER", payload: true });
        //navigate user to business-profile page
        if (!NGOSignin) {
          navigate(`/BusinessProfile/${user.uid}`);
        } else {
          navigate(`/NGOPortal/${user.uid}`);
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        Swal.fire({
          title: "Error!",
          text: "Can not sign in",
          icon: "error",
          confirmButtonText: "ok",
        });
        // ..
      });
  };

  const toggleForm = (e) => {
    e.preventDefault();
    setNGOSignin(!NGOSignin);
  };

  return (
    <div className="signin-page">
      <Headerr />
      <div className="form-container">
        <p className="sign-in-text d-flex justify-content-center align-items-center">
          Let's halt the hunger !!
        </p>
        <form className="signin-form p-4 d-flex flex-column align-items-center justify-content-center">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="form-heading mb-4"
          >
            {NGOSignin ? (
              <h3 className="mb-4 fs-1 fw-bolder logo-gradient">
                Sign In As an NGO
              </h3>
            ) : (
              <h3 className="mb-4 fs-1 fw-bolder logo-gradient">
                Sign In As a Business
              </h3>
            )}
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fields d-flex flex-column justify-content-center px-4"
          >
            <div className="input-field-signin mt-3">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id=""
                value={Bemail}
                onChange={(e) => setBemail(e.target.value)}
              />
            </div>
            <div className="input-field-signin mt-3">
              <label htmlFor="Bpass">Password: </label>
              <input
                type="password"
                name="Bpass"
                id=""
                value={Bpass}
                onChange={(e) => setBpass(e.target.value)}
              />
            </div>
          </motion.div>
          <button
            type="submit"
            className="btn btn-primary m-4"
            onClick={(e) => signInfunc(e)}
          >
            Sign In
          </button>

          <button
            onClick={(e) => toggleForm(e)}
            className="btn btn-outline-primary mt-4"
          >
            Sign in As {NGOSignin ? `a Business` : ` an NGO`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SigninPage;
