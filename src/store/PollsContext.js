import React, { createContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/FirebaseConfig.js";

export const PollsContext = createContext();

export const PollsContextProvider = (props) => {
  const [allPolls, setAllPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getPolls() {
      try {
        const querySnapshot = await getDocs(collection(db, "polls"));
        const polls = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          choices: doc.data().choices,
          category: doc.data().category,
          postTime: new Date(
            doc.data().postTime.seconds * 1000 +
              doc.data().postTime.nanoseconds / 1000000
          ).toLocaleString(),
        }));
        setAllPolls(polls);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    }
    getPolls();
  }, []);

  console.log("allPolls", allPolls);
  console.log("isLoading", isLoading);

  return allPolls.length > 0 ? (
    <PollsContext.Provider value={{ allPolls, isLoading }}>
      {props.children}
    </PollsContext.Provider>
  ) : null;
};
