import React, { useEffect, useState } from 'react'

import { getMessages } from '../api'

export default function Message() {
  const [location, setLocation] = useState({
    lat: null,
    long: null,
  })

  const [message, setMessage] = useState([])
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLocation({
            long: position.coords.longitude,
            lat: position.coords.latitude,
          })
        })
      } else {
        // x.innerHTML = 'Geolocation is not supported by this browser.'
        alert('Geolocation is not supported by this browser.')
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setLoader(true)
    console.log(location)
    getMessages(location)
      .then((res) => {
        setMessage(res)
      })
      .finally(setLoader(false))
      .catch('')
  }, [])

  //just to see location
  //const x = document.getElementById('demo')

  return (
    <div>
      {!loader ? (
        <>
          <h1>show cords</h1>
          {console.log(message)}
          {/* <p>{message}</p> */}

          <p>{location.lat}</p>
          <p>{location.long}</p>

          <p>messages:</p>
          {/* <p>{message.msg[0].msg}</p>
          <p>{message.msg[1].msg}</p> */}

          {/* <p>{message.msg[0].msg}</p> */}
          <p id="demo"></p>
          {/* <ul>
        {message.map((messages) => (
          <li key={messages.id}>{message.msg}</li>
        ))}
      </ul> */}
        </>
      ) : (
        <p>loading...</p>
      )}
    </div>
  )
}
