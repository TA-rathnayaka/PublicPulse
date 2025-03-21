import React from "react";
import {  InfoSection, Footer,LandingNavbar } from "../../components/landingPage";

import { homeObjOne } from "./Data"; // We'll define this next

const LandingPage = () => {
  return (
    <> 
    {/* <LandingNavbar /> */}
    <InfoSection {...homeObjOne} />
    {/* <Footer /> */}
    </>
     
    
  );
};

export default LandingPage;