import { createSlice } from "@reduxjs/toolkit";

const ConnectionSlice = createSlice({
    name:"connection",
    initialState:null,
    reducer:{
        addConnection:(state,action)=>action.payload,
        removeConnection:()=>null
    }
})

export const {addConnection,removeConnection}= ConnectionSlice.actions;

export default ConnectionSlice.reducer;