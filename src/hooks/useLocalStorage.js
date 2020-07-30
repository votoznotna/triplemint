import {useState, useEffect} from 'react'
export default (key, initialValue = '') => {
  const [value, setValue] = useState(() => {
    return (localStorage.getItem(key) && JSON.parse(localStorage.getItem(key))) || initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue]
}