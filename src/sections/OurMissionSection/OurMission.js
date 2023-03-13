import React from "react";
import './OurMission.css';
import { motion } from 'framer-motion';

function OurMission() {
  return (
    <div className="our-mission-sec d-flex flex-column justify-content-center align-items-center">
      <h1 className="mission-heading">Our Mission</h1>
      <motion.p initial={{color: '#fff', opacity:0, y:-20}} whileInView={{ opacity: 1 , y:0}} transition={{ duration: 0.6 }} className="mission-text lead">
        To make sure good food gets eaten, not wasted. Every day, fresh food
        goes to waste at cafés, restaurants, hotels, shops, and, At different
        events massive amount of food is left that they don’t serve the next day
        and it gets wasted which could be donated to nonprofit organizations
        contibuting to fight hunger.
      </motion.p >
    </div>
  );
}

export default OurMission;
