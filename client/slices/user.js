import { createSlice } from '@reduxjs/toolkit'

const emptyUser = {
  auth0Id: '',
  username: '',
}

const slice = createSlice({
  name: 'user',
  initialState: emptyUser,
  reducers: {
    updateLoggedInUser: (state, { payload }) => ({ ...state, ...payload }),
    clearLoggedInUser: () => emptyUser,
  },
})

export const { clearLoggedInUser, updateLoggedInUser } = slice.actions
export default slice.reducer
