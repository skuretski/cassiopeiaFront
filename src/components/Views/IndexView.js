import React, { Component } from 'react';
import { connect } from 'react-redux';
import IndexViewChart from '../Charts/IndexViewChart';
import IndexSummaryTable from '../Tables/IndexSummaryTable';
import { getIndexViewData } from '../../actions';
import NavTabs from '../Navigation/NavTabs';
import AddProjectForm from '../Forms/AddProjectForm';
     
class IndexView extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true
        }
    }                
    componentDidMount(){
        this.setState({loading: true});
        this.props.dispatch(getIndexViewData).then(() =>{
            this.setState({loading: false});
        });
    }
    addProjectAction(){
        console.log("Hi!");
    }
    render(){
        if(this.state.loading === true){
            return(
                <div className="container-fluid">
                <h3>Loading...</h3>
                </div>
            )
        }
        else{
            return(
                <div className="container">
                    <NavTabs type='project' tabList={this.props.projects}/>
                    {/* START MODAL */}
                    <div className="modal fade bs-project-modal-lg" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="container-fluid">
                                <h2>Add a Project</h2>
                                <AddProjectForm/>
                                </div>
                            </div>
                        </div>
                    </div> 
                    {/* END MODAL */}
                    <div className="chart-title">
                        <h4><b>Business Plan Overview</b></h4>
                    </div>
                    <IndexViewChart data={this.props.indexViewData}/>
                    <IndexSummaryTable data={this.props.indexViewData}/>
                </div>
            ); 
        }
    }       
}

function mapStateToProps(state){
    return{
        projects: state.projects,
        indexViewData: state.indexViewData
    }
}

export default connect(mapStateToProps)(IndexView);