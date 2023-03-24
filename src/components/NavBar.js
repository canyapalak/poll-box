import "../index.css";
import LogoLight from "../assets/logo-light.png";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { Link } from "react-router-dom";
import Typewriter from "./Typewriter.js";
import { useEffect, useLayoutEffect, useState } from "react";

function NavBar() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isDark, setisDark] = useState(false);

  function handleClick() {
    setisDark(!isDark);
  }

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useLayoutEffect(() => {
    function updateIsDesktop() {
      setIsDesktop(window.innerWidth >= 800);
    }
    updateIsDesktop();
    window.addEventListener("resize", updateIsDesktop);
    return () => window.removeEventListener("resize", updateIsDesktop);
  }, []);

  return (
    <div className="mx-8 2xl:mx-80 xl:mx-60 lg:mx-40 md:mx-30 sm:mx-20 ">
      <div
        className="flex flex-row w-full
        py-0 border-2 border-x-stone-700 border-b-stone-700 dark:border-t-slate-500
          rounded-b-lg mb-10 shadow-lg bg-gradient-to-b from-slate-200 to-slate-300
           dark:from-slate-500 dark:to-slate-400"
      >
        <Link to={"/"}>
          <img
            src={LogoLight}
            alt="Logo"
            className="w-[12rem] h-[6rem] float-left md:ml-10"
          />
        </Link>
        {isDesktop && <Typewriter />}
        {isDark ? (
          <MdOutlineLightMode
            className="text-3xl mt-7 ml-auto mr-10 float-right cursor-pointer text-white"
            onClick={handleClick}
          />
        ) : (
          <MdOutlineDarkMode
            className="text-3xl mt-7 ml-auto mr-10 float-right cursor-pointer"
            onClick={handleClick}
          />
        )}
      </div>
    </div>
  );
}

export default NavBar;
