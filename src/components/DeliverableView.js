import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavTabs from '../containers/navigation/NavTabs';
import { getDeliverableViewData } from '../actions/actions_deliverableview';
import { getTaskViewData } from '../actions/actions_deliverableview';
import DeliverableViewChart from '../containers/DeliverableViewChart';
import DeliverableSummaryTable from '../components/DeliverableSummaryTable';

class DeliverableView extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true
        }
    }
    componentWillMount(){
        this.setState({loading: true});                  
        this.props.dispatch(getDeliverableViewData(this.props.match.params.deliv_id)).then(()=> {
            this.setState({loading: false});
        });
    }
    render(){
        if(this.state.loading === true){
            return(
                <div>Loading...</div>
            );
        } else{
            return(
                <div>
                    <div className="container">
                        <NavTabs type='project' tabList={this.props.projects}/>
                        <div className="row">
                            <div className="col col-md-2">
                            </div>
                            <div className="col col-md-10">
                                <DeliverableViewChart data={this.props.deliverableViewData}/>
                                <DeliverableSummaryTable data={this.props.deliverableViewData} url={this.props.match.url}/>
                            </div>
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
        deliverableViewData: state.deliverableViewData,
    }
}
export default connect(mapStateToProps)(DeliverableView);