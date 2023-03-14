import React, { useContext, useState } from "react";
import Headerr from "../../components/Header/Header";
import "./SignupBusiness.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { db, app, storage } from "../../config/config.js";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import axios from "axios";

function SignupNGO() {
  const { state, dispatch } = useContext(userContext);

  const [NGOname, setNGOname] = useState("");
  const [NGOemail, setNGOemail] = useState("");
  const [NGOpass, setNGOpass] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [profileUrl, setProfileUrl] = useState(
    "https://thumbs.dreamstime.com/b/ngo-letter-technology-logo-design-white-background-creative-initials-concept-253007787.jpg"
  );
   var xt = { iurl: "" };

   const signupAPI = (aID , iURL) => {
    const url = "http://localhost:5000/ngo";

    axios({
      method: "POST",
      url: url,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        name: NGOname,
        email: NGOemail+"@ngo.com",
        Address: address,
        picurl: iURL,
        AuthID: aID,
      },
    })
      .then((res) => res)
      .then((data) => {
        console.log(data);
        return JSON.stringify(data.data._id);
      })
      .catch((err) => console.log(err));
  };

  const showUserNameGuide = (e) =>{
    e.preventDefault();
    Swal.fire({
        icon:'info',
        title:'set valid User name!',
        text:'use Alphabets(A-Z || a-z) and Numbers(0-9) only',
        timer: 4000,
        width: 300,
        padding: '1em',
        color: '#fde82c',
        background: '#222',
        backdrop: `rgba(0,60,60,0.4)`
      });
  }
  const navigate = useNavigate();

  const signUpfunc = (e) => {
    e.preventDefault();

    if (NGOname && address && profilePic && NGOemail && NGOpass) {
      let realMail = NGOemail+`@ngo.com`
      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, realMail, NGOpass)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("NGO registered as", user);

          // if (NGOname && address && profilePic) {
          const imageRef = ref(storage, `images/${profilePic.name + v4()}`);
          uploadBytes(imageRef, profilePic).then((res) => {
            console.log("upload successful,", res);
            getDownloadURL(ref(storage, res.metadata.fullPath))
              .then((url) => {
                console.log("file url >> ", url);
                //setProfileUrl(url.toString());
                signupAPI(user.uid , url)
              })
              .catch((err) => {
                console.log(err);
              });
          });

          // try {
          //   setDoc(doc(db, "NGOs", user.uid), {
          //     name: NGOname,
          //     address: address,
          //     contact: 0,
          //     email: NGOemail,
          //     profilePicUrl: profileUrl,
          //     contributionCount: 0,
          //     about: "",
          //     blogs: [],
          //   });
          //   alert("added successfully");
          // } catch (e) {
          //   console.error("Error adding document: ", e);
          // }
          //dispatch trigger the action to replace login switch from navbar with logout switch
          dispatch({ type: "USER", payload: true });
          //navigate user to ngo-profile page
          navigate(`/NGOPortal/${user.uid}`);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Swal.fire({
            icon:'error',
            text:`${errorMessage}`,
            timer: 2000,
            width: 300,
            padding: '1em',
            color: '#fde82c',
            background: '#333',
            backdrop: `rgba(23,0,0,0.4)`
          });
        });
    } else {
      Swal.fire({
        icon:'error',
        title:'Fill all inputs!',
        timer: 2000,
        width: 300,
        padding: '1em',
        color: '#fde82c',
        background: '#333',
        backdrop: `rgba(23,0,0,0.4)`
      });
    }
  };

  return (
    <div className="signup-page">
      <Headerr />
      <div className="form-container">
        <motion.p
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="sign-up-text d-flex justify-content-center align-items-center"
        >
          We are the saviours!
        </motion.p>
        <form className="signup-form p-4 d-flex flex-column align-items-center">
          <div className="form-heading mb-4">
            <motion.h3
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="logo-gradient fs-1 fw-bolder"
            >
              SignUp As an NGO
            </motion.h3>
          </div>
          <div className="fields d-flex flex-column justify-content-center px-4">
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="input-field-signup mt-3"
            >
              <label htmlFor="ngo-name">NGO Name:</label>
              <input
                type="text"
                name="ngo-name"
                id=""
                value={NGOname}
                onChange={(e) => setNGOname(e.target.value)}
              />
            </motion.div>
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="input-field-signup mt-3"
            >
              <label htmlFor="business-address">Address:</label>
              <input
                type="text"
                name="business-address"
                id=""
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </motion.div>
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="input-field-signup mt-3"
            >
              <label htmlFor="business-logo">Add Profile Logo:</label>
              <input
                type="file"
                accept="image/*"
                name="business-logo"
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="input-field-signup mt-3"
            >
              <label htmlFor="email">Set User Name:</label>
              <div className="input-field-signup">
                <input
                type="text"
                name="email"
                pattern="[A-Za-z0-9]"
                placeholder="myNGO123"
                id="username-input"
                value={NGOemail}
                onChange={(e) => setNGOemail(e.target.value)}
              />
              <button className="info-btn" onClick={showUserNameGuide}>i</button>
              </div>
              </motion.div>
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.9 }}
              className="input-field-signup mt-3"
            >
              <label htmlFor="NGOpass">Set Password: </label>
              <input
                type="password"
                name="NGOpass"
                id=""
                value={NGOpass}
                onChange={(e) => setNGOpass(e.target.value)}
              />
            </motion.div>
          </div>
          <button
            type="submit"
            className="btn btn-primary m-4"
            onClick={(e) => signUpfunc(e)}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupNGO;
