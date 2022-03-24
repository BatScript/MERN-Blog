import { useState } from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  function searchSubmitHandler(e) {
    e.preventDefault();
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link className={`"navbar-brand" ${styles.brand}`} to="">
          BLEAURGH
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className={`d-flex float-right ${styles.ml_auto}`}>
            <input
              value={searchQuery}
              className={`form-control me-2 ${styles.searchBar} ${styles.searchInput}`}
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className={styles.navSubmit}
              type="submit"
              onClick={searchSubmitHandler}
            >
              <i className="bi bi-binoculars-fill"></i>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
