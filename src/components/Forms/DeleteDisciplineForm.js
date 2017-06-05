import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, reset } from 'redux-form';
import { deleteDiscipline, getDisciplines } from '../../actions';

class DeleteDisciplineForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            message: '',
            disciplineTitle: ''
        }
    }

    componentDidUpdate(prevProps) {
        // New ID, fetch employee info
        if (this.props.id != prevProps.id) {
            const disc = this.props.disciplines.filter( d => {
                return d.id == this.props.id;
            });
            this.setState({
                disciplineTitle: disc[0].title,
                message: ''
            });
        }
    }

    onSubmit(){
        this.props.deleteDiscipline(this.props.id).then(() => {
            if (this.props.deleteHasErrored) {
                this.setState({message: 'Woops! Something went wrong. Try again.'})
            } else if (this.props.affectedRows == 0) {
                this.setState({message: 'Unable to delete. Ensure that discipline \
                 does not have associated employees or tasks.'});
            } else {
                this.resetForm();
                // Re-fetch the employee view data, since we've changed it
                this.props.dispatch(getDisciplines);
                $('.bs-delete-disc-modal-md').modal('hide');
            }
        })
    }

    resetForm() {
        this.props.reset();
        this.setState({message: ''});
    }

    render() {
        const { handleSubmit } = this.props; 
        return(
            <div className="text-center">
                <h3>You are about to delete:</h3>
                <h4>{this.state.disciplineTitle}</h4>
                <h3>Are you sure?</h3>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                    <button type="submit" className="btn btn-danger">
                    DELETE
                    </button>
                    <button className="btn btn-primary" data-dismiss="modal" onClick={this.resetForm.bind(this)}>CANCEL</button>
                    <div className="danger-text">{this.state.message}</div>
                </form>
            </div>
        );
    }
}

DeleteDisciplineForm = reduxForm({
    form: 'DeleteDisciplineForm',
})(DeleteDisciplineForm);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteDiscipline,
    }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        disciplines: state.disciplines,
        affectedRows: state.deleteDisciplineAffectedRows,
        deleteHasErrored: state.deleteDisciplineHasErrored
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteDisciplineForm);