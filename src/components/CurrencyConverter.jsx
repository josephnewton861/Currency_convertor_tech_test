import React from "react";

const CurrencyCoverter = ({
  currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  amount,
  onChangeAmount,
  logSubmission,
  todos,
  sort,
  stateSortBy,
  newSort,
}) => {
  //   console.log(sort["DATE_ASC"]);
  console.log(newSort);

  return (
    <div>
      <form onSubmit={logSubmission}>
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
        <select
          value={newSort}
          onChange={(event) => stateSortBy(event.currentTarget.value)}
        >
          <option value={sort["DATE_DESC"]}>Date descending</option>
          <option value={sort["DATE_ASC"]}>Date Ascending</option>
        </select>
      </form>
      {todos &&
        todos.map((todo) => {
          console.log(todo);
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
