import React, { Component } from 'react';
import ProjectList from '../containers/ProjectList';
import AddEmployee from '../containers/AddEmployee';

export default class App extends Component{
    render(){
        return(
            <div><h1>Cassiopeia Front End</h1>
                <ProjectList />
                <AddEmployee />
            </div>
        );
    }
}