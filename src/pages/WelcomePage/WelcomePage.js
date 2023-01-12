import React from 'react'
import Headerr from "../../components/Header/Header";
import HeroSection from "../../sections/HeroSection/HeroSection";
import OurMission from "../../sections/OurMissionSection/OurMission";
import HDIWSection from "../../sections/HDIWSection/HDIWSection";

function WelcomePage() {
  return (
    <>
        <Headerr/>
        <HeroSection/>
        <OurMission/>
        <HDIWSection/>
    </>
  )
}

export default WelcomePage