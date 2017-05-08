import React, { Component } from 'react';
import { connect } from 'react-redux';
import BaseChart from '../containers/BaseChart';
import { getProjects, selectProject } from '../actions/actions_projects';
import NavTabs from '../containers/navigation/NavTabs';

class IndexView extends Component{
    constructor(props){
        super(props);
        this.state = {
            fetched: false 
        }
    }
    componentDidMount(){
        this.props.dispatch(getProjects).then(() => {
            this.setState({fetched: true});
        });  
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
                        <NavTabs type='project' tabList={this.props.projects}/>
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
    }
}


export default connect(mapStateToProps)(IndexView);