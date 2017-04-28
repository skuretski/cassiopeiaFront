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
    <li>chart.js@1.1.1</li>
    <li>express</li>
    <li>lodash</li>
    <li>path</li>
    <li>react</li>
    <li>react-bootstrap</li>
    <li>react-chartjs</li>
    <li>react-dom</li>
    <li>react-redux</li>
    <li>react-router</li>
    <li>redux</li>
</ul>

## File Structure
- src
  - actions
    - actions_employees.js
    - actions_projects.js
  - api
    - index.js
  - components  //Static components
    - App.js
  - containers  //Dynamic components
    - graphs
    - ProjectList.js
  - middlewares
    - async.js
  - reducers
    - index.js
    - reducer_projects.js
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

- To get bundle.js:
  - webpack -p (Webpack must be installed globally)
  - ** OR **
  - npm postinstall

- To start server:
  - npm start 

- To test (using Mocha and Chai):
  - npm run test
  -  ** OR **
  - npm run test:watch

## License

ISC


