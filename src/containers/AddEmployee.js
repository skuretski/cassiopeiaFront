import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions_disciplines';
import * as actions_employees from '../actions/actions_employees';


class AddEmployee extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount(){
        this.props.getDisciplines();
        this.setState({
            first: '',
            last: '',
            discipline_id: 0
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const payload = {
            first: this.state.first,
            last: this.state.last,
            discipline_id: this.state.discipline_id
        };

        actions_employees.postEmployees(payload);
    }

    handleChange(event) {
        var key = event.target.name;
        var val = event.target.value;
        var obj = {};
        obj[key] = val;
        this.setState(obj);
    }

    renderDisciplineDropdown(discipline){
        return(
            <option key={discipline.id} value={discipline.id}>
                {discipline.title}
            </option>       
        );
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <legend>Add Employee</legend>
                <div>
                    <label htmlFor="first-name-input">First Name</label>
                    <div>
                        <input type="text" name="first" id="first-name-input" onChange={this.handleChange} />
                    </div>
                </div>
                <div>
                    <label htmlFor="last-name-input">Last Name</label>
                    <div>
                        <input type="text" name="last" id="last-name-input" onChange={this.handleChange} />
                    </div>
                </div>
                <div>
                    <label htmlFor="discipline-input">Discipline</label>
                    <div>
                        <select defaultValue="0" name="discipline_id" id="discipline-dropdown" onChange={this.handleChange}>
                            <option value="0">--</option>
                            {this.props.disciplines.map(this.renderDisciplineDropdown)}
                        </select>
                    </div>
                </div>
                <div>
                    <input type="submit" value="Submit"/>
                </div>
            </form>
        );
    }
}

function mapStateToProps(state){
    return {
        disciplines: state.disciplines 
    };
}

export default connect(mapStateToProps, actions)(AddEmployee);