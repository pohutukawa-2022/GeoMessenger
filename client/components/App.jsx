import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useCacheUser } from '../auth0-utils'
import { useAuth0 } from '@auth0/auth0-react'

import Nav from './Nav'
import Fruits from './Fruits'
import { getUser } from '../api'
import Register from './Register'
import { useDispatch } from 'react-redux'
import { clearLoggedInUser, updateLoggedInUser } from '../slices/user'
import Message from './Message'

function App() {
  useCacheUser()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(clearLoggedInUser())
    } else {
      getAccessTokenSilently()
        .then((token) => getUser(token))
        .then((userInDb) => {
          userInDb
            ? dispatch(updateLoggedInUser(userInDb))
            : navigate('/register')
        })
        .catch((err) => console.error(err))
    }
  }, [isAuthenticated])

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Fruits />} />
        <Route path="register" element={<Register />} />
      </Routes>
      <Message />
    </>
  )
}

export default App
