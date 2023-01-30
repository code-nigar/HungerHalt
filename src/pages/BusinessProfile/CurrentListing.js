import React, { useState } from "react";
import { useParams } from "react-router-dom";
import NewPostModal from "./NewPostModal";
import "./currentListing.css"

export default function CurrentListing() {
    
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const onClose = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <div className="new-post">
        <button onClick={onClose} className="btn btn-primary">make a new post</button>
        <NewPostModal open={openModal} id={id} onClose={onClose} />
      </div>
    </>
  );
}
