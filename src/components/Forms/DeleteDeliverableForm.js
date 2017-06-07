import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, reset } from 'redux-form';
import { deleteDeliverable, getDeliverables, getDeliverableViewData } from '../../actions';

class DeleteDeliverableForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            message: '',
            deliverableTitle: ''
        }
    }

    componentDidMount() {
        this.setState({
            message: '',
            deliverableTitle: this.props.deliverables[this.props.id].title
        })
    }

    componentDidUpdate(prevProps) {
        // New ID, update title info
        if (this.props.id != prevProps.id) {
            this.setState({
                deliverableTitle: this.props.deliverables[this.props.id].title,
                message: ''
            });
        }
    }

    onSubmit(){
        this.props.deleteDeliverable(this.props.id).then(() => {
            if (this.props.deleteHasErrored) {
                this.setState({message: 'Unable to delete. Ensure that deliverable \
                 does not have associated tasks.'});
            } else {
                this.resetForm();
                // Re-fetch deliverables and deliverable view data, since we've changed it
                this.props.dispatch(getDeliverableViewData);
                this.props.dispatch(getDeliverables);
                $('.bs-delete-deliverable-modal-md').modal('hide');
                const { project_id } = this.props.match.params;
                this.props.history.push('/projects/' + project_id)
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
                <h4>{this.state.deliverableTitle}</h4>
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

DeleteDeliverableForm = reduxForm({
    form: 'DeleteDeliverableForm',
})(DeleteDeliverableForm);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteDeliverable,
    }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        deliverables: state.deliverables,
        affectedRows: state.deleteDeliverableAffectedRows,
        deleteHasErrored: state.deleteDeliverableHasErrored
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DeleteDeliverableForm));