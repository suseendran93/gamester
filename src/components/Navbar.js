import React, {Component} from 'react';
import '../styles/Navbar.css';

class Navbar extends Component{

    render(){
        return(
         <div className="navigation">			
			<ul>
				<li><a href="index.html">Home</a></li>
				    <li><a>About</a>
					    <ul>
						    <li><a>Our team</a></li>
						    <li><a>Camp site</a></li>
						    <li><a>Mission</a></li>
					    </ul>
				    </li>

				    <li><a>Things to do</a></li>
				    <li><a>Contact</a>
					    <ul>
						    <li><a href="#" target="_blank">Email-us</a></li>
						    <li><a>Map</a></li>
					    </ul>
				    </li>
				    <li><a>News</a></li>
			</ul>
		</div>
        )
    }
}

export default Navbar;