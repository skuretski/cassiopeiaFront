import React, { Component } from 'react';
import ProjectList from '../containers/ProjectList';
import { getDeliverables } from '../actions/actions_deliverables';
//import { getProjects } from '../actions/actions_projects';
import { connect } from 'react-redux';
import NavTabs from '../containers/navigation/NavTabs';


class ProjectView extends Component{
    constructor(props){
        super(props);
        this.state = {
            fetched: false
        }
    }
    componentWillMount(){
        this.props.dispatch(getDeliverables).then(() => {
            this.setState({fetched: true});
        })
    }
    render(){
        if(this.state.loading === false){
            return(
                <div>
                    Loading...
                </div>
            );
        } else{ 
            return(
                <div><h1>Projects</h1>
                    <div>
                        <NavTabs type='project' tabList={this.props.projects} />
                    </div>
                    <br/><br/>
                    <div>
                        <NavTabs type='deliverable' tabList={this.props.deliverables}/>
                    </div>
                    <ProjectList />
                </div>
            );
        }
    }
}

function mapStateToProps(state){
    return{
        deliverables: state.deliverables,
        fetched: state.fetched, 
        projects: state.projects
    }
}
export default connect(mapStateToProps)(ProjectView);