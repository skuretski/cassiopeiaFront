import React, { Component } from 'react';
import { connect } from 'react-redux';
import IndexViewChart from '../containers/IndexViewChart';
import IndexSummaryTable from '../components/IndexSummaryTable';
import { getIndexViewData } from '../actions/actions_indexview';
import NavTabs from '../containers/navigation/NavTabs';
                   
class IndexView extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.dispatch(getIndexViewData);
    }
    render(){
        return(
            <div className="container">
                <NavTabs type='project' tabList={this.props.projects} toUrl={'/projects/'}/>
                    <div>
                        <h1>Index</h1>
                            <h2>Cassiopeia Home Page</h2>
                                <p>Welcome to our project management web application!</p>
                                <IndexViewChart data={this.props.indexViewData}/>
                                <IndexSummaryTable data={this.props.indexViewData}/>
                    </div>
            </div>
        ); 
    }       
}

function mapStateToProps(state){
    return{
        projects: state.projects,
        indexViewData: state.indexViewData
    }
}

export default connect(mapStateToProps)(IndexView);