import React, { useEffect, useState } from "react";
import CurrencyConvertor from "./components/CurrencyConverter";
import firebase from "./firebase";
import "./App.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

const baseURL = "https://api.exchangeratesapi.io/latest";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    axios.get(baseURL).then((res) => {
      let firstCurrency = Object.keys(res.data.rates)[0];
      setCurrencyOptions([res.data.base, ...Object.keys(res.data.rates)]);
      setFromCurrency(res.data.base);
      setToCurrency(firstCurrency);
      setExchangeRate(res.data.rates[firstCurrency]);
    });
  }, []);

  useEffect(() => {
    if (fromCurrency !== null && toCurrency !== null) {
      axios
        .get(`${baseURL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(({ data }) => {
          return setExchangeRate(data.rates[toCurrency]);
        });
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(event) {
    setAmount(event.target.value);
    setAmountInFromCurrency(true);
  }
  function handleToAmountChange(event) {
    setAmount(event.target.value);
    setAmountInFromCurrency(false);
  }

  function handlesNewLog(event) {
    let oldTimeStamp = new Date();

    let year = oldTimeStamp.getFullYear();
    let month = oldTimeStamp.getMonth();
    let day = oldTimeStamp.getDate();
    let hours = oldTimeStamp.getHours();
    let minutes = oldTimeStamp.getMinutes();

    let newTimeStamp = `${day}/${month}/${year} at ${hours}:${minutes}`;

    console.log(newTimeStamp);

    event.preventDefault();
    firebase.firestore().collection("currency").add({
      fromAmount,
      toAmount,
      fromCurrency,
      toCurrency,
      created: newTimeStamp,
    });
  }

  const [todos, setTodos] = useState([]);
  function useLogs() {
    useEffect(() => {
      const unsubscribe = firebase
        .firestore()
        .collection("currency")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          const newLogs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTodos(newLogs);
        });
      return () => unsubscribe();
    }, []);
    return todos;
  }
  const newTodos = useLogs();

  return (
    <div>
      <h1>Currency Converter</h1>
      <FontAwesomeIcon
        className="icon"
        icon={faDollarSign}
        size="3x"
      ></FontAwesomeIcon>
      <CurrencyConvertor
        currencyOptions={currencyOptions}
        selectedCurrencyFrom={fromCurrency}
        onChangeCurrencyFrom={(event) => setFromCurrency(event.target.value)}
        amountFrom={fromAmount}
        onChangeAmountFrom={handleFromAmountChange}
        logSubmission={handlesNewLog}
        todos={newTodos}
        setTodos={setTodos}
        onChangeAmountTo={handleToAmountChange}
        amountTo={toAmount}
        onChangeCurrencyTo={(event) => setToCurrency(event.target.value)}
        selectedCurrencyTo={toCurrency}
      />
    </div>
  );
}

export default App;
