import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewPostModal from "./NewPostModal";
import "./currentListing.css";
import axios from "axios";
import TheCurrentListingCard from "../../components/TheCurrentListingCard/TheCurrentListingCard";

export default function CurrentListing() {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [CL_data, setCL_Data] = useState([]);

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

  const renderListingCard = (cld) => {
    //get array of objects
    console.log("cld ==> ", cld);
    if (cld.length) {
      //render each document as a card
      return (
        <>
          {cld.map((x) => (
            <TheCurrentListingCard postData={x} />
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
