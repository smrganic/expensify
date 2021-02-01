import React from "react"
import { shallow } from "enzyme"
import { ExpenseListFilters } from "../../components/ExpenseListFilters"
import { filters, altFilters } from "../mock-data/filters"
import { DateRangePicker } from "react-dates"
import moment from "moment"

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper

beforeEach(() => {
    setTextFilter = jest.fn()
    sortByDate = jest.fn()
    sortByAmount = jest.fn()
    setStartDate = jest.fn()
    setEndDate = jest.fn()
    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    )
})

test("Should render ExpenseListFilters.", () => {
    expect(wrapper).toMatchSnapshot()
})

test("Should render ExpenseListFilters with alt data.", () => {
    wrapper.setProps({
        filters: altFilters
    })
    expect(wrapper).toMatchSnapshot()
})

test("Should handle text change.", () => {
    const value = "rent"
    wrapper.find("input").simulate("change", {
        target: { value }
    })
    expect(setTextFilter).toHaveBeenLastCalledWith(value)
})

test("Should sort by date", () => {
    wrapper.setProps({
        filters: altFilters
    })
    const value = "date"
    wrapper.find("select").simulate("change", {
        target: { value }
    })
    expect(sortByDate).toHaveBeenCalled()
})

test("Should sort by amount", () => {
    const value = "amount"
    wrapper.find("select").simulate("change", {
        target: { value }
    })
    expect(sortByAmount).toHaveBeenCalled()
})

test("Should handle date changes", () => {
    const startDate = moment(0).add(4, "days")
    const endDate = moment(0).add(8, "days")
    wrapper.find(DateRangePicker).prop("onDatesChange")({
        startDate,
        endDate
    })
    expect(setStartDate).toHaveBeenLastCalledWith(startDate)
    expect(setEndDate).toHaveBeenLastCalledWith(endDate)
})

test("Should handle date focus change", () => {
    const calendarFocused = "startDate"
    wrapper.find(DateRangePicker).prop("onFocusChange")(calendarFocused)
    expect(wrapper.state("calendarFocused")).toBe(calendarFocused)
})