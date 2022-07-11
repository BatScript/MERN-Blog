import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../../store/themeSlice";

function Navbar(props) {
  const dispatch = useDispatch();

  const changeTheme = () => {
    dispatch(themeActions.toggleMode());
  }

  const isDark = useSelector((state) => state.theme.isDark)

  const moon = <span className="material-symbols-outlined">dark_mode</span>;

  const sun = <span className="material-symbols-outlined">light_mode</span>

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark ${isDark ? "blomo_text_light" : "blomo_text_dark"}`}>
      <div className={`container-fluid`}>
        <Link className={`navbar-brand ${styles.brand}`} to="">
          BloMo
        </Link>
        <div onClick={changeTheme} className={styles.colorTheme}>
          {isDark ? moon : sun}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
