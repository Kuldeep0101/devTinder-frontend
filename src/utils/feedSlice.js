import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state, action)=>{
            return action.payload
        },
        removeFeed:(state, action)=>{
            return mull
        }
    }
})
export const {addFeed}= feedSlice.actions
export default feedSlice.reducer