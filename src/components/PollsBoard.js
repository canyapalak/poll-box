import "../index.js";
import LogoPo from "../assets/icon-politics.png";
import LogoSp from "../assets/icon-sports.png";
import LogoHe from "../assets/icon-health.png";
import LogoAr from "../assets/icon-art.png";
import LogoBu from "../assets/icon-business.png";
import LogoLi from "../assets/icon-life.png";
import LogoTe from "../assets/icon-tech.png";
import LogoPr from "../assets/icon-products.png";
import LogoOt from "../assets/icon-other.png";

function PollsBoard({ allPolls }) {
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

  return (
    <div
      className="bg-gradient-to-b from-amber-100 to-amber-200 p-5 flex flex-col gap-3 
    border-solid border-2 border-ra rounded-lg border-stone-700 shadow-lg"
    >
      {allPolls?.map((poll) => (
        <div
          key={poll.id}
          className="bg-white flex flex-row gap-5 border-solid border-2 border-ra rounded-lg border-stone-700"
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
      ))}
    </div>
  );
}

export default PollsBoard;
