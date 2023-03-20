import React from "react";
import NavBar from "../components/NavBar";
import PollDetails from "../components/PollDetails";

function PollPage() {
  return (
    <div className="min-h-screen mx-8 2xl:mx-80 xl:mx-60 lg:mx-40 md:mx-30 sm:mx-20 flex-row justify-center">
      <NavBar />
      <PollDetails />
    </div>
  );
}
export default PollPage;
