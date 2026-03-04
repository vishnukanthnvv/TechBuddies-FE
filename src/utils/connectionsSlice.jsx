import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
    name: "connections",
    initialState: null,
    reducers: {
        addConnection: (state, action) => {
            return action.payload;
        },
        removeConnection: (state, action) => {
            const newArr = state.filter((con) => con._id !== action.payload);
            return newArr;
        }
    }
});

export const { addConnection, removeConnection } = connectionsSlice.actions;
export default connectionsSlice.reducer;