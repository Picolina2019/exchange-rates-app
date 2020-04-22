import React, {useEffect, useState} from 'react';
import './App.css';
import Currency from './Currency';

function App() {

const [currencyOptions, setCurrencyOptions]= useState([]);
const [fromCurrency,setFromCurrency]= useState()
const [toCurrency,setToCurrency]= useState()
const [amount, setAmount] = useState(1)
const [amountFromCurrency, setAmountFromCurrency]= useState(true)
const[ exchangeRate, setExchangeRate]= useState()


let toAmount, fromAmount
if(amountFromCurrency){
  fromAmount = amount
  toAmount = (amount * exchangeRate).toFixed(2)
}else{
  toAmount = amount
  fromAmount = (amount/exchangeRate).toFixed(2)
}


const API = 'https://api.exchangeratesapi.io/latest';

useEffect(() => {
  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      if (!data) {
        return null;
      } else {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      }
    });
}, []);

  useEffect(()=>{
    if (fromCurrency && toCurrency){
    fetch(`${API}?base=${fromCurrency}&symbols=${toCurrency}`)
    .then(res =>res.json())
    .then(data=> setExchangeRate(data.rates[toCurrency]))
    }
  },[fromCurrency, toCurrency])

  const handleFromAmountChange=(e)=>{
    setAmount(e.target.value)
    setAmountFromCurrency(true)
  }
  const handleToAmountChange=(e)=>{
    setAmount(e.target.value)
    setAmountFromCurrency(false)
  }
  const handleResetAmount=()=>{
    setAmount('');
    setAmountFromCurrency(true);
  }
  return (
    <div className="App">
      <h1>Currency rates</h1>
      <h2>Convert</h2>
      <Currency currencyOptions={currencyOptions} 
      selectedCurrency={fromCurrency}
      onChangeCurrency = {e => setFromCurrency(e.target.value)}
      amount={fromAmount}
      onChangeAmount={handleFromAmountChange}
      />
      <div className='sign'>=</div>
      <Currency currencyOptions={currencyOptions} 
      selectedCurrency={toCurrency}
      onChangeCurrency={e => setToCurrency(e.target.value)}
      amount={toAmount}
      onChangeAmount={handleToAmountChange}
      />
      <div className='info'>
      {amountFromCurrency ? (<p> {amount} {fromCurrency} is uqvivalent to {toAmount} {toCurrency} </p>) 
      : (<p> {amount} {toCurrency} is  equivalent to {fromAmount} {fromCurrency} </p>)}
      </div>
      
      <button className='reset' onClick={handleResetAmount}>Reset</button>
      
    </div>
  );
}

export default App;
