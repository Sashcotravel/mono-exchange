import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'


export const instance = axios.create({
    baseURL: 'https://api.monobank.ua/bank'
})


export const axiosCurrent = createAsyncThunk('bank/axiosCurrent', async () => {
    const { data } = await instance.get('/currency')
    return data
})