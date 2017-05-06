import React, { Component } from 'react';
import { connect } from 'react-redux';
import IndexViewChart from '../containers/IndexViewChart';
import { fetchProjects } from '../actions/actions_nav';
import { getIndexViewData } from '../actions/actions_indexview';

class IndexView extends Component{
    constructor(props){
        super(props);
        this.state = {
            projects: [],
            selectedProject: '',
            fetched: false 
        }

    }

    componentDidMount(){
        fetchProjects().then((response) => {
            this.setState({
                projects: response,
                fetched: true
            });
        }).catch((error) => {
                console.log(error);
        });
        
        this.props.dispatch(getIndexViewData);
    }
    renderTab(project){
        return(
            <li className="active" key={project.id}><a href='/project'>{project.title} </a></li>
        )
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
                            {this.state.projects.map(this.renderTab)}
                        </ul>
                    </div>
                    <div>
                    <h2>Cassiopeia Home Page</h2>
                        <p>Welcome to our project management web application!
                        </p>
                    </div>
                        <IndexViewChart data={this.props.indexViewData}/>
                </div>
            );
        }    
    }
}

function mapStateToProps(state){
    return{
        projects: state.projects,
        selectedProject: state.selectedProject,
        fetched: state.fetched,
        indexViewData: state.indexViewData,
    }
}

export default connect(mapStateToProps)(IndexView);