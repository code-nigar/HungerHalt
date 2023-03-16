import React, { useState } from "react";
import { motion } from "framer-motion";
import RequestyListingModal from "../RequestyListingModal/RequestyListingModal";

function TheCurrentListingCard(props) {
  const [disable, setDisable] = useState(true);
  const [openRequestyModal, setOpenRequestyModal] = useState(false);

  function openReqModalfunction(e) {
    e.preventDefault();
    setOpenRequestyModal(!openRequestyModal);
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="currentlisting-card mb-2"
      key={props.postData._id}
    >
      <form className="clc-form">
        <div className="clc-fields d-flex flex-column justify-content-start align-content-center">
          <div className="clc-input-field mx-2 d-flex flex-row justify-content-start ">
            <label className="bold" htmlFor="food-name">
              Food Name:
            </label>
            <input
              type="text"
              name="food-name"
              id="name-input"
              value={props.postData.FoodName}
              disabled={disable}
              placeholder="enter a food name"
            />
          </div>
          <div className="d-flex flex-row flex-wrap justify-content-start">
            <div className="clc-input-field mx-2 d-flex flex-row justify-content-start mt-3">
              <label className="bold" htmlFor="food-type">
                Food Type:
              </label>
              <input
                type="text"
                name="food-type"
                id="type-input"
                value={props.postData.FoodType}
                disabled={disable}
                placeholder="enter a food type"
              />
            </div>
            <div className="clc-input-field mx-2 d-flex flex-row justify-content-start mt-3">
              <label className="bold" htmlFor="food-qtt">
                Food Quantity:
              </label>
              <input
                type="number"
                name="food-qtt"
                id="qtt-input"
                value={props.postData.FoodQtt}
                disabled={disable}
                placeholder="2"
              />
            </div>
          </div>
          <div className="d-flex flex-row flex-wrap justify-content-start">
            <div className="clc-input-field mx-2 d-flex flex-row justify-content-start mt-3">
              <label className="bold" htmlFor="pickup-point">
                Food Pickup Location:
              </label>
              <input
                type="text"
                name="pickup-point"
                id="location-input"
                value={props.postData.FoodPickup}
                disabled={disable}
                placeholder="Karachi"
              />
            </div>
            <div className="clc-input-field mx-2 d-flex flex-row justify-content-start mt-3">
              <label className="bold" htmlFor="pickup-point">
                Food Validity:
              </label>
              <input
                type="date"
                name="postVld"
                id="validity-input"
                value={new Date(props.postData.FoodValidity)
                  .toLocaleDateString("en-GB")
                  .split("/")
                  .reverse()
                  .join("-")}
                disabled={disable}
              />
            </div>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-around align-items-baseline mt-3">
          <p className="creation-time">
            Created at: {props.postData.createdAt}
          </p>
          <p>
            Requests Recieved:{" "}
            {props.postData.requests.length >= 1 ? (
              <span
                className="request-count"
                onClick={(e) => {
                  openReqModalfunction(e);
                }}
              >
                {props.postData.requests.length}
              </span>
            ) : (
              <span className="request-count-muted">0</span>
            )}
          </p>
        </div>
      </form>

      <RequestyListingModal
        RequesteeArr={props.postData.requests}
        PostID={props.postData._id}
        openRequestyModal={openRequestyModal}
      />
    </motion.div>
  );
}

export default TheCurrentListingCard;