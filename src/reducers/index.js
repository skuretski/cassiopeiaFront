import { combineReducers } from 'redux';
import ProjectsReducer from './reducer_projects';
import DisciplinesReducer from './reducer_disciplines';
import DeliverablesReducer from './reducer_deliverables';
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
    projects: ProjectsReducer,
    disciplines: DisciplinesReducer,
    deliverables: DeliverablesReducer,
    tasks: TasksReducer,
    createEmployeeHasErrored: EmployeeReducer.createEmployeeHasErrored,
    createEmployeeIsSending: EmployeeReducer.createEmployeeIsSending,
    createEmployeeID: EmployeeReducer.createEmployeeSuccess,
    updateEmployeeHasErrored: EmployeeReducer.updateEmployeeHasErrored,
    updateEmployeeIsSending: EmployeeReducer.updateEmployeeIsSending,
    updateChangedRows: EmployeeReducer.updateEmployeeSuccess,
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