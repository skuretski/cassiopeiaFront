import { combineReducers } from 'redux';
import ProjectsReducer from './reducer_projects';
import DisciplinesReducer from './reducer_disciplines';
import DeliverablesReducer from './reducer_deliverables';
import TasksReducer from './reducer_tasks';
import EmployeeReducer from './reducer_employees';

const rootReducer = combineReducers({
    projects: ProjectsReducer,
    disciplines: DisciplinesReducer,
    deliverables: DeliverablesReducer,
    tasks: TasksReducer,
    employees: EmployeeReducer
});

export default rootReducer;