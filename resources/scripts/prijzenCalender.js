const Month = [ 'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let currentMonthSize = new Date(currentYear, currentMonth + 1, 0);

function updateHeader(month, year) {
  const pageMonth = document.getElementById('month')
  const pageYear = document.getElementById('year')

  pageMonth.textContent = month
  pageYear.textContent = year
}

function nextMonth() {
  currentMonth++
  if (currentMonth > Month.length -1) {
    currentMonth = 0
    currentYear++
  }

  updateHeader(Month[currentMonth], currentYear)
}

function prevMonth() {
    currentMonth--
  if (currentMonth < 0) {
    currentMonth = 11
    currentYear--
  }

  updateHeader(Month[currentMonth], currentYear)
}

function setDate() { // Sets current month upon page load
  const pageMonth = document.getElementById('month')
  const pageYear = document.getElementById('year')

  pageMonth.textContent = Month[currentMonth]
  pageYear.textContent = currentYear

}

document.addEventListener("DOMContentLoaded", function() {
  setDate()
});

/* get the dates lists */
function getDates() {
  let prevMonthDates    = []
  let currentMonthDates = []
  let nextMonthDates    = []
  // first date of the current Month
  let firstDateCurrentMonth = new Date(currentYear, currentMonth, 1) //e.g. 1 dec 2024
  // current day of the first of the month
  let firstDayCurrentMonth = firstDate.getDay() //e.g. 0 (sunday)

  // Sets the current day to be correct (uses monday as first inseadt of sunday)
  firstDayCurrentMonth === 0 ? firstDayCurrentMonth = 6 : firstDayCurrentMonth-- 

  // sets the firstDate to be a monday (with a date of the prev month)
  firstDate.setDate(firstDate.getDate() - currentDay) //e.g. 6 (sunday)

  if (firstDateCurrentMonth > 0) prevMonthDates = getPrevMonthDates()
  currentMonthDates = getCurrentMonthDates(firstDateCurrentMonth, currentMonthSize)

  let lastDayCurrentMonth = currentMonthSize.getDay()
  if (lastDayCurrentMonth < 6) nextMonthDates = getNextMonthDates()

  if (prevMonthDates !== null) {
    setPrevMonthDates(prevMonthDates)
  }
  setCurrentMonthDates(prevMonthDates)
  if (nextMonthDates !== null) {
    setNextMonthDates(prevMonthDates)
  }
} 

function getPrevMonthDates(days) {

}

function getCurrentMonthDates(firstDate, monthSize) {

}

function getNextMonthDates(days) {

}

function setPrevMonthDates(dates) {

}

function setCurrentMonthDates(dates) {

}

function setNextMonthDates(dates) {

}

  /* 
  get the date of the first of the month
  if date is above day0, iterate back untill we find 0
    - Create Buttons with class 'other_month' untill we find 0
  Fill with Buttons with class 'current_month' untill the end of date

  if the end of date is not at pos 6 of day. add dates untill end of day with class 'other_month;
  */

  // 0=zondag, 1=maandag, 2=dinsdag, 3=woensdag, 4=donderdag, 5=vrijdag, 6=zaterdag
  // 0=maandag, 1=dinsdag, 2=woensdag, 3=donderdag, 4=vrijdag, 5=zaterdag, 6=zondag