import React, {Component} from 'react';
import '../styles/SignIn.css';
import '../styles/Category.css';

class SignIn extends Component{

    constructor(){
        super();
        this.openSignInWindow = this.openSignInWindow.bind(this);
        this.state={
            toggle: null

        }
    }

    openSignInWindow(){
            this.setState({
                toggle: !this.state.toggle
            })
    }
    render(){
    return(
        <div className="cta">
            <div className="btn-container">
            <button id="signin" onClick={this.openSignInWindow}>Sign in</button>
            <div id="overlay" className={this.state.toggle ?"signin-screen-overlay displayBlock":"signin-screen-overlay displayNone"}>
                <div className={this.state.toggle ?"signin-screen displayBlock":"signin-screen displayNone"}>
                
                <button id="close-signin" onClick={this.openSignInWindow}>Close</button>
                <div className="username">
                    <input id="username" type="text" name="username" placeholder="Username"/>
                    </div>
                    <div className="password">
                    <input id="password" type="text" name="password" placeholder="Password"/>
                </div>
                <div className="create-account">
                    <a href="#/">Create a new account</a>
                </div>
            
                </div>
                </div>
            </div>
        </div>
    )
    }
}

export default SignIn;
