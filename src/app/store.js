import { configureStore } from '@reduxjs/toolkit';

import { taskApi } from '../services/taskApi'

export default configureStore({
    reducer: {
        [taskApi.reducerPath]: taskApi.reducer,
    },
});