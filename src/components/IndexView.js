import React, { Component } from 'react';
import { connect } from 'react-redux';
import BaseChart from '../containers/BaseChart';
import NavTabs from '../containers/navigation/NavTabs';
                   
class IndexView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="container">
                <NavTabs type='project' tabList={this.props.projects} toUrl={'/projects/'}/>
                    <div>
                        <h1>Index</h1>
                            <h2>Cassiopeia Home Page</h2>
                                <p>Welcome to our project management web application!</p>
                    </div>
                    <BaseChart />
            </div>
        );        
    }
}

function mapStateToProps(state){
    return{
        projects: state.projects
    }
}
export default connect(mapStateToProps)(IndexView);