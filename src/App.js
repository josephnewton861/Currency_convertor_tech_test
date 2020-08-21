import React, { useEffect, useState } from "react";
import CurrencyConvertor from "./components/CurrencyConverter";
import firebase from "./firebase";
import "./App.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

const baseURL = "https://api.exchangeratesapi.io/latest";

const sort_options = {
  DATE_ASC: { column: "created", direction: "asc" },
  DATE_DESC: { column: "created", direction: "desc" },
};

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [sortBy, setSortBy] = useState("DATE_ASC");

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
    event.preventDefault();
    firebase.firestore().collection("currency").add({
      fromAmount,
      toAmount,
      fromCurrency,
      toCurrency,
      created: newTimeStamp,
    });
  }

  function useLogs(sortBy = "DATE_DESC") {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
      const unsubscribe = firebase
        .firestore()
        .collection("currency")
        .orderBy(sort_options[sortBy].column, sort_options[sortBy].direction)
        .onSnapshot((snapshot) => {
          const newLogs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTodos(newLogs);
        });
      return () => unsubscribe();
    }, [sortBy]);
    return todos;
  }
  const todos = useLogs(sortBy);

  return (
    <div>
      <h1>Currency converter</h1>
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
        sort={sort_options}
        stateSortBy={setSortBy}
        newSort={sortBy}
        todos={todos}
        onChangeAmountTo={handleToAmountChange}
        amountTo={toAmount}
        onChangeCurrencyTo={(event) => setToCurrency(event.target.value)}
        selectedCurrencyTo={toCurrency}
      />
    </div>
  );
}

export default App;
