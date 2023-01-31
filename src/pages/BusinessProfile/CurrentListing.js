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

  useEffect(() => {
    getListingData();
  }, []);

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
      dataobt.push(doc.data());
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
    setDisable(false);
    //secondly, update the info to DB
  };

  function SaveInfoChanges(e) {
    e.preventDefault();
    //first enable edit option
    setDisable(true);
  }

  const renderListingCard = (cld) => {
    //get array of objects
    console.log("cld ==> ", cld);
    if (cld.length) {
      //render each document as a card
      return (
        <>
          {cld.map((x) => (
            <div className="currentlisting-card">
              <form className="clc-form">
                <div className="clc-fields d-flex flex-column justify-content-start align-content-center">
                  <div className="clc-input-field mx-2 d-flex flex-row justify-content-start ">
                    <label htmlFor="food-name">Food Name:</label>
                    <input
                      type="text"
                      name="food-name"
                      id="name-input"
                      value={x.FoodName}
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
                        value={x.FoodType}
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
                        value={x.FoodQtt}
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
                        value={x.FoodPickup}
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
                        value={x.FoodV}
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
                      editCardInfo(e, 1);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className={
                      !disable ? "btn btn-outline-primary mt-4" : "no-display"
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