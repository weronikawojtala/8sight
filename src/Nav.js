import Button from "react-bootstrap/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav class="navbar navbar-light fixed-top">
      <div class="container-fluid">
        <div class="logo-name">
          <a class="navbar-brand" href="#">
            <span class="logo2">[</span>
            <div className="letters">
              <span class="logo">8sight</span>
            </div>
            <span class="logo2">]</span>
          </a>
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
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
              Menu
            </h5>
            <button
              type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <Link to="/">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
              </Link>
              <Link to="/profile">
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Profile
                  </a>
                </li>
              </Link>
              <Link to="/exercises">
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Exercises
                  </a>
                </li>
              </Link>
            </ul>
            <form class="d-flex">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <Button class="btn" type="submit">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Search
              </Button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
