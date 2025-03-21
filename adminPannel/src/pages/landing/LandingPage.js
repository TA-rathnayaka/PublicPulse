import React from "react";
import { Navbar, InfoSection, Footer } from "../../components/landingPage";
import { homeObjOne } from "./Data"; // We'll define this next

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <InfoSection {...homeObjOne} />
      <Footer />
    </>
  );
};

export default LandingPage;