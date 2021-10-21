import Search from "./Search";
import { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Exercise } from "./models";

const Exercises = () => {
  useEffect(() => {
    getExercises();
  }, []);

  const [exercises, setExercises] = useState([]);

  async function getExercises() {
    const exercises = await DataStore.query(Exercise);
    setExercises(exercises);
  }

  return <Search details={exercises} />;
};

export default Exercises;
