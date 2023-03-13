import React, { useState, useEffect } from "react";
import Countdown from "../CountDown/Countdown";
import { useParams } from "react-router-dom";
import "./Card.css";
import { getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../config/config";
import axios from "axios";

const updatePost = async (postId, request) => {
  try {
    const res = await axios.put(`http://localhost:5000/post/${postId}`, {
      request,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

function FeedCard(props) {
  //const { profileIcon, userName, info } = props;
  const { id } = useParams();
  //const postyID = props.info.postedBy;
  const postyID = props.info.PostedBy;
  //const cardID = props.cardID;
  const cardID = props.info._id;
  const showReqBtn = props.showReqBtn;
  const showBtns = props.ShowBtns;
  //const [infoData, setInfoData] = useState(null);
  const [postyName, setPostyName] = useState("Anonymous");
  const [postyLogo, setPostyLogo] = useState("");

  //fetch listing data on initial load
  useEffect(() => {
    getPostyInfo();
  }, []);

  const getPostyInfo = async () => {
    const docRef = doc(db, "Businesses", postyID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("posty info:", docSnap.data());
      //setInfoData(docSnap.data());
      setPostyName(docSnap.data().name);
      setPostyLogo(docSnap.data().profilePicUrl);
    } else {
      console.log("No such document for posty!");
    }
  };

  const requestBiz = async (e, cid) => {
    e.preventDefault();
    //insert ngoid to post requests array
    // const cardRef = doc(db, "Posts", cid);
    // await updateDoc(cardRef, {
    //   requests: arrayUnion(id),
    // });
    try {
      const updatedPost = await updatePost(cid, id);
      console.log("request added >> ", updatedPost);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <img
          src={
            postyLogo
              ? postyLogo
              : "https://snsassociates.com.np/wp-content/uploads/2018/10/2.png"
          }
          alt="Profile Icon"
          className="profile-icon"
        />
        <span className="user-name text-capitalize">{postyName}</span>
      </div>
      <div className="card-body">
        <div className="d-flex flex-row justify-content-start align-items-baseline">
          <h3 className="card-item-header">
            {`${props.info.FoodQtt} ${
              props.info.qttUnit ? props.info.qttUnit : "items"
            } of ${props.info.FoodName}`}
          </h3>
          <p className="card-item-detail mx-4">{props.info.FoodType}</p>
        </div>
        <div className="p-1 my-2 card-item-detail d-flex flex-column justify-content-center align-items-start">
          <div className="mx-2 card-item-validity d-flex flex-row justify-content-start flex-wrap align-items-baseline">
            <p className="lead mx-2">Pickup Location: </p>
            <p className="lead mx-2">{props.info.FoodPickup}</p>
          </div>
          {showBtns && (
            <div className="mx-2 card-item-validity d-flex flex-row justify-content-start flex-wrap align-items-baseline">
              <p className="lead mx-2">Remaining Time: </p>
              <Countdown
                seconds={Math.floor(
                  new Date(props.info.FoodValidity).getTime() / 1000
                )}
              />
            </div>
          )}
        </div>
        {showBtns && showReqBtn && (
          <button
            className="btn btn-primary my-3 mx-2"
            onClick={(e) => {
              requestBiz(e, cardID);
            }}
          >
            Request
          </button>
        )}
        {showBtns && !showReqBtn && (
          <div className="d-flex flex-row justify-content-around align-items-center">
            <button className="btn btn-secondary my-3 mx-2">
              Remove Request
            </button>
            <button className="btn btn-primary my-3 mx-2">
              Mark As Complete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeedCard;
