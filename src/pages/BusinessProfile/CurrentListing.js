import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewPostModal from "./NewPostModal";
import "./currentListing.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/config";

export default function CurrentListing() {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [disable, setDisable] = useState(true);
  const [CL_data, setCL_Data] = useState([]);

  //fetch listing data on initial load
  useEffect(() => {
    getListingData();
  }, []);

  //switch new post modal display
  const onClose = () => {
    setOpenModal(!openModal);
  };

  const q = query(collection(db, "Businesses"), where("postedBy", "==", id));

  // var CL_data =[];

  const getListingData = async () => {
    //  const q = query(collection(db, "Businesses"), where("postedBy", "==", {id}));
    let dataobt = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      //setCL_Data(CL_data.push(doc.data()));
      //dataobt.push(doc.data());
      dataobt.push(
        {
          id: doc.id,
          data: doc.data()
        }
      );
    });
    setCL_Data(dataobt);
  };

  const clc_info = {
    clc_id: "",
    clc_name: "",
    clc_qtt: 0,
    clc_type: "",
    clc_location: "",
    clc_validity: null,
  };

  const editCardInfo = (e, post_id) => {
    e.preventDefault();
    //first enable edit option
    //setDisable(false);
    console.log(e.target.parentNode.parentNode);
    e.target.parentNode.parentNode.firstChild.firstChild.lastChild.removeAttribute('disabled'); //food name
    e.target.parentNode.parentNode.firstChild.childNodes[1].firstChild.lastChild.removeAttribute('disabled'); //food type
    e.target.parentNode.parentNode.firstChild.childNodes[1].lastChild.lastChild.removeAttribute('disabled'); //food qtt
    e.target.parentNode.parentNode.firstChild.childNodes[2].firstChild.lastChild.removeAttribute('disabled'); //food pckup
    e.target.parentNode.parentNode.firstChild.childNodes[2].lastChild.lastChild.removeAttribute('disabled'); //food validi
    e.target.parentNode.parentNode.lastChild.lastChild.classList.remove('no-display')
    //secondly, update the info to DB
  };

  function SaveInfoChanges(e, post_id) {
    e.preventDefault();
    //first enable edit option
    
    e.target.parentNode.parentNode.firstChild.firstChild.lastChild.setAttribute('disabled',true); //food name
    e.target.parentNode.parentNode.firstChild.childNodes[1].firstChild.lastChild.setAttribute('disabled',true); //food type
    e.target.parentNode.parentNode.firstChild.childNodes[1].lastChild.lastChild.setAttribute('disabled',true); //food qtt
    e.target.parentNode.parentNode.firstChild.childNodes[2].firstChild.lastChild.setAttribute('disabled',true); //food pckup
    e.target.parentNode.parentNode.firstChild.childNodes[2].lastChild.lastChild.setAttribute('disabled',true); //food validi
    e.target.classList.add('no-display')
    //setDisable(true);
  }

  const renderListingCard = (cld) => {
    //get array of objects
    console.log("cld ==> ", cld);
    if (cld.length) {
      //render each document as a card
      return (
        <>
          {cld.map((x) => (
            <div className="currentlisting-card" key={x.id}>
              <form className="clc-form">
                <div className="clc-fields d-flex flex-column justify-content-start align-content-center">
                  <div className="clc-input-field mx-2 d-flex flex-row justify-content-start ">
                    <label htmlFor="food-name">Food Name:</label>
                    <input
                      type="text"
                      name="food-name"
                      id="name-input"
                      value={x.data.FoodName}
                      disabled={disable}
                      placeholder="enter a food name"
                    />
                  </div>
                  <div className="d-flex flex-row flex-wrap justify-content-start">
                    <div className="clc-input-field mx-2 d-flex flex-row justify-content-start mt-3">
                      <label htmlFor="food-type">Food Type:</label>
                      <input
                        type="text"
                        name="food-type"
                        id="type-input"
                        value={x.data.FoodType}
                        disabled={disable}
                        placeholder="enter a food type"
                      />
                    </div>
                    <div className="clc-input-field mx-2 d-flex flex-row justify-content-start mt-3">
                      <label htmlFor="food-qtt">Food Quantity:</label>
                      <input
                        type="number"
                        name="food-qtt"
                        id="qtt-input"
                        value={x.data.FoodQtt}
                        disabled={disable}
                        placeholder="2"
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-row flex-wrap justify-content-start">
                    <div className="clc-input-field mx-2 d-flex flex-row justify-content-start mt-3">
                      <label htmlFor="pickup-point">Food Pickup Location</label>
                      <input
                        type="text"
                        name="pickup-point"
                        id="location-input"
                        value={x.data.FoodPickup}
                        disabled={disable}
                        placeholder="Karachi"
                      />
                    </div>
                    <div className="clc-input-field mx-2 d-flex flex-row justify-content-start mt-3">
                      <label htmlFor="pickup-point">Food Validity</label>
                      <input
                        type="date"
                        name="postVld"
                        id="validity-input"
                        value={x.data.FoodValidity.Date}
                        disabled={disable}
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-around align-items-baseline mt-2">
                  <p>Created at: 12/4/44</p>
                  <p>
                    Requests Recieved: <span className="request-count">XX</span>
                  </p>
                  <button
                    className={
                      disable ? "btn btn-outline-primary mt-4" : "no-display"
                    }
                    onClick={(e) => {
                      editCardInfo(e, x.id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className={
                      // !disable ? "btn btn-outline-primary mt-4" : "no-display"
                      "btn btn-outline-primary mt-4 no-display"
                    }
                    onClick={SaveInfoChanges}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          ))}
        </>
      );
    } else {
      return (
        <>
          <p>loading..</p>
        </>
      );
    }
  };

  return (
    <>
      <div className="new-post">
        <button onClick={onClose} className="btn btn-outline-primary">
          make a new post
        </button>
        <NewPostModal open={openModal} id={id} onClose={onClose} />
      </div>
      {renderListingCard(CL_data)}
    </>
  );
}