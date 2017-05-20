import React from 'react';
import uuid from 'uuid';
import { NavLink } from 'react-router-dom';

const TableRow = (props) => {
    if(props.type === "project"){
        return (
            <tr key={props.title}>
                <td><NavLink key={props.id} to={"/projects/" + props.id} activeClassName="selected">{props.title}</NavLink></td>
                {/*Create a td for each value we were passed in props*/}
                {props.values.map((v) => {
                    return <td key={uuid.v4()}>{v}</td>
                })}
            </tr>
        );
    } else if(props.type === "deliverable"){
        return(
            <tr key={props.title}>
                <td><NavLink key={props.id} to={props.toUrl + "/deliverables/" + props.id} activeClassName="selected">{props.title}</NavLink></td>
                {/*Create a td for each value we were passed in props*/}
                {props.values.map((v) => {
                    return <td key={uuid.v4()}>{v}</td>
                })}
            </tr>
        );
    } else if(props.type === "task"){
        return(
            <tr key={props.title}>
                <td><NavLink key={props.id} to={props.toUrl + "/tasks/" + props.id} activeClassName="selected">{props.title}</NavLink></td>
                {/*Create a td for each value we were passed in props*/}
                {props.values.map((v) => {
                    return <td key={uuid.v4()}>{v}</td>
                })}
            </tr>
        );
    } else if (props.type === "totals"){
        return (
            <tr>
                <td><strong>{props.title}</strong></td>
                {props.values.map((v) => {
                    return <td key={uuid.v4()}><strong>{v}</strong></td>
                })}
            </tr>
        );
   } else {
        return (
            <tr>
                <td>{props.title}</td>
                {props.values.map((v) => {
                    return <td key={uuid.v4()}>{v}</td>
                })}
            </tr>
        );

   }


}

export default TableRow;