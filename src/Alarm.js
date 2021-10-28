import { React, useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import alertSound from "./sounds/alert_high-intensity.wav";
import { findExercise } from "./findExercise";

const alertAudio = new Audio(alertSound);
const playAudio = (file) => {
  file.play();
};

const Alarm = (props) => {
  const [currentTime, setCurrentTime] = useState("");
  // const [alarmTime, setAlarmTime] = useState([""]);
  // const [alarmMessage, setAlarmMessage] = useState("");
  const [numberOfAlerts, setNumberOfAlerts] = useState(0);
  const [currentDate, setCurrentDate] = useState("");
  const [alarmsFromDatabase, setAlarmsFromDatabase] = useState([]);
  const [exercisesFromDatabase, setExercisesFromDatabase] = useState([]);

  const customId = "custom-id-yes";
  const notify = (name) =>
    toast("It's time for " + name, {
      toastId: customId,
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
  };

  const checkAlarmClock = () => {
    function changeTime(date) {
      let dbdate = date.split("T");
      let datefromslice = dbdate[1].slice(0, dbdate[0].length);
      let newTime = datefromslice.slice(0, -1);
      return newTime;
    }

    function changeDate(date) {
      let dbdate = date.split("T");
      let newDate = dbdate[0].slice(0, dbdate[0].length);
      return newDate;
    }

    async function notifyAboutExercise(exerciseid) {
      let exercise = await findExercise(exerciseid);
      notify(exercise.name);
    }

    for (var i = 0; i < alarmsFromDatabase.length; i++) {
      let timeAlarm = changeTime(alarmsFromDatabase[i]) + ":00";
      let dateAlarm = changeDate(alarmsFromDatabase[i]);
      if (currentTime == timeAlarm && dateAlarm == currentDate) {
        notifyAboutExercise(exercisesFromDatabase[i]);
      }
    }

    // if (alarmTime == "undefined" || !alarmTime) {
    //   setAlarmMessage("Please set your alarm.");
    // } else {
    //   setAlarmMessage("Your alarm is set for " + alarmTime + ".");
    //   if (currentTime === alarmTime) {
    //     notify();
    //   }
    // }
  };

  useEffect(() => {
    setAlarmsFromDatabase(props.alarms);
    setExercisesFromDatabase(props.exercises);
    const clock = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    }, 1000);
    checkNumberOfAlerts();
    notificationCount(numberOfAlerts);
    checkAlarmClock();
    return () => {
      clearInterval(clock);
    };
  });

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

  // const setAlarm = (event) => {
  //   event.preventDefault();
  //   const inputAlarmTimeModified = event.target.value + ":00";
  //   setAlarmTime(inputAlarmTimeModified);
  // };

  return (
    <div>
      {/* <h1>React Alarm Clock</h1>
      <h2>It is {currentTime}.</h2>
      <h2>{alarmMessage}</h2>
      <form>
        <input type="time" onChange={setAlarm}></input>
      </form>
      <button onClick={notify}>Click on me a lot!</button> */}
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
