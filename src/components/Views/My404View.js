import React, { Component } from 'react';
import NavTabs from '../Navigation/NavTabs';


class My404View extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <div className="container-fluid">
                    <NavTabs />
                </div>
                <div className="container-fluid">
                    <h4>Uh oh! Page not found!</h4>
                </div>
            </div>
        );
    }
}

export default My404View;