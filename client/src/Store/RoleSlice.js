import { createSlice } from '@reduxjs/toolkit'

export const RoleSlice = createSlice({
    name: 'Role',
    initialState: {
        value: null,
    },
    reducers: {
        set: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes.
            // Also, no return statement is required from these functions.
            state.value = action.payload;
        },
        clear: (state) => {
            state.value = null
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { set, clear, incrementByAmount } = RoleSlice.actions

export default RoleSlice.reducer