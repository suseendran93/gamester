import React, { Component } from 'react';
import '../styles/CreateAccount.css';

class CreateAccount extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        let { toggleAccount } = this.props;
        console.log(this.props.toggleAccount);
        return (
            <div id="accountoverlay" className={this.props.toggleAccount ? "account-overlay displayBlock" : "account-overlay displayNone"}>
                <div className={this.props.toggleAccount ? "account-screen displayBlock" : "signin-screen displayNone"}>
                <form className="createaccount-form">
                    <div className="accountusername">
                        <input id="username" type="text" name="accusername" placeholder="Username" required />
                    </div>
                    <div className="accountpassword">
                        <input id="password" type="password" name="accpassword" placeholder="Password" required />
                    </div>
                    <div className="accountconfirmpassword">
                        <input id="confirmpassword" type="password" name="confirmpassword" placeholder="Confirm Password" required />
                    </div>
                    <div className="account-submit">
                                    <button type="submit" id="login">Submit</button>
                                </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateAccount;