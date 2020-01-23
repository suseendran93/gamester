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
    postRequest(){
        event.preventDefault();
        const data = {
            "username": this.state.Username,
            "password": this.state.password
    }

        console.log(data);
        fetch('http://localhost:8082/customers', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            },
            body: JSON.stringify(data),
          })
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }
    openCreateAccountWindow() {
        this.setState({
            toggleAccount: !this.state.toggleAccount,
            toggle: false
        })
    }
    setUserName(e){
        this.setState({
            Username: e.target.value
        }) 
    }
    setPassword(e){
        this.setState({
            password: e.target.value
        }) 
    }
    render() {
        return (
            <div className="cta">
                <div className="btn-container">
                    <button id="signin" onClick={this.openSignInWindow}>Sign in</button>

                    <div id="overlay" className={this.state.toggle ? "signin-screen-overlay displayBlock" : "signin-screen-overlay displayNone"}>

                        <div className={this.state.toggle ? "signin-screen displayBlock" : "signin-screen displayNone"}>
                            <form className="signin-form" method="POST">
                                <button id="close-signin" onClick={this.openSignInWindow}>Close</button>
                                <div className="username">
                                    <input id="username" type="text" name="username" placeholder="Username" required onChange={this.setUserName.bind(this)} value={this.state.Username}/>
                                </div>
                                <div className="password">
                                    <input id="password" type="password" name="password" placeholder="Password" required onChange={this.setPassword.bind(this)} value={this.state.password}/>
                                </div>
                                <div className="login">
                                    <button type="submit" id="login" onClick={this.postRequest.bind(this)}>Log in</button>
                                </div>

                            </form>
                            <div className="create-account">
                                <button id="createAccount" onClick={this.openCreateAccountWindow.bind(this)} >Create a new account</button>
                            </div>
                        </div>

                    </div>


                </div>
                <CreateAccount {...this.state} openCreateAccountWindow={this.openCreateAccountWindow.bind(this)} />
            </div>
        )
    }
}

export default SignIn;
