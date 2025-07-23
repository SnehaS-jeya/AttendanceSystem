import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(localStorage.getItem('userType'))

  useEffect(() => {
    const storedRole = localStorage.getItem('userType')
    if (storedRole) setUserType(storedRole)
  }, [])

  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
