import React from "react";
import { useState } from "react";
import { db } from "../../config/config";
import { collection, addDoc} from "firebase/firestore"; 
import './NewPostModal.css'

export default function NewPostModal(props) {

    const [FoodName, setFoodName] = useState("");
    const [FoodType, setFoodType] = useState("");
    const [FoodQtt, setFoodQtt] = useState(0);
    const [FoodPickup, setFoodPickup] = useState("");
    const [FoodValidity, setFoodValidity] = useState("")
  
    const makeNewPost =  async (e) => {
      e.preventDefault();
      try {
          const docRef = await addDoc(collection(db, "Businesses"), {
              FoodName: FoodName,
              FoodType: FoodType,
              FoodQtt: FoodQtt,
              FoodPickup: FoodPickup,
              FoodValidity: FoodValidity,
              postedBy: props.id,
              bookedStatus: false,
              doneStatus: false
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
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
                <button className="closeBtn btn btn-secondary" onClick={props.onClose}>x</button>
            </div>
          <form className="newPost-form">
            <div className="fields d-flex flex-column justify-content-evenly align-content-center">
              <div className="input-field d-flex flex-row justify-content-between ">
                <label htmlFor="food-name">Food Name:</label>
                <input
                  type="text"
                  name="food-name"
                  id=""
                  value={FoodName}
                  placeholder="enter a food name"
                  onChange={(e) => setFoodName(e.target.value)}
                />
              </div>
              <div className="input-field d-flex flex-row justify-content-between mt-3">
                <label htmlFor="food-type">Food Type:</label>
                <input
                  type="text"
                  name="food-type"
                  id=""
                  value={FoodType}
                  placeholder="enter a food type"
                  onChange={(e) => setFoodType(e.target.value)}
                />
              </div>
              <div className="input-field d-flex flex-row justify-content-between mt-3">
                <label htmlFor="food-qtt">Food Quantity </label>
                <input
                  type="number"
                  name="food-qtt"
                  id=""
                  value={FoodQtt}
                  onChange={(e) => setFoodQtt(e.target.value)}
                />
              </div>
              <div className="input-field d-flex flex-row justify-content-between mt-3">
                <label htmlFor="pickup-point">pickup Location</label>
                <input
                  type="text"
                  name="pickup-point"
                  id=""
                  value={FoodPickup}
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
                  value={FoodValidity}
                  onChange={(e) => setFoodValidity(e.target.value)}
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
