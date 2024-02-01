import { createSlice } from "@reduxjs/toolkit";

const timelineSlice = createSlice({
    name: "timeline",
    initialState: {
        timeline: [],
        loading: false
    },
    reducers: {
        getTimeline: (state, action) => {
            state.timeline = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
    },
})

export const { getTimeline, setLoading } = timelineSlice.actions
export default timelineSlice.reducer