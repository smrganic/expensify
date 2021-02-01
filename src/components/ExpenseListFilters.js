import React from "react"
import { connect } from "react-redux"
import { DateRangePicker } from "react-dates"
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from "../redux/actions/filters"
import moment from "moment"

export class ExpenseListFilters extends React.Component {

    state = {
        calendarFocused: null
    }

    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate)
        this.props.setEndDate(endDate)
    }

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }))
    }

    onTextChange = (event) => {
        this.props.setTextFilter(event.target.value)
    }

    onSortChange = (event) => {
        if (event.target.value === "date") {
            this.props.sortByDate()
        } else {
            this.props.sortByAmount()
        }
    }

    render() {
        return (
            <div>
                <input
                    txpe="text"
                    value={this.props.filters.text}
                    onChange={this.onTextChange}
                />
                <select
                    value={this.props.filters.sortBy}
                    onChange={this.onSortChange}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    startDateId={moment().toString()}
                    endDate={this.props.filters.endDate}
                    endDateId={moment().toString()}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    showClearDates={true}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ filters: state.filters })

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByAmount: () => dispatch(sortByAmount()),
    sortByDate: () => dispatch(sortByDate()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters)