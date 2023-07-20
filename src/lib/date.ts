export const formatDate = (date: Date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }
  
  export const getDaysBetweenDates = (date1: Date, date2: Date) => {
    const diffTime = Math.abs(date2.getTime() - date1.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }
  