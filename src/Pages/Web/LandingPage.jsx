import CallToAction from "../../Component/LandingPage/CalltoAction";
import ForCustomers from "../../Component/LandingPage/ForCustomer";
import ForSellers from "../../Component/LandingPage/ForSellers";
import HeroSection from "../../Component/LandingPage/HeroSection";
import HowItWorks from "../../Component/LandingPage/HowitsWork";
import Navigation from "../../Component/LandingPage/Navigation";
import UniqueModel from "../../Component/LandingPage/UniqueModel";

export const LandingPage = () => {
  return (
    <>
      {" "}
      <Navigation />
      <HeroSection />
      <HowItWorks />
      <ForCustomers />
      <ForSellers />
      <UniqueModel />
      <CallToAction />
    </>
  );
};
