import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjects } from '../actions/actions_projects';
import { getDeliverables } from '../actions/actions_deliverables';
import { getTasks } from '../actions/actions_tasks';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false
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
                {this.props.children}
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
export default connect(mapStateToProps)(App);