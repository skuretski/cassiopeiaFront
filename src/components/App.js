import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import { getProjects } from '../actions/actions_projects';
import { getTasks } from '../actions/actions_tasks';
import { getDeliverables } from '../actions/actions_deliverables';

import DeliverableView from './DeliverableView';
import FormView from './FormView';
import ProjectView from './ProjectView';
import TaskView from './TaskView';
import IndexView from './IndexView';

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
                    <Route path="/projects/:project_id/deliverables/:deliv_id/tasks" component={TaskView} />
                    <Route path="/projects/:project_id/deliverables/:deliv_id" component={DeliverableView} />   
                    <Route path="/projects/:project_id" component={ProjectView} />
                    <Route path="/form" component={FormView} />
                    <Route exact path="/" component={IndexView} />
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
