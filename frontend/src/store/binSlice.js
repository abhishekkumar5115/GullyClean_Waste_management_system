import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../api"; // Assuming you have an api.js file for axios instance


// Async thunk to fetch bins from the server
export const fetchBins = createAsyncThunk(
    "bin/fetchBins",
    async (_, thunkAPI) => {
      try {
        const response = await api.get('/bins');
        return response.data; // expect an array of bins
      } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
      }
    }
  );

const initialState = {
    bins:[],
    status: "idle",     // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    binData: {
        id: null,
        status: "empty",
        location: "",
        lastEmptied:"",
    }
    
}

const binSlice = createSlice({
    name: 'bin',
    initialState,
    reducers:{
        setBins: (state, action) => {
            state.bins = action.payload;
        },
        addBin: (state, action) => {
            state.bins.push(action.payload);
        },
        removeBin: (state, action) => {
            state.bins = state.bins.filter(bin => bin.id !== action.payload);
        },
        setBin: (state, action) => {
            state.binData = action.payload;
        },
        clearBin: (state)=>{
            state.binData.status = "empty";
        },
        setFull: (state) => {
            state.binData.status = "full";
        },
        setEmpty: (state) => {
            state.binData.status = "empty";
        },
        updateLastEmptied: (state, action) => {
            state.binData.lastEmptied = action.payload; 
        },

    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchBins.pending, (state) => {
            state.status = 'loading';
            state.error = null;
          })
          .addCase(fetchBins.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.bins = action.payload;
          })
          .addCase(fetchBins.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
          });
      },
})

export const {setBin, clearBin, setFull, setEmpty, updateLastEmptied,setBins,addBin,removeBin} = binSlice.actions;
export default binSlice.reducer;