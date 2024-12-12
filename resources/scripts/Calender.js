
const Month = [ 'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const calenderSize = 42 // 6 weeks of 7 days (june 2024 took 6 weeks)

const pageDays = document.querySelector('.calender-dates')
const pageMonth = document.getElementById('month')
const pageYear = document.getElementById('year')


function removeOldDays() {
  while (pageDays.firstChild) {
    pageDays.removeChild(pageDays.firstChild)
  }
}

function getDays() {
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  let days = []
  let firstDate = new Date(currentYear, currentMonth, 1)

  /* Add the days of previous month to the list */
  while (firstDate.getDay() != 1) {
    firstDate.setDate(firstDate.getDate() - 1) // go back a day untill monday
    let date = {year: `${currentYear}`, month: `${currentMonth}`, day: `${firstDate.getDate()}`, tags: ['prev-month']}

    days.unshift(date)
  }

  /* Add the days of the current month to the list */
  for (let i = 1; i <= daysInMonth; i ++) {
    let date = {year: `${currentYear}`, month: `${currentMonth}`, day: `${i}`, tags: ['current-month']}
    days.push(date)
  }

  /* Add the days of next month to the list */
  let lastDate = new Date(currentYear, currentMonth + 1, 0)
  while (lastDate.getDay() != 0) {
    lastDate.setDate(lastDate.getDate() + 1) // go forth a day untill sunday
    let date = {year: `${currentYear}`, month: `${currentMonth}`, day: `${lastDate.getDate()}`, tags: ['next-month']}
    days.push(date)
  }

  return days
}

/* Set the days in the calender */
function setDays(calenderDates) {
  removeOldDays()

  calenderDates.forEach(element => {
    const button = document.createElement('button')
    button.textContent = element.day
    if (element.tags !== null) {
      button.classList.add(...element.tags)
    }

    pageDays.appendChild(button)
  })
}


function updateCalender() {
  pageMonth.textContent = Month[currentMonth]
  pageYear.textContent = currentYear
  let calenderDates = getDays()
  setDays(calenderDates)
}

/* Next/Prev month buttons */
function nextMonth() {
  currentMonth++
  if (currentMonth > Month.length -1) {
    currentMonth = 0
    currentYear++
  }

  updateCalender()
}

function prevMonth() {
    currentMonth--
  if (currentMonth < 0) {
    currentMonth = 11
    currentYear--
  }

  updateCalender()
}

/* Load calender on pageload */
document.addEventListener("DOMContentLoaded", function() {
  updateCalender()
});