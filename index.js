function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};


function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord)
};


let createTimeInEvent = function(dateTime) {
    let [date, hour] = dateTime.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10), date
    })
    return this
};

let createTimeOutEvent = function(dateTime) {
    let [date, hour] = dateTime.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10), date
    })
    return this
};

let hoursWorkedOnDate = function(date) {
    let timeIn = this.timeInEvents.find(daysWorked => daysWorked.date === date)
    let timeOut = this.timeOutEvents.find(daysWorked => daysWorked.date === date)

    return (timeOut.hour - timeIn.hour) / 100
};


const wagesEarnedOnDate = function(date) {
    const hourWorked = hoursWorkedOnDate.call(this, date)
    
    return hourWorked * this.payPerHour
};


let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)

    return payable
};

let calculatePayroll = function(employees){
    return employees.reduce((acc, employee) => {
        return acc + allWagesFor.call(employee)
    }, 0);
}
  
  function findEmployeeByFirstName(employees, employee) {
      return employees.find(emp => emp.firstName === employee)
  }