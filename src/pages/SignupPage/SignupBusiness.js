import React, { useContext, useState, useEffect } from "react";
import Headerr from "../../components/Header/Header";
import "./SignupBusiness.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { db, app, storage } from "../../config/config.js";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import axios from "axios";
// import { createContext } from "react";

function SignupBusiness() {
  const { state, dispatch } = useContext(userContext);

  const [Bname, setBname] = useState("");
  const [Bemail, setBemail] = useState("");
  const [Bpass, setBpass] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [profileUrl, setProfileUrl] = useState("try");
  const [B_Id, setB_Id] = useState("");
  var xt = {iurl: ""};

  useEffect(()=>{
    console.log("img url changed >> ", profileUrl);
  },[profileUrl])

  const signupAPI = () => {
    const url = "http://localhost:5000/biz";

    axios({
      method: "POST",
      url: url,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        name: Bname,
        email: Bemail,
        picurl: profileUrl,
      },
    })
      .then((res) => res)
      .then((data) => {
        console.log(data)
        // setB_Id(JSON.stringify(data.data._id))
        // console.log(B_Id);
        return JSON.stringify(data.data._id)
      })
      .catch((err) => console.log(err));
  };

  const navigate = useNavigate();

  const signUpfunc = (e) => {
    e.preventDefault();
    if (Bname && address && profilePic && Bemail && Bpass) {
      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, Bemail, Bpass)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("user registered as", user);
          //save business profile image
          const imageRef = ref(storage, `images/${profilePic.name + v4()}`);
          uploadBytes(imageRef, profilePic)
          .then(async (res) => {
            console.log("upload successful,", res);
            // getDownloadURL(ref(storage, res.metadata.fullPath))
            //   .then((iurl)=> {
            //     console.log(iurl);
            //     setProfileUrl(iurl);
            //   })
            //   .catch((err) => {
            //     console.log(err);
            //   });
            xt.iurl = await getDownloadURL(ref(storage, res.metadata.fullPath));
            console.log(xt)
            setProfileUrl(xt.iurl);
            //signupAPI()
            setB_Id(signupAPI())
            console.log(B_Id);
          })
          
          try {
            setDoc(doc(db, "Businesses", user.uid), {
              userID: B_Id,
              name: Bname,
              address: address,
              contact: 0,
              email: Bemail,
              profilePicUrl: profileUrl,
              contributionCount: 0,
              about: "",
              blogs: []
            });
            alert("added successfully");
          } catch (e) {
            console.error("Error adding document: ", e);
          }

          //dispatch trigger the action to replace login switch from navbar with logout switch
          dispatch({ type: "USER", payload: true });
          //navigate user to business-profile page
          navigate(`/BusinessProfile/${user.uid}`);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode, errorMessage);
          // ..
        });
    } else {
      alert("fill all inputs");
    }
  };

  return (
    <div className="signup-page">
      <Headerr />
      <div className="form-container">
        <p className="sign-up-text d-flex justify-content-center align-items-center">
          DONT LET YOUR LEFT OVER FOOD GOTO WASTE
        </p>
        <form className="signup-form p-4 d-flex flex-column align-items-center">
          <div className="form-heading mb-4">
            <h3>SignUp As a Business</h3>
          </div>
          <div className="fields d-flex flex-column justify-content-center px-4">
            <div className="input-field d-flex flex-row justify-content-between mt-3">
              <label htmlFor="name">Business Name:</label>
              <input
                type="text"
                name="name"
                id=""
                value={Bname}
                onChange={(e) => setBname(e.target.value)}
              />
            </div>
            <div className="input-field d-flex flex-row justify-content-between mt-3">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                name="address"
                id=""
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="input-field d-flex flex-row justify-content-between mt-3">
              <label htmlFor="logo">Add Profile Logo:</label>
              <input
                type="file"
                accept="image/*"
                name="logo"
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
            </div>
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
              <label htmlFor="pass">Password: </label>
              <input
                type="password"
                name="pass"
                id=""
                value={Bpass}
                onChange={(e) => setBpass(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary m-4"
            onClick={(e) => signUpfunc(e)}
          >
            Sign Up
          </button>
        </form>

        {/* <button
          onClick={() => {
            signupAPI();
          }}
        >
          go
        </button> */}
      </div>
    </div>
  );
}

export default SignupBusiness;
