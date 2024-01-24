import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isMenuOpen: false, // You can use this state to manage the hamburger menu state
}

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen // Toggles the menu open/close state
    },
  },
})

export const { toggleMenu } = toggleSlice.actions
export default toggleSlice.reducer
