import { useState, useEffect } from 'react'

const usePersist = () => {
  const [persist, setPersist] = useState(() => {
    const persisted = localStorage.getItem('persist')
    return persisted ? JSON.parse(persisted) : false
  })

  useEffect(() => {
    localStorage.setItem('persist', JSON.stringify(persist))
  }, [persist])

  return [persist, setPersist]
}

export default usePersist