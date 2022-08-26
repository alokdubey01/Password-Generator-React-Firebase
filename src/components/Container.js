import React, { useState, useEffect, useMemo } from "react";
import { copyToClipBoard, generatePassword, setPasswordLength } from "../utils";
import { CheckBox } from "./Helper/ChechBox";
import { Modal } from "./Helper/Modal";
import { Slider } from "./Helper/Slider";

const CHECKBOX_LIST = [
  {
    id: 0,
    name: "uppercase",
    label: "Uppercase",
    isChecked: true,
  },
  {
    id: 1,
    name: "lowercase",
    label: "Lowercase",
    isChecked: true,
  },
  {
    id: 2,
    name: "symbols",
    label: "Symbols",
    isChecked: true,
  },
  {
    id: 3,
    name: "numbers",
    label: "Numbers",
    isChecked: true,
  },
];

export const Container = (props) => {
  const { setPassword, setRange, setPasswordProps, passwordRef, type } = props;

  const [rangeValue, setRangeValue] = useState(12);
  const [checkbox, setCheckBox] = useState({
    uppercase: true,
    lowercase: true,
    symbols: true,
    numbers: true,
  });
  const [checked, setChecked] = useState(false);
  const [show, setshow] = useState(false);
  const [checkedName, setCheckedName] = useState("");
  const [minMaxValue, setMinMaxValue] = useState({
    min: 1,
    max: 60,
  });

  const { uppercase, lowercase, symbols, numbers } = checkbox;
  const { min, max } = minMaxValue;

  useEffect(() => {
    setPasswordLength(rangeValue);
    setRange(rangeValue);
    setRangeValue(rangeValue);
    passwordGenerated(checkbox, rangeValue);

    checkBoxCount();

    // eslint-disable-next-line
  }, [uppercase, lowercase, symbols, numbers]);

  const checkBoxCount = () => {
    const checkedCount = Object.keys(checkbox).filter((key) => checkbox[key]);
    const disabled = checkedCount.length === 1;
    const name = checkedCount[0];
    if (disabled) {
      setChecked(disabled);
      setCheckedName(name);
    } else {
      setChecked(false);
      setCheckedName("");
    }
  };

  const updateCheckBoxes = () => {
    if (type === "pin") {
      CHECKBOX_LIST.map((checkbox) => {
        const name = checkbox.name;
        if (name !== "numbers") {
          checkbox.isChecked = false;
          const checkboxProps = {
            name,
            checkedName: name,
            checked: true,
            isChecked: checkbox.isChecked,
            min: 0,
            max: 15,
            length: 3,
          };
          checkBoxProperties(checkboxProps);
        }
        return "";
      });
    } else {
      CHECKBOX_LIST.map((checkbox) => {
        const name = checkbox.name;
        checkbox.isChecked = true;
        const checkboxProps = {
          name,
          checkedName: "",
          checked: false,
          isChecked: checkbox.isChecked,
          min: 1,
          max: 60,
          length: 12,
        };
        checkBoxProperties(checkboxProps);
        return "";
      });
    }
  };

  const checkBoxProperties = (checkBoxProps) => {
    const { name, checked, isChecked, checkedName, min, max, length } =
      checkBoxProps;

    setCheckBox((prevState) => ({ ...prevState, [name]: isChecked }));
    setChecked(checked);
    setCheckedName(checkedName);
    setPasswordLength(length);
    setMinMaxValue({ min, max });
    setRangeValue(length);
    setRange(length);
  };

  useMemo(updateCheckBoxes, [type]);

  const passwordGenerated = (checkbox, rangeValue) => {
    const pwd =
      rangeValue > 3
        ? generatePassword(checkbox, rangeValue)
        : generatePassword(checkbox, 3);
    setPassword(pwd);
    setPasswordProps(checkbox);
  };

  const onChangeSlider = (e) => {
    setPasswordLength(e.target.value);
    setRangeValue(e.target.value);
    setRange(e.target.value);
    passwordGenerated(checkbox, e.target.value);
  };

  const onChangeCheckBox = (e) => {
    if (type !== "pin") {
      let { name, checked } = e.target;
      CHECKBOX_LIST.map((checkbox) => {
        if (checkbox.name === name) {
          checkbox.isChecked = checked;
          setCheckBox((prevState) => ({
            ...prevState,
            [name]: checkbox.isChecked,
          }));
          setPasswordLength(rangeValue);
          setRangeValue(rangeValue);
        }

        return "";
      });
    }
  };

  const copyClipBoard = (elementRef) => (e) => {
    e.preventDefault();
    copyToClipBoard(elementRef);
  };

  return (
    <>
      <div className="relative block p-8 overflow-hidden border border-slate-100 rounded-lg ml-6 mr-6 mt-4">
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <div className="justify-between">
          <h1 className="password-display-input text-xl font-bold text-black">
            Use the slider, and select from the options.
          </h1>
          <Slider
            min={parseInt(min, 10)}
            max={parseInt(max, 10)}
            step={1}
            defaultLength={parseInt(rangeValue, 10)}
            value={parseInt(rangeValue, 10)}
            onChangeValue={onChangeSlider}
          />

          <div className="row checkbox-container">
            {CHECKBOX_LIST.map((checkbox) => (
              <CheckBox
                key={checkbox.id}
                name={checkbox.name}
                checked={checkbox.isChecked}
                label={checkbox.label}
                value={checkbox.isChecked}
                onChange={onChangeCheckBox}
                disabled={
                  checked && checkbox.isChecked && checkedName === checkbox.name
                }
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
