import {useState, createContext, useContext} from 'react'
const AuthContext = createContext(null)

export const useAuth=() => {
  return useContext(AuthContext)
  }

export const AuthProvider =({children}) => {
    const[user, setUser] = useState(null)
    const[register, setRegister] = useState(false)
    
    const login = user =>{
      setUser (user)
      console.log(user)
    }

    const signIn = register =>{
      setRegister(true)
    }

    const logout = () => {
      setUser(null)
    }
    return(
    <AuthContext.Provider value={{user, login, logout,signIn, register}}>
    {children}
    </AuthContext.Provider>
    )
  }


