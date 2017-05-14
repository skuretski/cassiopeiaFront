import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavTab extends Component{
    constructor(props){
        super(props);
    }

    render(){
 //       console.log(this.props);
        if(this.props.type === 'project'){
             return(
                <li><NavLink to={{pathname: "/projects/" + this.props.tab.id}} activeClassName="selected">{this.props.tab.title}</NavLink></li>
            );
        }
        // .../project/7/deliverable
        else if(this.props.type === 'deliverable'){
            return(
                <li><NavLink to={{pathname: "/projects/"}}>{this.props.tab.title}</NavLink></li>
            )
        }
        // .../project/7/deliverable/2/tasks
        else if(this.props.type === 'task'){
                <li><NavLink to={'/projects/' + this.props.tab.id + '/deliverables/' + this.props.id + '/tasks'}>{this.props.tab.title}</NavLink></li>
        }
        else{
            <li><NavLink to={'/projects'}>{this.props.tab.title}</NavLink></li>
        }
    }
}


export default NavTab;