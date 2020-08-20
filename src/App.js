import React, { useEffect, useState } from "react";
import CurrencyConvertor from "./components/CurrencyConverter";
import "./App.css";
import axios from "axios";

const baseURL = "https://api.exchangeratesapi.io/latest";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();

  console.log(currencyOptions);

  useEffect(() => {
    axios.get(baseURL).then((res) => {
      let firstCurrency = Object.keys(res.data.rates)[0];
      setCurrencyOptions([res.data.base, ...Object.keys(res.data.rates)]);
      setFromCurrency(res.data.base);
      setToCurrency(firstCurrency);
    });
  }, []);

  return (
    <div>
      <h1>Currency converter</h1>
      <CurrencyConvertor
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
      />
      <p>=</p>
      <CurrencyConvertor
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
      />
    </div>
  );
}

export default App;
