import React, { useEffect, useState } from "react";
import CurrencyConvertor from "./components/CurrencyConverter";
import "./App.css";
import axios from "axios";

const baseURL = "https://api.exchangeratesapi.io/latest";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);

  console.log(currencyOptions);

  useEffect(() => {
    axios.get(baseURL).then((res) => {
      setCurrencyOptions([res.data.base, ...Object.keys(res.data.rates)]);
    });
  }, []);

  return (
    <div>
      <h1>Currency converter</h1>
      <CurrencyConvertor currencyOptions={currencyOptions} />
      <p>=</p>
      <CurrencyConvertor currencyOptions={currencyOptions} />
    </div>
  );
}

export default App;
