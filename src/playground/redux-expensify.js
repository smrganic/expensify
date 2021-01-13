import { createStore, combineReducers } from "redux"
import { v4 as uuidv4 } from "uuid"

//Action updater functions for expenses
const addExpense = (
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

const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates
})

const removeExpense = ({ id } = {}) => ({ type: "REMOVE_EXPENSE", id })



// Expenses reducer
const expensesReducerDefaultState = []

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_EXPENSE":
            return [...state, action.expense]
        case "EDIT_EXPENSE":
            return state.map((expense) => {
                if (expense.id === action.id)
                    return { ...expense, ...action.updates }
                else
                    return expense
            })
        case "REMOVE_EXPENSE":
            return state.filter(({ id }) => (id !== action.id))
        default:
            return state
    }
}




//Action updater functions for filter
const setTextFilter = (text = "") => ({ type: "SET_TEXT_FILTER", text })

const sortByAmount = () => ({ type: "SORT_BY_AMOUNT" })

const sortByDate = () => ({ type: "SORT_BY_DATE" })

const setStartDate = (startDate) => ({ type: "SET_START_DATE", startDate })

const setEndDate = (endDate) => ({ type: "SET_END_DATE", endDate })



// Filters reducer
const filtersReducerDefaultState = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case "SET_TEXT_FILTER":
            return ({ ...state, text: action.text })
        case "SORT_BY_AMOUNT":
            return ({ ...state, sortBy: "amount" })
        case "SORT_BY_DATE":
            return ({ ...state, sortBy: "date" })
        case "SET_START_DATE":
            return ({ ...state, startDate: action.startDate })
        case "SET_END_DATE":
            return ({ ...state, endDate: action.endDate })
        default:
            return state
    }
}


// Sorting based on dates & text
// Default sort uses sort function where -1 return represents a and 1 respresents b
const getVisibleElements = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== "number" || expense.createdAt >= startDate
        const endDateMatch = typeof endDate !== "number" || expense.createdAt <= endDate
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())
        return textMatch && startDateMatch && endDateMatch
    }).sort((a, b) => {
        if (sortBy === "date")
            return a.createdAt > b.createdAt ? -1 : 1
        else if (sortBy === "amount")
            return a.amount > b.amount ? -1 : 1
    })
}



// Store creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
)

store.subscribe(() => {
    const state = store.getState()
    const visibleElements = getVisibleElements(state.expenses, state.filters)
    console.log(visibleElements)
})



// Testing the setup
const expenseOne = store.dispatch(addExpense({ description: "Rent", amount: 200 }))
const expenseTwo = store.dispatch(addExpense({ description: "Coffee", amount: 300 }))

// store.dispatch(removeExpense({ id: expenseOne.expense.id }))
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))

// store.dispatch(setTextFilter("ffe"))
// store.dispatch(setTextFilter())

store.dispatch(sortByAmount())
// store.dispatch(sortByDate())

// store.dispatch(setStartDate(125))
// store.dispatch(setStartDate())
// store.dispatch(setEndDate(1250))


const demoState = {
    expenses: [{
        id: "blabla",
        description: "Rent",
        note: "This is some kind of note",
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: "rent",
        sortBy: "abount", //date or amount
        startDate: undefined,
        endDate: undefined
    }
}




// //Testing the object spread operator
// const user = {
//     name: "Jen",
//     age: 25
// }

// console.log({
//     ...user,
//     city: "Ny"
// })