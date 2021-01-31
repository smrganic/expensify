import React from "react"
import { shallow } from "enzyme"
import ExpenseForm from "../../components/ExpenseForm"
import expenses from "../mock-data/expenses"
import moment from "moment"
import { SingleDatePicker } from "react-dates"

test("Should render ExpenseForm.", () => {
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot()
})

test("Should render ExpenseFrom with expense data.", () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} />)
    expect(wrapper).toMatchSnapshot()
})

test("Should render error for invalid submission.", () => {
    const wrapper = shallow(<ExpenseForm />)
    // Create snapshot with no error
    expect(wrapper).toMatchSnapshot()

    // Need to provide empty preventDefault since no event is passed to simulate
    // More info https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/simulate.html
    wrapper.find("form").simulate("submit", {
        preventDefault: () => { }
    })
    expect(wrapper.state("error").length).toBeGreaterThan(0)

    // Create snapshot with error
    expect(wrapper).toMatchSnapshot()
})

test("Should set description on input change", () => {
    const newDescription = "Edited description"
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find("input").at(0).simulate("change", {
        target: { value: newDescription }
    })
    expect(wrapper.state("description")).toBe(newDescription)
})

test("Should set note on textarea change", () => {
    const newNote = "This is the new note"
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find("textarea").simulate("change", {
        target: { value: newNote }
    })
    expect(wrapper.state("note")).toBe(newNote)
})

test("Should set amount on valid input.", () => {
    const value = "23.5"
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find("input").at(1).simulate("change", {
        target: { value }
    })
    expect(wrapper.state("amount")).toBe(value)
})

test("Should no set amount on invalid input.", () => {
    const value = "23.125"
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find("input").at(1).simulate("change", {
        target: { value }
    })
    expect(wrapper.state("amount")).toBe("")
})

test("Should call onSubmit prop for valid form submission", () => {
    // Creates a mock function more info -> https://jestjs.io/docs/en/jest-object#jestfnimplementation
    const onSubmitSpy = jest.fn()
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />)
    wrapper.find("form").simulate("submit", {
        preventDefault: () => { }
    })
    expect(wrapper.state("error")).toBe("")
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    })
})

test("Should set new date onDateChange.", () => {
    const time = moment()
    const wrapper = shallow(<ExpenseForm />)
    // Needed to import SingleDatePicker find was returning 0 nodes
    // More info -> https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/find.html
    wrapper.find(SingleDatePicker).prop("onDateChange")(time)
    expect(wrapper.state("createdAt")).toEqual(time)
})

test("Should set new focus onFocusChange.", () => {
    const testObject = { focused: true }
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find(SingleDatePicker).prop("onFocusChange")(testObject)
    expect(wrapper.state("calendarFocused")).toBe(testObject.focused)
})