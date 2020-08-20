import React, { useEffect, useState } from "react";
import CurrencyConvertor from "./components/CurrencyConverter";
import firebase from "./firebase";
import "./App.css";
import axios from "axios";
import { firestore } from "firebase";

// firebase.firestore().collection("currency").add({
//   title: "Rubix cube",
//   time: 45,
// });

const baseURL = "https://api.exchangeratesapi.io/latest";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  // const [todos, setTodos] = useState([]);
  // console.log(exchangeRate);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

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
    // setLoggedCurrency(event.target.value);
  }
  function handleToAmountChange(event) {
    setAmount(event.target.value);
    setAmountInFromCurrency(false);

    // setLoggedCurrency(event.target.value);
  }

  // function handlesNewLog(event) {
  //   let oldTimeStamp = new Date();

  // let year = oldTimeStamp.getFullYear();
  // let month = oldTimeStamp.getMonth();
  // let day = oldTimeStamp.getDate();
  // let hours = oldTimeStamp.getHours();
  // let minutes = oldTimeStamp.getMinutes();
  // let seconds = oldTimeStamp.getSeconds();

  // let newTimeStamp = `${day}/${month}/${year} at ${hours}:${minutes}:${seconds}`;

  //   event.preventDefault();
  //   setTodos([
  //     ...todos,
  //     {
  //       id: newTimeStamp,
  //       fromAmount: fromAmount,
  //       base: fromCurrency,
  //       newAmount: toAmount,
  //       changed: toCurrency,
  //       // timestamp: new Date(),
  //     },
  //   ]);
  //   // event.target.reset();
  // }

  function handlesNewLog(event) {
    event.preventDefault();
    firebase.firestore().collection("currency").add({
      fromAmount,
      toAmount,
      fromCurrency,
      toCurrency,
    });
  }

  function useLogs() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
      firebase
        .firestore()
        .collection("currency")
        .onSnapshot((snapshot) => {
          const newLogs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTodos(newLogs);
        });
    }, []);
    return todos;
  }
  const todos = useLogs();

  return (
    <div>
      <h1>Currency converter</h1>
      <CurrencyConvertor
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(event) => setFromCurrency(event.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
        logSubmission={handlesNewLog}
        // todos={todos}
        todos={todos}
      />
      <p>=</p>
      <CurrencyConvertor
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(event) => setToCurrency(event.target.value)}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
        logSubmission={handlesNewLog}
        todos={todos}
      />
    </div>
  );
}

export default App;
