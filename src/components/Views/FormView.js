import React, { Component } from 'react';
import AddEmployee from '../Forms/AddEmployee';

class FormView extends Component{
    render(){
        return(
            <div><h1>Add or Edit</h1>
            <div>
                <ul className = "nav nav-tabs">
                    <li><a href='/'>Index</a></li>
                    <li><a href='/project'>Projects</a></li>
                    <li><a href='/deliverable'>Deliverables</a></li>
                    <li><a href='/task'>Tasks</a></li>
                    <li className="active"><a href='/form'>Add and Edit</a></li>
                </ul>    
            </div>
                <AddEmployee />
            </div>
        );
    }
}

export default FormView;