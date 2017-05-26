import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import { getProjects, getTasks, getDeliverables } from '../actions';


import DeliverableView from './Views/DeliverableView';
import FormView from './Views/FormView';
import ProjectView from './Views/ProjectView';
import TaskView from './Views/TaskView';
import IndexView from './Views/IndexView';
import FundingProjectView from './Views/FundingProjectView';
import FundingTypeView from './Views/FundingTypeView';
import EmployeeListView from './Views/EmployeeListView';
import EmployeeUtilizationView from './Views/EmployeeUtilizationView';
import My404View from './Views/My404View';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true
        }
    }             
    componentWillMount(){
        this.setState({loading: true});
        Promise.all([
            this.props.dispatch(getProjects),
            this.props.dispatch(getDeliverables),
            this.props.dispatch(getTasks)
        ]).then(() => this.setState({loading: false}))
        .catch((error) => console.log(error));
    }
    render(){
        return(
            <div>
                <Switch>
                    <Route path="/projects/:project_id/deliverables/:deliv_id/tasks/:task_id" component={TaskView} />
                    <Route path="/projects/:project_id/deliverables/:deliv_id" component={DeliverableView} />   
                    <Route path="/projects/:project_id" component={ProjectView} />
                    <Route path="/funding/project" component={FundingProjectView} />
                    <Route path="/funding/type" component={FundingTypeView} />
                    <Route path="/employees/list" component={EmployeeListView} />
                    <Route path="/employees/utilization" component={EmployeeUtilizationView} />
                    <Route exact path="/" component={IndexView} />
                    <Route path="*" component={My404View} />
                </Switch>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        projects: state.projects,
        deliverables: state.deliverables,
        tasks: state.tasks
    }
}
export default withRouter(connect(mapStateToProps)(App));
