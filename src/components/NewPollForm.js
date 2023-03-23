import "../index.css";
import { Link } from "react-router-dom";
import { BiChevronsLeft } from "react-icons/bi";
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from "react-icons/hi";
import { useState } from "react";

function NewPollForm() {
  const [options, setOptions] = useState(["", ""]);

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
              <input className="ml-7 border-2 border-stone-700 rounded-md px-2 w-full" />
            </div>
            <div className="flex flex-row gap-4">
              <p>Category:</p>{" "}
              <select
                name="categories"
                id="categories"
                // value={selectedCategory}
                // onChange={handleCategoryChange}
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
                    className="ml-25 border-2 border-stone-700 rounded-md px-2 w-full"
                    value={option}
                    onChange={(event) => handleOptionChange(event, index)}
                  />
                  {index !== 0 && (
                    <HiOutlineMinusCircle
                      className="text-3xl float-right relative inline-block cursor-pointer"
                      onClick={() => handleDeleteOption(index)}
                    />
                  )}
                </div>
              ))}
              <HiOutlinePlusCircle
                className="text-2xl float-right ml-25 cursor-pointer"
                onClick={handleAddOption}
              />
            </div>
          </div>
          <div
            className="p-1 mt-3 bg-red-300 hover:bg-red-200 cursor-pointer 
                      mx-auto rounded-lg border-2 border-stone-700 shadow-md mb-3"
          >
            Submit Poll
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPollForm;
