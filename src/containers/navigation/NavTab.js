import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectOneProject } from '../../actions/actions_projects';
import { selectDeliverable } from '../../actions/actions_deliverables';
import { selectTask } from '../../actions/actions_tasks'; 


class NavTab extends Component{
    constructor(props){
        super(props);
    }
    onTabSelect(props){
        const url = props.url;
        const object = props.object;
        const id = props.object.id;
        if(url === 'project'){
            this.setState({selectedProject: object});
            this.props.dispatch(selectOneProject(object));
        } 
        else if(url === 'task'){
            this.props.dispatch(selectTask(id));
        }
        else if(url == 'deliverable'){
            this.props.dispatch(selectDeliverable(id));
        }
    }
    render(){
        return(
            <li className="active" onClick={() => this.onTabSelect(this.props)}><a href={'/' + this.props.url}>{this.props.object.title}</a></li>
        );
    }
}

function mapStateToProps(state){
    return{
        selectedDeliverable: state.selectDeliverable,
        selectedTask: state.selectedTask,
        selectedProject: state.selectedProject
    }
}

export default connect(mapStateToProps)(NavTab);