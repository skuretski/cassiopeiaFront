import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavTabs from '../containers/navigation/NavTabs';
import { getDeliverableViewData } from '../actions/actions_deliverableview';

class DeliverableView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        console.log(this.props.routeParams.id);
    }
    render(){
        console.log(this.props)
        return(
            <div><h1>Deliverables</h1>
            <div>
                <ul className = "nav nav-tabs">
                    <li><a href='/'>Index</a></li>
                    <li><a href='/project'>Projects</a></li>
                    <li className="active"><a href='/deliverable'>Deliverables</a></li>
                    <li><a href='/task'>Tasks</a></li>
                    <li><a href='/form'>Add and Edit</a></li>
                </ul>    
            </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        deliverableTasks: state.deliverableTasks
    }
}
export default connect(mapStateToProps)(DeliverableView);