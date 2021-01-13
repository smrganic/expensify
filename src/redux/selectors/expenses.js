import moment from "moment"

// Sorting based on dates & text
// Default sort uses sort function where -1 return represents a and 1 respresents b
const getVisibleElements = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt)
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, "day") : true
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, "day") : true
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())
        return textMatch && startDateMatch && endDateMatch
    }).sort((a, b) => {
        if (sortBy === "date")
            return a.createdAt > b.createdAt ? -1 : 1
        else if (sortBy === "amount")
            return a.amount > b.amount ? -1 : 1
    })
}

export default getVisibleElements