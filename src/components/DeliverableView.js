import React, { Component } from 'react';

class DeliverableView extends Component{
    render(){
        return(
            <div><h1>Deliverables</h1>
            <div>
                <ul className = "nav nav-tabs">
                    <li><a href='/'>Index</a></li>
                    <li><a href='/project'>Projects</a></li>
                    <li className="active"><a href='/deliverable'>Deliverables</a></li>
                    <li><a href='/task'>Tasks</a></li>
                    <li><a href='/form'>Add and Edit</a></li>
                </ul>    
            </div>
            </div>
        );
    }
}

export default DeliverableView;