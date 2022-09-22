import React, { useState, useEffect } from 'react'

import SelectedFruit from './SelectedFruit'
import AddFruit from './AddFruit'

import { getFruits } from '../api'

function Fruits() {
  const [error, setError] = useState('')
  const [fruits, setFruits] = useState([])
  const [adding, setAdding] = useState(false)
  const [selected, setSelected] = useState(null)

  function hideError() {
    setError('')
  }

  function openAddForm(e) {
    e.preventDefault()
    setAdding(true)
  }

  function closeAddForm() {
    setAdding(false)
  }

  function setSelectHandler(fruit, e) {
    e.preventDefault()
    setSelected(fruit)
  }

  function clearSelected() {
    setSelected(null)
  }

  useEffect(() => {
    getFruits()
      .then((remoteFruits) => setFruits(remoteFruits))
      .catch((err) => setError(err.message))
  }, [])

  return (
    <>
      <div onClick={hideError}>{error && `Error: ${error}`}</div>

      <ul>
        {fruits.map((fruit) => (
          <li key={fruit.id}>
            <button
              href="#"
              onClick={(e) => setSelectHandler(fruit, e)}
            >
              {fruit.name}
            </button>
          </li>
        ))}
      </ul>

      {adding ? (
        <AddFruit
          setError={setError}
          setFruits={setFruits}
          closeAddForm={closeAddForm}
        />
      ) : (
        <button href="#" onClick={openAddForm}>
          Add a Fruit
        </button>
      )}

      {selected && (
        <SelectedFruit
          selected={selected}
          clearSelected={clearSelected}
          setError={setError}
          setFruits={setFruits}
        />
      )}
    </>
  )
}

export default Fruits
