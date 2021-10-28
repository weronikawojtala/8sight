import Search from "./Search";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Exercise } from "./models";

const Exercises = () => {
  useEffect(() => {
    getExercises();
  }, []);

  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getExercises() {
    const exercises = await DataStore.query(Exercise);
    setExercises(exercises);
    setLoading(false);
  }

  const showSpinner = () => {
    return (
      <div className={"spinner-container"}>
        <Spinner color="dark" />
      </div>
    );
  };
  if (loading) {
    return showSpinner();
  } else {
    return <Search details={exercises} />;
  }
};

export default Exercises;
