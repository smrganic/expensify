import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import AppRouter from "./routers/AppRouter"
import configureStore from "./redux/store/configureStore"
import "normalize.css"
import "./styles/style.scss"



const store = configureStore()
console.log("testing")
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)
ReactDOM.render(jsx, document.getElementById("app"))