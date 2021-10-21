import { DataStore } from "@aws-amplify/datastore";
import { UserCollection } from "./models";

export async function findUsersCollection(userID) {
  const foundUserCollection = await DataStore.query(UserCollection, (u) =>
    u.userID("eq", userID)
  );
  //console.log("Found collection", foundUserCollection);
  if (foundUserCollection === undefined) {
    return null;
  }
  return foundUserCollection;
}
