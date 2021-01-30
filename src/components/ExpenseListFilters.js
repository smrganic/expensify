import React from "react"
import { connect } from "react-redux"
import { DateRangePicker } from "react-dates"
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from "../redux/actions/filters"
import { v4 as uuidv4 } from "uuid"

class ExpenseListFilters extends React.Component {

    state = {
        calendarFocused: null
    }

    onDatesChange = ({ startDate, endDate }) => {
        this.props.dispatch(setStartDate(startDate))
        this.props.dispatch(setEndDate(endDate))
    }

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }))
    }

    render() {
        return (
            <div>
                <input
                    txpe="text"
                    value={this.props.filters.text}
                    onChange={(event) => {
                        this.props.dispatch(setTextFilter(event.target.value))
                    }}
                />
                <select
                    value={this.props.filters.sortBy}
                    onChange={
                        (event) => {
                            if (event.target.value === "date") {
                                this.props.dispatch(sortByDate())
                            } else {
                                this.props.dispatch(sortByAmount())
                            }
                        }
                    }>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    startDateId={uuidv4()}
                    endDate={this.props.filters.endDate}
                    endDateId={uuidv4()}
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

export default connect(mapStateToProps)(ExpenseListFilters)