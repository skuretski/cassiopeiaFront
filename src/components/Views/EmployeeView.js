import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmployeeSummaryTable from '../Tables/EmployeeSummaryTable';
import NavTabs from '../Navigation/NavTabs';
import { getEmployees } from '../../actions';

class EmployeeView extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true
        }
    }
    componentWillMount(){
        this.setState({loading:true});
        this.props.dispatch(getEmployees).then(() => {
            this.setState({loading: false});
        })
    }
    render(){
        console.log(this.props.employees);
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
                    <NavTabs type='project' tabList={this.props.projects}/>
                    <div className="chart-title">
                        <h4><b>Employee List</b></h4>
                    </div>
                    {<EmployeeSummaryTable data={this.props.employees}/>}
                </div>
            );
        }
    }
}

function mapStateToProps(state){
    return{
        employees: state.employees
    }
}

export default connect(mapStateToProps)(EmployeeView);