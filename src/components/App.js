import React, { Component } from 'react';
import ProjectList from '../containers/ProjectList';

export default class App extends Component{
    render(){
        return(
            <div><h1>Cassiopeia Front End</h1>
                <ProjectList />

            </div>
        );
    }
}