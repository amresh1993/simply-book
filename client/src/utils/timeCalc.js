import moment from 'moment';
function GetDates(startDate, daysToAdd) {
    var aryDates = [];
    for (var i = 0; i <= daysToAdd; i++) {
        var currentDate = new Date();
        currentDate.setDate(startDate.getDate() + i);
        aryDates.push(moment(
            DayAsString(currentDate.getDay()) +
            ', ' +
            currentDate.getDate() +
            ' ' +
            MonthAsString(currentDate.getMonth()) +
            ' ' +
            currentDate.getFullYear(), 'dd/mm/yyyy'
        ).format('L')
        );
    }
    return aryDates;
}

function MonthAsString(monthIndex) {
    var month = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    return month[monthIndex];
}

function DayAsString(dayIndex) {
    var weekdays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    return weekdays[dayIndex];
}

export const mySheduleDate = (startDate, excludeDay) => {
    return GetDates(startDate, 6).filter(val => !val.includes(excludeDay));
};

export const mySheduleTime = () => {
    let time = [];
    for (let index = 1; index < 6; index++) {
        const hour = moment().hours();
        time.push(moment().format(`${String(hour + index)}:00 A`));
    }
    return time;
};
