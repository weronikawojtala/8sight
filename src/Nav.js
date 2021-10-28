import Button from "react-bootstrap/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { Auth, Hub } from "aws-amplify";

const Nav = () => {
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
          class="btn"
          size="lg"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          style={{ height: "40px", width: "40px" }}
        >
          <span></span>
          <span></span>
          <span></span>
          <span />
          <div>
            <MenuIcon style={{ margin: "-8px", marginBottom: "3px" }} />
          </div>
        </Button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Menu
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <Link to="/">
                <li className="nav-item">
                  <a className="nav-link active">
                    <h5>Home</h5>
                  </a>
                </li>
              </Link>
              <Link to="/profile">
                <li className="nav-item">
                  <a className="nav-link">Profile</a>
                </li>
              </Link>
              <Link to="/exercises">
                <li className="nav-item">
                  <a className="nav-link">Exercises</a>
                </li>
              </Link>
              <CustomSignOutButton />
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
