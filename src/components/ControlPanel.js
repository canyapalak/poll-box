import { useState } from "react";
import LogoPo from "../assets/icon-politics.png";
import LogoSp from "../assets/icon-sports.png";
import LogoHe from "../assets/icon-health.png";
import LogoAr from "../assets/icon-art.png";
import LogoBu from "../assets/icon-business.png";
import LogoLi from "../assets/icon-life.png";
import LogoTe from "../assets/icon-tech.png";
import LogoPr from "../assets/icon-products.png";
import LogoOt from "../assets/icon-other.png";

function ControlPanel() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-3 relative">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        class="relative bg-white hover:bg-neutral-300 font-medium rounded-lg 
text-sm px-4 py-2 text-center inline-flex items-center border-2 border-gray-800"
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={toggleDropdown}
      >
        Categories{" "}
        <svg
          class="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdown"
          class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          style={{
            position: "absolute",
            top: "calc(100% + 5px)",
            left: 0,
          }}
        >
          <ul
            class="py-2 text-sm text-black dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <a
                href="#"
                class="block px-2 py-2 hover:bg-neutral-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <div className="flex flex-row gap-2">
                  <img src={LogoAr} alt="art" className="w-5" />{" "}
                  <p>Art/Culture</p>
                </div>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block px-2 py-2 hover:bg-neutral-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <div className="flex flex-row gap-2">
                  <img src={LogoBu} alt="art" className="w-5" />{" "}
                  <p>Business/Finance</p>
                </div>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block px-2 py-2 hover:bg-neutral-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <div className="flex flex-row gap-2">
                  <img src={LogoHe} alt="art" className="w-5" />{" "}
                  <p>Health/Wellness</p>
                </div>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block px-2 py-2 hover:bg-neutral-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <div className="flex flex-row gap-2">
                  <img src={LogoLi} alt="art" className="w-5" /> <p>Life</p>
                </div>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block px-2 py-2 hover:bg-neutral-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <div className="flex flex-row gap-2">
                  <img src={LogoPo} alt="art" className="w-5" /> <p>Politics</p>
                </div>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block px-2 py-2 hover:bg-neutral-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <div className="flex flex-row gap-2">
                  <img src={LogoPr} alt="art" className="w-5" />{" "}
                  <p>Brands/Products</p>
                </div>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block px-2 py-2 hover:bg-neutral-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <div className="flex flex-row gap-2">
                  <img src={LogoSp} alt="art" className="w-5" /> <p>Sports</p>
                </div>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block px-2 py-2 hover:bg-neutral-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <div className="flex flex-row gap-2">
                  <img src={LogoTe} alt="art" className="w-5" />{" "}
                  <p>Tech/Science</p>
                </div>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block px-2 py-2 hover:bg-neutral-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <div className="flex flex-row gap-2">
                  <img src={LogoOt} alt="art" className="w-5" />{" "}
                  <p>Miscellaneous</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ControlPanel;
