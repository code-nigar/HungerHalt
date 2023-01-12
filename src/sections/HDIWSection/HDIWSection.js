import React from "react";
import "./HDIWSec.css";

function HDIWSection() {
  return (
    <div className="HDIW-sec d-flex flex-column justify-content-center align-items-center">
      <div className="HDIW-pre d-flex flex-row justify-content-between align-items-center">
        <p className="HDIW-text">
          We provide a platform for businesses & non-profits to place and pick
          up unserved food
        </p>
        <img src="Group29.png" alt="HDIW icon" width={"300px"} height={"100px"}/>
      </div>
      <h1 className="HDIW-heading">How does it work</h1>
      <div className="HDIW-block d-flex flex-row justify-content-between align-items-center">
        <img src="postadd.png" alt="post add Icon" width={"72px"} height={"72px"}/>
        <p className="HDIW-text">
          Businesses post the unserved food items on the platform.
        </p>
      </div>
      <div className="HDIW-block d-flex flex-row justify-content-between align-items-center">
        <p className="HDIW-text">
          Non-profits request the Business to pickup food.
        </p>
        <img src="requestIcon.png" alt="request icon"  width={"72px"} height={"72px"}/>
      </div>
      <div className="HDIW-block d-flex flex-row justify-content-between align-items-center">
        <img src="TickBoxIcon.png" alt="Tick Box Icon"  width={"72px"} height={"72px"}/>
        <p className="HDIW-text">
          Businesses approve any one of the non-profit org or individual’s
          request.
        </p>
      </div>
      <div className="HDIW-block d-flex flex-row justify-content-between align-items-center">
        <p className="HDIW-text">
          The selected non-profit is notified to pick up the food within the 3
          hours.
        </p>
        <img src="TruckIcon.png" alt="Truck Icon"  width={"72px"} height={"72px"}/>
      </div>
    </div>
  );
}

export default HDIWSection;
