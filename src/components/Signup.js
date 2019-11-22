import React, {Component} from 'react';
import '../styles/Signup.css';

class Signup extends Component{
    render(){
return(
		
<div className="cta">
    <div className="btn-container">
        <button id="signup"><a href="./public/signup.html">Sign up</a></button>
        <button id="signin"><a href="./public/signin.html">Sign in</a></button>
    </div>
</div>

)
    }
}

export default Signup;