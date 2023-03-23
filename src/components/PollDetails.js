import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../config/FirebaseConfig.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoPo from "../assets/icon-politics.png";
import LogoSp from "../assets/icon-sports.png";
import LogoHe from "../assets/icon-health.png";
import LogoAr from "../assets/icon-art.png";
import LogoBu from "../assets/icon-business.png";
import LogoLi from "../assets/icon-life.png";
import LogoTe from "../assets/icon-tech.png";
import LogoPr from "../assets/icon-products.png";
import LogoOt from "../assets/icon-other.png";
import Spinner from "../assets/spinner.gif";
import { FaCheck } from "react-icons/fa";
import { BiChevronDown, BiChevronUp, BiChevronsLeft } from "react-icons/bi";

function PollDetails() {
  const { id } = useParams();
  const [singlePoll, setSinglePoll] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isMore, setIsMore] = useState(false);

  const categories = [
    { category: "Politics", icon: LogoPo },
    { category: "Sports", icon: LogoSp },
    { category: "Health/Wellness", icon: LogoHe },
    { category: "Art/Culture", icon: LogoAr },
    { category: "Tech/Science", icon: LogoTe },
    { category: "Brands/Products", icon: LogoPr },
    { category: "Life", icon: LogoLi },
    { category: "Miscellaneous", icon: LogoOt },
    { category: "Business/Finance", icon: LogoBu },
  ];

  function CategoryIcon({ category }) {
    const selectedCategory = categories.find((c) => c.category === category);
    const icon = selectedCategory ? selectedCategory.icon : "";

    return <img src={icon} alt={category} className="category-icon" />;
  }

  function handleShowMore() {
    setIsMore(!isMore);
  }

  function formatPostTime(seconds, nanoseconds) {
    const date = new Date(seconds * 1000 + nanoseconds / 1000000);
    return date.toLocaleString();
  }

  function handleChoiceClick(index) {
    setSelectedChoice(index);
  }

  const choiceBgColors = ["bg-zinc-400", "bg-neutral-300"];

  const totalVotes = singlePoll?.choices.reduce(
    (total, choice) => total + choice.vote,
    0
  );

  // async function handleChoiceAndVote(index) {
  //   handleChoiceClick(index);
  //   const pollRef = doc(db, "polls", id);
  //   try {
  //     await updateDoc(pollRef, {
  //       [`choices.${[selectedChoice]}vote`]: increment(1),
  //     });
  //     console.log("Document updated");
  //   } catch (error) {
  //     console.log("Error updating document: ", error);
  //   }
  // }
  async function handleChoiceAndVote(index) {
    handleChoiceClick(index);
    const pollRef = doc(db, "polls-2", id);
    try {
      await updateDoc(pollRef, {
        [`choices.${selectedChoice}`]: arrayUnion("vote"),
      });
      await updateDoc(pollRef, {
        [`choices.${selectedChoice}`]: arrayRemove("vote"),
      });

      console.log("Document updated");
    } catch (error) {
      console.log("Error updating document: ", error);
    }
  }

  console.log("singlePoll.choices.name :>> ", singlePoll?.choices[1].name);

  useEffect(() => {
    async function getPollById() {
      const docRef = doc(db, "polls", id);
      const docSnap = await getDoc(docRef);
      try {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSinglePoll(data);
        } else {
          console.log("No such document!");
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
    getPollById();
  }, [id]);

  console.log("singlePoll", singlePoll);
  console.log("selectedChoice", selectedChoice);

  return (
    <div className="mb-5">
      {isLoading ? (
        <img src={Spinner} alt="Spinner" className="w-7 mx-auto mt-40" />
      ) : (
        <div>
          <Link to={"/"}>
            <BiChevronsLeft className="text-2xl mb-3" />
          </Link>
          <div
            className="bg-gradient-to-b from-slate-200 to-slate-300 p-5 flex flex-col gap-3 
            border-solid border-2 border-ra rounded-lg border-stone-700 shadow-lg"
          >
            <div className="bg-amber-100 flex flex-row gap-5 border-solid border-2 border-ra rounded-lg border-stone-700">
              <div className="w-[3rem] h-[3rem] p-2 bg-rose-300 rounded-l-lg border-r-2 border-stone-800 shrink-0">
                {" "}
                <CategoryIcon category={singlePoll?.category} />
              </div>
              <div className="flex flex-row my-auto gap-2 justify-between w-full">
                <p>{singlePoll?.category}</p>
                <p className="mr-3">
                  {formatPostTime(
                    singlePoll?.postTime.seconds,
                    singlePoll?.postTime.nanoseconds
                  )}
                </p>
              </div>
            </div>
            <div className=" bg-amber-100 p-3 flex flex-col gap-5 border-solid border-2 border-ra rounded-lg border-stone-700">
              <p className="text-center mx-auto mt-1">{singlePoll?.title}</p>
              <div className="flex flex-col gap-y-3">
                {singlePoll?.choices.map((choice, index) => (
                  <div
                    key={index}
                    onClick={() => handleChoiceAndVote(index)}
                    className="flex flex-row"
                  >
                    <div
                      className={`flex flex-row justify-between w-full cursor-pointer
                       hover:bg-orange-300 bg-stone-100 py-1 px-5 border-solid 
                      border-2 rounded-lg border-stone-700 ${
                        selectedChoice === index && "bg-orange-300"
                      }`}
                    >
                      <p>{choice.name}</p>
                      {selectedChoice === index && (
                        <FaCheck className="inline-block text-lg my-auto" />
                      )}
                    </div>
                  </div>
                ))}
                {!isMore && (
                  <div
                    className="p-1 bg-red-300 hover:bg-red-200 cursor-pointer mx-auto rounded-lg border-2
                     border-stone-700 shadow-md my-3"
                    onClick={handleShowMore}
                  >
                    Show Results
                    <BiChevronDown className="inline-block ml-3 text-xl" />
                  </div>
                )}

                {isMore && (
                  <div className="flex flex-col gap-2 mt-5">
                    {singlePoll?.choices
                      .slice()
                      .sort((a, b) => b.vote - a.vote)
                      .map((choice, i) => {
                        const percentage =
                          totalVotes > 0
                            ? Math.round((choice.vote / totalVotes) * 100)
                            : 0;
                        return (
                          <div key={i} className="flex flex-col">
                            <div className="flex flex-row justify-between ">
                              <p>{choice.name}</p>
                              <div className="flex flex-row justify-evenly gap-4">
                                <p>{percentage}%</p>
                                <p>
                                  ({choice.vote}{" "}
                                  {choice.vote === 1 ? "vote" : "votes"})
                                </p>
                              </div>
                            </div>
                            <div className="h-5 w-full border-2 rounded-lg border-gray-500 bg-slate-50">
                              <div
                                key={i}
                                className={`${
                                  choiceBgColors[i % choiceBgColors.length]
                                } h-full rounded-md border-solid border-2 border-slate-50`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    <p className="pl-1 mt-2 mb-5">
                      {totalVotes} votes in total
                    </p>

                    <div
                      className="p-1 bg-red-300 hover:bg-red-200 cursor-pointer 
                      mx-auto rounded-lg border-2 border-stone-700 shadow-md mb-3"
                      onClick={handleShowMore}
                    >
                      Hide Results
                      <BiChevronUp className="inline-block ml-3 text-xl" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PollDetails;
