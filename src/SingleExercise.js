import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "react-bootstrap";
import Timer from "./Timer";
import { useEffect, useState } from "react";
import likeSound from "./sounds/hero_simple-celebration-03.wav";
import deleteSound from "./sounds/navigation_transition-left.wav";
import { findExercise } from "./findExercise";
import { findExerciseInCollection } from "./findExerciseInCollection";
import { DataStore } from "@aws-amplify/datastore";
import { UserCollection } from "./models";
import { useRouteMatch } from "react-router-dom";

const likeAudio = new Audio(likeSound);
const deleteAudio = new Audio(deleteSound);

const playAudio = (file) => {
  const resp = file.play();
};

async function createUserCollection(userID, exerciseID) {
  await DataStore.save(
    new UserCollection({
      userID: userID,
      exerciseID: exerciseID,
    })
  );
}

async function deleteUserCollection(userCollectionID) {
  const modelToDelete = await DataStore.query(UserCollection, userCollectionID);
  DataStore.delete(modelToDelete);
}

const SingleExercise = (props) => {
  const [disableLike, setDisableLike] = useState(false);
  const [disableDelete, setDisableDelete] = useState(false);
  const [time, setTime] = useState(0);

  let match = useRouteMatch("/exercises/:id");

  async function getTime() {
    const exercise = await findExercise(match.params.id);
    setTime(exercise.time);
  }

  useEffect(() => {
    getTime();
  }, []);

  const handleClickLikeButton = () => {
    playAudio(likeAudio);
    findUserCollection(props.user.id);
  };

  const handleDeleteButton = () => {
    playAudio(deleteAudio);
    deleteExerciseFromCollection(props.user.id);
  };

  async function deleteExerciseFromCollection(userID) {
    const exercise = await findExercise(match.params.id);

    const exerciseInCollection = await findExerciseInCollection(
      userID,
      exercise.id
    );
    if (exerciseInCollection === null) {
      setDisableDelete(true);
    } else if (exerciseInCollection.length !== 0) {
      deleteUserCollection(exerciseInCollection.id);
    } else {
      setDisableDelete(true);
    }
  }

  async function findUserCollection(userID) {
    const exercise = await findExercise(match.params.id);
    console.log(exercise.id);
    const exerciseInCollection = await findExerciseInCollection(
      userID,
      exercise.id
    );

    if (exerciseInCollection === null || exerciseInCollection.length === 0) {
      createUserCollection(userID, exercise.id);
    } else {
      setDisableLike(true);
    }
  }

  return (
    <div className="card">
      <div className="card-info">
        <h2>Exercise</h2>
        <Button
          disabled={disableLike}
          className="btn"
          size="lg"
          type="button"
          style={{ height: "40px", width: "40px" }}
          onClick={handleClickLikeButton}
        >
          <span></span>
          <span></span>
          <span></span>
          <span />
          <div>
            <FavoriteIcon style={{ margin: "-10px", marginBottom: "0px" }} />
          </div>
        </Button>
        <Button
          className="btn"
          size="lg"
          type="button"
          style={{ height: "40px", width: "40px" }}
          onClick={handleDeleteButton}
          disabled={disableDelete}
        >
          <span></span>
          <span></span>
          <span></span>
          <span />
          <div>
            <DeleteIcon style={{ margin: "-8px", marginBottom: "2px" }} />
          </div>
        </Button>
        <Timer time={time} />
      </div>
    </div>
  );
};

export default SingleExercise;
