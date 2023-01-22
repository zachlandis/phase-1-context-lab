function createEmployeeRecord(employee) {
    let employeeInfo = {
        firstName: `${employee[0]}`,
        familyName: `${employee[1]}`,
        title: `${employee[2]}`,
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeInfo
}


function createEmployeeRecords(arr) {
    return arr.map(record => createEmployeeRecord(record))
}


function createTimeInEvent(timestamp) {
    let [date, time] = timestamp.split(' ')
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(time),
        date: date
    })
    return this
}

function createTimeOutEvent(timestamp) {
    let [date, time] = timestamp.split(' ')
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(time),
        date: date
    })
    return this
}

function hoursWorkedOnDate(workDate) {
    let timeInDate = this.timeInEvents.find(e => e.date === workDate)

    let timeOutDate = this.timeOutEvents.find(e => e.date === workDate)

    return (timeOutDate.hour - timeInDate.hour) / 100
}

function wagesEarnedOnDate(workDate) {
    return hoursWorkedOnDate.apply(this, [workDate]) * this.payPerHour
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    for (let i = 0; i < srcArray.length; i++) {
        if(srcArray[i].firstName === firstName) {
            return srcArray[i]
        }
    }
}

function calculatePayroll(arr) {
    let payroll = []
    arr.forEach(e => payroll.push(allWagesFor.call(e)))
    return payroll.reduce((a,b) => {return a+b})
}
