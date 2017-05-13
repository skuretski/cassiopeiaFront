import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavTabs from '../containers/navigation/NavTabs';
import { getTaskViewData } from '../actions/actions_deliverableview';
import { getDeliverableViewData } from '../actions/actions_deliverableview';
import DeliverableSummaryTable from '../components/DeliverableSummaryTable';

class DeliverableView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.dispatch(getDeliverableViewData(this.props.routeParams.id[1]));
    }
    render(){
        return(
            <div>
                <h1>Deliverables</h1>
                <div>
                    <ul className = "nav nav-tabs">
                        <li><a href='/'>Index</a></li>
                        <li><a href='/project'>Projects</a></li>
                        <li className="active"><a href='/deliverable'>Deliverables</a></li>
                        <li><a href='/task'>Tasks</a></li>
                        <li><a href='/form'>Add and Edit</a></li>
                    </ul>    
                </div>
                <DeliverableSummaryTable data={this.props.deliverableViewData}/>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        deliverableViewData: state.deliverableViewData,
    }
}
export default connect(mapStateToProps)(DeliverableView);