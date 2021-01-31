import React from "react"
import { shallow } from "enzyme"
import { ExpenseList } from "../../components/ExpenseList"
import expenses from "../mock-data/expenses"

test("Should render ExpenseList with expenses.", () => {
    const wrapper = shallow(<ExpenseList expenses={expenses} />)
    expect(wrapper).toMatchSnapshot()
})

test("Should render ExpenseList with no expenses.", () => {
    const wrapper = shallow(<ExpenseList expenses={[]} />)
    expect(wrapper).toMatchSnapshot()
})