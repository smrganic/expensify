import React from "react"
import { shallow } from "enzyme"
import expenses from "../mock-data/expenses"
import ExpenseListItem from "../../components/ExpenseListItem"

test("Should render ExpenseListItem with an expense.", () => {
    const wrapper = shallow(<ExpenseListItem {...expenses[0]} />)
    expect(wrapper).toMatchSnapshot()
})