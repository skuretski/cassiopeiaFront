import { combineReducers } from 'redux';
import * as ProjectsReducer from './reducer_projects';
import * as DisciplinesReducer from './reducer_disciplines';
import * as DeliverablesReducer from './reducer_deliverables';
import * as TasksReducer from './reducer_tasks';
import * as EmployeeReducer from './reducer_employees';
import AssignmentsReducer from './reducer_assignments';
import FundingReducer from './reducer_funding';
import EmployeeViewReducer from './reducer_employeeview';
import FundingViewReducer from './reducer_fundingview';
import IndexViewReducer from './reducer_indexview';
import ProjectViewReducer from './reducer_projectview';
import DeliverableViewReducer from './reducer_deliverableview';
import TaskViewReducer from './reducer_taskview';
import AlertsReducer from './reducer_alerts';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    // PROJECTS
    projects: ProjectsReducer.defaultReducer, // refactor this one if we have time
    getProjectHasErrored: ProjectsReducer.getProjectHasErrored,
    getProject: ProjectsReducer.getProjectSuccess,
    updateProjectHasErrored: ProjectsReducer.updateProjectHasErrored,
    updateProjectChangedRows: ProjectsReducer.updateProjectSuccess,
    deleteProjectHasErrored: ProjectsReducer.deleteProjectHasErrored,
    deleteProjectChangedRows: ProjectsReducer.deleteProjectSuccess,

    // DISCIPLINES
    disciplines: DisciplinesReducer.getDisciplines,
    createDisciplineHasErrored: DisciplinesReducer.createDisciplineHasErrored,
    createDisciplineID: DisciplinesReducer.createDisciplineSuccess,
    updateDisciplineHasErrored: DisciplinesReducer.updateDisciplineHasErrored,
    updateDisciplineChangedRows: DisciplinesReducer.updateDisciplineSuccess,
    deleteDisciplineHasErrored: DisciplinesReducer.deleteDisciplineHasErrored,
    deleteDisciplineAffectedRows: DisciplinesReducer.deleteDisciplineSuccess,

    // DELIVERABLES
    deliverables: DeliverablesReducer.defaultReducer, // refactor this one if we have time
    getDeliverableHasErrored: DeliverablesReducer.getDeliverableHasErrored,
    getDeliverable: DeliverablesReducer.getDeliverableSuccess,
    updateDeliverableHasErrored: DeliverablesReducer.updateDeliverableHasErrored,
    updateDeliverableChangedRows: DeliverablesReducer.updateDeliverableSuccess,
    deleteDeliverableHasErrored: DeliverablesReducer.deleteDeliverableHasErrored,
    deleteDeliverableChangedRows: DeliverablesReducer.deleteDeliverableSuccess,

    // TASKS
    tasks: TasksReducer.defaultReducer, // refactor this one if we have time
    getTaskHasErrored: TasksReducer.getTaskHasErrored,
    getTask: TasksReducer.getTaskSuccess,
    updateTaskHasErrored: TasksReducer.updateTaskHasErrored,
    updateTaskChangedRows: TasksReducer.updateTaskSuccess,
    deleteTaskHasErrored: TasksReducer.deleteTaskHasErrored,
    deleteTaskChangedRows: TasksReducer.deleteTaskSuccess,

    // EMPLOYEES
    createEmployeeHasErrored: EmployeeReducer.createEmployeeHasErrored,
    createEmployeeIsSending: EmployeeReducer.createEmployeeIsSending,
    createEmployeeID: EmployeeReducer.createEmployeeSuccess,
    updateEmployeeHasErrored: EmployeeReducer.updateEmployeeHasErrored,
    updateEmployeeIsSending: EmployeeReducer.updateEmployeeIsSending,
    updateEmployeeChangedRows: EmployeeReducer.updateEmployeeSuccess,
    deleteEmployeeHasErrored: EmployeeReducer.deleteEmployeeHasErrored,
    deleteEmployeeIsSending: EmployeeReducer.deleteEmployeeIsSending,
    deleteEmployeeAffectedRows: EmployeeReducer.deleteEmployeeSuccess,
    getEmployeeHasErrored: EmployeeReducer.getEmployeeHasErrored,
    getEmployeeIsSending: EmployeeReducer.getEmployeeIsSending,
    getEmployee: EmployeeReducer.getEmployeeSuccess,

    // ASSIGNMENTS
    assignments: AssignmentsReducer,

    // VIEWS
    employeeViewData: EmployeeViewReducer,
    fundingViewData: FundingViewReducer,
    indexViewData: IndexViewReducer,
    projectViewData: ProjectViewReducer,
    deliverableViewData: DeliverableViewReducer,
    taskViewData: TaskViewReducer,

    // REDUX-FORM
    form: formReducer,



    // ALERTS
    alerts: AlertsReducer
});

export default rootReducer;