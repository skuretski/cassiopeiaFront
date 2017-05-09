import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavTab from './NavTab';
import _ from 'lodash';

class NavTabs extends Component{
    constructor(props){
        super(props);
    }
    renderOneTab(){     
        return _.map(this.props.tabList, tab => {
            return (
                <NavTab url={this.props.toUrl} key={tab.id} tab={tab} type={this.props.type} />
            );
        });
    }
    renderTabs(){
        if(this.props.type == 'project'){
            return(
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                        <ul className="nav nav-tabs">
                            <li className="active"><a href='/'>Home</a></li>
                            {this.renderOneTab()}
                        </ul>
                    </div>
                </nav>
            );
        }
        else if(this.props.type == 'deliverable'){
            return(
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <ul className= 'nav nav-tabs nav-stacked col-md-2'>
                            {this.renderOneTab()}
                        </ul>
                    </div>
                </nav>
            );
        }
        else if(this.props.type == 'task'){
            return(
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <ul className = 'nav nav-tabs navbar-right'>
                            {this.renderOneTab()}
                        </ul>
                    </div>
                </nav>
            );
        }
    }

    render(){
        return(
            <div>
                {this.renderTabs()}
            </div>
        );
    }
}

export default NavTabs;