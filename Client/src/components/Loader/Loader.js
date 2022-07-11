import loaderStyle from "./Loader.module.css";
const Loader = (
  <div className={`${loaderStyle.loaderContainer} ${loaderStyle.fadeIn}`}>
    <img className={loaderStyle.loader} src="/loader.svg" alt="loader_here" />
  </div>
);

export default Loader;
