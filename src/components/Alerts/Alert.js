import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteAlert } from '../../actions';

class Alert extends Component{
    constructor(props){
        super(props);
    }
    onDeleteAlert(id){
        this.props.dispatch(deleteAlert(id));
    }
    render(props){
        return(
            <div>
                <span>
                {this.props.alert.text}
                </span>
                <button type="button" className="btn btn-danger btn-sm" id={this.props.alert.id} onClick={(e) => this.onDeleteAlert(this.props.alert.id)}>Remove</button>
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