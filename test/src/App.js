import React, {useEffect, useState} from 'react'
import s from './App.module.css';
import {useDispatch, useSelector} from "react-redux";
import {axiosCurrent} from "./API";


const App = () => {

    const [input1, setInput1] = useState('')
    const [input2, setInput2] = useState('')
    const [value1, setValue1] = useState('')
    const [value2, setValue2] = useState('')
    const [tagMoney1, setTagMoney1] = useState('USD')
    const [tagMoney2, setTagMoney2] = useState('USD')
    const [input3, setInput3] = useState('')
    const [value3, setValue3] = useState('')
    const [tagMoney3, setTagMoney3] = useState('USD')

    const usd = useSelector(state => state.current.currentItem.usd)
    const eur = useSelector(state => state.current.currentItem.eur)
    const usdDoEur = useSelector(state => state.current.currentItem.usdDoEur)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(axiosCurrent())
    }, [])

    const change10 = (e) => {
        setInput1(e.target.value)
    }

    const change = (e) => {
        setValue1(e.target.value)
        setTagMoney1(e.target.options[e.target.selectedIndex].dataset.attribute)
    }

    const change3 = (e) => {
        setValue3(e.target.value)
        setTagMoney3(e.target.options[e.target.selectedIndex].dataset.attribute)
    }

    const change2 = (e) => {
        setValue2(e.target.value)
        setTagMoney2(e.target.options[e.target.selectedIndex].dataset.attribute)
    }

    // input1 - first input
    // input2 - second input
    // input3 - third input
    // value1 - the number in the first selector
    // value2 - the number in the second selector
    // value3 - the number in the third selector
    // tagMoney1 - USD EUR UAH in the first selector
    // tagMoney2 - USD EUR UAH в in the second selector
    // tagMoney3 - USD EUR UAH в in the third selector

    const f1 = () => {
        if (tagMoney2 === tagMoney1) {
            setTimeout(() => setInput2(input1), 100)
        } else if (tagMoney2 === 'EUR' && tagMoney1 === 'USD') {
            let sum = input1 * usdDoEur?.items?.rateSell
            setTimeout(() => setInput2(sum.toFixed(2)), 100)
        } else if (tagMoney1 === 'EUR' && tagMoney2 === 'USD') {
            let sum = input1 / usdDoEur?.items?.rateSell
            setTimeout(() => setInput2(sum.toFixed(2)), 100)
        } else if (tagMoney1 === 'UAH') {
            let sum = input1 / value2
            setTimeout(() => setInput2(sum.toFixed(2)), 100)
        } else if (tagMoney2 === 'UAH') {
            let sum = input1 * value1
            setTimeout(() => setInput2(sum.toFixed(2)), 100)
        }
    }

    const f2 = () => {
        if (tagMoney3 === tagMoney1) {
            setTimeout(() => setInput3(input1), 100)
        } else if (tagMoney3 === 'EUR' && tagMoney1 === 'USD') {
            let sum = input1 * usdDoEur?.items?.rateSell
            setTimeout(() => setInput3(sum.toFixed(2)), 100)
        } else if (tagMoney1 === 'EUR' && tagMoney3 === 'USD') {
            let sum = input1 / usdDoEur?.items?.rateSell
            setTimeout(() => setInput3(sum.toFixed(2)), 100)
        } else if (tagMoney1 === 'UAH') {
            let sum = input1 / value3
            setTimeout(() => setInput3(sum.toFixed(2)), 100)
        } else if (tagMoney3 === 'UAH') {
            let sum = input1 * value1
            setTimeout(() => setInput3(sum.toFixed(2)), 100)
        }
    }

    const submit = () => {

        f1()
        f2()

        let sum = input1 * value2
        let sum2 = input1 * value3
        setInput2(sum.toFixed(2))
        setInput3(sum2.toFixed(2))
    }


    return (
        <>
            <div className={s.header}>
                <div className={s.div}>USD: sell = {usd?.items?.rateSell.toFixed(2)} / buy = {usd?.items?.rateBuy}</div>
                <div className={s.div}>EUR => sell = {eur?.items?.rateSell.toFixed(2)} / buy = {eur?.items?.rateBuy}</div>
            </div>
            <div>
                <div>
                    <select onClick={change}>
                        <option data-attribute='USD' value={usd?.items?.rateSell}>USD</option>
                        <option data-attribute='EUR' value={eur?.items?.rateSell}>EUR</option>
                        <option data-attribute='UAH' value={1}>UAH</option>
                    </select>
                    <input className={s.input} type="text" placeholder={'select a currency'} value={input1}
                           onChange={change10}
                    />
                    <button onClick={submit}>submit</button>
                    <p></p>
                    <select onClick={change2}>
                        <option data-attribute='USD' value={usd?.items?.rateBuy}>USD</option>
                        <option data-attribute='EUR' value={eur?.items?.rateBuy}>EUR</option>
                        <option data-attribute='UAH' value={1}>UAH</option>
                    </select>
                    <input className={s.input} type="text" placeholder={'select a currency'} value={input2}
                           onChange={(e) => setInput2(e.target.value)}/>

                    <select onClick={change3}>
                        <option data-attribute='USD' value={usd?.items?.rateBuy}>USD</option>
                        <option data-attribute='EUR' value={eur?.items?.rateBuy}>EUR</option>
                        <option data-attribute='UAH' value={1}>UAH</option>
                    </select>

                    <input className={s.input} type="text" placeholder={'select a currency'} value={input3}
                           onChange={(e) => setInput3(e.target.value)}/>
                </div>
            </div>
        </>
    )
}


export default App

