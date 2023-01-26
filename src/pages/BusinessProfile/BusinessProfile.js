import React from "react";
import { useParams } from "react-router-dom";
import Headerr from "../../components/Header/Header";
import "./BusinessProfile.css";
import { useState } from "react";
import { db } from "../../config/config";
import { collection, addDoc, doc, setDoc } from "firebase/firestore"; 

export default function BusinessProfile() {
  const { id } = useParams();
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
            postedBy: id,
            bookedStatus: false,
            doneStatus: false
        });
        // await setDoc(doc(db, "Businesses", id), {
        //     FoodName: FoodName,
        //     FoodType: FoodType,
        //     FoodQtt: FoodQtt,
        //     FoodPickup: FoodPickup,
        //     FoodValidity: FoodValidity
        // });
        // db.collection('Businesses').doc(id).add({
        //     FoodName: FoodName,
        //     FoodType: FoodType,
        //     FoodQtt: FoodQtt,
        //     FoodPickup: FoodPickup,
        //     FoodValidity: FoodValidity
        // });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  };

  return (
    <div>
      <Headerr />
      <div className="cover-container shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmFrZXJ5fGVufDB8fDB8fA%3D%3D&w=1000&q=80"
          alt="cover Photo"
        />
      </div>
      <div className="main-container">
        <div className="left-container">
          <div className="profile-image">
            <img
              src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmFrZXJ5fGVufDB8fDB8fA%3D%3D&w=1000&q=80"
              alt="profile Photo"
            />
            <div className="profile-info">
              <h3>Bakey Bakery</h3>
              <p>Contribution level: HERO</p>
              <p>Donation Count: 100</p>
            </div>
          </div>
        </div>

        <div className="right-container">
          <div className="new-post">
            <h2>make a new post</h2>
            <div className="form-container">
              <form className="newPost-form p-4 d-flex flex-column align-items-center">
                <div className="fields d-flex flex-column justify-content-center px-4">
                  <div className="input-field d-flex flex-row justify-content-between mt-3">
                    <label htmlFor="food-name">Food Name:</label>
                    <input
                      type="text"
                      name="food-name"
                      id=""
                      value={FoodName}
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
                  className="btn btn-primary m-4"
                  onClick={(e) => makeNewPost(e)}
                >
                  Make new Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
