import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmployeeSummaryTable from '../Tables/EmployeeSummaryTable';
import NavTabs from '../Navigation/NavTabs';
import { getEmployeeViewData } from '../../actions';

class EmployeeView extends Component{
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
                <h3>Loading...</h3>
                </div>
            )
        }
        else{
            return (
                <div className="container">
                    <NavTabs/>
                    <div className="chart-title">
                        <h4><b>Employee List</b></h4>
                    </div>
                    {<EmployeeSummaryTable data={this.props.employeeViewData}/>}
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

export default connect(mapStateToProps)(EmployeeView);