import { useEffect } from 'react'

const useTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title
    document.title = `Motiv8 Gym - ${title}`
    
    return () => {
      document.title = prevTitle
    }
  }, [title])
}

export default useTitle