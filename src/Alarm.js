import { React, useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import alertSound from "./sounds/alert_high-intensity.wav";

const alertAudio = new Audio(alertSound);
const playAudio = (file) => {
  file.play();
};

const Alarm = (props) => {
  const [currentTime, setCurrentTime] = useState("");
  const [alarmTime, setAlarmTime] = useState("");
  const [alarmMessage, setAlarmMessage] = useState("");
  const [numberOfAlerts, setNumberOfAlerts] = useState(0);
  const [currentDate, setCurrentDate] = useState("");

  // let number = document.getElementsByClassName("Toastify__toast").length;
  // console.log("Number of alerts", numberOfAlerts);
  //const customId = "custom-id-yes";
  const notify = () =>
    toast("It's time!", {
      // toastId: customId,
      onOpen: () => {
        playAudio(alertAudio);
        checkNumberOfAlerts();
        notificationCount(numberOfAlerts);
      },
      onClose: () => {
        checkNumberOfAlerts();
        notificationCount(numberOfAlerts);
      },
    });

  const notificationCount = (number) => {
    //console.log("Number z funkcji", number);
    const pattern = /^\(\d+\)/;
    if (number === 0 || pattern.test(document.title)) {
      document.title = document.title.replace(
        pattern,
        number === 0 ? "" : "(" + number + ")"
      );
    } else {
      document.title = "(" + number + ")" + " " + document.title;
    }
  };

  const checkNumberOfAlerts = () => {
    let number = document.getElementsByClassName("Toastify__toast").length;
    setNumberOfAlerts(number);
    //console.log("Number of alerts w hooku", numberOfAlerts);
  };

  const checkAlarmClock = () => {
    if (alarmTime == "undefined" || !alarmTime) {
      setAlarmMessage("Please set your alarm.");
    } else {
      setAlarmMessage("Your alarm is set for " + alarmTime + ".");
      if (currentTime === alarmTime) {
        notify();
      } else {
        //console.log("not yet");
      }
    }
  };
  // const sprawdzam = () => {
  //   setCurrentTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
  // };

  // const clock = setInterval(setCurrentTime(), 1000);
  // const interval = setInterval(checkAlarmClock(), 1000);

  useEffect(() => {
    const clock = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
      //checkAlarmClock();
    }, 1000);
    checkNumberOfAlerts();
    notificationCount(numberOfAlerts);
    // const interval_time = setInterval(() => {
    //   checkAlarmClock();
    // }, 1000);
    //clearInterval(clock);
    //clearInterval(interval);
    // sprawdzam();
    checkAlarmClock();
    //console.log("sprawdzam");
    return () => {
      clearInterval(clock);
      // clearInterval(interval_time);
    };
  });
  // }, [clock, interval]);

  useEffect(() => {
    var currentdate = new Date();

    var datetime =
      currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getDate();

    setCurrentDate(datetime);
  }, []);

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
      <button onClick={notify}>Click on me a lot!</button>
      <ToastContainer
        id="toast-container"
        position="bottom-right"
        hideProgressBar={true}
        autoClose={false}
      />
    </div>
  );
};

export default Alarm;
