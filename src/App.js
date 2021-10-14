import "./App.css";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Toast } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Offcanvas } from "bootstrap";
import MenuIcon from "@mui/icons-material/Menu";
//import Carousel from "react-bootstrap/Carousel";
import useCountDown from "react-countdown-hook";
//import Backdrop from "@mui/core/Backdrop";
import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
//import i1 from "./img/2.jpg";
import Greeting from "./Greeting";
import Alarm from "./Alarm";
import Exercises from "./Exercises";
import UsersAwardsTable from "./UsersAwardsTable";
import Nav from "./Nav";
import Exercise from "./Exercise";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "./Profile";
import "react-toastify/dist/ReactToastify.css";
<style>
  @import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
</style>;

const initialTime = 60 * 1000; // initial time in milliseconds, defaults to 60000
const interval = 1000;

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 6,
};

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

function App() {
  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = stratTime + 243248; // use UNIX timestamp in seconds

  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  const [timeLeft, { start, pause, resume, reset }] = useCountDown(
    initialTime,
    interval
  );

  React.useEffect(() => {
    start();
  }, []);

  const restart = React.useCallback(() => {
    // you can start existing timer with an arbitrary value
    // if new value is not passed timer will start with initial value
    const newTime = 42 * 1000;
    start(newTime);
  }, []);

  return (
    <body>
      <Router>
        <Nav />
        <main>
          <section class="glass">
            <div class="dashboard">
              {/* <div class="user">
                <img src="./images/avatar.png" alt="" />
                <h3>Simo Edwin</h3>
                <p>Pro Member</p>
              </div> */}
              {/* <div class="links">
                <div class="link">
                  <img src="./images/twitch.png" alt="" />
                  <h2>Streams</h2>
                </div>
                <div class="link">
                  <img src="./images/steam.png" alt="" />
                  <h2>Games</h2>
                </div>
                <div class="link">
                  <img src="./images/upcoming.png" alt="" />
                  <h2>New</h2>
                </div>
                <div class="link">
                  <img src="./images/library.png" alt="" />
                  <h2>Library</h2>
                </div>
              </div> */}
              {/* <div class="pro">
              <h2>Join pro for free games.</h2>
              <img src="./images/controller.png" alt="" />
            </div> */}
            </div>
            <div class="games">
              <div class="status">
                <Switch>
                  <Route path="/" exact component={Greeting} />
                  <Route path="/profile" component={Profile} />
                  <Route path="/exercises" exact component={Exercises} />
                  <Route path="/exercises/:id" component={Exercise} />
                </Switch>
              </div>
              <Button className="btn" size="lg">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                button
              </Button>
              <p>Time left: {timeLeft}</p>

              <button onClick={restart}>Restart counter with 42 seconds</button>
              <div className="timer">
                <CountdownCircleTimer
                  {...timerProps}
                  colors={[["#7E2E84"]]}
                  duration={daysDuration}
                  initialRemainingTime={remainingTime}
                >
                  {({ elapsedTime }) =>
                    renderTime("days", getTimeDays(daysDuration - elapsedTime))
                  }
                </CountdownCircleTimer>
                <CountdownCircleTimer
                  {...timerProps}
                  colors={[["#D14081"]]}
                  duration={daySeconds}
                  initialRemainingTime={remainingTime % daySeconds}
                  onComplete={(totalElapsedTime) => [
                    remainingTime - totalElapsedTime > hourSeconds,
                  ]}
                >
                  {({ elapsedTime }) =>
                    renderTime("hours", getTimeHours(daySeconds - elapsedTime))
                  }
                </CountdownCircleTimer>
                <CountdownCircleTimer
                  {...timerProps}
                  colors={[["#EF798A"]]}
                  duration={hourSeconds}
                  initialRemainingTime={remainingTime % hourSeconds}
                  onComplete={(totalElapsedTime) => [
                    remainingTime - totalElapsedTime > minuteSeconds,
                  ]}
                >
                  {({ elapsedTime }) =>
                    renderTime(
                      "minutes",
                      getTimeMinutes(hourSeconds - elapsedTime)
                    )
                  }
                </CountdownCircleTimer>
                <CountdownCircleTimer
                  {...timerProps}
                  colors={[["#218380"]]}
                  duration={minuteSeconds}
                  initialRemainingTime={remainingTime % minuteSeconds}
                  onComplete={(totalElapsedTime) => [
                    remainingTime - totalElapsedTime > 0,
                  ]}
                >
                  {({ elapsedTime }) =>
                    renderTime("seconds", getTimeSeconds(elapsedTime))
                  }
                </CountdownCircleTimer>
              </div>
              <div className="card">
                <ProgressBar now={60} />
                <ProgressBar animated now={45} />
                <div>
                  <ProgressBar striped now={20} />
                  <ProgressBar striped variant="warning" now={60} />
                  <ProgressBar striped variant="danger" now={80} />
                  <ProgressBar striped variant="info" now={80} />
                  <ProgressBar striped variant="success" now={80} />
                </div>
              </div>
              <Greeting />
              <div class="cards">
                <UsersAwardsTable />
                <div class="card">
                  <img src="./images/spiderman.png" alt="" />
                  <div class="card-info">
                    <h2>Spiderman Miles Morales</h2>
                    <p>PS5 Version</p>
                    <div class="progress"></div>
                  </div>
                  <h2 class="percentage">60%</h2>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Alarm />
      </Router>
    </body>
  );
}

export default App;
