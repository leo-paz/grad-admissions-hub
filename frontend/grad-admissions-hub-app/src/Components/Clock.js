import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';

function Clock(props) {
  const [date, setDate] = useState(new Date());

 useEffect(() => {
  var timerID = setInterval( () => tick(), 1000 );

  return function cleanup() {
      clearInterval(timerID);
    };
 });

   function tick() {
    setDate(new Date());
   }

   return (
      <div>
        <h4>The local time is {date.toLocaleTimeString()}.</h4>
      </div>
    );
}
export default Clock;