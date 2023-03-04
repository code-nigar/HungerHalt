import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Headerr from "../../components/Header/Header";
import "./BusinessProfile.css";
import CurrentListing from "./CurrentListing";
import BookedListing from "./BookedListing"
import ContributionHistory from "./ContributionHistory"
import {getDoc, doc } from "firebase/firestore";
import { db } from "../../config/config";

export default function BusinessProfile() {
  const { id } = useParams();
  const [infoData, setInfoData] = useState(null);

  //fetch listing data on initial load
  useEffect(() => {
    getBusinessInfo();
  }, []);

  const getBusinessInfo = async () => {
    const docRef = doc(db, "Businesses", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Business info data:", docSnap.data());
      setInfoData(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const [toggleTab, setToggleTab] = useState(1);
  // const [openModal, setOpenModal] = useState(false);
  // const onClose = () => {
  //   setOpenModal(!openModal);
  // };

  const showListingContent = (tabNo) => {
    if(tabNo === 2){
      return (
        <BookedListing/>
      )
    }
    else if (tabNo === 3) {
      return(
        <ContributionHistory/>
      )
    } else {
      return (
        <CurrentListing/>
      )
    }
  }
  return (
    <div className="business-page">
      <Headerr />
      <div className="cover-container">
        <img
          src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmFrZXJ5fGVufDB8fDB8fA%3D%3D&w=1000&q=80"
          alt="cover"
        />
      </div>
      <div className="main-container">
        <div className="left-container">
          <div className="profile">
            <img
              src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmFrZXJ5fGVufDB8fDB8fA%3D%3D&w=1000&q=80"
              alt="profile"
            />
            <div className="profile-info mt-4">
              <h3 className="text-capitalize">{infoData.name}</h3>
              <p>Contribution level: HERO</p>
              <p>Donation Count: {infoData.contributionCount}</p>
            </div>
          </div>
        </div>

        <div className="right-container">
          <div className="tabs">
            <ul className="tabs-item">
              <li onClick={()=>{setToggleTab(1)}} className={(toggleTab === 1)? "active-tab" : "inactive-tab"}>Current Listing</li>
              <li onClick={()=>{setToggleTab(2)}} className={(toggleTab === 2)? "active-tab" : "inactive-tab"}>Booked Listing</li>
              <li onClick={()=>{setToggleTab(3)}} className={(toggleTab === 3)? "active-tab" : "inactive-tab"}>Your Contribution</li>
            </ul>
          </div>
          <div className="selected-window-container">
            {/* <div className="new-post">
              <button onClick={onClose}>make a new post</button>
              <NewPostModal open={openModal} id={id} onClose={onClose} />
            </div> */}
            {showListingContent(toggleTab)}
          </div>
        </div>
      </div>
    </div>
  );
}
