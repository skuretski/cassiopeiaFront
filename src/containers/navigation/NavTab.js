import React, { Component } from 'react';

class NavTab extends Component{
    constructor(props){
        super(props);
    }
    render(){
        if(this.props.type === 'project'){
             return(
                <li><a href={this.props.url + this.props.tab.id}>{this.props.tab.title}</a></li>
            );
        }
        // .../project/7/deliverable
        else if(this.props.type === 'deliverable'){
            return(
                <li><a href={this.props.url + this.props.tab.id}>{this.props.tab.title}</a></li>
            )
        }
        // .../project/7/deliverable/2/tasks
        else if(this.props.type === 'task'){
                <li><a href={'/projects/' + this.props.tab.id + '/deliverables/' + this.props.id + '/tasks'}>{this.props.tab.title}</a></li>
        }
        else{
            <li><a href={'/projects'}>{this.props.tab.title}</a></li>
        }
    }
}


export default NavTab;