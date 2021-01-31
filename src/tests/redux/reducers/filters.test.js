import filtersReducer from "../../../redux/reducers/filters"
import moment from "moment"

test("Should setup default filter values.", () => {
    // @@INIT is Redux custom initialisation state
    const state = filtersReducer(undefined, { type: "@@INIT" })
    expect(state).toEqual({
        text: "",
        sortBy: "date",
        startDate: moment().startOf("month"),
        endDate: moment().endOf("month")
    })
})

test("Should set sortBy to amount.", () => {
    const state = filtersReducer(undefined, { type: "SORT_BY_AMOUNT" })
    expect(state.sortBy).toBe("amount")
})

test("Should set sortBy to date.", () => {
    const currentState = {
        text: "",
        sortBy: "amount",
        startDate: undefined,
        endDate: undefined
    }
    const state = filtersReducer(currentState, { type: "SORT_BY_DATE" })
    expect(state.sortBy).toBe("date")
})

test("Should set text filter.", () => {
    const text = "Testing text"
    const state = filtersReducer(undefined, { type: "SET_TEXT_FILTER", text })
    expect(state.text).toBe(text)
})

test("Should set startDate filter.", () => {
    const startDate = moment().startOf("day")
    const state = filtersReducer(undefined, { type: "SET_START_DATE", startDate })
    expect(state.startDate).toEqual(startDate)
})

test("Should set endDate filter.", () => {
    const endDate = moment().endOf("day")
    const state = filtersReducer(undefined, { type: "SET_START_DATE", endDate })
    expect(state.endDate).toEqual(endDate)
})