import UsersAwardsTable from "./UsersAwardsTable";
import UsersExerciseTable from "./UsersExerciseTable";

const Profile = (props) => {
  return (
    <div className="cards">
      <div className="card">
        <h2>Profile information</h2>
        <UsersAwardsTable user={props.user} />
        <UsersExerciseTable user={props.user} />
      </div>
    </div>
  );
};

export default Profile;
