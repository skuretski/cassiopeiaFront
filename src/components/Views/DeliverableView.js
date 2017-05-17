import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavTabs from '../Navigation/NavTabs';
import { getDeliverableViewData, getTaskViewData } from '../../actions';
import DeliverableViewChart from '../Charts/DeliverableViewChart';
import DeliverableSummaryTable from '../Tables/DeliverableSummaryTable';

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
                    </div>
                    <div className="container">
                        <div className="row">
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
        deliverables: state.deliverables,
        deliverableViewData: state.deliverableViewData,
    }
}
export default connect(mapStateToProps)(DeliverableView);