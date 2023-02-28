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
    const [FoodValidity, setFoodValidity] = useState(null);
  

    const cleanInputFields = () => {
      setFoodName("");
      setFoodType("");
      setFoodQtt(0);
      setFoodPickup("");
      setFoodValidity(null);
    }

    const makeNewPost =  async (e) => {
      e.preventDefault();
      if(FoodName && FoodType && FoodQtt && FoodPickup && FoodValidity){
        try {
          const docRef = await addDoc(collection(db, "Businesses"), {
              FoodName: FoodName,
              FoodType: FoodType,
              FoodQtt: FoodQtt,
              FoodPickup: FoodPickup,
              FoodValidity: FoodValidity,
              postedBy: props.id,
              bookedStatus: false,
              doneStatus: false,
              creationDate: new Date()
          });
          console.log("Document written with ID: ", docRef.id);
          cleanInputFields();
          props.onClose();
          alert("added successfully");
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
      else{
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
                  placeholder="enter a food name"
                  onChange={(e) => setFoodName(e.target.value)}
                />
              </div>
              <div className="input-field d-flex flex-row justify-content-between mt-3">
                {/* <label htmlFor="food-type">Food Type:</label>
                <input
                  type="text"
                  name="food-type"
                  id=""
                  placeholder="enter a food type"
                  onChange={(e) => setFoodType(e.target.value)}
                /> */}
                <label htmlFor="food-type">Food Type:</label>
                <select id="food-type" class="input-box mb-4" required="" onChange={(e) => setFoodType(e.target.value)}>
                  <option disabled="" selected="" value={FoodType}>Select Food Type</option>
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
                  onChange={(e) => setFoodQtt(+(e.target.value))}
                />
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
