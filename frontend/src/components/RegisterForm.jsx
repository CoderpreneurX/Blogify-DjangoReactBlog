import React, { useRef, useState } from 'react'
import { registerUser } from '../utils/auth'
import {Link} from 'react-router-dom'

export default function LoginForm() {
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const registerButton = useRef()

  function register(e) {
    e.preventDefault()
    registerButton.current.disabled = true
    registerButton.current.innerText = 'Loading'
    setMessage(null)
    setMessageType(null)
    const username = usernameRef.current.value
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const formData = new FormData()
    formData.append('username', username)
    formData.append('email', email)
    formData.append('password', password)
    registerUser(formData).then((response) => {
      setMessage(response.message)
      setMessageType(response.type)
      registerButton.current.disabled = false
      registerButton.current.innerText = 'Register'
    })
  }
  return (
    <section className='h-screen grid place-items-center'>
      {message && (<div className="alert">
        <div className={`content ${messageType}`}>
          <p>{message}</p>
        </div>
      </div>)}
      <form onSubmit={register} className='flex flex-col gap-2 text-center'>
        <h1 className='font-semibold text-3xl text-blue-800'>Register</h1>
        <p className='text-slate-600'>Enter your credentials to continue</p>
        <input ref={usernameRef} placeholder='Username' type="text" name="username" id="username" required />
        <input ref={emailRef} placeholder='E-mail' type="email" name="email" id="email" required />
        <input ref={passwordRef} placeholder='Password' type="password" name="password" id="password" required />
        <button ref={registerButton} type='submit'>Register</button>
        <p>Already have an account? <Link className='link' to={'/login'}>Login</Link></p>
      </form>
    </section>
  )
}
