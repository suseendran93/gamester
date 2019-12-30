import React, { Component } from 'react';
import '../styles/SignIn.css';
import '../styles/Category.css';
import CreateAccount from '../components/CreateAccount';

class SignIn extends Component {

    constructor() {
        super();
        this.openSignInWindow = this.openSignInWindow.bind(this);
        this.state = {
            toggle: null,
            toggleAccount: null

        }
    }

    openSignInWindow() {
        this.setState({
            toggle: !this.state.toggle
        })
    }
    openCreateAccountWindow() {
        this.setState({
            toggleAccount: !this.state.toggleAccount
        })
    }
    render() {
        return (
            <div className="cta">
                <div className="btn-container">
                    <button id="signin" onClick={this.openSignInWindow}>Sign in</button>

                    <div id="overlay" className={this.state.toggle ? "signin-screen-overlay displayBlock" : "signin-screen-overlay displayNone"}>

                        <div className={this.state.toggle ? "signin-screen displayBlock" : "signin-screen displayNone"}>

                            <button id="close-signin" onClick={this.openSignInWindow}>Close</button>
                            <div className="username">
                                <input id="username" type="text" name="username" placeholder="Username" required />
                            </div>
                            <div className="password">
                                <input id="password" type="password" name="password" placeholder="Password" required />
                            </div>
                            <div className="login">
                                <button type="submit" id="login">Log in</button>
                            </div>
                            <div className="create-account">
                                <button id="createAccount" onClick={this.openCreateAccountWindow.bind(this)} >Create a new account</button>
                                <CreateAccount {...this.state}/>   
                            </div>

                        </div>

                    </div>


                </div>
            </div>
        )
    }
}

export default SignIn;