import React, { Component } from 'react';
import TableRow from './TableComponents/TableRow';
import _ from 'lodash';

class DisciplineListTable extends Component {
    constructor(props) {
        super(props);    

    }

    handleUpdateDisciplneClick(event) {
        const {id} = event.target;
        this.setState({ updateId: id });
        $('.bs-update-modal-lg').modal('show');
    }

    handleDeleteDisciplneClick(event) {
        const {id} = event.target;
        this.setState({ deleteId: id });
        $('.bs-delete-modal-md').modal('show');
    }

    render() {
        // Don't bother rendering the table if we don't have data
        if (!this.props.data) {
            return <div></div>;
        }

        this.props.data.sort(function(a, b) {return a.title.localeCompare(b.title)});

        var rows = [];
        for (var i = 0; i < this.props.data.length; i++) {
            rows.push(<tr key={this.props.data[i].id}>
                <td>{this.props.data[i].title}</td>
                <td><button className="btn btn-default sharp" id={this.props.data[i].id} onClick={this.handleUpdateDisciplineClick}>Update</button></td>
                <td><button className="btn btn-default sharp btn-danger-text" id={this.props.data[i].id} onClick={this.handleDeleteDisciplineClick}>Delete</button></td>
                </tr>);
        }

        return (
            <div>
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th colSpan="2">
                                <button type="button" className="btn btn-primary sharp" data-toggle="modal" data-target="kyle do your magic here">
                                    Add New Discipline
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default DisciplineListTable;