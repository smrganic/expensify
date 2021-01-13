import React from "react"
import ExpenseItem from "./ExpenseListItem"
import { connect } from "react-redux"
import selectExpenses from "../redux/selectors/expenses"

const ExpenseList = (props) => (
    <div>
        <h1>ExpenseList</h1>
        {props.expenses.map((expense) => (
            <ExpenseItem key={expense.id} {...expense} />
        ))}
    </div>
)

const mapStateToProps = (state) => ({
    expenses: selectExpenses(state.expenses, state.filters)
})

const ConnectedExpenseList = connect(mapStateToProps)(ExpenseList)

export default ConnectedExpenseList