// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { UserCollection, UserAward, UserHistory, Award, Exercise, User } = initSchema(schema);

export {
  UserCollection,
  UserAward,
  UserHistory,
  Award,
  Exercise,
  User
};