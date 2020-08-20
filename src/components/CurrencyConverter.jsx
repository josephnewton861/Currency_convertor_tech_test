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
      {todos &&
        todos.map((todo) => {
          return (
            <ul>
              <li>
                For every {todo.fromAmount}, {todo.base} you will receive{" "}
                {todo.newAmount} in {todo.changed}
              </li>
              <li>Logged at: {todo.id}</li>
            </ul>
          );
        })}
    </div>
  );
};

export default CurrencyCoverter;
