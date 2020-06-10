import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../styles/SignIn.css';
import '../styles/Category.css';
import CreateAccount from './CreateAccount';
import Userpage from './Userpage';
import App from './App';
import { json } from 'body-parser';


class SignIn extends Component {

    constructor(props) {
        super(props);
        this.openUserWindow=this.openUserWindow.bind(this);
        this.state = {
            toggleUser: false,
            toggle: null,
            toggleAccount: null,
            usersession: null

        }
    }
    openUserWindow(usersession) {
        this.setState({
            toggleUser: !this.state.toggleUser,
            usersession: usersession
           
        })
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

        console.log("This is the data: "+data);
        return fetch('http://localhost:8082/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            },
            body: JSON.stringify(data),
            
          })
          .then((data) => {
            console.log('Success:', data);
            if(data.status===404){
            alert("Login failed, User not found")
            }
            else{
            console.log(data.headers.get('SessID'));
            const usersession=data.headers.get('SessID');
            this.openSignInWindow();
            this.openUserWindow(usersession);
            }
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
        let html=(
            
            <Router>
            <div className="top-menubar">
                <span className="btn-container">
                {this.state.toggleUser?<button id='username'>{this.state.Username}</button>:<Link to={'/signin'}><button id="signin" onClick={this.openSignInWindow.bind(this)}>Sign in</button></Link>}
                    <div id="overlay" className={this.state.toggle ? "signin-screen-overlay displayBlock" : "signin-screen-overlay displayNone"}>

                        <div className={this.state.toggle ? "signin-screen displayBlock" : "signin-screen displayNone"}>
                            <form className="signin-form" method="GET">
                            <Link to={'/'}>    <button id="close-signin" onClick={this.openSignInWindow.bind(this)}>Close</button></Link>
                                <div className="username">
                                    <input id="username" type="text" name="username" placeholder="Username" required onChange={this.setUserName.bind(this)} value={this.state.Username}/>
                                </div>
                                <div className="password">
                                    <input id="password" type="password" name="password" placeholder="Password" required onChange={this.setPassword.bind(this)} value={this.state.password}/>
                                </div>
                                <div className="login">
                              
                                <Link to={'/'}>  <button type="submit" id="login" onClick={this.postRequest.bind(this)}>Log in</button></Link>
                                
                                
                                </div>

                            </form>
                            <div className="create-account">
                             <Link to={'/createaccount'}> <button id="createAccount" onClick={this.openCreateAccountWindow.bind(this)} >Create a new account</button></Link>
                            </div>
                        </div>

                    </div>


                </span>
                {/* {this.state.toggleAccount?<CreateAccount {...this.state} openCreateAccountWindow={this.openCreateAccountWindow.bind(this)} />:""} */}
                <CreateAccount {...this.state} openCreateAccountWindow={this.openCreateAccountWindow.bind(this)} />
               
               {/* {this.state.toggleUser?<Userpage  ta={this.state.toggleUser} openuserWindow={this.openUserWindow}></Userpage>:""} */}
               {this.state.toggleUser?<Userpage usersession={this.state.usersession}></Userpage>:""}
               
                <Switch>
                <Route exact path='/signin' Component={SignIn}/>
                </Switch>

                <Switch>
			        <Route exact path='/' Component={App}/>
			    </Switch>

                <Switch>
			        <Route exact path='/createaccount' Component={CreateAccount}/>
			    </Switch>
                <Switch>
			        <Route exact path='/user' Component={Userpage}/>
			    </Switch>
            </div>
            </Router>
        )
            
        
        
        return html;
    }
}

export default SignIn;