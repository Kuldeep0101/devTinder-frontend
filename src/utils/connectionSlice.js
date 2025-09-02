import { createSlice } from "@reduxjs/toolkit";

const connectonSlice = createSlice({
    name:"connections",
    initialState:[],
    reducers:{
        addConnections: (state, action)=> {return action.payload || []}, 
        removeConncetion:()=> []
    }
})

export const {addConnections, removeConncetion} = connectonSlice.actions


export default connectonSlice.reducer