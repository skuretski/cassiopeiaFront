import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, reset } from 'redux-form';
import { deleteEmployee, getEmployeeById, getEmployeeViewData } from '../../actions';

class DeleteEmployeeForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            message: '',
            employeeName: ''
        }
    }

    componentDidUpdate(prevProps) {
        // New ID, fetch employee info
        if (this.props.id != prevProps.id) {
            this.props.getEmployeeById(this.props.id).then( () => {
                if (this.props.getHasErrored) {
                    this.setState({message: 'Woops! Something went wrong. Try again.'});
                } else {
                    const {first, last} = this.props.employee;
                    this.setState({ employeeName: last + ', ' + first });
                }
            });
        }
    }

    onSubmit(){
        this.props.deleteEmployee(this.props.id).then(() => {
            if (this.props.deleteHasErrored) {
                this.setState({message: 'Woops! Something went wrong. Try again.'})
            } else {
                this.setState({message: ''})
                this.props.reset();
                // Re-fetch the employee view data, since we've changed it
                this.props.dispatch(getEmployeeViewData);
                $('.bs-delete-modal-lg').modal('hide');
            }
        })
    }

    render() {
        const { handleSubmit, reset } = this.props; 
        return(
            <div>
                <h3>You are about to delete:</h3>
                <h4>{this.state.employeeName}</h4>
                <h3>Are you sure?</h3>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                    <button type="submit" className="btn btn-danger">
                    DELETE
                    </button>
                    <button className="btn btn-primary" data-dismiss="modal" onClick={reset}>CANCEL</button>
                    <p>{this.state.message}</p>
                </form>
            </div>
        );
    }
}

DeleteEmployeeForm = reduxForm({
    form: 'DeleteEmployeeForm',
})(DeleteEmployeeForm);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteEmployee,
        getEmployeeById,
        getEmployeeViewData,
    }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        employee: state.getEmployee,
        getHasErrored: state.getEmployeeHasErrored,
        deleteHasErrored: state.deleteEmployeeHasErrored
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteEmployeeForm);