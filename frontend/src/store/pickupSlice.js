// src/store/pickupSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../api"; // your axios/fetch wrapper

// — Async thunks —

// Fetch all pickup requests (e.g. for dispatcher)
export const fetchPickups = createAsyncThunk(
  "pickup/fetchPickups",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/pickups");
      return res.data; // expect array of { id, binId, requester, date, status, assignedTo }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Create a new pickup (citizen)
export const createPickup = createAsyncThunk(
  "pickup/createPickup",
  async (payload, thunkAPI) => {
    try {
      const res = await api.post("/pickups", payload);
      return res.data; // the created pickup object
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Assign a pickup to a worker (dispatcher)
export const assignPickup = createAsyncThunk(
  "pickup/assignPickup",
  async ({ pickupId, workerId, scheduleDate }, thunkAPI) => {
    try {
      const res = await api.put(`/pickups/${pickupId}/assign`, {
        assignedTo: workerId,
        scheduledFor: scheduleDate,
      });
      return res.data; // updated pickup object
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Mark a pickup as completed (worker)
export const completePickup = createAsyncThunk(
  "pickup/completePickup",
  async (pickupId, thunkAPI) => {
    try {
      const res = await api.put(`/pickups/${pickupId}/complete`);
      return res.data; // updated pickup object
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  list: [],           // all pickups
  status: "idle",     // loading state
  error: null,
  current: null,      // single-pickup detail
};

const pickupSlice = createSlice({
  name: "pickup",
  initialState,
  reducers: {
    // select a pickup for viewing/editing
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    clearCurrent: (state) => {
      state.current = null;
    },
    // sync update of a pickup in list & current
    updateCurrent: (state, action) => {
      if (state.current && state.current.id === action.payload.id) {
        state.current = { ...state.current, ...action.payload };
      }
      state.list = state.list.map((p) =>
        p.id === action.payload.id ? { ...p, ...action.payload } : p
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchPickups
      .addCase(fetchPickups.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPickups.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchPickups.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // createPickup
      .addCase(createPickup.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createPickup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createPickup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // assignPickup
      .addCase(assignPickup.fulfilled, (state, action) => {
        // update in list and current
        const updated = action.payload;
        state.list = state.list.map((p) =>
          p.id === updated.id ? updated : p
        );
        if (state.current && state.current.id === updated.id) {
          state.current = updated;
        }
      })

      // completePickup
      .addCase(completePickup.fulfilled, (state, action) => {
        const updated = action.payload;
        state.list = state.list.map((p) =>
          p.id === updated.id ? updated : p
        );
        if (state.current && state.current.id === updated.id) {
          state.current = updated;
        }
      });
  },
});

export const { setCurrent, clearCurrent, updateCurrent } =
  pickupSlice.actions;
export default pickupSlice.reducer;
