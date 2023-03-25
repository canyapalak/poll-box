import React from "react";

export default function ModalOneVote({
  isModalOneVoteOpen,
  setIsModalOneVoteOpen,
}) {
  return (
    <>
      {isModalOneVoteOpen ? (
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
                  onClick={() => setIsModalOneVoteOpen(false)}
                >
                  <span className="text-black dark:text-white h-6 w-6 text-4xl block">
                    ×
                  </span>
                </button>
                <div>
                  <div className="relative p-6 flex-auto">
                    <p className="my-2 text-center dark:text-neutral-100">
                      You have already voted for this poll! You can vote for a
                      poll only once.
                    </p>
                  </div>
                  <div className="flex items-center justify-end">
                    <button
                      className="p-1 bg-red-300 hover:bg-red-200 cursor-pointer 
                            mx-auto rounded-lg border-2 border-stone-700 shadow-md mb-5 z-10 dark:text-black"
                      type="button"
                      onClick={() => setIsModalOneVoteOpen(false)}
                    >
                      Close
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
