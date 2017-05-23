import { combineReducers } from 'redux';
import ProjectsReducer from './reducer_projects';
import DisciplinesReducer from './reducer_disciplines';
import DeliverablesReducer from './reducer_deliverables';
import TasksReducer from './reducer_tasks';
import EmployeeReducer from './reducer_employees';
import FundingViewReducer from './reducer_fundingview';
import IndexViewReducer from './reducer_indexview';
import ProjectViewReducer from './reducer_projectview';
import DeliverableViewReducer from './reducer_deliverableview';
import TaskViewReducer from './reducer_taskview';
import EmployeeDisciplineRedcuer from './reducer_employees_by_discipline';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    projects: ProjectsReducer,
    disciplines: DisciplinesReducer,
    deliverables: DeliverablesReducer,
    tasks: TasksReducer,
    employees: EmployeeReducer,
    fundingViewData: FundingViewReducer,
    indexViewData: IndexViewReducer,
    projectViewData: ProjectViewReducer,
    deliverableViewData: DeliverableViewReducer,
    taskViewData: TaskViewReducer,
    form: formReducer
});

export default rootReducer;