import React from "react";
import "./HeroSection.css";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function HeroSection() {
  return (
    <>
      <div className="HeroSec d-flex flex-row align-items-center justify-content-end">
        {/* <img src="heroimage.jpg" alt="hero-image" className='heroImg'/> */}
        {/* </div> */}
        <motion.div
          initial={{ color: "#fff", opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65 }}
          className="cta-container d-flex flex-end justify-content-center align-content-center flex-column p-3 m-4"
        >
          <p className="cta-header">Let's Begin Saving Food</p>
          <NavLink
            to="/sign-up-biz"
            className="CTAbtn btn btn-primary my-2 py-2"
          >
            Sign-up as a Business
          </NavLink>
          <NavLink
            to="/sign-up-ngo"
            className="CTAbtn btn btn-primary my-2 py-2"
          >
            Sign-up as an NGO
          </NavLink>
        </motion.div>
      </div>
    </>
  );
}

export default HeroSection;
