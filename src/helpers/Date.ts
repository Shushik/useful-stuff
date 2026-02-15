interface ICalendarMonthOffsetsRes {
  lastDay: number
  firstDay: number
  daysInMonth: number
  daysOnScreen: number
}

/**
 * Get Date object from milliseconds number, parsable string
 * or another Date object
 *
 * @function getDateFromValue
 * @param {number|string|Date} rawDate
 * @returns {Date}
 * @throws {Error} Error: getDateFromValue: Invalid date parsed from ${rawDate}
 */
function getDateFromValue(rawDate: number | string | Date): Date {
  const type = typeof rawDate
  let date: Date

  if (type === 'number') {
    date = new Date(rawDate)
  } else if (type === 'string') {
    date = new Date(Date.parse(rawDate as string))
  } else {
    date = new Date(rawDate as Date)
  }

  if (!checkIsDateValid(date)) {
    throw new Error(`getDateFromValue: Invalid date parsed from ${rawDate}`)
  }

  return date
}

/**
 * Returns number with a leading zero
 *
 * @function formatTimeunit
 * @param {number} rawNum
 * @returns {string}
 */
function formatTimeunit(rawNum: number): string {
  return ('0' + rawNum).slice(-2)
}

/**
 * Checks that given date isn't broken
 *
 * @function checkIsDateValid
 * @param {Date} rawDate
 * @returns {boolean}
 */
function checkIsDateValid(rawDate: number | Date): boolean {
  return !isNaN(rawDate.valueOf())
}

/**
 * Check if a given date is weekend
 *
 * @function checkIsWeekend
 * @param {Date} rawDate
 * @returns {boolean}
 */
function checkIsWeekend(rawDate: Date): boolean {
  const dayNum = rawDate.getDay()

  return dayNum === 0 || dayNum === 6
}

interface IHolidayItem {
  isHoliday?: boolean
  date: number | string | Date
}

interface IHolidayItems {
  [id: string]: IHolidayItem
}

type THolidaysGetter = () => IHolidayItem[] | IHolidayItems | null

const holidaysCache = new WeakMap<THolidaysGetter, Map<Date, boolean>>()

function clearHolidaysCache(holidaysGetter: THolidaysGetter) {
  holidaysCache.delete(holidaysGetter)
}

function checkIsHoliday(
  rawDate: number | string | Date,
  holidaysGetter: THolidaysGetter
): boolean {
  let holidaysList: Map<Date, boolean> | undefined = holidaysCache.get(holidaysGetter)
  const date = getDateFromValue(rawDate)

  if (!holidaysList) {
    // Fill cache
    const rawHolidaysList = holidaysGetter()

    holidaysList = new Map<Date, boolean>()

    for (let key in rawHolidaysList) {
      const item = rawHolidaysList[key] as IHolidayItem
      const date = getDateFromValue(item.date)

      holidaysList.set(date, item.isHoliday === true || item.isHoliday === undefined)
    }

    holidaysCache.set(holidaysGetter, holidaysList)
  }

  if (!holidaysList) {
    return checkIsWeekend(date)
  }

  const isHoliday = holidaysList.get(date)

  if (isHoliday === undefined) {
    return checkIsWeekend(date)
  }

  return isHoliday
}

/**
 * Checks if a given year is leap or not
 *
 * @function checkIsYearLeap
 * @param {number|Date} rawDate
 * @returns {boolean}
 */
function checkIsYearLeap(rawDate: Date): boolean
function checkIsYearLeap(rawDate: number): boolean
function checkIsYearLeap(arg: unknown): boolean {
  const year = arg instanceof Date ? arg.getFullYear() : arg as number

  return new Date(year, 1, 29).getDate() === 29
}

/**
 * Gets number of days in year
 *
 * @function getDaysInYear
 * @param {number|Date} rawDate
 * @returns {number}
 */
function getDaysInYear(rawDate: Date): number
function getDaysInYear(rawDate: number): number
function getDaysInYear(arg: unknown): number {
  const year = arg instanceof Date ? arg.getFullYear() : arg as number

  return checkIsYearLeap(year) ? 366 : 365
}

/**
 * Gets number of days in month
 *
 * @function getDaysInMonth
 * @param {Date} rawDate
 * @returns {number}
 */
function getDaysInMonth(rawDate: Date): number {
  return new Date(
      rawDate.getFullYear(),
      rawDate.getMonth() + 1,
      0
    ).getDate()
}

/**
 * Get corrected number of weekday from monday (1)
 * till sunday (7)
 *
 * @function getCorrectedWeekday
 * @param {rawDate} rawDate
 * @returns {number}
 */
function getCorrectedWeekday(rawDate: Date): number {
  const weekDay = rawDate.getDay()

  return weekDay === 0 ? 7 : weekDay
}

export {
  getDaysInYear,
  getDaysInMonth,
  formatTimeunit,
  checkIsHoliday,
  checkIsWeekend,
  checkIsYearLeap,
  checkIsDateValid,
  clearHolidaysCache,
  getCorrectedWeekday
}
