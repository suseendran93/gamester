import React, {Component} from 'react';
import '../styles/SignIn.css';

class SignIn extends Component{

    constructor(){
        super();
        this.openSignInWindow = this.openSignInWindow.bind(this);
    }


    openSignInWindow(){
        alert("Write the code for sign in");
    }
    render(){
return(
		
<div className="cta">
    <div className="btn-container">
        
        <button id="signin" onClick={this.openSignInWindow}><a href="#">Sign in</a></button>
    </div>
</div>

)
    }
}

export default SignIn;