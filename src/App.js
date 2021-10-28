import "./App.css";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
//import Backdrop from "@mui/core/Backdrop";
import React from "react";
//import i1 from "./img/2.jpg";
import Greeting from "./Greeting";
import Alarm from "./Alarm";
import Exercises from "./Exercises";
import Nav from "./Nav";
import TestNav from "./TestNav";
import SingleExercise from "./SingleExercise";
import { DataStore } from "@aws-amplify/datastore";
import { UserHistory } from "./models";
import { Exercise } from "./models";
import { ToastContainer, toast } from "react-toastify";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import Profile from "./Profile";
import Opening from "./Opening";
import Timer from "./Timer";
import Amplify from "aws-amplify";
import config from "./aws-exports";
import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifySignUp,
} from "@aws-amplify/ui-react";
import "react-toastify/dist/ReactToastify.css";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import awsconfig from "./aws-exports";
import { User } from "./models";
<style>
  @import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
</style>;

Amplify.configure(config);
function App() {
  Amplify.configure(awsconfig);

  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();
  const [visible, setVisible] = useState(true);
  const [history, setHistory] = useState([]);
  const [alertDates, setAlertDates] = useState("");

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
      if (authData === undefined) {
      } else {
        let userData = authData.username;
        findUser(userData);
        if (visible === true) {
          const toastCustomId = "custom-id";
          toast("Welcome back " + authData.username + " 👀", {
            toastId: toastCustomId,
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setVisible(false);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (user !== undefined) {
      getUserHistory();
    }
  }, [user]);

  async function findUser(username) {
    const foundUser = await DataStore.query(User, (u) =>
      u.username("eq", username)
    );
    //console.log("Found user:", foundUser);
    if (foundUser.length > 0) {
      setUser(foundUser[0]);
      var currentdate = new Date();

      var datetime =
        currentdate.getFullYear() +
        "-" +
        (currentdate.getMonth() + 1) +
        "-" +
        currentdate.getDate();
      const copy = User.copyOf(foundUser[0], (copy) => {
        copy.lastLogin = datetime;
      });
      //console.log(copy);
      await DataStore.save(copy);
    }
  }

  /* Models in DataStore are immutable. To update a record you must use the copyOf function
 to apply updates to the item’s fields rather than mutating the instance directly */

  // async function updateUser() {
  //   await DataStore.save(
  //     User.copyOf(CURRENT_ITEM, (item) => {
  //       // Update the values on {item} variable to update DataStore entry
  //     })
  //   );
  // }

  async function onQuery() {
    // const exercise = await DataStore.query(Exercise, (u) =>
    //   u.name("eq", "Test")
    // );

    // console.log(exercise[0].id);

    const typedUser = await DataStore.query(Exercise, (u) =>
      u.name("eq", "Test")
    );

    //console.log(typedUser);

    const exercise = await DataStore.query(UserHistory, (u) =>
      u.exerciseID("eq", typedUser[0].id).done("eq", false)
    );

    //console.log(exercise[0].date);

    let fields = exercise[0].date;
    let dbdate = fields.split("T");
    // console.log(dbdate);
    let datefromslice = dbdate[1].slice(0, dbdate[1].length - 1);
    //console.log(datefromslice);

    var currentdate = new Date();

    var datetime =
      currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getDate() +
      "T" +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds() +
      "Z";

    //console.log(datetime);

    // await DataStore.save(
    //   new UserHistory({
    //     userID: user.id,
    //     done: true,
    //     date: "1970-01-01T12:30:23.999Z",
    //     alert: "1970-01-01T12:30:23.999Z",
    //     numberOfCompleted: 1020,
    //     exerciseID: exercise[0].id,
    //   })
    // );

    // const original = await DataStore.query(User, (u) =>
    //   u.username("eq", user.username)
    // );

    // console.log(original[0]);

    // for (let i = 0; i < original.length; i++) {
    //   DataStore.delete(original[i]);
    // }
    //DataStore.delete(original[0]);
    //console.log(original[0]);
    // const copy = User.copyOf(original[0], (copy) => {
    //   copy.username = "weronika";
    // });
    // console.log(copy);
    // await DataStore.save(copy);
  }

  async function createUser() {
    await DataStore.save(
      new User({
        username: user.username,
        lastLogin: new Date().toISOString().slice(0, 10),
      })
    );
  }

  async function getUserHistory() {
    const h = await DataStore.query(UserHistory, (u) => {
      u.userID("eq", user.id);
    });
    let alerts = [];
    for (var i = 0; i < h.length; i++) {
      alerts.push(h[i].alert);
    }
    setAlertDates(alerts);
    console.log(alerts);
  }

  return authState === AuthState.SignedIn && user ? (
    <body>
      <div className="App">
        <Router>
          <TestNav />
          <main>
            <section className="glass">
              <div className="dashboard">
                <div class="card profile-info">
                  <img src="./images/avatar.png" alt="" />
                  <h3>{user.username}</h3>
                  <p>
                    <b>Member</b>
                  </p>
                </div>
                <div className="card">
                  <h3>Rewards</h3>
                </div>
              </div>
              <div className="games">
                <div className="status">
                  <Switch>
                    {/* <Route path="/" exact component={Greeting} /> */}
                    {/* <Route path="/" exact component={Opening} /> */}
                    <Route path="/" exact>
                      <Greeting user={user} />
                    </Route>
                    <Route path="/profile">
                      <Profile user={user} />
                    </Route>
                    <Route path="/exercises" exact>
                      <Exercises user={user} />
                    </Route>
                    <Route path="/exercises/:id">
                      <SingleExercise user={user} />
                    </Route>
                  </Switch>
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
                <div className="cards">
                  <div className="card">
                    {/* <img src="./images/spiderman.png" alt="" />
                    <div className="card-info">
                      <h2>Spiderman Miles Morales</h2>
                      <p>PS5 Version</p>
                      <div className="progress"></div>
                    </div>
                    <h2 className="percentage">60%</h2> */}
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Alarm alarms={alertDates} />
        </Router>
      </div>
    </body>
  ) : (
    // <Opening />
    <AmplifyAuthenticator>
      <Opening />
      <AmplifySignIn headerText="8SIGHT" slot="sign-in"></AmplifySignIn>
      <AmplifySignUp
        slot="sign-up"
        formFields={[
          { type: "username" },
          { type: "password" },
          { type: "email" },
        ]}
      ></AmplifySignUp>
    </AmplifyAuthenticator>
  );
}
export default App;
