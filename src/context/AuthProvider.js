import React, { createContext, useState } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {

  const getPersistInitialState = () => {
    const localStorageVariable = localStorage.getItem('persist')
    if (localStorageVariable !== 'false' || localStorageVariable !== 'true') return false
  }

  const [auth, setAuth] = useState({})
  const [persist, setPersist] = useState(getPersistInitialState())

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext