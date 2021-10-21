import { DataStore } from "@aws-amplify/datastore";
import { UserCollection } from "./models";

export async function findExerciseInCollection(userID, exerciseID) {
  console.log(exerciseID);
  const foundUserCollection = await DataStore.query(UserCollection, (u) =>
    u.userID("eq", userID).exerciseID("eq", exerciseID)
  );
  const exerciseInCollection = foundUserCollection[0];
  if (exerciseInCollection === undefined) {
    return null;
  }
  return exerciseInCollection;
}
