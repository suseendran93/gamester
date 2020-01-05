import React, {Component} from 'react';
import '../styles/Category.css';
import Gameinfo from '../components/GameInfo';


class Category extends Component{
    constructor(){
		super();
		this.findList = this.findList.bind(this);
		this.state = {
			flag :null,
			listVal : null,
			passFlagToChild : false
		}
	}
		
findList(text){
	this.setState({
	listVal : text,
	flag : !this.state.flag,
	passFlagToChild : !this.state.passFlagToChild
	});
}

onCloseBtnPress(){
	this.setState({
		passFlagToChild : !this.state.passFlagToChild
	});
}

showGames(){
	this.setState({
		flag : !this.state.flag,
		
		passFlagToChild : false //Hide the content whenever u click on category irrespective of flag status
		

	});
}
	
render(){
var listValue = [];
	for(let i of ['RPG', 'FPS', 'Racing', 'Free to play']){
		listValue.push(<li key={i} onClick={() =>this.findList(i)}>{i}</li>);
	  }

    return(
        <div className="custom-dropdown">
		{console.log(this.state.flag)}
		{console.log(this.state.passFlagToChild)}
		<button className="drop-btn" onClick={this.showGames.bind(this)}>Category</button>
			<ul className={this.state.flag ? "drop displayBlock" : "drop displayNone" }  >
            {listValue}
			</ul>   
			<Gameinfo {...this.state} onCloseBtnPress={this.onCloseBtnPress.bind(this)}/>                     
	</div>);
}
}

export default Category;

