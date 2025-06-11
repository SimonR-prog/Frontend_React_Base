import React from 'react'
import { useAuth } from '../../../contexts/AuthContext'

const SignUp = () => {
  try{
    const { signUp } = useAuth()
  }
  catch(error) { }

  
  return (
    <div>SignUp</div>
  )
}

export default SignUp