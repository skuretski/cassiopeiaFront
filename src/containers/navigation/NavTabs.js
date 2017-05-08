import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavTab from './NavTab';

class NavTabs extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <ul className="nav nav-tabs">
                {this.props.tabList.map((tab) => {
                    return (
                        <NavTab url={this.props.type} key={tab.id} object={tab}/>
                    );
                })}
            </ul>
        );
    }
}

export default NavTabs;