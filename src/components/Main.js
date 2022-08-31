import React, { useState, useRef } from "react";
import { copyToClipBoard, generatePassword } from "../utils";
import { Container } from "./Container";
import { Tooltip } from "./Helper/Tooltip";
import firebase from "../firebase";
import { database } from "../firebase";

export const Main = ({ user }) => {
  const [password, setPassword] = useState("");
  const [rangeValue, setRange] = useState("");
  const [passwordProps, setPasswordProps] = useState();
  const [tooltip, setTooltip] = useState(false);
  const [type, setType] = useState("password");
  const passwordRef = useRef(null);
  const [show, setshow] = React.useState(false);
  const [platform, setPlatform] = React.useState();
  const [todoList, setTodoList] = React.useState();
  let pwdDescription = "";

  const generateNewPassword = () => {
    const pwd =
      rangeValue > 3
        ? generatePassword(passwordProps, rangeValue)
        : generatePassword(passwordProps, 3);
    setPassword(pwd);
  };

  const copyClipBoard = (e) => {
    e.preventDefault();
    copyToClipBoard(passwordRef.current);
    setTooltip(true);
    setTimeout(() => {
      setTooltip(false);
    }, 2000);
  };

  const onSelectTag = (e) => {
    setType(e.target.value);
  };

  const setBackgroundColor = (password) => {
    if (password && password.length === 1 && password.length <= 5) {
      pwdDescription = "Bad password";
      return "#cb473e";
    } else if (password && password.length >= 6 && password.length <= 10) {
      pwdDescription = "Weak password";
      return "#f07d58";
    } else if (password && password.length > 10) {
      pwdDescription = "Strong password";
      return "#55a95d";
    } else {
      pwdDescription = "Bad password";
      return "#cb473e";
    }
  };

  const Push = () => {
    database
      .ref("Passwords/" + firebase.auth().currentUser.uid)
      .push({
        platform: platform,
        password: password,
      })
      .catch(alert);
  };

  const uid = localStorage.getItem("user");

  React.useEffect(() => {
    const todoRef = database.ref("Passwords/" + uid);
    todoRef.on("value", (snapshot) => {
      let list = [];
      snapshot.forEach((data) => {
        const dataVal = data.val();
        list.push(dataVal);
      });
      setTodoList(list);
    });
  }, []);

  return (
    <div className="container">
      <div className="text-center">
        <div
          className={`${
            show ? "flex" : "hidden"
          } h-full w-full z-50 absolute items-center justify-center top-0 lg:mx-auto md:px-28 md:py-10 px-4 py-9`}
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
                      className="w-full capitalize focus:outline-none pl-4 py-3 text-sm leading-none text-gray-600 dark:text-gray-100 bg-transparent placeholder-gray-600 dark:placeholder-gray-100"
                      placeholder="Site name"
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                    />
                  </div>
                  <button
                    className="px-3 py-3 bg-blue-700 dark:bg-blue-600 focus:outline-none hover:bg-opacity-80 ml-2 rounded"
                    onClick={Push}
                  >
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
                <div
                  className="bg-gray-50 border rounded border-gray-200 dark:border-gray-700 dark:bg-gray-700 w-full"
                  style={{ display: "none" }}
                >
                  <input
                    ref={passwordRef}
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full focus:outline-none pl-4 py-3 text-sm leading-none text-gray-600 dark:text-gray-100 bg-transparent placeholder-gray-600 dark:placeholder-gray-100"
                    readOnly
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
      <div
        className="relative bg-green-500 block p-8 overflow-hidden border border-slate-100 rounded-lg ml-6 mr-6 mt-8"
        style={{ backgroundColor: setBackgroundColor(password) }}
      >
        <div className="justify-between sm:flex">
          <div>
            <input
              ref={passwordRef}
              type="text"
              value={password}
              className="password-display-input text-xl font-bold text-white"
              readOnly
            />
            <p className="mt-2 text-xs font-medium text-white">
              {password && password.length > 10 ? (
                <>
                  <i className="fas fa-check-circle"></i> {pwdDescription}
                </>
              ) : (
                <>
                  <i className="fas fa-exclamation-circle"></i> {pwdDescription}
                </>
              )}
            </p>
          </div>

          <div className="flex-shrink-0 hidden ml-3 sm:block">
            <div className="password-display-icons">
              <button onClick={copyClipBoard} className="copy-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </button>
              <button
                onClick={generateNewPassword}
                className="generate-btn ml-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
              <button
                onClick={() => setshow(true)}
                className="generate-btn ml-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
              </button>

              <Tooltip
                message="Copied"
                position="left"
                displayTooltip={tooltip}
              />
            </div>
          </div>
        </div>
      </div>

      <Container
        type={type}
        setPassword={setPassword}
        setRange={setRange}
        setPasswordProps={setPasswordProps}
        passwordRef={passwordRef}
      />

      <div className="w-full mx-auto">
        <div className="bg-white shadow-md rounded my-6">
          <table className="min-w-max w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Platforms</th>
                <th className="py-3 px-6 text-left">Passwords</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {todoList
                && todoList.map((todo, index) => (
                    <tr
                      className="border-b border-gray-200 hover:bg-gray-100"
                      key={index}
                    >
                      <td
                        className="py-3 px-6 text-left whitespace-nowrap"
                        key={index}
                      >
                        <div className="flex items-center">
                          <span className="font-medium capitalize">
                            {todo.platform}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <div className="flex items-center">
                          <span>{todo.password}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                          Saved
                        </span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </div>
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
