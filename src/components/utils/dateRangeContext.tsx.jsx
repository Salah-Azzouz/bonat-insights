import React, { createContext, useContext, useState } from 'react';

const DateRangeContext = createContext(undefined);

export const DateRangeProvider = ({ children }) => {
  const [dateRange, setDateRange] = useState('last_30_days');

  return (
    <DateRangeContext.Provider value={{ dateRange, setDateRange }}>
      {children}
    </DateRangeContext.Provider>
  );
};

export const useDateRange = () => {
  const context = useContext(DateRangeContext);
  if (!context) {
    throw new Error('useDateRange must be used within DateRangeProvider');
  }
  return context;
};