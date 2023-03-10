import React from "react";
import { useState } from "react";
import { db } from "../../config/config";
import { collection, addDoc } from "firebase/firestore";
import "./NewPostModal.css";
import axios from "axios";

export default function NewPostModal(props) {
  const [FoodName, setFoodName] = useState("");
  const [FoodType, setFoodType] = useState("");
  const [FoodQtt, setFoodQtt] = useState(0);
  const [FoodPickup, setFoodPickup] = useState("");
  const [FoodValidity, setFoodValidity] = useState(null);
  const [QttUnit, setQttUnit] = useState("items");

  
  const cleanInputFields = () => {
    setFoodName("");
    setFoodType("");
    setFoodQtt(0);
    setFoodPickup("");
    setFoodValidity(null);
    setQttUnit("items");
  };

  const newPostAPI = () => {
    const url = "http://localhost:5000/post";

    axios({
      method: "POST",
      url: url,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        FoodName,
        FoodType,
        FoodQtt,
        FoodPickup,
        FoodValidity,
        QttUnit,
        PostedBy: props.id
      },
    })
      .then((res) => res)
      .then((data) => {
        console.log(data);
        cleanInputFields();
        props.onClose();
        alert("post added successfully");
      })
      .catch((err) => console.log(err));
  };

  const makeNewPost = async (e) => {
    e.preventDefault();
    if (
      FoodName &&
      FoodType &&
      FoodQtt &&
      FoodPickup &&
      FoodValidity &&
      QttUnit
    ) {
      try {
        // const docRef = await addDoc(collection(db, "Posts"), {
        //   FoodName: FoodName,
        //   FoodType: FoodType,
        //   FoodQtt: FoodQtt,
        //   FoodPickup: FoodPickup,
        //   FoodValidity: FoodValidity,
        //   QttUnit: QttUnit,
        //   postedBy: props.id,
        //   bookedStatus: false,
        //   bookedFor: "",
        //   doneStatus: false,
        //   creationDate: new Date(),
        //   requests: [],
        // });
        // console.log("Document written with ID: ", docRef.id);
        // cleanInputFields();
        // props.onClose();
        // alert("added successfully");
        newPostAPI();
      } catch (e) {
        console.error("Error adding document: ", e);
        alert("error adding document >> ", e);
      }
    } else {
      alert("fill all inputs");
    }
  };

  if (!props.open) {
    return null;
  } else {
    return (
      <>
        <div className="overlay-styles"></div>
        <div className="modal-styles">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <h2>Add a new post to listing</h2>
            <button
              className="closeBtn btn btn-secondary"
              onClick={props.onClose}
            >
              x
            </button>
          </div>
          <form className="newPost-form">
            <div className="fields d-flex flex-column justify-content-evenly align-content-center">
              <div className="input-field d-flex flex-row justify-content-between ">
                <label htmlFor="food-name">Food Name:</label>
                <input
                  type="text"
                  name="food-name"
                  id=""
                  placeholder="enter a food name"
                  onChange={(e) => setFoodName(e.target.value)}
                />
              </div>
              <div className="input-field d-flex flex-row justify-content-between mt-3">
                <label htmlFor="food-type">Food Type:</label>
                <select
                  id="food-type"
                  class="input-box mb-4"
                  required
                  value={FoodType}
                  onChange={(e) => setFoodType(e.target.value)}
                >
                  <option disabled value="">
                    Select Food Type
                  </option>
                  <option value="Bakery Item">Bakery Item</option>
                  <option value="Prepared Food">Prepared Food</option>
                  <option value="Containered Food">Containered Food </option>
                  <option value="Dairy Product">Dairy Product</option>
                </select>
              </div>
              <div className="input-field d-flex flex-row justify-content-between mt-3">
                <label htmlFor="food-qtt">Food Quantity </label>
                <input
                  type="number"
                  name="food-qtt"
                  id=""
                  placeholder="10"
                  min={10}
                  max={100000}
                  onChange={(e) => setFoodQtt(+e.target.value)}
                />
              </div>
              <div className="input-field d-flex flex-row justify-content-between mt-3">
                <label htmlFor="food-qtt-unit">Quantity Measure:</label>
                <select
                  id="food-qtt-unit"
                  class="input-box mb-4"
                  required
                  value={QttUnit}
                  onChange={(e) => setQttUnit(e.target.value)}
                >
                  <option value="items">items</option>
                  <option value="boxes">boxes</option>
                  <option value="kg">kg</option>
                  <option value="ton">ton</option>
                  <option value="tins">tins</option>
                </select>
              </div>
              <div className="input-field d-flex flex-row justify-content-between mt-3">
                <label htmlFor="pickup-point">pickup Location</label>
                <input
                  type="text"
                  name="pickup-point"
                  id=""
                  placeholder="Karachi"
                  onChange={(e) => setFoodPickup(e.target.value)}
                />
              </div>
              <div className="input-field d-flex flex-row justify-content-between mt-3">
                <label htmlFor="pickup-point">Food Validity</label>
                <input
                  type="date"
                  name="postVld"
                  id=""
                  onChange={(e) => setFoodValidity(new Date(e.target.value))}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-4"
              onClick={(e) => makeNewPost(e)}
            >
              Post
            </button>
          </form>
        </div>
      </>
    );
  }
}
