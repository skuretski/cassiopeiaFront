import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAlert, deleteAlert } from '../../actions';
import Alert from './Alert';
import _ from 'lodash';

class AlertsContainer extends Component {
    constructor(props){
        super(props);
    }
    renderAlerts(alerts){
        return alerts.map((alert) => {
            return (
                <Alert alert={alert} key={alert.id} />
            )
        });
    }
    render(){
        if(_.isEmpty(this.props.alerts) || !this.props.alerts){
            return(
                <div>
                </div>
            )
        } else {
            return(
                <div>
                    {this.renderAlerts(this.props.alerts)}
                </div>
            )
        }
    }
}

function mapStateToProps(state){
    return{
        alerts: state.alerts
    }
}

export default connect(mapStateToProps)(AlertsContainer);