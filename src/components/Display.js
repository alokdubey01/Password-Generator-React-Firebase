import React, { useState, useRef } from "react";
import { copyToClipBoard, generatePassword } from "../utils";
import { Container } from "./Container";
import { Modal } from "./Helper/Modal";
import { Tooltip } from "./Helper/Tooltip";

export const Display = () => {
  const [password, setPassword] = useState("");
  const [rangeValue, setRange] = useState("");
  const [passwordProps, setPasswordProps] = useState();
  const [tooltip, setTooltip] = useState(false);
  const [type, setType] = useState("password");
  const passwordRef = useRef(null);
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

  return (
    <>
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

              <Modal password="alok"/>
              
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
    </>
  );
};

const selectTagStyle = {
  backgroundColor: "inherit",
  color: "#506175",
  width: "20%",
  height: "auto",
  marginLeft: "-4px",
};
