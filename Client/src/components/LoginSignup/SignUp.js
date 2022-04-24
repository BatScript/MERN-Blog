import lsStyles from "./LoginSignup.module.css";
import { useContext, useState } from "react";
import ThemeContext from "../../contexts/Theme/ThemeContext";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  var lightMode = useContext(ThemeContext);
  var light = lightMode.lightMode;

  let history = useNavigate();

  const [fName, setfName] = useState('')
  const [lName, setlName] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const registerSubmitController = (e) => {
    var data = { firstName: fName, lastName: lName, email, password: password };
    e.preventDefault();
    fetch('/signup', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
      .then((res) => { return res.json() })
      .then((response) => {
        console.log(response);
        history("/")

      })
  };

  const triggerSignup = () => {
    console.log("heh");
  };

  return (
    <div>
      <form
        onSubmit={registerSubmitController}
        className={lsStyles.loginForm}
        style={light ? { color: "black" } : { color: "white" }}
      >
        <div className="form-row">
          <div className="col mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              value={fName}
              onChange={(e) => setfName(e.target.value)}
            />
          </div>
          <div className="col mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              value={lName}
              onChange={(e) => setlName(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group mb-2">
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group mb-2">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group mb-2">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword2"
            placeholder="Password"
          />
        </div>

        <button
          onClick={triggerSignup}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
