import { combineReducers } from 'redux';
import * as ProjectsReducer from './reducer_projects';
import DisciplinesReducer from './reducer_disciplines';
import * as DeliverablesReducer from './reducer_deliverables';
import TasksReducer from './reducer_tasks';
import * as EmployeeReducer from './reducer_employees';
import AssignmentsReducer from './reducer_assignments';
import EmployeeViewReducer from './reducer_employeeview';
import FundingViewReducer from './reducer_fundingview';
import IndexViewReducer from './reducer_indexview';
import ProjectViewReducer from './reducer_projectview';
import DeliverableViewReducer from './reducer_deliverableview';
import TaskViewReducer from './reducer_taskview';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    projects: ProjectsReducer.defaultReducer, // refactor this one if we have time
    getProjectHasErrored: ProjectsReducer.getProjectHasErrored,
    getProject: ProjectsReducer.getProjectSuccess,
    updateProjectHasErrored: ProjectsReducer.updateProjectHasErrored,
    updateProjectChangedRows: ProjectsReducer.updateProjectSuccess,
    disciplines: DisciplinesReducer,
    deliverables: DeliverablesReducer.defaultReducer, // refactor this one if we have time
    getDeliverableHasErrored: DeliverablesReducer.getDeliverableHasErrored,
    getDeliverable: DeliverablesReducer.getDeliverableSuccess,
    updateDeliverableHasErrored: DeliverablesReducer.updateDeliverableHasErrored,
    updateDeliverableChangedRows: DeliverablesReducer.updateDeliverableSuccess,
    tasks: TasksReducer,
    createEmployeeHasErrored: EmployeeReducer.createEmployeeHasErrored,
    createEmployeeIsSending: EmployeeReducer.createEmployeeIsSending,
    createEmployeeID: EmployeeReducer.createEmployeeSuccess,
    updateEmployeeHasErrored: EmployeeReducer.updateEmployeeHasErrored,
    updateEmployeeIsSending: EmployeeReducer.updateEmployeeIsSending,
    updateEmployeeChangedRows: EmployeeReducer.updateEmployeeSuccess,
    deleteEmployeeHasErrored: EmployeeReducer.deleteEmployeeHasErrored,
    deleteEmployeeIsSending: EmployeeReducer.deleteEmployeeIsSending,
    deleteAffectedRows: EmployeeReducer.deleteEmployeeSuccess,
    getEmployeeHasErrored: EmployeeReducer.getEmployeeHasErrored,
    getEmployeeIsSending: EmployeeReducer.getEmployeeIsSending,
    getEmployee: EmployeeReducer.getEmployeeSuccess,
    employeesByDiscipline: EmployeeReducer.getEmployeesByDiscipline,
    assignments: AssignmentsReducer,
    employeeViewData: EmployeeViewReducer,
    fundingViewData: FundingViewReducer,
    indexViewData: IndexViewReducer,
    projectViewData: ProjectViewReducer,
    deliverableViewData: DeliverableViewReducer,
    taskViewData: TaskViewReducer,
    form: formReducer,
});

export default rootReducer;