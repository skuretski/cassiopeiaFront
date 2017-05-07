import React, { Component } from 'react';
import { connect } from 'react-redux';
import BaseChart from '../containers/BaseChart';
import { getProjects, selectProject } from '../actions/actions_projects';

class IndexView extends Component{
    constructor(props){
        super(props);
        this.state = {
            projects: [],
            fetched: false 
        }
    }
    componentDidMount(){
        this.props.dispatch(getProjects).then(() => {
            this.setState({fetched: true});
        });  
    }
    onTabSelect(){
        console.log("Click!");
    }
    Tab(props){
        return(
            <li onClick = {() => this.onTabSelect} className="active">
                <a href=''>Tab</a>
            </li>
        );
    }
    NavTabs(props){
        const projects = props.projects;
        const navTabs = projects.map((project) => 
            <Tab key={project.id} value={project.title} /> );
    }
    render(){
        if(this.state.fetched === false){
            return(
                <div>
                    Loading...
                </div>
            );
        } else{
            return(
                <div><h1>Index</h1>
                    <div>
                        <ul className= "nav nav-tabs">
                            {this.NavTabs}

                        </ul>
                    </div>
                    <div>
                    <h2>Cassiopeia Home Page</h2>
                        <p>Welcome to our project management web application!
                        </p>
                    </div>
                        <BaseChart />
                </div>
            );
        }    
    }
}

function mapStateToProps(state){
    return{
        projects: state.projects,
        fetched: state.fetched,
        selectedProject: state.selectedProject
    }
}


export default connect(mapStateToProps)(IndexView);