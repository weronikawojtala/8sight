import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "react-bootstrap";
import Timer from "./Timer";
import { useEffect, useLayoutEffect, useState } from "react";
import likeSound from "./sounds/hero_simple-celebration-03.wav";
import deleteSound from "./sounds/navigation_transition-left.wav";
import { findExercise } from "./findExercise";
import { findExerciseInCollection } from "./findExerciseInCollection";
import { DataStore } from "@aws-amplify/datastore";
import { UserCollection, UserHistory } from "./models";
import { useRouteMatch } from "react-router-dom";
import i1 from "./img/2.jpg";

const likeAudio = new Audio(likeSound);
const deleteAudio = new Audio(deleteSound);

const playAudio = (file) => {
  const resp = file.play();
};

async function deleteUserCollection(userCollectionID) {
  const modelToDelete = await DataStore.query(UserCollection, userCollectionID);
  DataStore.delete(modelToDelete);
}

const SingleExercise = (props) => {
  const [userCollection, setUserCollection] = useState([]);
  const [disableLike, setDisableLike] = useState(false);
  const [disableDelete, setDisableDelete] = useState(false);
  const [alertDate, setAlertDate] = useState("");
  const [time, setTime] = useState(50);

  let match = useRouteMatch("/exercises/:id");

  async function createUserCollection(userID, exerciseID) {
    const collection = await DataStore.save(
      new UserCollection({
        userID: userID,
        exerciseID: exerciseID,
      })
    );
    setUserCollection(collection);
  }

  useLayoutEffect(() => {

    const getTime = async()=>{
      const exercise = await findExercise(match.params.id);
      setTime(exercise.time);
      console.log(time)
    }
    getTime();
  }, [time]);

  useEffect(() => {
    const findUserCollection = async () => {
      const exercise = await findExercise(match.params.id);
      const exerciseInCollection = await findExerciseInCollection(
        props.user.id,
        exercise.id
      );
      setUserCollection(exerciseInCollection);
    };
    findUserCollection();
  }, [userCollection]);

  useEffect(() => {
    const checkCollection = () => {
      if (userCollection === null || userCollection.length === 0) {
        setDisableLike(false);
        setDisableDelete(true);
      } else {
        setDisableDelete(false);
        setDisableLike(true);
      }
    };
    checkCollection();
  }, [userCollection]);

  const handleClickLikeButton = () => {
    playAudio(likeAudio);
    createUserCollection(props.user.id, match.params.id);
    //findUserCollection(props.user.id);
  };

  const handleDeleteButton = () => {
    playAudio(deleteAudio);
    deleteUserCollection(userCollection.id);
    setUserCollection([]);
    //deleteExerciseFromCollection(props.user.id);
  };

  // async function deleteExerciseFromCollection(userID) {
  //   const exercise = await findExercise(match.params.id);

  //   const exerciseInCollection = await findExerciseInCollection(
  //     userID,
  //     exercise.id
  //   );
  //   if (exerciseInCollection === null) {
  //     setDisableDelete(true);
  //   } else if (exerciseInCollection.length !== 0) {
  //     deleteUserCollection(exerciseInCollection.id);
  //   } else {
  //     setDisableDelete(true);
  //   }
  // }

  // async function findUserCollection(userID) {
  //   const exercise = await findExercise(match.params.id);
  //   const exerciseInCollection = await findExerciseInCollection(
  //     userID,
  //     exercise.id
  //   );

  //   if (exerciseInCollection === null || exerciseInCollection.length === 0) {
  //     createUserCollection(userID, exercise.id);
  //   } else {
  //     setDisableLike(true);
  //   }
  // }

  async function planExercise() {
    const findUserHistory = await DataStore.query(UserHistory, (u) => {
      u.exerciseID("eq", match.params.id);
    });
    const history = findUserHistory.filter(
      (history) => history.userID === props.user.id
    );

    const copy = UserHistory.copyOf(history[0], (copy) => {
      copy.alert = alertDate;
      copy.doneFromAlert = false;
    });
    await DataStore.save(copy);
    document.getElementById("datePicker").value= null;
  }

  function handleChangeDate(e){
setAlertDate(e.target.value+"Z")
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
        <div className="stylie">
          <img
            style={{ height: "100px" }}
            className="d-block w-100"
            src={i1}
            alt=""
          />
        </div>
        <Timer time={time} />
        <input
          type="datetime-local"
          class="search-input"
          id="datePicker"
          style={{ margin: "auto" }}
          onChange={handleChangeDate}
        />
        <Button className="btn" onClick={planExercise}>
          <span></span>
          <span></span>
          <span></span>
          <span />
          Plan exercise
        </Button>
      </div>
    </div>
  );
};

export default SingleExercise;
