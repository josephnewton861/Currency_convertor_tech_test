import React from "react";

const CurrencyCoverter = ({ currencyOptions }) => {
  return (
    <div>
      <input type="number" />
      <select>
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
