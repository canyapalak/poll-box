import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/FirebaseConfig.js";
import { useEffect } from "react";

function PollDetails() {
  const { id } = useParams();

  useEffect(() => {
    async function getPollById() {
      const docRef = doc(db, "polls", id);
      const docSnap = await getDoc(docRef);
      try {
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Document data:", data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
    getPollById();
  }, [id]);

  return (
    <div
      className="bg-gradient-to-b from-slate-200 to-slate-300 p-5 flex flex-col gap-3 
        border-solid border-2 border-ra rounded-lg border-stone-700 shadow-lg"
    ></div>
  );
}

export default PollDetails;
