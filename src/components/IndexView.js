import React, { Component } from 'react';

class IndexView extends Component{
    render(){
        return(
            <div><h1>Index</h1>
            <div>
                <ul className = "nav nav-tabs">
                    <li className="active"><a href='/'>Index</a></li>
                    <li><a href='/project'>Projects</a></li>
                    <li><a href='/deliverable'>Deliverables</a></li>
                    <li><a href='/task'>Tasks</a></li>
                    <li><a href='/form'>Add and Edit</a></li>
                </ul>    
            </div>
            <div>
            <h2>Cassiopeia Home Page</h2>
                <p>Welcome to our project management web application!
                </p>
            </div>
            </div>
        );
    }
}



export default IndexView;