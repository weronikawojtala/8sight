import Button from "react-bootstrap/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Auth, Hub } from "aws-amplify";

import Offcanvas from "react-bootstrap/Offcanvas";

const handleSignOutButtonClick = async () => {
  try {
    await Auth.signOut();
    Hub.dispatch("UI Auth", {
      event: "AuthStateChange",
      message: "signedout",
    });
  } catch (error) {
    console.log("Error message: ", error);
  }
};

const TestNav = () => {
  const [show, setShow] = useState(false);
  const [isOpenHome, setIsOpenHome] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenExercises, setIsOpenExercises] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleHome = () => {
    setIsOpenHome(!isOpenHome);
    if (isOpenProfile) {
      setIsOpenProfile(!isOpenProfile);
    }
    if (isOpenExercises) {
      setIsOpenExercises(!isOpenExercises);
    }
  };

  const toggleProfile = () => {
    if (isOpenHome) {
      setIsOpenHome(!isOpenHome);
    }
    setIsOpenProfile(!isOpenProfile);
    if (isOpenExercises) {
      setIsOpenExercises(!isOpenExercises);
    }
  };

  const toggleExercises = () => {
    if (isOpenHome) {
      setIsOpenHome(!isOpenHome);
    }
    if (isOpenProfile) {
      setIsOpenProfile(!isOpenProfile);
    }
    setIsOpenExercises(!isOpenExercises);
  };

  const CustomSignOutButton = () => {
    return (
      <Button className="btn" onClick={handleSignOutButtonClick}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Sign out
      </Button>
    );
  };

  return (
    <nav className="navbar navbar-light fixed-top">
      <div className="container-fluid">
        <div className="logo-name">
          <Link to="/">
            <a className="navbar-brand">
              <span className="logo2">[</span>
              <div className="letters">
                <span className="logo">8sight</span>
              </div>
              <span className="logo2">]</span>
            </a>
          </Link>
        </div>
        <Button
          variant="primary"
          onClick={handleShow}
          style={{ height: "40px", width: "40px" }}
        >
          <span></span>
          <span></span>
          <span></span>
          <span />
          <div>
            <MenuIcon style={{ margin: "-8px", marginBottom: "-3px" }} />
          </div>
        </Button>

        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Menu
              </h5>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <Link to="/">
                <li className="nav-item">
                  <a
                    onClick={(e) => {
                      toggleHome(e);
                    }}
                    className={"nav-link" + (isOpenHome ? " rotated" : "")}
                  >
                    Home
                  </a>
                </li>
              </Link>
              <Link to="/profile">
                <li className="nav-item">
                  <a
                    className={"nav-link" + (isOpenProfile ? " rotated" : "")}
                    onClick={(e) => {
                      toggleProfile(e);
                    }}
                  >
                    Profile
                  </a>
                </li>
              </Link>
              <Link to="/exercises">
                <li className="nav-item">
                  <a
                    className={"nav-link" + (isOpenExercises ? " rotated" : "")}
                    onClick={(e) => {
                      toggleExercises(e);
                    }}
                  >
                    Exercises
                  </a>
                </li>
              </Link>
              <CustomSignOutButton />
            </ul>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </nav>
  );
};

export default TestNav;
