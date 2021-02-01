import expensesTotal from "../../../redux/selectors/expenses-total"
import expenses from "../../mock-data/expenses"

test("Should return 0 for no expenses.", () => {
    expect(expensesTotal([])).toBe(0)
})

test("Should add up single expense.", () => {
    expect(expensesTotal([expenses[0]])).toBe(expenses[0].amount)
})

test("Should add up multiple expenses.", () => {
    let sum = 0
    expenses.forEach((element) => sum += element.amount)
    expect(expensesTotal(expenses)).toBe(sum)
})