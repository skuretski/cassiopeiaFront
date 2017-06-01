import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmployeeUtilizationTable from '../Tables/EmployeeUtilizationTable';
import NavTabs from '../Navigation/NavTabs';
import { getEmployeeViewData } from '../../actions';

class EmployeeUtilizationView extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true
        }
    }
    componentWillMount(){
        this.setState({loading:true});
        this.props.dispatch(getEmployeeViewData).then(() => {
            this.setState({loading: false});
        })
    }

    render(){
        if(this.state.loading === true){
            return(
                <div className="container-fluid">
                    <div className="text-center load-spinner" />;
                </div>
            )
        }
        else{
            return (
                <div className="container">
                    <NavTabs/>
                    <div className="chart-title">
                        <h4><b>Employee Utilization</b></h4>
                    </div>
                    <EmployeeUtilizationTable data={this.props.employeeViewData}/>
                </div>
            );
        }
    }
}

function mapStateToProps(state){
    return{
        employeeViewData: state.employeeViewData
    }
}

export default connect(mapStateToProps)(EmployeeUtilizationView);