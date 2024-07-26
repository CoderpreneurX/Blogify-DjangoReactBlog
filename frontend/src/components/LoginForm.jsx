import React, { useRef, useState } from 'react'
import { loginUser } from '../utils/auth'
import {Link} from 'react-router-dom'

export default function LoginForm() {
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const usernameRef = useRef()
  const passwordRef = useRef()
  const loginButton = useRef()

  function login(e) {
    e.preventDefault()
    setMessage(null)
    setMessageType(null)
    loginButton.current.disabled = true
    loginButton.current.innerText = 'Loading'
    const username = usernameRef.current.value
    const password = passwordRef.current.value
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    loginUser(formData).then((response) => {
      setMessage(response.message)
      setMessageType(response.type)
      loginButton.current.disabled = false
      loginButton.current.innerText = 'Login'
    })
  }
  return (
    <section className='h-screen grid place-items-center'>
      {message && (<div className="alert">
        <div className={`content ${messageType}`}>
          <p>{message}</p>
        </div>
      </div>)}
      <form onSubmit={login} className='flex flex-col gap-2 text-center'>
        <h1 className='font-semibold text-3xl text-blue-800'>Login</h1>
        <p className='text-slate-600'>Enter your credentials to continue</p>
        <input ref={usernameRef} placeholder='Username' type="text" name="username" id="username" required />
        <input ref={passwordRef} placeholder='Password' type="password" name="password" id="password" required />
        <button ref={loginButton} type='submit'>Login</button>
        <p>Don't have an account? <Link className='link' to={'/register'}>Create account</Link></p>
      </form>
    </section>
  )
}
