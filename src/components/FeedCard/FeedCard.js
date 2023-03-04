import React, {useState, useEffect} from "react";
import Countdown from "../CountDown/Countdown";
import "./Card.css";
import {getDoc, doc } from "firebase/firestore";
import { db } from "../../config/config";

function FeedCard(props) {
  //const { profileIcon, userName, info } = props;

  const [infoData, setInfoData] = useState(null);
  const [postyName, setPostyName] = useState("Anonymous");
  const [postyLogo, setPostyLogo] = useState("");


  //fetch listing data on initial load
  useEffect(() => {
    getPostyInfo();
  }, []);

  const getPostyInfo = async () => {
    const docRef = doc(db, "Businesses", props.info.postedBy);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("posty info:", docSnap.data());
      setInfoData(docSnap.data());
      setPostyName(docSnap.data().name);
      setPostyLogo(docSnap.data().profilePicUrl);
    } else {
      console.log("No such document for posty!");
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
        <span className="user-name">{postyName}</span>
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
          <div className="mx-2 card-item-validity d-flex flex-row justify-content-start flex-wrap align-items-baseline">
            <p className="lead mx-2">Remaining Time: </p>
            <Countdown seconds={props.info.FoodValidity.seconds} />
          </div>
        </div>
        <button className="btn btn-primary my-3 mx-2">Request</button>
      </div>
    </div>
  );
}

export default FeedCard;
