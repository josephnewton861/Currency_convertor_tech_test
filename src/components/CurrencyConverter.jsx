import React from "react";

const CurrencyCoverter = ({ currencyOptions, selectedCurrency }) => {
  return (
    <div>
      <input type="number" />
      <select value={selectedCurrency}>
        {currencyOptions.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CurrencyCoverter;
