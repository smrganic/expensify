import React from "react"
import { shallow } from "enzyme"
import { ExpensesSummary } from "../../components/ExpensesSummary"

test("Should render ExpensesSummary with one expense.", () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={255} />)
    expect(wrapper).toMatchSnapshot()
})

test("Should render ExpensesSummary with multiple expenses.", () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={50} expensesTotal={123454321} />)
    expect(wrapper).toMatchSnapshot()
})