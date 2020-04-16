import React, { Component } from 'react';
import '../styles/CreateAccount.css';
import App from './App';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state={
            Username:"",
            password:"",
            confirmpassword:""

        }
        
    }
    postRequest(){
        console.log("Req posred");
        event.preventDefault();
        const data = {
            "username": this.state.Username,
            "password": this.state.password,
            "confirmpassword": this.state.confirmpassword
    }
        
        console.log(data);
        return fetch('http://localhost:8082/customers', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            },
            body: JSON.stringify(data),
          })
          .then((response) => console.log(response))
          .then((data) => {
            console.log('Success:', data);
            this.props.openCreateAccountWindow();
              })
          .catch((error) => {
            console.error('Error:', error);
          });
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
    setConfirmPassword(e){
        this.setState({
            confirmpassword: e.target.value
        }) 
    }

    comparePassword(){
        if(this.state.password===this.state.confirmpassword){
            console.log("Password matched");
            this.postRequest();
            
        }
            else{
            alert("Passwords do not match");
            }
    }
   
    render() {

        let { toggleAccount } = this.props;
        console.log(this.props.toggleAccount);
        return (
            <Router>
            <div id="accountoverlay" className={this.props.toggleAccount ? "account-overlay displayBlock" : "account-overlay displayNone"}>
                <div className={this.props.toggleAccount ? "account-screen displayBlock" : "signin-screen displayNone"}>
                <form className="createaccount-form" method="POST">
                    <div className="accountusername">
                        <input id="username" type="text" name="username" placeholder="Username" required onChange={this.setUserName.bind(this)} value={this.state.Username}/>
                    </div>
                    <div className="accountpassword">
                        <input id="password" type="password" name="password" placeholder="Password" required  onChange={this.setPassword.bind(this)} value={this.state.password}/>
                    </div>
                    <div className="accountconfirmpassword">
                        <input id="confirmpassword" type="password" name="confirmpassword" placeholder="Confirm Password" required onChange={this.setConfirmPassword.bind(this)} value={this.state.confirmpassword}/>
                    </div>
                    <div className="account-submit">
                                  <Link to={'/home'}>  <button type="submit" id="login" onClick={this.comparePassword.bind(this)}>Submit</button></Link>
                                </div>
                    </form>
                </div>
                <Switch>
			        <Route exact path='/home' Component={App}/>
			    </Switch>
            </div>
            </Router>
        );
    }
}

export default CreateAccount;