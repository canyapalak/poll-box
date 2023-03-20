import "../index.css";
import LogoLight from "../assets/logo-light.png";
import { BsMoonStarsFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Typewriter from "./Typewriter.js";
import { useLayoutEffect, useState } from "react";

function NavBar() {
  const [isDesktop, setIsDesktop] = useState(false);

  useLayoutEffect(() => {
    function updateIsDesktop() {
      setIsDesktop(window.innerWidth >= 800);
    }
    updateIsDesktop();
    window.addEventListener("resize", updateIsDesktop);
    return () => window.removeEventListener("resize", updateIsDesktop);
  }, []);

  return (
    <div>
      <div
        className="flex flex-row w-full
        py-0 border-2 border-x-stone-700 border-b-stone-700 
          rounded-b-lg mb-10 shadow-lg bg-gradient-to-b from-slate-200 to-slate-300"
      >
        <Link to={"/"}>
          <img
            src={LogoLight}
            alt="Logo"
            className="w-[12rem] h-[6rem] float-left md:ml-10"
          />
        </Link>
        {isDesktop && <Typewriter />}
        <BsMoonStarsFill className="text-2xl mt-8 ml-auto mr-10 float-right" />
      </div>
    </div>
  );
}

export default NavBar;
