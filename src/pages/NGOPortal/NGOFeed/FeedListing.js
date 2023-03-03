import React, { useState, useEffect } from "react";
import FeedCard from "../../../components/FeedCard/FeedCard";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../../config/config";

const data = [
  {
    profileIcon:
      "https://www.designmantic.com/logo-images/172145.png?company=Company+Name&slogan=&verify=1",
    userName: "John Doe",
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    profileIcon: "https://via.placeholder.com/32",
    userName: "Jane Smith",
    info: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

function FeedListing() {
  const [CL_data, setCL_Data] = useState([]);
  //fetch listing data on initial load
  useEffect(() => {
    getListingData();
  }, []);
  const q = query(collection(db, "Posts"));

  const getListingData = async () => {
    let dataobt = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      dataobt.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    setCL_Data(dataobt);
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      {console.log(CL_data)}
      {CL_data.map((cardData, index) => (
        <FeedCard
          key={index}
          profileIcon={cardData.profileIcon}
          userName={cardData.id}
          info={cardData.data}
        />
      ))}
    </div>
  );
}

export default FeedListing;
