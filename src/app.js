import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import AppRouter from "./routers/AppRouter"
import configureStore from "./redux/store/configureStore"
import { addExpense } from "./redux/actions/expenses"
import { setTextFilter } from "./redux/actions/filters"
import getVisibleElements from "./redux/selectors/expenses"
import "normalize.css"
import "./styles/style.scss"



const store = configureStore()

store.dispatch(addExpense({ description: "Water bill", amount: 4500, createdAt: 200 }))
store.dispatch(addExpense({ description: "Gas bill", createdAt: 1000 }))
store.dispatch(addExpense({ description: "Rent", amount: 109500 }))

const state = store.getState()

const visibleElements = getVisibleElements(state.expenses, state.filters)

console.log(visibleElements)


const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)
ReactDOM.render(jsx, document.getElementById("app"))