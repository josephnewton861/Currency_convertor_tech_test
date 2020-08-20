import React from "react";

const CurrencyCoverter = ({
  currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  amount,
  onChangeAmount,
  logSubmission,
  todos,
}) => {
  let oldTimeStamp = new Date();
  let year = oldTimeStamp.getFullYear();
  let month = oldTimeStamp.getMonth();
  let day = oldTimeStamp.getDate();
  let hours = oldTimeStamp.getHours();
  let minutes = oldTimeStamp.getMinutes();
  let seconds = oldTimeStamp.getSeconds();

  let newTimeStamp = `${day}/${month}/${year} at ${hours}:${minutes}:${seconds}`;
  return (
    <div>
      <input type="number" value={amount} onChange={onChangeAmount} />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      <button onClick={logSubmission}>Log currency</button>
      {/* <button>Log currency</button> */}
      {todos &&
        todos.map((todo) => {
          return (
            <ul>
              <li>
                For every {todo.fromAmount}, {todo.original_currency} you will
                receive {todo.newAmount} in {todo.changed_currency}
              </li>
              <li>Logged at: {newTimeStamp}</li>
            </ul>
          );
        })}
    </div>
  );
};

export default CurrencyCoverter;
