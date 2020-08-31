import React, { useState } from "react";
// import firebase from "../firebase";

const CurrencyCoverter = ({
  currencyOptions,
  selectedCurrencyFrom,
  selectedCurrencyTo,
  onChangeCurrencyFrom,
  onChangeCurrencyTo,
  amountFrom,
  amountTo,
  onChangeAmountFrom,
  onChangeAmountTo,
  logSubmission,
  todos,
}) => {
  const [showList, setShowList] = useState(false);
  const [sortedField, setSortedField] = useState("asc");

  const findTodosId = () => {
    todos.map((todo) => {
      let id = todo.id;
      return id;
    });
  };

  const sorted =
    todos &&
    todos.sort((a, b) => {
      const isReversed = sortedField === "asc" ? 1 : -1;
      return isReversed * a.created.localeCompare(b.created);
    });

  const onSort = (sortedField) => {
    setSortedField(sortedField);
  };

  // const onDelete = () => {
  //   const db = firebase.firestore();
  //   db.collection("currency").doc("id").delete();
  // };

  return (
    <div>
      <form onSubmit={logSubmission}>
        <input
          className="input"
          type="number"
          value={amountFrom}
          onChange={onChangeAmountFrom}
        />
        <select value={selectedCurrencyFrom} onChange={onChangeCurrencyFrom}>
          {currencyOptions.map((option) => {
            return (
              <option className="option" key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
        <p className="comparison">=</p>
        <input
          className="input"
          type="number"
          value={amountTo}
          onChange={onChangeAmountTo}
        />
        <select value={selectedCurrencyTo} onChange={onChangeCurrencyTo}>
          {currencyOptions.map((option) => {
            return (
              <option className="option" key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
        <br></br>
        <button onClick={logSubmission}>Log rate</button>
      </form>
      <br></br>
      <button onClick={() => onSort("desc")}>Newest logs</button>
      <button onClick={() => onSort("asc")}>oldest logs</button>
      <button onClick={() => setShowList(!showList)}>Show previous logs</button>
      {showList &&
        todos &&
        sorted.map((todo) => {
          return (
            <ul className="list" key={todo.id}>
              <li>
                For every {parseFloat(todo.fromAmount).toFixed(3)},{" "}
                {todo.fromCurrency} you will receive{" "}
                {parseFloat(todo.toAmount).toFixed(3)} in {todo.toCurrency}
              </li>
              <li>Logged at: {todo.created} </li>
              {/* <button onClick={onDelete}>Delete log</button> */}
            </ul>
          );
        })}
    </div>
  );
};

export default CurrencyCoverter;
