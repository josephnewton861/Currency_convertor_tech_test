import React, { useEffect, useState } from "react";
import CurrencyConvertor from "./components/CurrencyConverter";
import "./App.css";
import axios from "axios";

const baseURL = "https://api.exchangeratesapi.io/latest";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  console.log(exchangeRate);

  // console.log(currencyOptions);

  useEffect(() => {
    axios.get(baseURL).then((res) => {
      let firstCurrency = Object.keys(res.data.rates)[0];
      setCurrencyOptions([res.data.base, ...Object.keys(res.data.rates)]);
      setFromCurrency(res.data.base);
      setToCurrency(firstCurrency);
      setExchangeRate(res.data.rates[firstCurrency]);
    });
  }, []);

  return (
    <div>
      <h1>Currency converter</h1>
      <CurrencyConvertor
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(event) => setFromCurrency(event.target.value)}
      />
      <p>=</p>
      <CurrencyConvertor
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(event) => setToCurrency(event.target.value)}
      />
    </div>
  );
}

export default App;
