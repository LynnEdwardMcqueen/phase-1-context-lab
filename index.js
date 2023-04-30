/* Your Code Here */
function createEmployeeRecord(employeeArray)
{
    let employeeRecord = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: [],  
    }
    
    // return ("foo")
    return (employeeRecord)
}

function createEmployeeRecords( testArray)
{
    let employeeRecordArray = testArray.map(createEmployeeRecord)
    return employeeRecordArray


}

function createTimeInEvent(/* employeeObject , */ dateStamp)
{
    let timeInRecord = {
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(11, 15)),
        date: dateStamp.slice(0, 10),
    }
    this.timeInEvents.push(timeInRecord)
    return(this)
}

function createTimeOutEvent(/*employeeObject, */ dateStamp)
{
    let timeOutRecord = {
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(11, 15)),
        date: dateStamp.slice(0, 10),
    }
    //employeeObject.timeOutEvents.push(timeOutRecord)
    this.timeOutEvents.push(timeOutRecord)

    // return(employeeObject)
    return(this)

}

function hoursWorkedOnDate(/* employeeRecord, */ dateString) {

    let dateIndex = null
    let timeInHour = 0;
    let timeOutHour = 0;
//    for (let i = 0; i < employeeRecord.timeInEvents.length; i++) {
    for (let i = 0; i < this.timeInEvents.length; i++) {
//       if (employeeRecord.timeInEvents[i].date === dateString) {
        if (this.timeInEvents[i].date === dateString) {
            dateIndex = i;
//            timeInHour = employeeRecord.timeInEvents[i].hour;
            timeInHour = this.timeInEvents[i].hour;
            break;
        }
    }
    
    if (dateIndex != null) {
 //       timeOutHour = employeeRecord.timeOutEvents[dateIndex].hour;
        timeOutHour = this.timeOutEvents[dateIndex].hour;
    }

    return (timeOutHour - timeInHour)/100;  
}

function wagesEarnedOnDate(/* object, */ date) {
  return hoursWorkedOnDate.call(this /* object */, date) * this.payPerHour;
}

function findEmployeeByFirstName(emps, firstName)
{
    for (let employee of emps) {
        if (employee.firstName === firstName) {
            return(employee)
        }
    }
    return null
}

function calculatePayroll (employeeObjects)  
{
    let totalWage = 0;
    for (let employee of employeeObjects) {
        totalWage += allWagesFor.call(employee);
    }
    return totalWage;
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

