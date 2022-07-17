import loginStyles from "./login.module.css";
import { useSelector } from "react-redux";
import Card from "../UI/Card/Card";
import "../Common/CSS/common.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Login = (props) => {
  var location = useLocation();
  const [isLoginPage, setisLoginPage] = useState(false);

  useEffect(() => {
    if (location.pathname === "/signup") {
      setisLoginPage(true);
    } else {
      setisLoginPage(false);
    }
  }, [location.pathname]);
  var isDark = useSelector((state) => state.theme.isDark);
  const confirmPasswordComponent = (
    <input
      className={loginStyles.formInput}
      type="password"
      placeholder="Confirm Password"
    />
  );
  return (
    <div className={loginStyles.loginpage}>
      {/* <div className={loginStyles.shapesHolder}>
        <div className={loginStyles.rectangleone}></div>
        <div className={loginStyles.rectangletwo}></div>
      </div> */}
      <div className={loginStyles.loginform}>
        <Card isVisible="true" className={loginStyles.formContainer}>
          <input
            className={loginStyles.formInput}
            type="text"
            placeholder="Username"
          />
          <input
            className={loginStyles.formInput}
            type="password"
            placeholder="Password"
          />
          {isLoginPage && confirmPasswordComponent}
          <button className={loginStyles.button}>
            {isLoginPage ? "Register" : "Login"}
          </button>
          <div className={`${loginStyles.otherLoginContainer}`}>
            <span>
              <img
                className={loginStyles.loginWith}
                src="https://cdn.cdnlogo.com/logos/g/82/google-g-2015.svg"
              />
            </span>
          </div>
        </Card>
        <p
          className={`${loginStyles.text} ${
            isDark ? "blomo_text_light" : "blomo_text_dark"
          }`}
        >
          {isLoginPage ? "Already Registered ? " : "New here ? "}
          <Link to={isLoginPage ? "/login" : "/signup"}>
            {isLoginPage ? "Login" : "Register"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
