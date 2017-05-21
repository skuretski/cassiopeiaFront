import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavTabs from '../Navigation/NavTabs';

class FundingView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="container">
                <NavTabs type='project' tabList={this.props.projects}/>
                <h2>Funding</h2>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        
    }
}

export default connect(mapStateToProps)(FundingView);