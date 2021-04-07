import React, { useState, useRef } from "react";
import Chevron from "../Accordion/Chevron";

import "./ProfSelectBox.css";

function ProfSelectBox({professors, onSelect, title}) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("selectbox__icon");

  const content = useRef(null);

  const toggleselectbox = () => {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setRotateState(
      setActive === "active" ? "selectbox__icon" : "selectbox__icon rotate"
    );
  }

  return (
    <div className="selectbox__section">
      <button className={`selectbox ${setActive}`} onClick={toggleselectbox}>
        <p className="selectbox__title">{title}</p>
        <Chevron className={`${setRotate}`} width={10} fill={"#777"} />
      </button>
      <div
        ref={content}
        style={{
          maxHeight: `${setHeight}`,
        }}
        className="selectbox__content"
      >
        {/* <div
          className="selectbox__text"
          dangerouslySetInnerHTML={{ __html: props.content }}
        /> */}
        <div className="inner-select-content">
          <ul className="dropdown">
              {professors && professors.map(elem => (
                 <li
                    onClick={() => onSelect(elem)} 
                    className="prof-item"
                    >
                     {elem.name}
                 </li> 
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfSelectBox;
