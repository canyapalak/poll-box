import "../index.css";
import { Link } from "react-router-dom";
import { BiChevronsLeft } from "react-icons/bi";
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from "react-icons/hi";
import React, { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import ModalNewPoll from "./ModalNewPoll";

function NewPollForm() {
  const [options, setOptions] = useState(["", ""]);
  const [selectedCategory, setSelectedCategory] = useState("Art/Culture");
  const [titleInput, setTitleInput] = useState("");
  const [isModalNewPollOpen, setIsModalNewPollOpen] = useState(false);
  const [newPollId, setNewPollId] = useState("");
  const [optionInputValue, setOptionInputValue] = useState("");

  const handleOptionChange = (event, index) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
    setOptionInputValue(event.target.value);
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
  // console.log("titleInput :>> ", titleInput);
  // console.log("selectedCategory", selectedCategory);

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

      // console.log("options", options);
      // console.log("choices :>> ", choices);
      setTimeout(async () => {
        const docRef = await addDoc(collection(db, "polls"), {
          title,
          category,
          postTime,
          choices,
        });
        setNewPollId(docRef.id);
        // console.log("Document written with ID: ", docRef.id);
      }, 2000);
    } catch (error) {
      // console.log("Error updating document: ", error);
    }
  }

  function handleSubmitPollAndModal() {
    setIsModalNewPollOpen(true);
    handleSubmitPoll();
  }

  return (
    <div>
      <Link to={"/"}>
        <BiChevronsLeft className="text-2xl mb-3 dark:text-white" />
      </Link>
      <div
        className="bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-400 dark:to-slate-500
        p-5 flex flex-col gap-3 
        border-solid border-2 border-ra rounded-lg border-stone-700 shadow-lg"
      >
        <div
          className="bg-amber-100 dark:bg-slate-600 flex flex-col gap-5 border-solid border-2 rounded-lg 
          border-stone-700 py-3 px-3 md:px-20 lg:px-30 "
        >
          <div className="flex flex-col gap-3 px-3 md:px-10 lg:px-15 xl:25">
            <p className="flex mx-auto mb-5 dark:text-neutral-100">
              Create a new poll
            </p>
            <div className="flex flex-col sm:flex-row gap-4 ">
              <p className="dark:text-neutral-100">Title:</p>{" "}
              <input
                id="title-input"
                onChange={handleGetTitleInput}
                className="md:ml-7 border-2 border-stone-700 rounded-md px-2 md:w-full shadow-md  dark:bg-stone-200"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <p className="dark:text-neutral-100">Category:</p>{" "}
              <select
                name="categories"
                id="category-select"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="h-[30px] w-[190px] rounded-md border-2 border-stone-700 pl-1 shadow-md dark:bg-stone-200"
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
              <p className="dark:text-neutral-100">Options:</p>
              {options.map((option, index) => (
                <div className="flex flex-row gap-2" key={index}>
                  <input
                    className="md:ml-25 border-2 border-stone-700 rounded-md px-2 w-full shadow-md option-input dark:bg-stone-200"
                    value={option}
                    onChange={(event) => handleOptionChange(event, index)}
                  />
                  {index !== 0 && (
                    <div className="text-xl">
                      <HiOutlineMinusCircle
                        className="float-right relative inline-block cursor-pointer dark:text-neutral-100"
                        onClick={() => handleDeleteOption(index)}
                      />
                    </div>
                  )}
                </div>
              ))}
              <div className="text-xl ml-25">
                <HiOutlinePlusCircle
                  className="cursor-pointer dark:text-neutral-100"
                  onClick={handleAddOption}
                />
              </div>
            </div>
          </div>
          <button
            className="p-1 mt-3 bg-red-300 hover:bg-red-200 cursor-pointer 
                      mx-auto rounded-lg border-2 border-stone-700 shadow-md mb-3
                      disabled:bg-stone-300 disabled:cursor-default"
            onClick={handleSubmitPollAndModal}
            disabled={!titleInput || !optionInputValue}
          >
            Submit Poll
          </button>
          <ModalNewPoll
            setIsModalNewPollOpen={setIsModalNewPollOpen}
            isModalNewPollOpen={isModalNewPollOpen}
            newPollId={newPollId}
          />
        </div>
      </div>
    </div>
  );
}

export default NewPollForm;
