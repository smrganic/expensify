# Expensify app
This app was made in the process of learning about [React applications](https://reactjs.org/) by coding along with an [online course](https://www.udemy.com/course/react-2nd-edition/). It's still under development so it's a bit rough around the edges. For example, there is currently minimal css styling.

## Install
If you wish to tinker with the source code here is a step by step guide.
1. Clone the repo.

```
git clone https://github.com/smrganic/expensify.git
```

2. Make sure you have [node.js](https://nodejs.org/en/) and [yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable) installed.

```
node --version
yarn --version
```
If you did a fresh install, restart your computer. This can help with some problems later.
If you are using PowerShell you may need to change your execution policy,

```
Set-ExecutionPolicy -ExecutionPolicy Unrestricted
```

3. Get all the necessary dependencies.
```
yarn install
```
After this you can start up the preview dev server.

```
yarn run dev-server
```

## Testing

All of the tests are located within the src/tests directory. The framework used for testing is [Jest](https://jestjs.io/) combined with the [Enzyme](https://enzymejs.github.io/enzyme/) utility for React. 

* Jest is used because it allows writing tests with an approachable, familiar and feature-rich API that gives results quickly. Tests fail—when they do, Jest provides rich context why. It is fast, safe and can reliably run tests in parallel. It is simple to use and requires minimal configuration for robust features like generating code coverage information for entire projects.

* Enzyme Testing utility for React makes it easier to test the output of React Components. It allows the tester to manipulate, traverse, and in some ways simulate runtime given the output. Enzyme's API is meant to be intuitive and flexible by mimicking jQuery's API for DOM manipulation and traversal.

### Example component for testing

The AddExpensePage represents a single page in the application that renders another component to handle user form input data. It passes down a callback function as a prop to the child component. (If you are unfamiliar with props visit the [React Docs page](https://reactjs.org/docs/components-and-props.html)). Once the callback is called, AddExpensePage dispatches an action to update the redux store with the correct data.

```javascript
import React from "react"
import { connect } from "react-redux"
import ExpenseForm from "./ExpenseForm"
import { addExpense } from "../redux/actions/expenses"

export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.addExpense(expense)
        this.props.history.push("/")
    }
    render() {
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm onSubmit={this.onSubmit} />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    addExpense: (expense) => dispatch(addExpense(expense))
})

export default connect(undefined, mapDispatchToProps)(AddExpensePage)
```

### Example test suite for AddExpensePage

The test suite calls beforeEach() function before every test run so tests are independent of eachother. It creates the needed [mock functions](https://jestjs.io/docs/en/mock-functions) and [shallow](https://enzymejs.github.io/enzyme/docs/api/shallow.html) renders the component.

The first test captures the whole AddExpensePage element in a [snapshot](https://jestjs.io/docs/en/snapshot-testing) and compares it to the previous one for changes. This test looks for unexpected UI changes. It passes if there is no changes and fails if the rendered output changed.

The second test finds the ExpenseForm child component within AddExpensePage, passes some mock data to it using props and calls the onSubmit callback. The [assertion](https://jestjs.io/docs/en/expect#tohavebeenlastcalledwitharg1-arg2-) checks if the correct function has been called with the correct data after the callback.

```javascript
import React from "react"
import { shallow } from "enzyme"
import { AddExpensePage } from "../../components/AddExpensePage"
import expenses from "../mock-data/expenses"

let addExpense, history, wrapper

beforeEach(() => {
    addExpense = jest.fn()
    history = { push: jest.fn() }
    wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history} />)
})

test("Should render AddExpensePage.", () => {
    expect(wrapper).toMatchSnapshot()
})

test("Should handle onSubmit correctly.", () => {
    wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1])
    expect(history.push).toHaveBeenLastCalledWith("/")
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1])
})
```

### Run all test suites

```
yarn test
```
Expected output from the test suite.

```
$ yarn test
yarn run v1.22.4
$ jest --config=jest.config.json
PASS src/tests/components/ExpenseForm.test.js
PASS src/tests/components/ExpenseListFilters.test.js
PASS src/tests/redux/reducers/expenses.test.js
PASS src/tests/redux/actions/expenses.test.js
PASS src/tests/redux/selectors/expenses.test.js
PASS src/tests/redux/reducers/filters.test.js
PASS src/tests/redux/actions/filters.test.js
PASS src/tests/components/EditExpensePage.test.js
PASS src/tests/components/AddExpensePage.test.js
PASS src/tests/components/ExpensesSummary.test.js
PASS src/tests/redux/selectors/expenses-total.test.js
PASS src/tests/components/ExpenseList.test.js
PASS src/tests/components/ExpenseListItem.test.js
PASS src/tests/components/ExpenseDashboardPage.test.js
PASS src/tests/components/NotFoundPage.test.js
PASS src/tests/components/Header.test.js
PASS src/tests/components/HelpPage.test.js
Test Suites: 17 passed, 17 total
Tests:       61 passed, 61 total
Snapshots:   17 passed, 17 total
Time:        5.779 s
Ran all test suites.
Done in 6.41s.
The command "yarn test" exited with 0.
```


## Travis CI - Heroku integration

Create an account on both  [Travis CI](https://travis-ci.com/) and [Heroku](https://www.heroku.com/), authorize your Github account with the services. Create a new Heroku app and [link](https://devcenter.heroku.com/articles/github-integration) the relevant repository to the application. Similarly [link](https://docs.travis-ci.com/user/tutorial/) the relevant repository to Travis CI. Additionally install both [Travis](https://github.com/travis-ci/travis.rb#readme) and [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

Currently (February 1st, 2021) login with Github username and password using Travis CLI is broken. In order to circumvent this generate a new personal access token with [these permissions](https://docs.travis-ci.com/user/github-oauth-scopes). Github token can be found: Github -> Settings -> Developer settings -> Personal Access Tokens

Use a Github token to login. (Use PowerShell for this).

```
travis login --pro --github-token yourGitHubTokenHere
```

Login to Heroku.

```
heroku login
```

Create .travis.yml file. The minimal setup is below.
```yml
language: node_js
node_js:
- 15
branches:
  only:
  - main
```

When installed and logged in to both CLIs, encrypt and add the Heroku authenticaton token to the .travis.yml (Use PowerShell for this).
```
travis encrypt --pro $(heroku auth:token) --add deploy.api_key
```
Enable automatic deploys on Heroku and check the *Wait for CI to pass before deploy* option. Now after every push to the main branch there will be a new deployed version on Heroku.

The demo for this app can be found on https://mrga-expensify.herokuapp.com/