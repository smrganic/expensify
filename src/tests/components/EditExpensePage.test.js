import React from "react"
import { shallow } from "enzyme"
import { EditExpensePage } from "../../components/EditExpensePage"
import expenses from "../mock-data/expenses"

// To test all props need to be passed down to the component
// Spy functions pass down as props.
let wrapper, editExpense, removeExpense, history

beforeEach(() => {
    editExpense = jest.fn()
    removeExpense = jest.fn()
    history = { push: jest.fn() }
    wrapper = shallow(
        <EditExpensePage
            expense={expenses[2]}
            editExpense={editExpense}
            removeExpense={removeExpense}
            history={history}
        />)
})

test("Should render EditExpensePage.", () => {
    expect(wrapper).toMatchSnapshot()
})

test("Should handle editExpense.", () => {
    wrapper.find("ExpenseForm").prop("onSubmit")(expenses[2])
    expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2])
    expect(history.push).toHaveBeenLastCalledWith("/")
})

test("Should handle removeExpense.", () => {
    wrapper.find("button").simulate("click")
    expect(removeExpense).toHaveBeenLastCalledWith(expenses[2].id)
    expect(history.push).toHaveBeenLastCalledWith("/")
})