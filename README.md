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
    <li>redux-thunk</li>
    <li>uuid</li>
</ul>

## File Structure
- src
  - actions
    - actions_deliverables.js
    - actions_deliverableview.js
    - actions_disciplines.js
    - actions_employees.js
    - actions_indexview.js
    - actions_projects.js
    - actions_projectview.js
    - actions_tasks.js
  - api
    - index.js
  - components  
    - App.js
    - DeliverableSummaryTable.js
    - DeliverableView.js
    - FormView.js
    - IndexSummaryTable.js
    - IndexView.js
    - ProjectSummaryTable.js
    - ProjectView.js
    - TableRow.js
    - TaskView.js
  - containers 
    - navigation
      - NavTab.js
      - NavTabs.js 
    - AddEmployee.js
    - IndexViewChart.js
    - ProjectList.js
    - ProjectViewChart.js
  - reducers
    - index.js
    - reducer_deliverables.js
    - reducer_deliverableview.js
    - reducer_disciplines.js
    - reducer_employees.js
    - reducer_indexview.js
    - reducer_projects.js
    - reducer_projectview.js
    - reducer_tasks.js
  - index.js
- style
  - style.css
- test
  - components
    - app_test.js
  - test_helper.js
- .babelrc  //For dev.
- bundle.js  //For production. Use webpack for dev.
- index.html
- package.json
- server.js
- webpack.config.js  //For dev.

## How to Run

- To install dependencies:
  - npm install

- To run development:
  - npm run dev
  - Then, open "localhost:8080"

- To get bundle.js either one:
  - webpack -p (Webpack must be installed globally)
  - npm postinstall

- To start server:
  - npm start 

- To test (using Mocha and Chai):
  - npm run test
  - npm run test:watch

## License

ISC


