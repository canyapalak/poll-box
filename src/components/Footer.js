import "../index.css";
import FooterLogo from "../assets/footer-logo.png";

function Footer() {
  return (
    <div
      className="bottom-0 left-0 right-0 z-50 flex justify-center items-center
      mx-8 2xl:mx-80 xl:mx-60 lg:mx-40 md:mx-30 sm:mx-20 mt-10"
    >
      <div
        className="flex flex-row 
        py-2 border-2 border-x-stone-700 border-t-stone-700 dark:border-t-stone-700 dark:border-b-slate-400
          rounded-t-lg shadow-lg bg-gradient-to-b from-slate-200 to-slate-300
           dark:from-slate-500 dark:to-slate-400 px-7 md:px-10 lg:px-20 w-full text-sm"
      >
        <div className="flex flex-row justify-center items-center mx-auto">
          <img
            src={FooterLogo}
            alt="Logo"
            className="w-[2.5rem] h-[2-5rem] float-left md:ml-10 mr-2"
          />

          <p className="mx-auto mr-2">poll box ® 2023 by</p>
          <a
            href="https://github.com/canyapalak"
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer dark:text-amber-300 dark:hover:text-amber-200 text-red-400 hover:text-red-300"
          >
            Can Yapalak
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
