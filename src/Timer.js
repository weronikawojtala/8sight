import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useEffect, useRef, useState } from "react";
import alertSound from "./sounds/hero_simple-celebration-03.wav";
import { Button } from "react-bootstrap";

const alertAudio = new Audio(alertSound);
const playAudio = (file) => {
  const resp = file.play();
};

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    playAudio(alertAudio);
    return <div className="timer">Exercise finished!</div>;
  }

  return (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  );
};

// const minuteSeconds = 60;
// const hourSeconds = 3600;

// const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
// const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;

// const start = Date.now() / 1000;
// const end = start + 243248;

// const remainingTime = end - start;

// const timerProps = {
//   isPlaying: true,
//   size: 120,
//   strokeWidth: 6,
// };

// const renderTime = (dimension, time) => {
//   return (
//     <div className="time-wrapper">
//       <div className="time">{time}</div>
//       <div>{dimension}</div>
//     </div>
//   );
// };

const Timer = (props) => {
  const [isStart, setStart] = useState(false);
  const handleStartExercise = () => {
    setStart(true);
  };

  useEffect(() => {
    //console.log(props.time);
  }, []);

  return (
    <div>
      <CountdownCircleTimer
        isPlaying={isStart}
        duration={props.time}
        colors={[
          ["#004777", 0.33],
          ["#F7B801", 0.33],
          ["#A30000", 0.33],
        ]}
        onComplete={() => setStart(false)}
      >
        {renderTime}
      </CountdownCircleTimer>
      <Button className="btn" onClick={handleStartExercise}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Start exercise
      </Button>
    </div>
  );
  //   return (
  //     <div className="timer">
  //       <CountdownCircleTimer
  //         {...timerProps}
  //         colors={[["#EF798A"]]}
  //         duration={hourSeconds}
  //         initialRemainingTime={remainingTime % hourSeconds}
  //         onComplete={(totalElapsedTime) => [
  //           remainingTime - totalElapsedTime > minuteSeconds,
  //         ]}
  //       >
  //         {({ elapsedTime }) =>
  //           renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))
  //         }
  //       </CountdownCircleTimer>
  //       <CountdownCircleTimer
  //         {...timerProps}
  //         colors={[["#218380"]]}
  //         duration={minuteSeconds}
  //         initialRemainingTime={remainingTime % minuteSeconds}
  //         onComplete={(totalElapsedTime) => [
  //           remainingTime - totalElapsedTime > 0,
  //         ]}
  //       >
  //         {({ elapsedTime }) =>
  //           renderTime("seconds", getTimeSeconds(elapsedTime))
  //         }
  //       </CountdownCircleTimer>
  //     </div>
  //   );
};

export default Timer;
