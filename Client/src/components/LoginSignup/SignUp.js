import lsStyles from './LoginSignup.module.css';
import { useContext } from 'react';
import ThemeContext from '../../contexts/Theme/ThemeContext';

const SignUp = () => {

    var lightMode = useContext(ThemeContext);
    var light = lightMode.lightMode;

    return (
        <div>
            <form className={lsStyles.loginForm} style={light ? { color: 'black' } : { color: 'white' }}>
                <div className="form-row">
                    <div className="col mb-2">
                        <input type="text" className="form-control" placeholder="First name" />
                    </div>
                    <div className="col mb-2">
                        <input type="text" className="form-control" placeholder="Last name" />
                    </div>
                </div>
                <div class="form-group">
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group mb-2">
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div class="form-group mb-2">
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp;