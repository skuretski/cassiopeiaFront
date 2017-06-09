# Cassiopeia Web Application

This React.js web application serves as the front-end to a project
management API. API here: https://github.com/skuretski/cassiopeia

## Authors

<ul>
    <li>Kyle Guthrie</li>
    <li>Susan Kuretski</li>
    <li>Michael Cash Stramel</li>
</ul>

## Dependencies

<ul>
    <li>axios</li>
    <li>babel-preset-stage-1</li>
    <li>chart.js</li>
    <li>express</li>
    <li>lodash</li>
    <li>path</li>
    <li>react</li>
    <li>react-chartjs-2</li>
    <li>react-dom</li>
    <li>react-redux</li>
    <li>react-router</li>
    <li>react-router-dom</li>
    <li>redux</li>
    <li>redux-form</li>
    <li>redux-promise</li>
    <li>redux-thunk</li>
    <li>uuid</li>
</ul>

## File Structure
- src
  - actions
    - actions_alerts
      - actions_alert.js
    - actions_tables
      - actions_assignments.js
      - actions_deliverables.js
      - actions_disciplines.js
      - actions_employees.js
      - actions_funding.js
      - actions_projects.js
      - actions_sow.js
      - actions_tasks.js
    - actions_views
      - actions_deliverableview.js
      - actions_employeeview.js
      - actions_fundingview.js
      - actions_indexview.js
      - actions_projectview.js
      - actions_taskview.js
    - index.js
  - api
    - index.js
  - components  
    - Alerts
      - Alert.js
      - AlertContainer.js
    - Charts
      - DeliverableViewChart.js
      - FundingViewByProjectChart.js
      - FundingViewByTypeChart.js
      - IndexViewChart.js
      - ProjectViewChart.js
      - TaskViewChart.js
    - Forms
      - AddDeliverableForm.js
      - AddDisciplineForm.js
      - AddEmployeeForm.js
      - AddProjectForm.js
      - AddTaskForm.js
      - DeleteDeliverableForm.js
      - DeleteDisciplineForm.js
      - DeleteEmployeeForm.js
      - DeleteProjectForm.js
      - DeleteTaskForm.js
      - ModifyAssignmentForm.js
      - ModifyFundingForm.js
      - ModifySOWForm.js
      - UpdateDeliverableForm.js
      - UpdateDisciplineForm.js
      - UpdateEmployeeForm.js
      - UpdateProjectForm.js
      - UpdateTaskForm.js
    - Navigation
      - NavTab.js
      - NavTabs.js
    - Tables
      - TableComponents
        - TableRow.js
      - DeliverableSummaryTable.js
      - DisciplineListTable.js
      - EmployeeListTable.js
      - EmployeeUtilizationTable.js
      - FundingByProjectSummaryTable.js
      - FundingByTypeSummaryTable.js
      - IndexSummaryTable.js
      - ProjectSummaryTable.js
      - TaskSummaryTable.js
    - Views
      - DeliverableView.js
      - DisciplineListView.js
      - EmployeeListView.js
      - EmployeeUtilizationView.js
      - FundingProjectView.js
      - FundingTypeView.js
      - IndexView.js
      - My404View.js
      - ProjectView.js
      - TaskView.js
    App.js
  - reducers
    - index.js
    - reducer_alerts.js
    - reducer_assignments.js
    - reducer_deliverables.js
    - reducer_deliverableview.js
    - reducer_disciplines.js
    - reducer_employees.js
    - reducer_employeeview.js
    - reducer_funding.js
    - reducer_fundingview.js
    - reducer_indexview.js
    - reducer_projects.js
    - reducer_projectview.js
    - reducer_tasks.js
    - reducer_taskview.js
  - index.js
- style
  - style.css
- test
  - components
    - app_test.js
  - test_helper.js
- .babelrc  
- bundle.js 
- index.html
- package.json
- server.js
- webpack.config.js

## How to Run

- To install dependencies:
  - npm install

- To run development:
  - npm run dev
  - Then, open "localhost:8080"

- To get production bundle.js:
  - npm run build-production

- To start server:
  - npm start 

- To test (using Mocha and Chai):
  - npm run test
  - npm run test:watch

## License

ISC


