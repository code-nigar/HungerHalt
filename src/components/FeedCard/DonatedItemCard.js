import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Card.css";
import axios from "axios";
import { motion } from "framer-motion";

function DonatedItemCard(props) {
  const { id } = useParams();
  const postyID = props.info.PostedBy;
  const cardID = props.info._id;
  const showReqBtn = props.showReqBtn;
  const showBtns = props.ShowBtns;
  const [postyName, setPostyName] = useState("Anonymous");
  const [postyLogo, setPostyLogo] = useState("");

  //fetch listing data on initial load joj
  useEffect(() => {
    getPostyInfo();
  }, []);

  const getPostyInfo = async () => {
    const response = await axios.get(
      `http://localhost:5000/biz?AuthID=${postyID}`
    );
    setPostyName(response.data[0].Name);
    setPostyLogo(response.data[0].ProfilePicURL);
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="card"
    >
      <div className="card-header">
        {props.info.CompletionDate}
      </div>
      <div className="card-body">
        <div className="d-flex flex-row justify-content-start align-items-end">
          <div className="p-1 my-1 d-flex flex-column justify-content-start align-items-start">
            <div className="cardinfofield-label">Served </div>
            <h3 className="card-item-header">
              {" "}
              {`${props.info.FoodQtt} ${
                props.info.qttUnit ? props.info.qttUnit : "items"
              } of ${props.info.FoodName}`}
            </h3>
          </div>
          <p className="card-item-detail mx-4">{props.info.FoodType}</p>
        </div>
        <div className="p-1 my-1 d-flex flex-column justify-content-start align-items-start">
          <p className="cardinfofield-label">With Collaboration of: </p>
          <div>
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
        </div>
      </div>
    </motion.div>
  );
}

export default DonatedItemCard;
