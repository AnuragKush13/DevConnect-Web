import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name:"requests",
    initialState:null,
    reducers:{
        addRequest:(state,action)=>action.payload,
        clearRequest:()=>null,
        removeRequest:(state,action)=>{
            return state.filter(r=>{
                return r._id !== action.payload
            })
        }
    }
})

export const {addRequest,clearRequest,removeRequest}= requestSlice.actions;

export default requestSlice.reducer;