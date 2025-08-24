import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

// check if the user is logged in
export const checkAuth = createAsyncThunk("auth/checkAuth", async(__, TexthunkAPI) => {
    try{
         const res = await fetch('http://localhost:3000/user/check-auth', {
         method: "GET",
         credentials: 'include', 
         headers: {
        'Content-Type': 'application/json',
       }
        });
        if(res.ok){
            const data = await res.json();
            return data.user; // Return the user object
        } else {
            throw new Error('User not authenticated');
        }
    }
    catch(err){
        console.error('Error checking auth:', err);
        return TexthunkAPI.rejectWithValue(err.message); // Return the error message
    }
    })

const initialState = {
    user: null 
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login: (state, action)=>{
            state.user = {
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                phone: action.payload.phone,
                role: action.payload.role,
            };
        },
        logout: (state)=>{
            state.user = null;
        },
        updateProfile: (state, action)=>{
            state.user = {
                ...state.user,
                name: action.payload.name,
                email: action.payload.email,
            };
        },
    },
    extraReducers: (builder) => {
  builder
    .addCase(checkAuth.fulfilled, (state, action) => {
      state.user = {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        phone: action.payload.phone,
        role: action.payload.role,
      };
    })
    .addCase(checkAuth.rejected, (state) => {
      state.user = null;
    });
}
})


export const {login, logout,updateProfile} = authSlice.actions;
export default authSlice.reducer;