import React, {Component} from 'react';
import '../styles/CreateAccount.css';

class CreateAccount extends Component{
    constructor(props){
        super(props);
        
    }

    render() {
        return (
            <div id="accountoverlay" className={this.state.toggle ? "create-account-overlay displayBlock" : "create-account-overlay displayNone"}>  
            </div>      
        );
    }
}

export default CreateAccount;