import { addExpense, editExpense, removeExpense } from "../../../redux/actions/expenses"

const setupTestData = () => {
    const testExpense = {
        description: "Rent",
        amount: 1000000,
        createdAt: 1000,
        note: "This is rent from 1970."
    }
    return testExpense
}

test("Should setup remove expense action object", () => {
    const action = removeExpense({ id: 123 })
    expect(action).toEqual({
        type: "REMOVE_EXPENSE",
        id: 123
    })
})

test("Should setup edit expense action object", () => {
    const updates = { note: "This is an edited note." }
    const action = editExpense(123, updates)
    expect(action).toEqual({
        type: "EDIT_EXPENSE",
        id: 123,
        updates: {
            note: "This is an edited note."
        }
    })
})

test("Should setup add expense action object with provided values", () => {
    // Arrange
    const testExpense = setupTestData()

    // Act
    const action = addExpense(testExpense)

    // Assert
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: {
            ...testExpense,
            id: expect.any(String)
        }
    })
})

test("Should setup add expense action object no values", () => {
    const testExpense = {
        description: "",
        note: "",
        amount: 0,
        createdAt: 0
    }
    const action = addExpense()
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: {
            ...testExpense,
            id: expect.any(String)
        }
    })
})