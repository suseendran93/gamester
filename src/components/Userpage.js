import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../styles/App.css';
import Navbar from './Navbar'
import Logout from './Logout';
import Category from './Category';

class Userpage extends Component {
    constructor(props) {   
        super(props);      
    }
  render(){
  return (
    // <Router>
    
    // <div className="App">
    // {/* <div className={this.props.ta ? "App displayBlock" : "App displayNone"}></div> */}

    //   <Navbar />    
    //     <div className="fixed-headers">
	//         <div className="header">
	// 	        <h1>Welcome to Gaming info</h1>
	// 	        <h5>Everything you need to game</h5>
	//         </div>
	//         <div className="searchbar">
	//         	<input type="text" name="searchbar" placeholder="Search..."/>
	//         </div>
    //     </div>
    //     <Category />
    //     <div className="logout">
    //     <div className="logout-btn-container">
    //     <Logout />
    //     <Link to={'/logout'}><button id="logout" onClick={'#'}>Logout</button></Link>
    //     </div>
        
    //     </div>
    //     <Switch>
    //             <Route exact path='/logout' Component={Logout}/>
    //     </Switch>
    // </div>
    // </Router>
        <div>
            <h1>User page;{this.props.usersession}</h1>
        </div>  
  );
  }
}


export default Userpage;