import React, {Component} from 'react';
import '../styles/Gameinfo.css';

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
                    flag1: false
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
        // console.log(listVal);
        return(
        <div className="gameInfo">
        <div id="close" className={!this.state.flag1 ? "close-content displayBlock" : "close-content displayNone"}>
        <button  type="button" onClick={this.hideInfo}>X</button>
        </div>
        <div className = {!this.state.flagX ? "gameCategory displayBlock" : "gameCategory displayNone" }>
        {listVal === "RPG" &&
        (<><h2>Role playing games</h2>
        <p>A role-playing game (sometimes spelled roleplaying game; abbreviated RPG) is a game in which players assume the roles of characters in a fictional setting. Players take responsibility for acting out these roles within a narrative, either through literal acting, or through a process of structured decision-making regarding character development.Actions taken within many games succeed or fail according to a formal system of rules and guidelines.
        </p>
        <p>There are several forms of role-playing games. The original form, sometimes called the tabletop role-playing game (TRPG), is conducted through discussion, whereas in live action role-playing (LARP), players physically perform their characters' actions.In both of these forms, an arranger called a game master (GM) usually decides on the rules and setting to be used, while acting as the referee; each of the other players takes on the role of a single character.
        </p>
        <p>Several varieties of RPG also exist in electronic media, such as multiplayer text-based Multi-User Dungeons (MUDs) and their graphics-based successors, massively multiplayer online role-playing games (MMORPGs). Role-playing games also include single-player role-playing video games in which players control a character, or team of characters, who undertake(s) quests, and may include player capabilities that advance using statistical mechanics. These electronic games sometimes share settings and rules with tabletop RPGs, but emphasize character advancement more than collaborative storytelling.</p>
        <p>This type of game is well-established, so some RPG-related game forms, such as trading/collectible card games (CCGs) and wargames, may not be included under the definition. Some amount of role-playing activity may be present in such games, but it is not the primary focus.The term role-playing game is also sometimes used to describe games involving roleplay simulation and exercises used in teaching, training, and academic research.</p></>)
        || listVal === "FPS" &&

        (<><h2>First person shooting</h2></>)

        || listVal === "Racing" &&
    
        (<><h2>Racing</h2></>)

        || listVal === "Free to play" &&
        
        (<><h2>Free to play</h2></>)}
        </div>
        </div>
        );
         
    }
}
export default Gameinfo;
