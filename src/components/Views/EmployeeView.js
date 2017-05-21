import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        return(

            <div className="container">
                <NavTabs type='project' tabList={this.props.projects}/>
                <h2>Employees</h2>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        employees: state.employees
    }
}

export default connect(mapStateToProps)(EmployeeView);