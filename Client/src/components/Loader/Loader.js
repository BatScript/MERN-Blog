import loaderStyle from "./Loader.module.css";
import ThemeContext from "../../contexts/Theme/ThemeContext";
import { useContext } from "react";

// const lightMode = useContext(ThemeContext);
// var light = lightMode.lightMode;

const Loader = (
  <div className={`${loaderStyle.loaderContainer} ${loaderStyle.fadeIn}`}>
    <img className={loaderStyle.loader} src="./loader.svg" alt="loader_here" />
  </div>
);

export default Loader;
