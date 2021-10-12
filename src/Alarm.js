import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = () => toast("It's time!");

const Alarm = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [alarmTime, setAlarmTime] = useState("");
  const [alarmMessage, setAlarmMessage] = useState("");

  const checkAlarmClock = () => {
    if (alarmTime == "undefined" || !alarmTime) {
      setAlarmMessage("Please set your alarm.");
    } else {
      setAlarmMessage("Your alarm is set for " + alarmTime + ".");
      if (currentTime === alarmTime) {
        notify();
      } else {
        console.log("not yet");
      }
    }
  };

  // const clock = setInterval(setCurrentTime(), 1000);
  // const interval = setInterval(checkAlarmClock(), 1000);

  useEffect(() => {
    //clearInterval(clock);
    //clearInterval(interval);
    setCurrentTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    checkAlarmClock();
  });
  // }, [clock, interval]);

  const setAlarm = (event) => {
    event.preventDefault();
    const inputAlarmTimeModified = event.target.value + ":00";
    setAlarmTime(inputAlarmTimeModified);
  };

  return (
    <div>
      <h1>React Alarm Clock</h1>
      <h2>It is {currentTime}.</h2>
      <h2>{alarmMessage}</h2>
      <form>
        <input type="time" onChange={setAlarm}></input>
      </form>
      <ToastContainer position="bottom-right" hideProgressBar={true} />
    </div>
  );
};

export default Alarm;
