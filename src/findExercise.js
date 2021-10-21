import { DataStore } from "@aws-amplify/datastore";
import { Exercise } from "./models";

export async function findExercise(exerciseID) {
  const foundExercise = await DataStore.query(Exercise, (e) => {
    e.id("contains", exerciseID);
  });
  const exercise = foundExercise.filter((e) => e.id === exerciseID);
  return exercise[0];
}
