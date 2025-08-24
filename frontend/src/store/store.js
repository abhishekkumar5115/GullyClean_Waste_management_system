import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import binReducer from './binSlice';
import pickupReducer from './pickupSlice';
import notificationReducer from './notificationsSlice';

const store = configureStore({
    reducer:{
        auth: authReducer,
        bin: binReducer,
        pickup: pickupReducer,
        notification: notificationReducer,
    }
})

export default store;