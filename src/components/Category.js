import React, {Component} from 'react';
import '../styles/Category.css';

class Category extends Component{

render(){

    return(

        <div className="custom-dropdown">
		<button className="drop-btn" onclick="showGames()">Category</button>
		<span>
			<ul className="drop">
				<li><a>RPG</a></li>
				<li><a>FPS</a></li>
				<li><a>Racing</a></li>
				<li><a>Free to play</a></li>
			</ul>
		</span>
        <script src="./public/myscript.js"></script>
	</div>

	    );
}
}


export default Category;
