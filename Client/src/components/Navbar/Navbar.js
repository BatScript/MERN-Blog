import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import ThemeContext from "../../contexts/Theme/ThemeContext";

function Navbar(props) {

  const { lightMode, setLightMode } = useContext(ThemeContext);

  const handleTheme = () => {
    setLightMode(!lightMode);
  }

  var light = lightMode;

  console.log(light);

  const nightIcon = <h1><i className="bi bi-moon-stars"></i></h1>;

  const dayIcon = <h1><i className="bi bi-sun-fill"></i></h1>;

  const loginButton = (<div className={styles.mla}><Link to="login"><button className={styles.login}>Login <span>🤝</span></button></Link></div>)

  const user = null;

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark`}>
      <div className={`container-fluid`}>
        <Link className={`"navbar-brand" ${styles.brand} ${light ? styles.td : styles.tw}`} to="">
          BloMo
        </Link>
        {user ? <span>Welcome {user}</span> : loginButton}
        <button className={`${styles.themeChange}  ${light ? styles.td : styles.tw}`} onClick={handleTheme}>
          {lightMode ? dayIcon : nightIcon}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
