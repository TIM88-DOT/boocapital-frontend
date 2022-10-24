import { createSlice } from "@reduxjs/toolkit";

export const contestSlice = createSlice({
    name: "contest",
    initialState: {
        id: null,
        contenders: null,
        isRunning: false,
    },
    reducers: {
        setContest(state, action) {
            const { _id, _contenders, _isRunning } = action.payload;
            state.id = _id;
            state.contenders = _contenders;
            state.isRunning = _isRunning;
        },
    }
});

export const { setContest } = contestSlice.actions;

export default contestSlice.reducer;