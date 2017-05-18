import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavTabs from '../Navigation/NavTabs';
import { getDeliverableViewData, getTaskViewData } from '../../actions';
import DeliverableViewChart from '../Charts/DeliverableViewChart';
import DeliverableSummaryTable from '../Tables/DeliverableSummaryTable';
import _ from 'lodash';

class DeliverableView extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
        }
    }
    componentWillMount(){
        this.setState({loading: true});                  
        this.props.dispatch(getDeliverableViewData(this.props.match.params.deliv_id)).then(()=> {
            this.setState({loading: false});
        });
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.match.params.deliv_id != this.props.match.params.deliv_id){
            this.props.dispatch(getDeliverableViewData(nextProps.match.params.deliv_id)).then(()=> {
                this.setState({loading: false});
            });
        }
    }
    componentWillUnmount(){
        this.setState({loading: true});
    }
    getProjectDeliverables(projectId, deliverables){
        var projDelivs = [];
        _.map(deliverables, function(deliverable){
            if(deliverable.project_id == projectId){
                projDelivs.push(deliverable)
                return deliverable;
            }        
        });
        return projDelivs;
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
                            <div className= "col col-md-2">
                                <NavTabs 
                                    type='deliverable' 
                                    tabList={this.getProjectDeliverables(this.props.match.params.project_id, this.props.deliverables)}
                                    projectId={this.props.match.params.project_id}
                                    delivId={this.props.match.params.deliv_id}
                                    isActive={this.props.match.params.deliv_id}
                                />
                            </div>
                            <div className="col col-md-8">
                                <DeliverableViewChart data={this.props.deliverableViewData}/>
                                <DeliverableSummaryTable data={this.props.deliverableViewData} url={this.props.match.url}/>
                            </div>
                            <div className="col col-md-2" id="rightsidebar">
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