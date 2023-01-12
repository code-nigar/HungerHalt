import React from "react";
import "./HeroSection.css";

function HeroSection() {
  return (
    <>
      <div className="HeroSec d-flex flex-row align-items-center justify-content-end">
        {/* <img src="heroimage.jpg" alt="hero-image" className='heroImg'/> */}
        {/* </div> */}
        <div className="cta-container d-flex flex-end justify-content-center align-content-center flex-column p-3 m-4">
          <p className="cta-header">Let's Begin Saving Food</p>
          <button className="CTAbtn btn btn-primary my-2 py-2">
            Sign-up as a Business
          </button>
          <button className="CTAbtn btn btn-primary my-2 py-2">
            Sign-up as an NGO
          </button>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
