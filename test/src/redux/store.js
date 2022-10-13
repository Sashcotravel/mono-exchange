import { configureStore } from '@reduxjs/toolkit'
import {postsReducer} from "./slices/current";


const store = configureStore({
    reducer: {
        current: postsReducer,
    }
})

window.store = store

export default store