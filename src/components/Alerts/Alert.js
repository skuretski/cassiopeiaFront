import React, { Component } from 'react';
import { connect } from 'react-redux';

class Alert extends Component{
    constructor(props){
        super(props);
    }
    render(props){
        return(
            <div className="alert alert-danger alert-dismissible" role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;
                    </span>
                </button>
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