import React, { useEffect, useState } from 'react'

export default function Message() {
  const [location, setLocation] = useState({
    lat: null,
    long: null,
  })

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

  //just to see location
  //const x = document.getElementById('demo')

  return (
    <div>
      <h1>show cords</h1>
      <p>{location.lat}</p>
      <p>{location.long}</p>
      <p id="demo"></p>
    </div>
  )
}
