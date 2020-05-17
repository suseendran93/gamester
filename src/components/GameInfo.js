import React, {Component} from 'react';
import '../styles/Gameinfo.css';
import GameContent from '../Jsons/GameContent';
import GameTiles from './GameTiles';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
const categoryContent= GameContent.category;
class Gameinfo extends Component{
    constructor(props){
        super(props);
         this.hideInfo = this.hideInfo.bind(this);
        //  this.state = {
        //    ...props
        //  };
    }

    hideInfo(){
      this.props.onCloseBtnPress();
    }
   
    render(){
        let {listVal, passFlagToChild}= this.props;
        return(
          <Router>
        <div className="gameInfo">
        <div id="close" className={ passFlagToChild ? "close-content displayBlock" : "close-content displayNone"}>
        <button  type="button" onClick={this.hideInfo}>X</button>
        </div>
        <div className = { passFlagToChild ? "gameCategory displayBlock" : "gameCategory displayNone" }>
        {listVal === "RPG" &&
       (
        <div    
            dangerouslySetInnerHTML={{
          __html: categoryContent[0].RPG
        }}>            
        </div>)      
         || listVal === "FPS" &&
        ( <div    
            dangerouslySetInnerHTML={{
          __html: categoryContent[1].FPS
        }}>            
        </div>)
        
        || listVal === "Racing" &&
    
        ( <div    
            dangerouslySetInnerHTML={{
          __html: categoryContent[2].Racing
        }}>            
        </div>)

        || listVal === "Free to play" &&
        
        ( <div    
            dangerouslySetInnerHTML={{
          __html: categoryContent[3].FTP
        }}>            
        </div>)
        
        }
        
        </div>
        <div className = { passFlagToChild ? "entergame displayBlock" : "entergame displayNone" }>
      <Link to={'/games'}> <button id='enter'>Enter</button></Link> 
        </div>
        <Switch>
			<Route exact path='/games' Component={GameTiles}/>
			
			</Switch>
        </div>
        </Router>
        );
         
    }
}
export default Gameinfo;
