import React, { useState } from "react";

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
  sort,
  stateSortBy,
  newSort,
}) => {
  const [showList, setShowList] = useState(false);

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
              <option classname="option" key={option} value={option}>
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
              <option classname="option" key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
        <br></br>
        <button onClick={logSubmission}>Log rate</button>
        <select
          value={newSort}
          onChange={(event) => stateSortBy(event.currentTarget.value)}
        >
          <option classname="option" value={sort["DATE_DESC"]}>
            Date descending
          </option>
        </select>
      </form>
      <br></br>
      <button onClick={() => setShowList(!showList)}>Show previous logs</button>
      {showList &&
        todos &&
        todos.map((todo) => {
          return (
            <ul className="list">
              <li>
                For every {todo.fromAmount}, {todo.fromCurrency} you will
                receive {todo.toAmount} in {todo.toCurrency}
              </li>
              <li>Logged at: {todo.created} </li>
            </ul>
          );
        })}
    </div>
  );
};

export default CurrencyCoverter;
