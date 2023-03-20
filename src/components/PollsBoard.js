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

function PollsBoard({ allPolls }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { category: "politics", icon: LogoPo },
    { category: "sports", icon: LogoSp },
    { category: "health", icon: LogoHe },
    { category: "art", icon: LogoAr },
    { category: "tech", icon: LogoTe },
    { category: "products", icon: LogoPr },
    { category: "life", icon: LogoLi },
    { category: "other", icon: LogoOt },
    { category: "business", icon: LogoBu },
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
    selectedCategory === "all"
      ? allPolls
      : allPolls?.filter((poll) => poll.category === selectedCategory);

  return (
    <div>
      <select
        name="categories"
        id="categories"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="h-[35px] w-[190px] rounded-md border-2 border-stone-700 mb-3 pl-1 shadow-md"
      >
        <option value="all">All</option>
        <option value="art">Art/Culture</option>
        <option value="business">Business/Finance</option>
        <option value="health">Health/Wellness</option>
        <option value="life">Life</option>
        <option value="politics">Politics</option>
        <option value="products">Brands/Products</option>
        <option value="sports">Sports</option>
        <option value="tech">Tech/Science</option>
        <option value="other">Miscellaneous</option>
      </select>
      <div
        className="bg-gradient-to-b from-slate-200 to-slate-300 p-5 flex flex-col gap-3 
        border-solid border-2 border-ra rounded-lg border-stone-700 shadow-lg"
      >
        {filteredPolls?.length <= 0 ? (
          <div>No polls found in this category :/</div>
        ) : (
          filteredPolls?.map((poll) => (
            <Link to={poll.id} key={poll.id}>
              <div
                key={poll.id}
                className="hover:bg-amber-200 bg-amber-100 flex flex-row gap-5 border-solid border-2 border-ra rounded-lg border-stone-700"
              >
                <div className="w-[3rem] h-[3rem] p-2 bg-rose-300 rounded-l-lg border-r-2 border-stone-800 shrink-0">
                  {" "}
                  <CategoryIcon category={poll.category} className="" />
                </div>
                <div className="flex flex-row my-auto gap-5 justify-between w-full">
                  <h3 className="">{poll.title}</h3>
                  <p className="mr-3">{poll.totalVotes} votes</p>
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
