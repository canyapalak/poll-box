import "./index.css";
import LogoLight from "./assets/logo-light.png";
import { BsFillMoonFill } from "react-icons/bs";
import PollsBoard from "./components/PollsBoard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/FirebaseConfig.js";
import { useEffect, useState } from "react";

function App() {
  const [allPolls, setAllPolls] = useState([]);

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
      <div className="flex flex-row justify-around px-5 xl:px-40 lg:px-20 md:px-10 py-5 border-2 border-stone-800">
        <img
          src={LogoLight}
          alt="Logo"
          className="w-[12rem] h-[6rem] mx-auto"
        />
        <BsFillMoonFill className="text-2xl mt-7 mx-auto" />
      </div>
      <PollsBoard allPolls={allPolls} />
    </div>
  );
}

export default App;
