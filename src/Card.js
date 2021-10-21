import React from "react";
import { Button } from "react-bootstrap";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";

function Card({ exercise }) {
  return (
    <div className="card">
      <div>
        <h2>{exercise.name}</h2>
        <p>{exercise.description}</p>
        <Link to={`/exercises/${exercise.id}`}>
          <Button
            className="btn"
            size="lg"
            type="button"
            style={{ height: "40px", width: "40px" }}
          >
            <span></span>
            <span></span>
            <span></span>
            <span />
            <div>
              <ArrowForwardIosIcon
                style={{ margin: "-8px", marginBottom: "2px" }}
              />
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Card;
