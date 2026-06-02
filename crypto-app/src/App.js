import React, { useState, useEffect } from 'react';

// utils
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components
import Coins from './components/Coins';
import Navbar from './components/Navbar';

// routes
import Coin from './routes/Coin';

function App() {
  const [coins, setCoins] = useState([]);
  const url =
    'http://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false&locale=en';

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          'Access-Control-Allow-Origin': true,
        },
      })
      .then((res) => {
        setCoins(res.data);
        console.log(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Coins coins={coins} />} />
        <Route path='/coin/:coinId' element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
