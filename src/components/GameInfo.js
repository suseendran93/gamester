import React, {Component} from 'react';
import '../styles/Gameinfo.css';
import GameContent from '../Jsons/GameContent';
const categoryContent= GameContent.category;
class Gameinfo extends Component{
    constructor(props){
        super(props);
         
         this.hideInfo = this.hideInfo.bind(this);
         this.state = {
            flag1 : false,
            // flagX: this.props.sendPram.flag
        }
    }

    // findList(){
    //     this.props.sendPram
    // }

    hideInfo(){
	
        this.setState({
                    flag1: !this.state.flag1
                       })
        console.log(this.state.flagX);               
        	}
    //  showInfo(){

    //     this.setState({
	// 		flag1 : !this.state.flag1
    //     })
    // }
    render(){
        console.log(this.state.flagX);
        let {listVal}= this.props.sendPram;
        return(
        <div className="gameInfo">
        <div id="close" className={!this.state.flag1 ? "close-content displayBlock" : "close-content displayNone"}>
        <button  type="button" onClick={this.hideInfo}>X</button>
        </div>
        <div className = {!this.state.flag1 ? "gameCategory displayBlock" : "gameCategory displayNone" }>
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
        </div>
        );
         
    }
}
export default Gameinfo;
