import React from 'react'
import Headerr from "../../components/Header/Header";
import HeroSection from "../../sections/HeroSection/HeroSection";
import OurMission from "../../sections/OurMissionSection/OurMission";
import HDIWSection from "../../sections/HDIWSection/HDIWSection";
import Footer from '../../components/Footer/Footer';

function WelcomePage() {
  return (
    <>
        <Headerr/>
        <HeroSection/>
        <OurMission/>
        <HDIWSection/>
        <Footer/>
    </>
  )
}

export default WelcomePage