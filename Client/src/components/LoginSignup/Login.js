import lsStyles from './LoginSignup.module.css';
import { useContext, useState } from 'react';
import ThemeContext from '../../contexts/Theme/ThemeContext';
import {Link} from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  var lightMode = useContext(ThemeContext);
  var light = lightMode.lightMode;
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    var data = {email, password}
    fetch('/login',  {
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
    .then((res) => {return res.json()})
    .then((response) => {console.log(response)});
  }
  return (
    <div>
      <form className={lsStyles.loginForm} style={light ? {color: 'black'} : {color: 'white'}}>
        <div className="form-group">
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group mb-2">
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        
        <button type="submit" className="btn btn-primary" onClick={handleLoginSubmit}>Submit</button>
        <Link style={ light ? {color: 'black'} : {color: 'white'}} to='/signup'>Signup?</Link>
      </form>
    </div>
  )
}

export default Login;