import React from "react";

export const Modal = (props) => {
  const [show, setshow] = React.useState(false);
  return (
    <div className="text-center mt-4">
      <div className="w-full flex items-center justify-center" id="button">
        <button
          className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition duration-150 ease-in-out hover:bg-blue-600 bg-blue-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm"
          onClick={() => setshow(true)}
        >
          Save Password
        </button>
      </div>
      <div
        className={`${
          show ? "flex" : "hidden"
        } h-full w-full absolute items-center justify-center top-0 lg:mx-auto md:px-28 md:py-10 px-4 py-9`}
        id="modal"
      >
        <div
          className="bg-white w-full h-full absolute"
          onClick={() => setshow(false)}
        />
        <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg flex justify-center">
          <div className="relative w-11/12 sm:w-8/12 md:w-9/12 bg-white dark:bg-gray-800 shadow  pt-10 pb-8 rounded">
            <div className="flex flex-col items-center px-4 md:px-12">
            <p className="text-base sm:text-lg md:text-2xl font-bold md:leading-6 mt-6 text-gray-800 text-center dark:text-gray-100">
                      Enter Site Name below :
                    </p>
              <div className="flex items-center mt-4 sm:mt-6 w-full">
                <div className="bg-gray-50 border rounded border-gray-200 dark:border-gray-700 dark:bg-gray-700 w-full">
                  <input
                    className="w-full focus:outline-none pl-4 py-3 text-sm leading-none text-gray-600 dark:text-gray-100 bg-transparent placeholder-gray-600 dark:placeholder-gray-100"
                    placeholder="Site name"
                  />
                </div>                
                <button className="px-3 py-3 bg-blue-700 dark:bg-blue-600 focus:outline-none hover:bg-opacity-80 ml-2 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="bg-gray-50 border rounded border-gray-200 dark:border-gray-700 dark:bg-gray-700 w-full">
                  <input
                    className="w-full focus:outline-none pl-4 py-3 text-sm leading-none text-gray-600 dark:text-gray-100 bg-transparent placeholder-gray-600 dark:placeholder-gray-100" value={props.password}
                  />
                </div>
            </div>
            <div
              className="cursor-pointer absolute top-0 right-0 m-3 text-gray-800 dark:text-gray-100 transition duration-150 ease-in-out"
              onClick={() => setshow(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Close"
                className="icon icon-tabler icon-tabler-x"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1={18} y1={6} x2={6} y2={18} />
                <line x1={6} y1={6} x2={18} y2={18} />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
