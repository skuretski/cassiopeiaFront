import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmployeeListTable from '../Tables/EmployeeListTable';
import NavTabs from '../Navigation/NavTabs';
import { getEmployeeViewData } from '../../actions';

class EmployeeListView extends Component{
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
                    <div className="text-center load-spinner" />
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
                    {<EmployeeListTable data={this.props.employeeViewData}/>}
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

export default connect(mapStateToProps)(EmployeeListView);