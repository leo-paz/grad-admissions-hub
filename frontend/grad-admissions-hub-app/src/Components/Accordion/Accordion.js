import React, { useState, useRef, useEffect } from "react";
import Chevron from "./Chevron";

import lottie from 'lottie-web';

import "./Accordion.css";

function Accordion(props) {

  const reviewContainer = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: reviewContainer.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: require('../../animations/review.json'),
      name: `review${props.id}`
    })
  }, [])

  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__icon");
  const [setShadow, setShadowState] = useState('none');

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
    setShadowState(
      setActive === "active" ? "none" : "2px 1px 6px 1px #848484"
    )
  }

  return (
    <div className="accordion__section">
      <button
        onMouseEnter={() => lottie.play(`review${props.id}`)}
        onMouseLeave={() => lottie.stop(`review${props.id}`)}
        className={`accordion ${setActive}`} 
        onClick={toggleAccordion}
        >
        <p className="accordion__title">{`"${props.title}"`}</p>
        <div className="review-animation" ref={reviewContainer} />
        {/* <Chevron className={`${setRotate}`} width={10} fill={"#777"} /> */}
      </button>
      <div
        ref={content}
        style={{
          maxHeight: `${setHeight}`,
          boxShadow: `${setShadow}`
        }}
        className="accordion__content"
      >
        {/* <div
          className="accordion__text"
          dangerouslySetInnerHTML={{ __html: props.content }}
        /> */}
        <div className="inner-content">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Accordion;
