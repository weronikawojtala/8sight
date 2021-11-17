import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type UserCollectionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserAwardMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserHistoryMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AwardMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ExerciseMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class UserCollection {
  readonly id: string;
  readonly userID?: string;
  readonly exerciseID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserCollection, UserCollectionMetaData>);
  static copyOf(source: UserCollection, mutator: (draft: MutableModel<UserCollection, UserCollectionMetaData>) => MutableModel<UserCollection, UserCollectionMetaData> | void): UserCollection;
}

export declare class UserAward {
  readonly id: string;
  readonly date?: string;
  readonly userID?: string;
  readonly awardID?: string;
  readonly progress?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserAward, UserAwardMetaData>);
  static copyOf(source: UserAward, mutator: (draft: MutableModel<UserAward, UserAwardMetaData>) => MutableModel<UserAward, UserAwardMetaData> | void): UserAward;
}

export declare class UserHistory {
  readonly id: string;
  readonly done?: boolean;
  readonly date?: string;
  readonly alert?: string;
  readonly numberOfCompleted?: number;
  readonly userID?: string;
  readonly exerciseID?: string;
  readonly doneFromAlert?: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserHistory, UserHistoryMetaData>);
  static copyOf(source: UserHistory, mutator: (draft: MutableModel<UserHistory, UserHistoryMetaData>) => MutableModel<UserHistory, UserHistoryMetaData> | void): UserHistory;
}

export declare class Award {
  readonly id: string;
  readonly name: string;
  readonly criteria?: (number | null)[];
  readonly UserAwards?: (UserAward | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Award, AwardMetaData>);
  static copyOf(source: Award, mutator: (draft: MutableModel<Award, AwardMetaData>) => MutableModel<Award, AwardMetaData> | void): Award;
}

export declare class Exercise {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly time?: number;
  readonly userhistoryID?: string;
  readonly UserHistories?: (UserHistory | null)[];
  readonly image?: string;
  readonly UserCollection?: (UserCollection | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Exercise, ExerciseMetaData>);
  static copyOf(source: Exercise, mutator: (draft: MutableModel<Exercise, ExerciseMetaData>) => MutableModel<Exercise, ExerciseMetaData> | void): Exercise;
}

export declare class User {
  readonly id: string;
  readonly username: string;
  readonly lastLogin?: string;
  readonly UserHistory?: (UserHistory | null)[];
  readonly UserAwards?: (UserAward | null)[];
  readonly UserCollection?: (UserCollection | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}