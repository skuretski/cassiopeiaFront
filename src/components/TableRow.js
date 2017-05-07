import React from 'react';
import uuid from 'uuid';

const TableRow = (props) => {
    return (
        <tr key={props.title}>
            <td>{props.title}</td>
            {/*Create a td for each value we were passed in props*/}
            {props.values.map((v) => {
                return <td key={uuid.v4()}>{v}</td>
            })}
        </tr>
    );
}

export default TableRow;