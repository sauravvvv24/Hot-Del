import React, { createContext, useState, useEffect } from 'react';

export const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const [hotelUser, setHotelUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('hotelUser');
    if (storedUser) {
      setHotelUser(JSON.parse(storedUser));
    }
  }, []);

  const loginHotel = (userData) => {
    setHotelUser(userData);
    localStorage.setItem('hotelUser', JSON.stringify(userData));
  };

  const logoutHotel = () => {
    setHotelUser(null);
    localStorage.removeItem('hotelUser');
  };

  return (
    <HotelContext.Provider value={{ hotelUser, loginHotel, logoutHotel }}>
      {children}
    </HotelContext.Provider>
  );
};
