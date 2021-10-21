import { DataStore } from "@aws-amplify/datastore";
import { Exercise } from "./models";

export async function findExercises(exerciseID) {
  const foundExercises = await DataStore.query(Exercise, (e) => {
    e.id("eq", exerciseID);
  });
  return foundExercises;
}
