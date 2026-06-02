import React from 'react';

// components
import CoinItem from './CoinItem';

// utils
import './coins.css';
import { Link } from 'react-router-dom';

export default function Coins(props) {
  return (
    <div className='container'>
      <div>
        <div className='heading'>
          <p>#</p>
          <p className='coin-name'>Coin</p>
          <p>Price</p>
          <p>24h</p>
          <p className='hide-mobile'>Volume</p>
          <p className='hide-mobile'>Market Cap</p>
        </div>

        {props.coins.map((coin) => {
          return (
            <Link to={`coin/${coin.id}`} key={coin.id}>
              <CoinItem coin={coin} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
