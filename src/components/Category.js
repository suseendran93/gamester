import React, {Component} from 'react';
import '../styles/Category.css';
import Gameinfo from '../components/GameInfo';


class Category extends Component{
    constructor(){
		super();
		this.showGames = this.showGames.bind(this);
		this.findList = this.findList.bind(this);
		this.state = {
			flag :null,
			listVal : null 
		}
        
	}
	
		
findList(text){
	console.log(text);
	this.setState({
	listVal : text,
	flag : ! this.state.flag
	})
}
	 
	 showGames(){

		this.setState({
			flag : ! this.state.flag
		})
	}
	
render(){
var listValue = [];
	for(let i of ['RPG', 'FPS', 'Racing', 'Free to play']){
		listValue.push(<li key={i} onClick={() =>this.findList(i)}>{i}</li>);
	  }

    return(

        <div className="custom-dropdown">
		<button className="drop-btn" onClick={this.showGames}>Category</button>
			<ul className={this.state.flag ? "drop displayBlock" : "drop displayNone" }  >
            {listValue}
			</ul>   
			<Gameinfo sendPram = {this.state}/>                     
	</div>

	    );
}
}

export default Category;

