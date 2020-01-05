import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../styles/Navbar.css';
import App from './App'

class Navbar extends Component{

    render(){
        return(
			<Router>
         <div className="navigation">			
			<ul>
				<li><Link to={'/home'}>Home</Link></li>
				    <li><a href="#/">About</a>
					    <ul>
						    <li><a href="#/">Our team</a></li>
						    <li><a href="#/">Camp site</a></li>
						    <li><a href="#/">Mission</a></li>
					    </ul>
				    </li>

				    <li><a href="#/">Things to do</a></li>
				    <li><a href="#/">Contact</a>
					    <ul>
						    <li><a href="#/" target="_blank">Email-us</a></li>
						    <li><a href="#/">Map</a></li>
					    </ul>
				    </li>
				    <li><a href="#/">News</a></li>
			</ul>
			<Switch>
			<Route exact path='/home' Component={App}/>
			
			</Switch>
		</div>
		</Router>
        )
    }
}

export default Navbar;
