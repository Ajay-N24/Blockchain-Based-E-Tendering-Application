import { configureStore } from '@reduxjs/toolkit'
import roleReducer from './RoleSlice'
export default configureStore({
    reducer: {
        Role: roleReducer,
    },
})