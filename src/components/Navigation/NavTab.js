import React, { Component } from 'react';
import { NavLink, Link, Route } from 'react-router-dom';

class NavTab extends Component{
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.type === 'project'){
            return(
                <li key={this.props.tab.id}><NavLink to={"/projects/" + this.props.tab.id} activeClassName="selected">{this.props.tab.title}</NavLink></li>
            );
        }
        // .../projects/7/deliverables
        else if(this.props.type === 'deliverable'){
            return(
                <li id="verticalLI"><NavLink activeClassName="selected" to={{pathname: "/projects/" + this.props.projectId + "/deliverables/" + this.props.tab.id}}>{this.props.tab.title}</NavLink></li>
            );
        }
        // .../projects/7/deliverables/2/tasks
        else if(this.props.type === 'task'){
            return(
                <li id="verticalLI"><NavLink activeClassName="selected" to={'/projects/' + this.props.projectId + '/deliverables/' + this.props.delivId + '/tasks/' + this.props.tab.id}>{this.props.tab.title}</NavLink></li>
            );            
        }
    }
}


export default NavTab;