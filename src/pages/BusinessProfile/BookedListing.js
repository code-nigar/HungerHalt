import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewPostModal from "./NewPostModal";
import "./currentListing.css";
import axios from "axios";

export default function BookedListing() {

  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [disable, setDisable] = useState(true);
  const [CL_data, setCL_Data] = useState([]);

  async function fetchData() {
    try {
      const response = await axios.get(`http://localhost:5000/post?postedBy=${id}&bookedStatus=${true}`);
      setCL_Data(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  //fetch listing data on initial load from server
  useEffect(() => {
    fetchData();
  }, [openModal]);

  const editCardInfo = (e, post_id) => {
    e.preventDefault();
    //first enable edit option
    //setDisable(false);
    console.log(e.target.parentNode.parentNode);
    e.target.parentNode.parentNode.firstChild.firstChild.lastChild.removeAttribute(
      "disabled"
    ); //food name
    e.target.parentNode.parentNode.firstChild.childNodes[1].firstChild.lastChild.removeAttribute(
      "disabled"
    ); //food type
    e.target.parentNode.parentNode.firstChild.childNodes[1].lastChild.lastChild.removeAttribute(
      "disabled"
    ); //food qtt
    e.target.parentNode.parentNode.firstChild.childNodes[2].firstChild.lastChild.removeAttribute(
      "disabled"
    ); //food pckup
    e.target.parentNode.parentNode.firstChild.childNodes[2].lastChild.lastChild.removeAttribute(
      "disabled"
    ); //food validi
    e.target.parentNode.parentNode.lastChild.lastChild.classList.remove(
      "no-display"
    );
    //secondly, update the info to DB
  };

  function SaveInfoChanges(e, post_id) {
    e.preventDefault();
    //first enable edit option

    e.target.parentNode.parentNode.firstChild.firstChild.lastChild.setAttribute(
      "disabled",
      true
    ); //food name
    e.target.parentNode.parentNode.firstChild.childNodes[1].firstChild.lastChild.setAttribute(
      "disabled",
      true
    ); //food type
    e.target.parentNode.parentNode.firstChild.childNodes[1].lastChild.lastChild.setAttribute(
      "disabled",
      true
    ); //food qtt
    e.target.parentNode.parentNode.firstChild.childNodes[2].firstChild.lastChild.setAttribute(
      "disabled",
      true
    ); //food pckup
    e.target.parentNode.parentNode.firstChild.childNodes[2].lastChild.lastChild.setAttribute(
      "disabled",
      true
    ); //food validi
    e.target.classList.add("no-display");
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
            <div className="currentlisting-card mb-2" key={x.id}>
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
                      value={x.FoodName}
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
                        value={x.FoodType}
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
                        value={x.FoodQtt}
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
                        value={x.FoodPickup}
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
                        value={new Date(x.FoodValidity)
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
                  <p>
                    Booked For:
                    <span className="request-count">
                      {x.BookedFor}
                    </span>
                  </p>
                  <button className="btn btn-secondary">withdraw</button>
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
      {renderListingCard(CL_data)}
    </>
  )
}
