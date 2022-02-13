import { createSlice } from "@reduxjs/toolkit";






const reduxUsers = createSlice({
    name: 'users',
    initialState: {
        users: [],
        id: null,
    },
    reducers: {
        addUsers(state, action) {
            state.users = action.payload
        },
        pushMessagesUsers(state, action) {
            const id = state.users.findIndex(sas => sas.id === action.payload.id)
            state.users[id].messages.push(action.payload.message)
        },
        addMessage(state, action) {
            state.id = action.payload
        }
    },
})

export const { addMessage, getMessage, addUsers, pushMessagesUsers } = reduxUsers.actions

export default reduxUsers.reducer;
