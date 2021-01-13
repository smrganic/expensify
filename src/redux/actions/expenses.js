import { v4 as uuidv4 } from "uuid"

//Action updater functions for expenses
export const addExpense = (
    {
        description = "",
        note = "",
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: "ADD_EXPENSE",
    expense: {
        id: uuidv4(),
        description,
        note,
        amount,
        createdAt
    }
})

export const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates
})

export const removeExpense = ({ id } = {}) => ({ type: "REMOVE_EXPENSE", id })