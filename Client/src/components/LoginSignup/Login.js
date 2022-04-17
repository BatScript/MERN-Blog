import lsStyles from './LoginSignup.module.css';
import { useContext } from 'react';
import ThemeContext from '../../contexts/Theme/ThemeContext';
import {Link} from 'react-router-dom'

const Login = () => {
  var lightMode = useContext(ThemeContext);
  var light = lightMode.lightMode;
  return (
    <div>
      <form className={lsStyles.loginForm} style={light ? {color: 'black'} : {color: 'white'}}>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group mb-2">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        
        <button type="submit" class="btn btn-primary">Submit</button>
        <Link style={ light ? {color: 'black'} : {color: 'white'}} to='/signup'>Signup?</Link>
      </form>
    </div>
  )
}

export default Login;