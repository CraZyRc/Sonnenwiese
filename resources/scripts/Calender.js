/* General */
const Month = [ 'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December']
let currentMonth = new Date().getMonth()
let currentYear = new Date().getFullYear()

const calenderSize = 42 // 6 weeks of 7 days (june 2024 took 6 weeks)

const pageYear = document.getElementById('year')
const pageMonth = document.getElementById('month')
const pageDays = document.querySelector('.calender-dates')


/* Configurable Settings */
const highSummerPrice = '650,00'
const lowSummerPrice = '450,00'
const highWinterPrice = '1750,00'
const lowWinterPrice = '900,00'

const blockedDates = ['2024-12-25', '2024-12-26']

const summerStartDate = new Date(currentYear, 5, 21) // 21st of june
const highSummerStart = new Date(currentYear, 6, 1) // first of july
const highSummerEnd = new Date(currentYear, 8, 0) // last day of august

const winterStartDate = new Date(currentYear, 11, 21) // 21st of december
const highwinterStart = new Date(currentYear, 11, 21) // 21st of december
const highwinterEnd = new Date(currentYear+1, 0, 5) // 5th of january next year



/* Calender creation */
let calenderDates = [] // object list containing: year, month, day, tags, price

/* Load calender on pageload */
document.addEventListener("DOMContentLoaded", function() {
  createCalender()
})

/**
 * Create Calender content
 * Change year/month and add days
 */
function createCalender() {
  /* Manipulate month/year */
  pageMonth.textContent = Month[currentMonth]
  pageYear.textContent = currentYear
  
  /* get Calender date content and create Calender date content */
  calenderDates = getDays()
  setDays()

  /* Event listener to make date selection */
  document.querySelector('.button').addEventListener('click', select)
}

/**
 * List creation of all days in the to-be generated month
 * @returns {Array} days
 */
function getDays() {
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  let firstDate = new Date(currentYear, currentMonth, 1)
  let days = []

  /* Add the days of previous month to the list */
  while (firstDate.getDay() != 1) {
    firstDate.setDate(firstDate.getDate() - 1) // go back a day untill monday
    let date = {year: `${currentYear}`, month: `${currentMonth-1}`, day: `${firstDate.getDate()}`, tags: ['prev-month', 'button'], price: ''}
    days.unshift(date)
  }

  /* Add the days of the current month to the list */
  for (let i = 1; i <= daysInMonth; i ++) {
    let date = {year: `${currentYear}`, month: `${currentMonth}`, day: `${i}`, tags: ['current-month', 'button'], price: ''}
    days.push(date)
  }

  /* Add the days of next month to the list */
  let lastDate = new Date(currentYear, currentMonth + 1, 0)
  while (lastDate.getDay() != 0) {
    lastDate.setDate(lastDate.getDate() + 1) // go forth a day untill sunday
    let date = {year: `${currentYear}`, month: `${currentMonth+1}`, day: `${lastDate.getDate()}`, tags: ['next-month', 'button'], price: ''}
    days.push(date)
  }

  return days
}

/**
 * Creates the button elements for each day of the current Calender month
 */
function setDays() {
  removeOldDays()

  calenderDates.forEach(element => {
    let button = document.createElement('button')
    let price = document.createElement('span')

    
    element = setPrice(element) // this has to be in front of the classList.add in order to correctly add all the classes
    button.innerHTML = `<p>${element.day}</p>`
    button.dataset.day = element.day
    button.dataset.month = element.month
    button.dataset.year = element.year
    button.classList.add(...element.tags)
    checkBlocked(element, button)

    /* Set the button functionality */
    if (button.classList.contains('prev-month')) button.onclick = prevMonth
    if (button.classList.contains('next-month')) button.onclick = nextMonth
    if (button.classList.contains('current-month')) button.onclick = select
    if (button.id === 'blocked') button.onclick = null

    price.textContent = `€${element.price}`
    
    button.id === 'blocked' ? pageDays.appendChild(button) : pageDays.appendChild(button).appendChild(price)
  })
}

/**
 * Remove the old date elements in the Calender
 */
function removeOldDays() {
  while (pageDays.firstChild) {
    pageDays.removeChild(pageDays.firstChild)
  }
}

/**
 * takes the button with object params and checks if it is in the blocked list
 * @param {object} element 
 * @param {element} button 
 */
function checkBlocked(element, button) {
    let checkDate = new Date(element.year, element.month, element.day)
    let containsDate = blockedDates.some(date => {
        const blockedDate = new Date(date)
        return blockedDate.getFullYear() === checkDate.getFullYear() &&
               blockedDate.getMonth() === checkDate.getMonth() &&
               blockedDate.getDate() === checkDate.getDate()
    })
    if (containsDate && element.tags.includes('current-month')) {
        button.id = 'blocked'
    }
}



/* Interactiion functions */

/**
 * Updates the calender to the new month/year
 */
function updateCalender() {
  pageMonth.textContent = Month[currentMonth]
  pageYear.textContent = currentYear
  calenderDates = getDays()
  setDays()

  /* Checks for stored dates already selected */
  if (selectionList.length > 0) {
    generateSelection(selectionList[0], selectionList[selectionList.length - 1])
  }
}

/**
 * updates the Calender to the next month dataset
 * Triggered via either the arrow button or a next-month date button
 */
function nextMonth() {
  if (prices.length === 0) generatePrices('next')
  currentMonth++
  if (currentMonth > Month.length -1) {
    currentMonth = 0
    currentYear++
  }

  updateCalender()
}

/**
 * updates the Calender to the previous month dataset
 * Triggered via either the arrow button or a prev-month date button
 */
function prevMonth() {
  if (prices.length === 0) generatePrices('prev')
  currentMonth--
  if (currentMonth < 0) {
    currentMonth = 11
    currentYear--
  }

  updateCalender()
}



/* Data selection */

let selectingStartDate = true
let prices = [] 
let selectionList = []
let startDate = new Date()
let endDate = new Date()

/**
 * select a group of data from the Calender
 * gets triggered by clicking a date button
 * @param {element} event 
 */
function select(event) {
  const button = event.currentTarget

  if (selectingStartDate) {
    removeSelection()
    prices = []
    selectionList = []
    endDate = new Date()
    startDate = new Date(currentYear, currentMonth, button.dataset.day)
    button.classList.add('selected')
    selectingStartDate = false
  } else {
    endDate = new Date(currentYear, currentMonth, button.dataset.day)
    selectingStartDate = true
    generateSelection(startDate, endDate)
  }
}

/**
 * remove old selection so a new one can be created
 */
function removeSelection() {
  const buttons = Array.from(document.querySelectorAll('.selected'))
  buttons.forEach(b => {
    b.classList.remove('selected')
  })
}

/**
 * create new selection and add the selection to the pricelist
 * @param {Date} start 
 * @param {Date} end 
 */
function generateSelection(start, end) {
  // add dates depending on date, so it'll always stop in front of a blocked date
  if (start < end) {
    do {
      selectionList.push(new Date(start))
      start.setDate(start.getDate() + 1)
    } while (start <= end)
  } else {
    do {
      selectionList.push(new Date(start))
      start.setDate(start.getDate() -1)
    } while (start >= end)
  }


  selectionList.forEach(date => {
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()

    if (month === currentMonth && year === currentYear) {
      let button = document.querySelector(`button[data-day='${day}'].current-month`)
      let price = button.querySelector('span').innerText

      if (button && !button.classList.contains('prev-month') && !button.classList.contains('next-month')) {
        button.classList.add('selected')
        price = price.replace('€', '')
        price = parseFloat(price.replace(',', '.'))
        prices.push(price)
      }
    }
  })

  calculatePrice()
}



/* Price Manipulation */

/**
 * format the number to the dutch format
 * so it uses a comma instead of a dot
 * @param {number} number 
 * @returns formatted number
 */
function formatNumber(number) {
  return number.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

/**
 * Add the correct price to the element before creation
 * @param {object} element 
 * @returns element object with correct price/season class
 * TODO: make the summer/winter and high seasons check more open to config changes
 */
function setPrice(element) {
  let date = new Date(element.year, element.month, element.day)
  
  if (date.getMonth === 7 || date.getMonth === 8) { // is date inbetween july and august => set highseasonprice
    element.price = highSummerPrice
    element.tags.push('high-season')
  } else if (date >= summerStartDate && date < winterStartDate) { // else if date is summer
    element.price = lowSummerPrice
  } else if (date >= highwinterStart && date < highwinterEnd) { // else if date is high season winter
    element.price = highWinterPrice
    element.tags.push('high-season')
  } else { // else price must be low season winter
    element.price = lowWinterPrice
  }

  return element
}

/**
 * add prices of current month to the list when selection overlaps to a different month
 * gets triggered when a first date is selected and then the month gets switched to the next or previous month
 * @param {string} month , either 'prev' or 'next'
 */
function generatePrices(month) {
  if (selectingStartDate) {
    return
  }

  if (month === 'prev') {
    let start = new Date(currentYear, currentMonth, 1)

    while (start <= startDate) {
      let button = document.querySelector(`button[data-day='${start.getDate()}'].current-month`)
      let price = button.querySelector('span').innerText
      price = price.replace('€', '')
      price = parseFloat(price.replace(',', '.'))
      prices.push(price)
      start.setDate(start.getDate() + 1)
    }
  } else if (month === 'next') {
    let start = new Date(currentYear, currentMonth +1, 0)

    while (start >= startDate) {
      let button = document.querySelector(`button[data-day='${start.getDate()}'].current-month`)
      let price = button.querySelector('span').innerText
      price = price.replace('€', '')
      price = parseFloat(price.replace(',', '.'))
      prices.push(price)
      start.setDate(start.getDate() - 1)
    }

  }
}

/**
 * use to sum the total price of a selected Calender period
 * gets triggered upon making a selection
 * fills the table underneath the calender with the totals
 * TODO: add failsafe for month changing, now keeps on adding with each change of month
 */
function calculatePrice() {
  let total = 0
  let selectedPrice = document.getElementById('selected-price')
  let totalPrice = document.getElementById('total-price')

  if (prices.length > 0) {
    prices.forEach(price => {
      console.log(price)
      console.log('total: ' + total)
      price = parseFloat(price)
      total = total + price
    })
  }

  let final = total + 50
  total = formatNumber(total)
  selectedPrice.innerText = `€${total}`
  final = formatNumber(final)
  totalPrice.innerText = `€${final}`
}