import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timeline: [],
}

const timelineSlice = createSlice({
    name: "timeline",
    initialState: initialState,
    reducers: {
        getTimeline: (state, action) => {
            state.timeline = action.payload
        }
    },
})

export const { getTimeline } = timelineSlice.actions
export default timelineSlice.reducer