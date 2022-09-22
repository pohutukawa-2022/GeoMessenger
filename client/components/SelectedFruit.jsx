import React, { useState, useEffect } from 'react'

import { updateFruit, deleteFruit } from '../api'
import { useAuth0 } from '@auth0/auth0-react'

function SelectedFruit({ selected, clearSelected, setError, setFruits }) {
  const { getAccessTokenSilently } = useAuth0()
  const [editing, setEditing] = useState(selected)

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditing({
      ...editing,
      [name]: value,
    })
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    getAccessTokenSilently()
      .then((token) => updateFruit(editing, token))
      .then((remoteFruits) => setFruits(remoteFruits))
      .then(clearSelected)
      .then(() => setError(''))
      .catch((err) => setError(err.message))
  }

  const handleDelete = (e) => {
    e.preventDefault()
    getAccessTokenSilently()
      .then((token) => deleteFruit(editing.id, token))

      .then(setFruits)
      .then(clearSelected)
      .then(() => setError(''))
      .catch((err) => setError(err.message))
  }

  useEffect(() => {
    setEditing(selected)
  }, [selected])

  const { name: editingName, averageGramsEach: editingGrams } = editing
  const { name: currentName, username: user } = selected

  return (
    <>
      <h2>Selected: {currentName}</h2>
      <p>Originally added by {user}</p>
      <form onSubmit={handleUpdate}>
        <label>Name:
        <input
          type="text"
          name="name"
          aria-label="selected-name"
          data-testid="selected-name"
          value={editingName || ''}
          onChange={handleEditChange}
        />
        </label>
        <label>Average Grams Each:
        <input
          type="text"
          name="averageGramsEach"
          aria-label="selected-grams"
          data-testid="selected-grams"
          value={editingGrams || ''}
          onChange={handleEditChange}
        />
        </label>
        <button type="submit" data-testid="update-button">
          Update fruit
        </button>
        <button
          type="button"
          data-testid="delete-button"
          onClick={handleDelete}
        >
          Delete fruit
        </button>
        <button
          type="button"
          data-testid="clear-button"
          onClick={clearSelected}
        >
          Clear selection
        </button>
      </form>
    </>
  )
}

export default SelectedFruit
