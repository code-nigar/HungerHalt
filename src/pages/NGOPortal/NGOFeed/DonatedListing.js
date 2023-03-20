import React, { useState, useEffect } from "react";
import FeedCard from "../../../components/FeedCard/FeedCard";
import DonatedItemCard from "../../../components/FeedCard/DonatedItemCard";
import { useParams } from "react-router-dom";
import axios from "axios";

function DonatedListing() {
  const { id } = useParams();
  const [CL_data, setCL_Data] = useState([]);

  //fetch listing data on initial load from server
  async function fetchData() {
    try {
      const response = await axios.get(
        `http://localhost:5000/post/completed?bookedFor=${id}`
      );
      setCL_Data(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1 className="light">Your Contributions to Halt Hunger</h1>
      {console.log(CL_data)}
      {CL_data.map((cardData, index) => (
        <DonatedItemCard
          key={index}
          info={cardData}
        />
      ))}
    </div>
  );
}

export default DonatedListing;
