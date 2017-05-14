import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import DeliverableView from './DeliverableView';
import FormView from './FormView';
import ProjectView from './ProjectView';
import TaskView from './TaskView';
import IndexView from './IndexView';

class App extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/projects/:project_id/deliverables/:deliv_id/task" component={TaskView} />
                    <Route path="/projects/:project_id/deliverables/:deliv_id" component={DeliverableView} />
                    <Route path="/projects/:project_id" component={ProjectView}/>       
                    <Route path="/form" component={FormView} />
                    <Route path="/" component={IndexView} />
                </Switch>
            </div>
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state){
    return{
        indexViewData: state.indexViewData,
        projectViewData: state.projectViewData,
        deliverableViewData: state.deliverableViewData
    }
}
export default connect(mapStateToProps)(App);
