import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { findUsersCollection } from "./findUsersCollection";
import { findExercise } from "./findExercise";
import { User } from "./models";
import { DataStore } from "@aws-amplify/datastore";
import { UserHistory } from "./models";
import { Spinner } from "reactstrap";

const UsersExerciseTable = (props) => {
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState([]);
  const [IDs, setIDs] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [exerciseNames, setExerciseNames] = useState([]);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const getCollection = async () => {
      const foundUser = await DataStore.query(User, (u) =>
        u.username("eq", props.user.username)
      );
      const usersCollection = await findUsersCollection(foundUser[0].id);
      if (usersCollection === null) {
        return;
      } else {
        setCollection(usersCollection);
      }
    };

    getCollection();
  }, []);

  useEffect(() => {
    const getIDs = async () => {
      let exerciseIDs = [];
      for (var i = 0; i < collection.length; i++) {
        exerciseIDs.push(collection[i].id);
      }
      setIDs(exerciseIDs);
    };

    getIDs(collection);
  }, [collection]);

  useEffect(() => {
    const getHistory = async () => {
      const ex = [];
      for (var i = 0; i < IDs.length; i++) {
        let model = await DataStore.query(UserHistory, (u) => {
          u.exerciseID("eq", IDs[i]).userID("eq", props.user.id);
        });
        ex.push(model);
      }
      if (
        typeof ex !== "undefined" &&
        typeof ex !== "null" &&
        ex.length !== 0
      ) {
        const filtered = ex[0].filter((e) => e.done === true);
        setExercises(filtered);
      }
    };

    getHistory(IDs);
  }, [IDs]);

  useEffect(() => {
    const getNames = async () => {
      const names = [];
      for (var i = 0; i < exercises.length; i++) {
        let name = await findExercise(exercises[i].exerciseID);
        names.push(name.name);
      }
      setExerciseNames(names);
    };

    getNames();
  }, [exercises]);

  useEffect(() => {
    var allInfo = [];

    const getInfo = () => {
      for (var i = 0; i < exercises.length; i++) {
        allInfo.push([exercises[i], exerciseNames[i]]);
      }
      setInfo(allInfo);
      setLoading(false);
    };

    getInfo();
  }, [exerciseNames]);

  const showSpinner = () => {
    return (
      <div className={"spinner-container"}>
        <Spinner color="dark" />
      </div>
    );
  };

  function changeDate(date) {
    let dbdate = date.split("T");
    let datefromslice = dbdate[0].slice(0, dbdate[0].length);
    let splitted = datefromslice.split("-");
    const newDate = splitted[2] + "/" + splitted[1] + "/" + splitted[0];
    return newDate;
  }

  if (loading) {
    return showSpinner();
  } else {
    return (
      <div className="card">
        <div className="card-info">
          <Table borderless>
            <thead>
              <tr>
                <th>Exercise name</th>
                <th>Number of completed times</th>
                <th>Date of last completed</th>
              </tr>
            </thead>
            <tbody>
              {info.map((e) => (
                <tr key={e[0].exerciseID + "_" + Math.random()}>
                  <td>{e[1]}</td>
                  <td>{e[0].numberOfCompleted}</td>
                  <td>{changeDate(e[0].date)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
};

export default UsersExerciseTable;
