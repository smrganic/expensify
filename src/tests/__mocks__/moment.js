
// Added this to mock moment library. But needed to use jest.requireActual
// to import the actual library. Classic ES6 import wouldn't work here.
const moment = jest.requireActual("moment")

export default (timestamp = 0) => {
    return moment(timestamp)
}