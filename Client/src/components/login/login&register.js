import loginStyles from "./login.module.css";
import { useSelector } from "react-redux";
import Card from "../UI/Card/Card";
import "../Common/CSS/common.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

const Login = (props) => {
  var navigate = useNavigate();
  var location = useLocation();
  const [isLoginPage, setisLoginPage] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    if (location.pathname === "/signup") {
      setisLoginPage(true);
    } else {
      setisLoginPage(false);
    }
  }, [location.pathname]);
  var isDark = useSelector((state) => state.theme.isDark);

  const formSignupValidation = () => {
    if (
      formData.firstName === "" ||
      formData.lastName === "" ||
      formData.username === "" ||
      formData.password === "" ||
      formData.confirmPassword === ""
    ) {
      return false;
    } else if (formData.password !== formData.confirmPassword) {
      return false;
    } else {
      return true;
    }
  };

  const formLoginValidation = () => {
    if (formData.username === "" || formData.password === "") {
      return false;
    } else {
      return true;
    }
  };

  const submitFormhandler = async () => {
    const ele = document.getElementById("formSubmit");
    let attr = ele.getAttribute("data-type");

    if (attr === "Register") {
      var isSignupValid = formSignupValidation();
      if (!isSignupValid) {
        console.log("Dhang se bhar na bsdk");
        return false;
      }
      var signupParams = {
        username: formData.username,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      };
      fetch("/signup", {
        method: "POST",
        body: JSON.stringify(signupParams),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (resp) {
          if (resp.authenticated) {
            navigate("/");
          } else {
            console.log("Galat");
          }
        });
    } else {
      var isLoginValid = formLoginValidation();
      if (!isLoginValid) {
        console.log("Dhang se bhar na bsdk");
        return false;
      }
      var loginParams = {
        username: formData.username,
        password: formData.password,
      };
      fetch("/login", {
        method: "POST",
        body: JSON.stringify(loginParams),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (resp) {
          if (resp.authenticated) {
            navigate("/");
          } else {
            console.log("Galat");
          }
        });
    }
  };

  const confirmPasswordComponent = (
    <input
      className={loginStyles.formInput}
      type="password"
      placeholder="Confirm Password"
      onChange={(e) =>
        setFormData({ ...formData, confirmPassword: e.target.value })
      }
    />
  );

  const firstNameComponent = (
    <input
      className={loginStyles.formInput}
      type="text"
      placeholder="First Name"
      onChange={(e) => {
        setFormData({ ...formData, firstName: e.target.value });
      }}
    />
  );

  const lastNameComponent = (
    <input
      className={loginStyles.formInput}
      type="text"
      placeholder="Last Name"
      onChange={(e) => {
        setFormData({
          ...formData,
          lastName: e.target.value,
        });
      }}
    />
  );
  return (
    <div className={loginStyles.loginpage}>
      <div className={loginStyles.loginform}>
        <Card isVisible="true" className={loginStyles.formContainer}>
          {isLoginPage && firstNameComponent}
          {isLoginPage && lastNameComponent}
          <input
            className={loginStyles.formInput}
            type="text"
            placeholder="Username or Email ID"
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
            }}
          />
          <input
            className={loginStyles.formInput}
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
          {isLoginPage && confirmPasswordComponent}
          <button
            id="formSubmit"
            data-type={isLoginPage ? "Register" : "Login"}
            className={loginStyles.button}
            onClick={submitFormhandler}
          >
            {isLoginPage ? "Register" : "Login"}
          </button>
          <div className={`${loginStyles.otherLoginContainer}`}>
            <span>
              <img
                className={loginStyles.loginWith}
                src="https://cdn.cdnlogo.com/logos/g/82/google-g-2015.svg"
                alt="google"
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
