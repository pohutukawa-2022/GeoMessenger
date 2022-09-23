import React, { useEffect, useState } from 'react'

import { getMessages } from '../api'

export default function Button() {
  const [location, setLocation] = useState({
    lat: null,
    long: null,
  })
  const [message, setMessage] = useState([])
  const [loader, setLoader] = useState(true)
  const [button, setButton] = useState(true)

  function handleClick(e) {
    e.preventDefault()
    setButton(!button)
  }
  // useEffect(async () => {
  // const interval = setInterval(() => {
  //   if (navigator.geolocation) {

  //   } else {
  //     // x.innerHTML = 'Geolocation is not supported by this browser.'
  //     alert('Geolocation is not supported by this browser.')
  //   }
  // }, 1000)
  // return () => clearInterval(interval)
  // }

  // , [])

  useEffect(() => {
    setLoader(true)
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        long: position.coords.longitude,
        lat: position.coords.latitude,
      })
      getMessages({
        long: position.coords.longitude,
        lat: position.coords.latitude,
      })
        .then((res) => {
          console.log(res)
          setMessage(res)
        })
        .finally(() => setLoader(false))
        .catch('')
    })
  }, [button])

  //just to see location
  //const x = document.getElementById('demo')

  return (
    <div>
      <button onClick={handleClick}>Click</button>
      {!loader ? (
        <>
          <h1>show cords</h1>
          {console.log(message)}
          {/* <p>{message}</p> */}

          <p>{location.lat}</p>
          <p>{location.long}</p>

          <p>messages: {message.msg[0].msg}</p>
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
