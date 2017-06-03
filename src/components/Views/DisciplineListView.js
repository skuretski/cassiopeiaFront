import React, { Component } from 'react';
import { connect } from 'react-redux';
import DisciplineListTable from '../Tables/DisciplineListTable';
import NavTabs from '../Navigation/NavTabs';
import { getDisciplines } from '../../actions';

class DisciplineListView extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true
        }
    }
    componentWillMount(){
        this.setState({loading:true});
        this.props.dispatch(getDisciplines).then(() => {
            this.setState({loading: false});
        })
    }

    render(){
        if(this.state.loading === true){
            return(
                <div className="container-fluid">
                    <div className="text-center load-spinner" />;
                </div>
            )
        }
        else{
            return (
                <div className="container">
                    <NavTabs/>
                    <div className="chart-title">
                        <h4><b>Discipline List</b></h4>
                    </div>
                    {<DisciplineListTable data={this.props.disciplines}/>}
                </div>
            );
        }
    }
}

function mapStateToProps(state){
    return{
        disciplines: state.disciplines
    }
}

export default connect(mapStateToProps)(DisciplineListView);