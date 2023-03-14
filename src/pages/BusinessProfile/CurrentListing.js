import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewPostModal from "./NewPostModal";
import "./currentListing.css";
import axios from "axios";
import {motion} from "framer-motion"

const approveNGOreq = async (id, updatedFields) => {
  const res = await axios.put(`http://localhost:5000/post/${id}`, updatedFields);
  res.data && alert("request approved");
  return res.data;
};

export default function CurrentListing() {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [disable, setDisable] = useState(true);
  const [CL_data, setCL_Data] = useState([]);
  const [showChild, setShowChild] = useState(false);

  const showRequestyy = (x) => {
    if (x.requests && x.requests.length) {
      setShowChild(!showChild);
    }
  };

  const approveBtn = (postID) => {
    approveNGOreq(postID,{
      BookedFor: id,
      BookedStatus: true,
    });
    setShowChild(!showChild);
  }

  function showRequestyyDiv(x) {
    let op = <></>;
    const requestyList = [];

    if (x.requests && x.requests.length > 0) {
      for (let i = 0; i < x.requests.length; i++) {
        requestyList.push(
          <div className="requesty-card d-flex flex-row justify-content-between align-items-baseline">
            <p key={i}>{x.requests[i]}</p>
            <button className="btn btn-secondary" onClick={()=>{approveBtn(x._id)}}>Approve</button>
          </div>
        );
      }
      console.log(x.requests);
      op = (
        <>
          <p> Requested by</p>
          <div className="d-flex flex-column justify-content-between align-items-baseline">
            {requestyList}
          </div>
        </>
      );
      // op =
      // <>
      //   {x.requests.map((y, index)=>{
      //     <div key={index}>
      //       <p>{y}</p>
      //     </div>
      //   })}
      // </>
    }
    return op;
  }

  async function fetchData() {
    try {
      const response = await axios.get(
        `http://localhost:5000/post?postedBy=${id}&bookedStatus=${false}`
      );
      setCL_Data(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  //fetch listing data on initial load from server
  useEffect(() => {
    fetchData();
  }, [openModal]);

  //switch new post modal display
  const onClose = () => {
    setOpenModal(!openModal);
  };

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
            <motion.div initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="currentlisting-card mb-2" key={x._id}>
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
                  <p className="creation-time">Created at: {x.createdAt}</p>
                  <p>
                    Requests Recieved:{" "}
                    <span
                      className="request-count"
                      onClick={() => showRequestyy(x)}
                    >
                      {x.requests ? x.requests.length : "0"}
                    </span>
                  </p>
                  <button
                    className={
                      disable ? "btn btn-outline-primary mt-4" : "no-display"
                    }
                    onClick={(e) => {
                      editCardInfo(e, x._id);
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
              {showChild && (
                <div style={{ marginTop: "10px", backgroundColor: "gray" }}>
                  {showRequestyyDiv(x)}
                </div>
              )}
            </motion.div>
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
