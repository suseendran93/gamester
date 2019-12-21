import React, {Component} from 'react';
import '../styles/Navbar.css';

class Navbar extends Component{

    render(){
        return(
         <div className="navigation">			
			<ul>
				<li><a href="index.html">Home</a></li>
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
		</div>
        )
    }
}

export default Navbar;
