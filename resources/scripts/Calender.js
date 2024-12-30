/**
 * DEBUGGING
 * 
 */

/* General */
const Month = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December']
let currentMonth = new Date().getMonth()
let currentYear = new Date().getFullYear()

const calenderSize = 42 // 6 weeks of 7 days (june 2024 took 6 weeks)

const pageYear = document.getElementById('year')
const pageMonth = document.getElementById('month')
const pageDays = document.querySelector('.calender-dates')


/** 
 * Configurable Settings 
 * These are to be adjustable via admin panel
*/

/*
const highSummerPrice = '650,00'
const lowSummerPrice = '450,00'
const highWinterPrice = '1750,00'
const lowWinterPrice = '900,00'
*/

// prices devided by 7
const highSummerPrice = '92,85'
const lowSummerPrice = '64,28'
const highWinterPrice = '250,00'
const lowWinterPrice = '128,57'

const blockedDates = ['2024-12-25', '2024-12-26']

const summerStartDate = new Date('2024-6-21')
const winterStartDate = new Date('2024-12-21')
const highSummerStartDate = new Date('2024-7-1')
const highSummerEndDate = new Date('2024-8-30')
const highwinterStartDate = new Date('2024-12-21')
const highwinterEndDate = new Date('2025-1-5')



/* Calender creation */
let calenderDates = [] // object list containing: year, month, day, tags, price

/* Load calender on pageload */
document.addEventListener("DOMContentLoaded", function () {
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
    let date = { year: `${currentYear}`, month: `${currentMonth - 1}`, day: `${firstDate.getDate()}`, tags: ['prev-month', 'button'], price: '' }
    days.unshift(date)
  }

  /* Add the days of the current month to the list */
  for (let i = 1; i <= daysInMonth; i++) {
    let date = { year: `${currentYear}`, month: `${currentMonth}`, day: `${i}`, tags: ['current-month', 'button'], price: '' }
    days.push(date)
  }

  /* Add the days of next month to the list */
  let lastDate = new Date(currentYear, currentMonth + 1, 0)
  while (lastDate.getDay() != 0) {
    lastDate.setDate(lastDate.getDate() + 1) // go forth a day untill sunday
    let date = { year: `${currentYear}`, month: `${currentMonth + 1}`, day: `${lastDate.getDate()}`, tags: ['next-month', 'button'], price: '' }
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


    element = setSeasonalData(element)
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
 * add the correct price/season to the element before creation
 * gets triggered by setDays()
 * @param {object} element 
 * @returns element object with correct price/season class
 */
function setSeasonalData(element) {
  let date = new Date(element.year, element.month, element.day)
  let year = element.year

  let summerStart = new Date(year, summerStartDate.getMonth(), summerStartDate.getDate())
  let winterStart = new Date(year, winterStartDate.getMonth(), winterStartDate.getDate())
  let highSummerStart = new Date(year, highSummerStartDate.getMonth(), highSummerStartDate.getDate())
  let highSummerEnd = new Date(year, highSummerEndDate.getMonth(), highSummerEndDate.getDate())
  let highwinterStart = new Date(element.month <= 0 ? year - 1 : year, highwinterStartDate.getMonth(), highwinterStartDate.getDate())
  let highwinterEnd = new Date(element.month >= 11 ? year + 1 : year, highwinterEndDate.getMonth(), highwinterEndDate.getDate())

  if (date >= summerStart && date < winterStart) {
    if (date >= highSummerStart && date <= highSummerEnd) {
      element.price = highSummerPrice
      element.tags.push('high-season')
    } else {
      element.price = lowSummerPrice
    }
  } else {
    if (date >= highwinterStart && date <= highwinterEnd) {
      element.price = highWinterPrice
      element.tags.push('high-season')
    } else {
      element.price = lowWinterPrice
    }
  }

  return element
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



/* Interaction functions */

/**
 * Updates the calender to the new month/year
 * gets triggered by the next/prev buttons
 */
function updateCalender() {
  pageMonth.textContent = Month[currentMonth]
  pageYear.textContent = currentYear
  calenderDates = getDays()
  setDays()

  /* Checks for stored dates already selected */
  if (selectionList.length > 0) {
    console.log('length > 0')
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
  if (currentMonth > Month.length - 1) {
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
let calculated = false
let hasBlocked = false;
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
    calculated = false
    hasBlocked = false
    toggleError()
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
  // add dates depending on ascending or descending, so it'll always stop in front of a blocked date
  let starterDate = new Date(start)

  if (selectionList.length === 0) {
    if (starterDate < end) {
      while (starterDate <= end) {
        selectionList.push(new Date(starterDate))
        starterDate.setDate(starterDate.getDate() + 1)
      }
    } else {
      do {
        selectionList.push(new Date(starterDate))
        starterDate.setDate(starterDate.getDate() - 1)
      } while (starterDate >= end)
    }
  }

  console.log('add selecting')
  // add selection class to selected elements
  selectionList.forEach(date => {
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()

    if (month === currentMonth && year === currentYear) {
      let button = document.querySelector(`button[data-day='${day}'].current-month`)

      if (button && !button.classList.contains('prev-month') && !button.classList.contains('next-month')) {
        button.classList.add('selected')
      }
    }

  })

  // add prices for selected range to priceList
  selectionList.forEach(date => {
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    let price = '0'

    if (month === currentMonth && year === currentYear) {
      let button = document.querySelector(`button[data-day='${day}'].current-month`)
      if (button.id !== 'blocked') {
        price = button.querySelector('span').innerText
      }


      if (button && !button.classList.contains('prev-month') && !button.classList.contains('next-month')) {
        price = parsePrice(price)
        prices.push(price)
      }
    }
  })

  toggleError()
  unselectBlocked(start, end)
  calculatePrice()
}

/**
 * removes selected date if a blocked date interferes with the selection
 * gets triggered by generateSelection()
 * @param {Date} start 
 * @param {Date} end 
 */
function unselectBlocked(start, end) {
  let selected = [...document.querySelectorAll('.selected')]
  let price = ''
  hasBlocked = false

  selected.forEach(element => {
    //setBlocked if blocked date is in currentMonth
    if (element.id === 'blocked') {
      hasBlocked = true
      toggleError()
    }
  })

  console.log(hasBlocked)
  if (hasBlocked) {
    /* if first selected date is a higher month than second selected date, or the start year is higher than the end year, move up on the list
    *    january, 2024   > december, 2023
    *    december, 2023  > november, 2023
    */
    if ((start.getMonth() > end.getMonth() && start.getFullYear() === end.getFullYear()) || start.getFullYear() > end.getFullYear()) {
      for (let i = 0; i <= selected.length - 1; i++) {
        selected[i].classList.remove('selected')

        if (selected[i].id === 'blocked') {
          break
        }

        price = selected[i].querySelector('span').innerText
        price = parsePrice(price)
        prices.splice(prices.indexOf(price), 1)

      }
    }
    /* if first selected date is smaller than second selected date, or the start year is lower dan the end year, move down the list
    *        december, 2023   < january, 2024
    *        november, 2023   < december, 2023 
    */
    else if ((start.getMonth() < end.getMonth() && start.getFullYear() === end.getFullYear()) || start.getFullYear() < end.getFullYear()) {
      for (let i = selected.length - 1; i > 0; i--) {
        selected[i].classList.remove('selected')

        if (selected[i].id === 'blocked') break

        price = selected[i].querySelector('span').innerText
        price = parsePrice(price)
        prices.splice(prices.indexOf(price), 1)
      }
    }
    // the month is the same and the year is the same 
    else {
      if (start > end) {
        for (let i = 0; i <= selected.length; i++) {
          selected[i].classList.remove('selected')
          if (selected[i].id === 'blocked') break

          price = selected[i].querySelector('span').innerText
          price = parsePrice(price)
          prices.splice(prices.indexOf(price), 1)
        }
      } else {
        for (let i = selected.length - 1; i >= 0; i--) {
          selected[i].classList.remove('selected')
          if (selected[i].id === 'blocked') break

          price = selected[i].querySelector('span').innerText
          price = parsePrice(price)
          prices.splice(prices.indexOf(price), 1)
        }
      }
    }
  }
}

function toggleError() {
  const div = document.getElementById('calender-fault')
  hasBlocked ? div.classList.add('active') : div.classList.remove('active')
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
 * add prices of current month to the list when selection overlaps to a different month
 * gets triggered when a first date is selected and then the month gets switched to the next or previous month
 * @param {string} month , either 'prev' or 'next'
 */
function generatePrices(month) {
  let price = '0'
  if (selectingStartDate) {
    return
  }

  if (month === 'prev') {
    let start = new Date(currentYear, currentMonth, 1)
    let startingDate = new Date(startDate)

    // Work from starting date to the beginning of the month
    while (start <= startingDate) {
      let button = document.querySelector(`button[data-day='${startingDate.getDate()}'].current-month`)
      if (button.id !== 'blocked') {
        price = button.querySelector('span').innerText
      } else {
        hasBlocked = true
        break
      }
      price = parsePrice(price)
      prices.push(price)
      startingDate.setDate(startingDate.getDate() - 1)
    }
  } else if (month === 'next') {
    let start = new Date(currentYear, currentMonth + 1, 0)
    let startingDate = new Date(startDate)

    // work from the starting date to the end of the month
    while (start >= startingDate) {
      let button = document.querySelector(`button[data-day='${startingDate.getDate()}'].current-month`)
      if (button.id !== 'blocked') {
        price = button.querySelector('span').innerText
      } else {
        hasBlocked = true
        break
      }
      price = parsePrice(price)
      prices.push(price)
      startingDate.setDate(startingDate.getDate() + 1)
    }

  }
}

/**
 * takes a price string and formats it to the correct number
 * strings may only only contain: '€{number},{number}'. e.g. '€24,50' becomes 24.50
 * @param {string} price, also accepts numbers
 * @returns formatted number
 */
function parsePrice(price) {
  if (typeof price === 'string') {
    price = price.replace('€', '')
    price = parseFloat(price.replace(',', '.'))
  }

  return price
}

/**
 * use to sum the total price of a selected Calender period
 * gets triggered upon making a selection
 * fills the table underneath the calender with the totals
 */
function calculatePrice() {

  if (calculated) {
    return
  }
  let total = 0
  let selectedPrice = document.getElementById('selected-price')
  let totalPrice = document.getElementById('total-price')

  if (prices.length > 0) {
    prices.forEach(price => {
      price = parseFloat(price)
      total = total + price
    })
  }

  let final = total + 50
  total = formatNumber(total)
  selectedPrice.innerText = `€${total}`
  final = formatNumber(final)
  totalPrice.innerText = `€${final}`
  calculated = true
}
