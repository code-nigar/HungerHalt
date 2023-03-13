import React from "react";
import "./HDIWSec.css";
import { motion } from "framer-motion";

function HDIWSection() {
  return (
    <div className="HDIW-sec d-flex flex-column justify-content-center align-items-center">
      <div className="HDIW-pre">
        <motion.p initial={{color: '#fff', opacity:0, x:-10}} whileInView={{ opacity: 1 , x:0}} transition={{ duration: 0.55 }}  className="HDIW-text">
          We provide a platform for businesses & non-profits to place and pick
          up unserved food
        </motion.p>
        <motion.img initial={{color: '#fff', opacity:0, x:10}} whileInView={{ opacity: 1 , x:0}} transition={{ duration: 0.7 }} src="Group29.png" alt="HDIW icon" width={"300px"} height={"100px"}/>
      </div>
      <h1 className="HDIW-heading">How does it work</h1>
      <div className="HDIW-block d-flex flex-row justify-content-between align-items-center">
        <img src="postadd.png" alt="post add Icon" width={"72px"} height={"72px"}/>
        <motion.p initial={{color: '#fff', opacity:0, x:-10}} whileInView={{ opacity: 1 , x:0}} transition={{ duration: 0.55 }} className="HDIW-text">
          Businesses post the unserved food items on the platform.
        </motion.p>
      </div>
      <div className="HDIW-block d-flex flex-row justify-content-between align-items-center">
        <motion.p initial={{color: '#fff', opacity:0, x:10}} whileInView={{ opacity: 1 , x:0}} transition={{ duration: 0.55 }} className="HDIW-text">
          Non-profits request the Business to pickup food.
        </motion.p>
        <img src="requestIcon.png" alt="request icon"  width={"72px"} height={"72px"}/>
      </div>
      <div className="HDIW-block d-flex flex-row justify-content-between align-items-center">
        <img src="TickBoxIcon.png" alt="Tick Box Icon"  width={"72px"} height={"72px"}/>
        <motion.p initial={{color: '#fff', opacity:0, x:-10}} whileInView={{ opacity: 1 , x:0}} transition={{ duration: 0.55 }} className="HDIW-text">
          Businesses approve any one of the non-profit org or individual’s
          request.
        </motion.p>
      </div>
      <div className="HDIW-block d-flex flex-row justify-content-between align-items-center">
        <motion.p initial={{color: '#fff', opacity:0, x:10}} whileInView={{ opacity: 1 , x:0}} transition={{ duration: 0.55 }} className="HDIW-text">
          The selected non-profit is notified to pick up the food.
        </motion.p>
        <img src="TruckIcon.png" alt="Truck Icon"  width={"72px"} height={"72px"}/>
      </div>
    </div>
  );
}

export default HDIWSection;
