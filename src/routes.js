import React from 'react';
import { Route, IndexRoute}  from 'react-router';
import App from './components/App';
import DeliverableView from './components/DeliverableView';
import FormView from './components/FormView';
import ProjectView from './components/ProjectView';
import TaskView from './components/TaskView';
import IndexView from './components/IndexView';

export default(

<Route path="/" component={App}>
    <IndexRoute component ={IndexView} />
    <Route path="/project" component={ProjectView} />
    <Route path="/deliverable" component={DeliverableView} />
    <Route path="/task" component={TaskView} />
    <Route path="/form" component={FormView} />
</Route>

);