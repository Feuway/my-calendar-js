'use strict';

Date.prototype.daysInMonth = function() {
    return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
};



function createCalendar(id, year, month) {
    let now = new Date();
    let today = now.getDate();

    let cal = document.getElementById(id);
    let table = document.createElement('table');
    cal.replaceChild(table, cal.firstChild);

    var date = new Date(year, month - 1);
    let tr = document.createElement('tr');
    let days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
    days.forEach(function(day) {
        let th = document.createElement('th');
        th.textContent = day;
        tr.appendChild(th);
    });
    table.appendChild(tr);

    // отрисовка ячекек со днями предыдущего месяца
    tr = document.createElement('tr');
    let weekday = date.getDay() == 0 ? 7 : date.getDay();
    let prevMonth = new Date(year, month - 2);
    
    for (let j = weekday - 2 ; j >= 0; j--) {
        prevMonth.setDate(prevMonth.daysInMonth() - j);

        let td = document.createElement('td');
        td.textContent = prevMonth.getDate();
        td.classList.add('other-day');
        tr.appendChild(td);
    }
    table.appendChild(tr);
    //

    // отрисовка ячекек со днями текущего месяца
    for (let i = 1; i <= date.daysInMonth(); i++) {
        date.setDate(i);

        let td = document.createElement('td');
        td.textContent = i;
        if (today == date.getDate() &&
            now.getMonth() == date.getMonth() &&
            now.getFullYear() == date.getFullYear())
        {
            td.classList.add('today');
        }

        tr.appendChild(td);

        if (date.getDay() == 0) {
            tr = document.createElement('tr');
            table.appendChild(tr);
        }
    }
    //

    // отрисовка ячекек со днями следующего месяца
    let lastWeekdays = 7 - (date.getDay() == 0 ? 7 : date.getDay());

    if (date.getDate() == date.daysInMonth()) {
        for (let i = 1; i <= lastWeekdays; i++) {
            date.setDate(date.daysInMonth() + i);

            let td = document.createElement('td');
            td.textContent = date.getDate();
            td.classList.add('other-day');
            tr.appendChild(td);
        }
    }
    //
}

// управльение календарем
let year = document.getElementById('year');
let yearNumber = new Date().getFullYear();
let months = document.getElementById('months');
let monthsNumber = new Date().getMonth() + 1;
year.value = yearNumber;

Array.prototype.forEach.call(months, function(option) {
    if (option.value == monthsNumber) option.selected = true;
});

createCalendar("cal", yearNumber, monthsNumber);

year.addEventListener('input', function () {
    yearNumber = year.value;
    createCalendar("cal", yearNumber, monthsNumber);
});

months.addEventListener('change', function () {
    monthsNumber = this.options[this.selectedIndex].value;
    createCalendar("cal", yearNumber, monthsNumber);
});
//