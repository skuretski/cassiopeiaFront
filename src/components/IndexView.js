import React, { Component } from 'react';
import { connect } from 'react-redux';
import IndexViewChart from '../containers/IndexViewChart';
import IndexSummaryTable from '../components/IndexSummaryTable';
import { getIndexViewData } from '../actions/actions_indexview';
import NavTabs from '../containers/navigation/NavTabs';
import { Link, Route } from 'react-router-dom';
import ProjectView from './ProjectView';      

class IndexView extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true
        }
    }                
    componentDidMount(){
        this.setState({loading: true});
        this.props.dispatch(getIndexViewData).then(() =>{
            this.setState({loading: false});
        });
    }
    render(){
        if(this.state.loading === true){
            return(
                <div>
                Loading...
                </div>
            )
        }
        else{
            return(
                <div>
                <div className="container">
                    <NavTabs type='project' tabList={this.props.projects}/>
                        <div>
                            <h1>Index</h1>
                                <h2>Cassiopeia Home Page</h2>
                                    <p>Welcome to our project management web application!</p>
                                    <IndexViewChart data={this.props.indexViewData}/>
                                    <IndexSummaryTable data={this.props.indexViewData}/>
                        </div>
                </div>
                </div>
            ); 
        }
    }       
}

function mapStateToProps(state){
    return{
        projects: state.projects,
        indexViewData: state.indexViewData
    }
}

export default connect(mapStateToProps)(IndexView);