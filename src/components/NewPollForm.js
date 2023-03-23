import "../index.css";
import { Link } from "react-router-dom";
import { BiChevronsLeft } from "react-icons/bi";
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from "react-icons/hi";
import React, { useState } from "react";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import Modal from "./Modal";

function NewPollForm() {
  const [options, setOptions] = useState(["", ""]);
  const [selectedCategory, setSelectedCategory] = useState("Art/Culture");
  const [titleInput, setTitleInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionChange = (event, index) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleDeleteOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleGetTitleInput(event) {
    setTitleInput(event.target.value);
  }
  console.log("getTitleInput :>> ", titleInput);
  console.log("selectedCategory", selectedCategory);

  async function handleSubmitPoll() {
    try {
      const title = titleInput;
      const category = selectedCategory;
      const postTime = Timestamp.fromDate(new Date());

      const choices = [];
      const options = document.querySelectorAll(".option-input");
      for (let i = 0; i < options.length; i++) {
        const name = options[i].value;
        const vote = 0;
        choices.push({ name, vote });
      }

      console.log("options", options);
      console.log("choices :>> ", choices);

      const docRef = await addDoc(collection(db, "polls"), {
        title,
        category,
        postTime,
        choices,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log("Error updating document: ", error);
    }
  }

  return (
    <div>
      <Link to={"/"}>
        <BiChevronsLeft className="text-2xl mb-3" />
      </Link>
      <div
        className="bg-gradient-to-b from-slate-200 to-slate-300 p-5 flex flex-col gap-3 
        border-solid border-2 border-ra rounded-lg border-stone-700 shadow-lg"
      >
        <div
          className="bg-amber-100 flex flex-col gap-5 border-solid border-2 rounded-lg 
          border-stone-700 py-3 px-40"
        >
          <div className="flex flex-col gap-3 px-20">
            <p className="flex mx-auto mb-5">Create a new poll</p>
            <div className="flex flex-row gap-4">
              <p>Title:</p>{" "}
              <input
                id="title-input"
                onChange={handleGetTitleInput}
                className="ml-7 border-2 border-stone-700 rounded-md px-2 w-full shadow-md"
              />
            </div>
            <div className="flex flex-row gap-4">
              <p>Category:</p>{" "}
              <select
                name="categories"
                id="category-select"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="h-[30px] w-[190px] rounded-md border-2 border-stone-700 pl-1 shadow-md"
              >
                <option value="Art/Culture">Art/Culture</option>
                <option value="Business/Finance">Business/Finance</option>
                <option value="Health/Wellness">Health/Wellness</option>
                <option value="Life">Life</option>
                <option value="Politics">Politics</option>
                <option value="Brands/Products">Brands/Products</option>
                <option value="Sports">Sports</option>
                <option value="Tech/Science">Tech/Science</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <p>Options:</p>
              {options.map((option, index) => (
                <div className="flex flex-row gap-2" key={index}>
                  <input
                    className="ml-25 border-2 border-stone-700 rounded-md px-2 w-full shadow-md option-input"
                    value={option}
                    onChange={(event) => handleOptionChange(event, index)}
                  />
                  {index !== 0 && (
                    <div className="text-xl">
                      <HiOutlineMinusCircle
                        className="float-right relative inline-block cursor-pointer"
                        onClick={() => handleDeleteOption(index)}
                      />
                    </div>
                  )}
                </div>
              ))}
              <div className="text-xl ml-25">
                <HiOutlinePlusCircle
                  className="cursor-pointer"
                  onClick={handleAddOption}
                />
              </div>
            </div>
          </div>
          <div
            className="p-1 mt-3 bg-red-300 hover:bg-red-200 cursor-pointer 
                      mx-auto rounded-lg border-2 border-stone-700 shadow-md mb-3"
            onClick={handleSubmitPoll}
          >
            Submit Poll
          </div>

          {/* Modal  */}
          <React.Fragment>
            <div className="relative z-10">
              <button
                className="p-1 mt-3 bg-sky-300 hover:bg-sky-200 cursor-pointer 
                          mx-auto rounded-lg border-2 border-stone-700 shadow-md mb-3 z-10"
                onClick={() => setIsOpen(true)}
              >
                Open Modal
              </button>
              <Modal open={isOpen}>Fancy Modal</Modal>
            </div>

            <div className="relative z-20 bg-red-400 p-[10px]">
              {" "}
              Extra Content to be shown in Modal
            </div>
          </React.Fragment>
          {/* Modal  */}
        </div>
      </div>
    </div>
  );
}

export default NewPollForm;
