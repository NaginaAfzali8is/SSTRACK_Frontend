import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getTimeline } from "../store/timelineSlice";

export const GetTimelineUsers = createAsyncThunk("get/timeline-users", async (body, { getState, dispatch }) => {
    console.log(body);
    try {
        const response = await axios.get(`https://combative-fox-jumpsuit.cyclic.app/api/v1/owner/getCompanyemployee`, {
            headers: body,
        })
        if (response.status) {
            const onlineUsers = response.data?.onlineUsers?.length > 0 ? response.data?.onlineUsers : []
            const offlineUsers = response.data?.offlineUsers?.length > 0 ? response.data?.offlineUsers : []
            const allUsers = [...onlineUsers, ...offlineUsers];
            dispatch(getTimeline(allUsers.filter((f) => f.isArchived === false && f.UserStatus === false)))
            console.log(response);
        }
    } catch (error) {
        console.log(error);
    }
})