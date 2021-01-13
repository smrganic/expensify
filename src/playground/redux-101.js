import { createStore } from "redux"

//Action generators - functions that return action objects
//Redux needs type to work
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: "INCREMENT",
    incrementBy
})

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: "DECREMENT",
    decrementBy
})

//This is unsafe because it could result in undefined
const setCount = ({ count } = {}) => ({
    type: "SET",
    count
})

const resetCount = () => ({
    type: "RESET"
})

//Reducer
//1. Reducers are pure functions - only handle stuff within scope
//2. Never change state or action
const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case "SET":
            return { count: action.count }
        case "INCREMENT":
            return { count: state.count + action.incrementBy }
        case "DECREMENT":
            return { count: state.count - action.decrementBy }
        case "RESET":
            return { count: 0 }
        default:
            return state
    }
}

const store = createStore(countReducer)

//return value of subscribe is a function used for unsubscribing
const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
})

//use unsubscribe() to unsubscribe

store.dispatch(incrementCount())

store.dispatch(incrementCount({ incrementBy: 4 }))

store.dispatch(resetCount())

store.dispatch(decrementCount())

store.dispatch(decrementCount({ decrementBy: 10 }))

store.dispatch(setCount())