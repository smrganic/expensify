import React from "react"
import { shallow } from "enzyme"
import { AddExpensePage } from "../../components/AddExpensePage"
import expenses from "../mock-data/expenses"

let addExpense, history, wrapper

// Runs before each test in suite to setup new spies and wrapper
// More info -> https://jestjs.io/docs/en/api#beforeeachfn-timeout
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