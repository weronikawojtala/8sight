import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { findUsersCollection } from "./findUsersCollection";
import { findExercises } from "./findExercises";
import { DataStore } from "@aws-amplify/datastore";
import { UserHistory } from "./models";

const UsersExerciseTable = (props) => {
  const [collection, setCollection] = useState([]);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetchUsersExercises();
  }, []);

  async function fetchUsersExercises() {
    getCollection();
    const IDs = await getIDs();
    await getHistory(IDs);
  }

  async function getCollection() {
    const usersCollection = await findUsersCollection(props.user.id);
    //console.log(usersCollection);
    if (usersCollection === null) {
      return;
    }
    setCollection(usersCollection);
  }

  async function getIDs() {
    let exerciseIDs = [];
    //console.log(collection);
    for (var i = 0; i < collection.length; i++) {
      exerciseIDs.push(collection[i].id);
    }
    //console.log("exerciseIDs", exerciseIDs);
    return exerciseIDs;
  }

  async function getHistory(IDs) {
    const ex = [];
    //console.log("IDs", IDs);
    for (var i = 0; i < IDs.length; i++) {
      let model = await DataStore.query(UserHistory, (u) => {
        u.exerciseID("eq", IDs[i]).userID("eq", props.user.id);
      });
      ex.push(model);
    }
    //console.log("ex", ex);
    if (ex !== undefined) {
      const filtered = ex[0].filter((e) => e.done === true);
      console.log("Filtered", filtered);
      setExercises(filtered);
    }
  }

  function changeDate(date) {
    let dbdate = date.split("T");
    let datefromslice = dbdate[0].slice(0, dbdate[0].length);
    let splitted = datefromslice.split("-");
    const newDate = splitted[2] + "-" + splitted[1] + "-" + splitted[0];
    return newDate;
  }

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
            {exercises.map((e) => (
              <tr key={e.exerciseID + "_" + Math.random()}>
                <td>{e.exerciseID}</td>
                <td>{e.numberOfCompleted}</td>
                <td>{changeDate(e)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default UsersExerciseTable;
