import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCopy } from "react-icons/ai";

export default function ModalNewPoll({
  setIsModalNewPollOpen,
  isModalNewPollOpen,
  newPollId,
}) {
  const [isCopied, setIsCopied] = useState(false);
  const newPollUrl = `${window.location.origin}/${newPollId}`;

  const navigate = useNavigate();
  const handleGoToPoll = () => {
    navigate(`/${newPollId}`);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(newPollUrl);
    setIsCopied(true);
  };

  return (
    <>
      {isModalNewPollOpen ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 
          z-50 outline-none focus:outline-none m-5"
          >
            <div className="relative w-auto my-6 mx-auto max-w-lg border-2 border-solid border-neutral-700 rounded-lg">
              <div
                className="rounded-md shadow-lg relative flex flex-col w-full
               bg-white dark:bg-slate-700 outline-none focus:outline-none"
              >
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right
                  text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setIsModalNewPollOpen(false)}
                >
                  <span className="text-black dark:text-white h-6 w-6 text-4xl block">
                    ×
                  </span>
                </button>
                <div>
                  <div className="relative p-6 flex-auto">
                    <p className="my-2 text-center dark:text-neutral-100">
                      You have submitted your poll. Well done!
                    </p>
                  </div>
                  <div className="px-7 flex justify-center">
                    <div className="border-2 border-solid border-neutral-300 rounded-md flex flex-row">
                      <p className="p-2 dark:text-neutral-100">
                        {window.location.origin}/{newPollId}
                      </p>
                      <div
                        className=" bg-orange-300 hover:bg-orange-200 shrink-0 flex flex-row 
                        justify-center pt-1 px-1 rounded-r-sm"
                      >
                        {" "}
                        <AiOutlineCopy
                          className=" text-3xl cursor-pointer"
                          onClick={handleCopyLink}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    {isCopied && (
                      <p className="text-center text-green-600 dark:text-green-300 mr-5">
                        Copied!
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-end">
                    <button
                      className="p-1 bg-red-300 hover:bg-red-200 cursor-pointer 
                            mx-auto rounded-lg border-2 border-stone-700 shadow-md mb-5 mt-5 z-10"
                      type="button"
                      onClick={handleGoToPoll}
                    >
                      Go to Poll
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black/50"></div>
        </>
      ) : null}
    </>
  );
}
