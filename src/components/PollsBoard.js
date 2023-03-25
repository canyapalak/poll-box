import "../index.js";
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
import { useState } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";

function PollsBoard({ allPolls }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const filteredPolls =
    selectedCategory === "All"
      ? allPolls
      : allPolls?.filter((poll) => poll.category === selectedCategory);

  function getTotalVotes(poll) {
    return poll.choices.reduce((total, choice) => total + choice.vote, 0);
  }

  return (
    <div>
      <div className="flex flex-row justify-between mb-1">
        <select
          name="categories"
          id="categories"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="h-[35px] w-[190px] rounded-md border-2 border-stone-700 pl-1 shadow-md dark:bg-stone-300"
        >
          <option value="All">All</option>
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
        <Link to={"/newpoll"}>
          <div
            className="p-1 bg-red-300 hover:bg-red-200 cursor-pointer rounded-lg border-2
                         border-stone-700 shadow-md px-2"
          >
            <HiOutlinePlusCircle className="inline-block text-xl mb-0.5 mr-1" />
            New Poll
          </div>
        </Link>
      </div>
      <div
        className="bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-400 dark:to-slate-500 p-5 flex flex-col gap-3 
        border-solid border-2 border-ra rounded-lg border-stone-700 shadow-lg"
      >
        {filteredPolls?.length <= 0 ? (
          <div>No polls found in this category :/</div>
        ) : (
          filteredPolls?.map((poll) => (
            <Link to={poll.id} key={poll.id}>
              <div
                key={poll.id}
                className="hover:bg-amber-300 bg-amber-100 flex dark:bg-sky-900 dark:hover:bg-sky-700
                flex-row gap-5 border-solid border-2 
                border-ra rounded-lg border-stone-700"
              >
                <div className="w-[3rem] h-[3rem] p-2 bg-rose-300 rounded-l-lg border-r-2 border-stone-800 shrink-0">
                  {" "}
                  <CategoryIcon category={poll.category} className="" />
                </div>
                <div className="flex flex-row my-auto gap-5 justify-between w-full dark:text-neutral-100">
                  <h3>{poll.title}</h3>
                  <p className="mr-3">
                    {" "}
                    {getTotalVotes(poll)}{" "}
                    {getTotalVotes(poll) === 1 ? "vote" : "votes"}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default PollsBoard;
