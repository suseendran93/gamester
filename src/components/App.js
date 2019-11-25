import React, {Component} from 'react';
import '../styles/App.css';
import Navbar from './Navbar'
import Signup from './Signup';
import Category from './Category';
class App extends Component {

  render(){
  return (
    <div className="App">
      <Navbar />
      <Signup />
        <div className="fixed-headers">
	        <div className="header">
		        <h1>Welcome to Gaming info</h1>
		        <h5>-Everything you need to game</h5>
	        </div>
	        <div className="searchbar">
	        	<input type="text" name="searchbar" placeholder="Search..."/>
	        </div>
        </div>
        <Category />
    </div>
    
  );
  }
}


export default App;
