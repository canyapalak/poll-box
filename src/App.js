import "./index.css";
import LogoLight from "./assets/logo-light.png";
import { BiMoon } from "react-icons/bi";
import PollsBoard from "./components/PollsBoard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/FirebaseConfig.js";
import { useEffect, useLayoutEffect, useState } from "react";
import Typewriter from "./components/Typewriter";
import ControlPanel from "./components/ControlPanel";

function App() {
  const [allPolls, setAllPolls] = useState([]);

  const [isDesktop, setIsDesktop] = useState(false);

  useLayoutEffect(() => {
    function updateIsDesktop() {
      setIsDesktop(window.innerWidth >= 800);
    }
    updateIsDesktop();
    window.addEventListener("resize", updateIsDesktop);
    return () => window.removeEventListener("resize", updateIsDesktop);
  }, []);

  useEffect(() => {
    async function getPolls() {
      try {
        const querySnapshot = await getDocs(collection(db, "polls"));
        const polls = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          totalVotes: doc.data().totalVotes,
          choices: doc.data().choices,
          category: doc.data().category,
          postTime: new Date(
            doc.data().postTime.seconds * 1000 +
              doc.data().postTime.nanoseconds / 1000000
          ).toLocaleString(),
        }));
        setAllPolls(polls);
      } catch (error) {
        console.error(error);
      }
    }
    getPolls();
  }, []);

  console.log("allPolls", allPolls);

  return (
    <div className="min-h-screen mx-8 2xl:mx-80 xl:mx-60 lg:mx-40 md:mx-30 sm:mx-20 flex-row justify-center">
      <div
        className="flex flex-row w-full
    py-0 border-2 border-x-stone-700 border-b-stone-700 
      rounded-b-lg mb-10 shadow-lg bg-gradient-to-b from-amber-50 to-amber-200"
      >
        <img
          src={LogoLight}
          alt="Logo"
          className="w-[12rem] h-[6rem] float-left md:ml-10"
        />
        {isDesktop && <Typewriter />}
        <BiMoon className="text-3xl mt-8 ml-auto mr-10 float-right" />
      </div>
      <ControlPanel />
      <PollsBoard allPolls={allPolls} />
    </div>
  );
}

export default App;
