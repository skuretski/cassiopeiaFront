import React, { Component } from 'react';
import TableRow from './TableComponents/TableRow';
import _ from 'lodash';
import uuid from 'uuid';
import AddDisciplineForm from '../Forms/AddDisciplineForm';
import UpdateDisciplineForm from '../Forms/UpdateDisciplineForm';
import DeleteDisciplineForm from '../Forms/DeleteDisciplineForm';

class DisciplineListTable extends Component {
    constructor(props) {
        super(props);    

        this.handleUpdateDisciplineClick = this.handleUpdateDisciplineClick.bind(this);
        this.handleDeleteDisciplineClick = this.handleDeleteDisciplineClick.bind(this);

        this.state = {
            updateId: 0,
            deleteId: 0
        }
    }

    handleUpdateDisciplineClick(event) {
        const {id} = event.target;
        this.setState({ updateId: id });
        $('.bs-update-disc-modal-lg').modal('show');
    }

    handleDeleteDisciplineClick(event) {
        const {id} = event.target;
        this.setState({ deleteId: id });
        $('.bs-delete-disc-modal-md').modal('show');
    }

    render() {
        // Don't bother rendering the table if we don't have data
        if (!this.props.data) {
            return <div></div>
        }

        this.props.data.sort(function(a, b) {return a.title.localeCompare(b.title)});

        var rows = [];
        for (var i = 0; i < this.props.data.length; i++) {
            rows.push(<tr key={uuid.v4()}>
                <td>{this.props.data[i].title}</td>
                <td><button className="btn btn-default sharp" key={uuid.v4()} id={this.props.data[i].id} onClick={this.handleUpdateDisciplineClick}>Update</button></td>
                <td><button className="btn btn-default sharp btn-danger-text" key={uuid.v4()} id={this.props.data[i].id} onClick={this.handleDeleteDisciplineClick}>Delete</button></td>
                </tr>);
        }

        return (
            <div>
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th colSpan="2">
                                <button type="button" className="btn btn-primary sharp" data-toggle="modal" data-target=".bs-add-disc-modal-lg">
                                    Add New Discipline
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <div className="modal fade bs-add-disc-modal-lg" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="container-fluid">
                                <h2>Add Discipline</h2>
                                <AddDisciplineForm/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade bs-update-disc-modal-lg" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="container-fluid">
                                <h2>Update Discipline</h2>
                                <UpdateDisciplineForm id={this.state.updateId}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade bs-delete-disc-modal-md" role="dialog">
                    <div className="modal-dialog modal-md" role="document">
                        <div className="modal-content">
                            <div className="container-fluid">
                                <DeleteDisciplineForm id={this.state.deleteId}/>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        );
    }
}

export default DisciplineListTable;