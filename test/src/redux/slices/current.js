import { createSlice } from '@reduxjs/toolkit'
import {axiosCurrent} from "../../API";

const initialState = {
    currentItem: {
        usd: {
            items: null,
            status: 'loading'
        },
        eur: {
            items: null,
            status: 'loading'
        },
        uah: {
            items: 1,
            status: 'loading'
        },
        usdDoEur: {
            items: null,
            status: 'loading'
        }
    },
}


const postsSlice = createSlice({
    name: 'current',
    initialState,
    reducers: {},
    extraReducers: {
        [axiosCurrent.pending]: (state) => {
            state.currentItem.usd.items = null
            state.currentItem.eur.items = null
            state.currentItem.uah.items = null
            state.currentItem.usdDoEur.items = null
            state.currentItem.status = 'loading'
        },
        [axiosCurrent.fulfilled]: (state, action) => {
            state.currentItem.usd.items = action.payload[0]
            state.currentItem.eur.items = action.payload[1]
            state.currentItem.usdDoEur.items = action.payload[2]
            state.currentItem.status = 'loaded'
        },
        [axiosCurrent.rejected]: (state) => {
            state.currentItem.usd.items = null
            state.currentItem.eur.items = null
            state.currentItem.uah.items = null
            state.currentItem.usdDoEur.items = null
            state.currentItem.status = 'error'
        }
    }
})


export const postsReducer = postsSlice.reducer