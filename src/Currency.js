import React from 'react';

const Currency = ({currencyOptions,selectedCurrency,
  onChangeCurrency,amount,onChangeAmount}) => {
  return (
    <div>
      <input
        type='number' className='input'
        value={amount} onChange={onChangeAmount}
      />
      <select
        className='option' value={selectedCurrency}
        onChange={onChangeCurrency}>
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Currency;
