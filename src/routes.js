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
    <Route path="/projects/:id" component={ProjectView}/>
    <Route path="/projects/:id/deliverables/:id" component={DeliverableView} />
    <Route path="/projects/:id/deliverables/:id/task" component={TaskView} />
    <Route path="/form" component={FormView} />
    <Route path="/" component={IndexView} />
</Route>

);