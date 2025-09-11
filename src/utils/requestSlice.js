import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name:"requests",
    initialState:null,
    reducers:{
        addRequests(state,action){
            return action.payload;
        },
        updateRequests(state, action) {
            return state.filter((r) => r.requestId !== action.payload);
        }
    }
});

export const {addRequests,updateRequests} = requestSlice.actions;
export default requestSlice.reducer;