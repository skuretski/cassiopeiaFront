import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavTab from './NavTab';
import { Route, NavLink } from 'react-router-dom';
import _ from 'lodash';

class NavTabs extends Component{
    constructor(props){
        super(props);
    }
    renderOneTab(){   
        return _.map(this.props.tabList, tab => {
            return (
                <NavTab key={tab.id} tab={tab} type={this.props.type} projectId={this.props.projectId} delivId={this.props.delivId} />
            );
        });
    }
    renderTabs(){
        if(this.props.type == 'project'){
            return(
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                        <ul className="nav nav-tabs">
                            <li><NavLink to='/' activeClassName="selected">Home</NavLink></li>
                        </ul>
                    </div>
                    <div className="container-fluid">
                        <ul className="nav nav-tabs">
                            {this.renderOneTab()}
                        </ul>
                    </div>
                </nav>
            );
        }
        else if(this.props.type == 'deliverable'){
            return(
                <nav className="navbar navbar-default">
                    <ul className= 'nav nav-tabs nav-stacked col-md-2'>
                         {this.renderOneTab()}
                    </ul>
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