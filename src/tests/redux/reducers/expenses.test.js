import expensesReducer from "../../../redux/reducers/expenses"
import expenses from "../../mock-data/expenses"

test("Should set default state.", () => {
    const state = expensesReducer(undefined, { type: "@@INIT" })
    expect(state).toEqual([])
})

test("Should remove expense by id.", () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([expenses[0], expenses[2]])
})

test("Should not remove anything.", () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: undefined
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})

test("Should add an expense.", () => {
    const expense = {
        id: "20",
        description: "Cheese",
        note: "This is a note about cheese",
        amount: 1950,
        createdAt: 0
    }
    const action = {
        type: "ADD_EXPENSE",
        expense
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([...expenses, expense])
})

test("Should edit an expense with valid id.", () => {
    const updates = {
        note: "This is an edited note."
    }
    const action = {
        type: "EDIT_EXPENSE",
        id: expenses[0].id,
        updates
    }
    const state = expensesReducer(expenses, action)
    expect(state[0].note).toBe(updates.note)
})

test("Should edit an expense with valid id.", () => {
    const updates = {
        note: "This is an edited note."
    }
    const action = {
        type: "EDIT_EXPENSE",
        id: undefined,
        updates
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})