import React, {Component} from 'react';
import '../styles/Category.css';


class Category extends Component{
    constructor(){
		super();
		this.showGames = this.showGames.bind(this);
		this.hideInfo = this.hideInfo.bind(this);
		var flag=false;
        
	}
	
		
hideInfo(){
	
		document.getElementById("close").style.display='none';
		document.getElementById("RPG").style.display='none';
		document.getElementById("FPS").style.display='none';
		document.getElementById("Racing").style.display='none';
		document.getElementById("Free to play").style.display='none';
	}
	 
	 showGames(){
		
		var games=document.querySelectorAll('.drop li');
		if(this.flag==false){
			this.hideInfo();
			for (var i = 0; i < games.length; i++) {
				games[i].style.display='block';
			}
			this.flag=true;
		}
		else{
			
			for (var i = 0; i < games.length; i++) {
				games[i].style.display='none';
			}
			
			this.flag=false;
			
		}
	}
	
render(){

    return(

        <div className="custom-dropdown">
		<button className="drop-btn" onClick={this.showGames}>Category</button>
		<span>
			<ul className="drop">
				<li><a>RPG</a></li>
				<li><a>FPS</a></li>
				<li><a>Racing</a></li>
				<li><a>Free to play</a></li>
            
			</ul>                        
		</span>
	</div>

	    );
}
}

export default Category;

