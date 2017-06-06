import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteAlert } from '../../actions';

class Alert extends Component{
    constructor(props){
        super(props);

    }
    removeAlert(alert){
        console.log("Trying to remove");
        this.props.dispatch(deleteAlert(alert.id));
    }
    render(props){
        return(
            <div className="alert alert-danger alert-dismissible" role="alert">
                <button id={this.props.alert.id} onclose={() => this.removeAlert(this.props.alert)}type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;
                    </span>
                </button>
                {this.props.alert.text}
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        alerts: state.alerts
    }
}

export default connect(mapStateToProps)(Alert);