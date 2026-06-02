import React, { useEffect, useState } from 'react';

const Topbar: React.FC = () => {
  const [currencies, setCurrencies] = useState<string[]>([]);

  const url = 'https://currencyapi-net.p.rapidapi.com/currencies?output=JSON';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'fa3797adbbmsh87a0912c708974bp1ab663jsn4a8b90f8756f',
      'x-rapidapi-host': 'currencyapi-net.p.rapidapi.com',
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();

        let resultCurr = Object.keys(result.currencies).map((key) => {
          return `${key} : ${result.currencies[key]}`;
        });

        console.log(resultCurr);
        setCurrencies(resultCurr);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='main-top'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <div className='custom-select-box'>
              <select
                id='basic'
                className='selectpicker show-tick form-control'
                data-placeholder='AED : United Arab Emirates Dirham'
              >
                {currencies?.slice(30).map((currency) => (
                  <option key={currency}>{currency}</option>
                ))}
              </select>
            </div>
            <div className='right-phone-box'>
              <p>
                Call US :- <a href='#'> +11 900 800 100</a>
              </p>
            </div>
            <div className='our-link'>
              <ul>
                <li>
                  <a href='#'>
                    <i className='fa fa-user s_color'></i> My Account
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <i className='fas fa-location-arrow'></i> Our location
                  </a>
                </li>
                <li>
                  <a href='#'>
                    <i className='fas fa-headset'></i> Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <div className='login-box'>
              <select
                id='basic'
                className='selectpicker show-tick form-control'
                data-placeholder='Sign In'
              >
                <option>Register Here</option>
                <option>Sign In</option>
              </select>
            </div>
            <div className='text-slid-box'>
              <div id='offer-box' className='carouselTicker'>
                <ul className='offer-box'>
                  <li>
                    <i className='fab fa-opencart'></i> Off 50%! Shop Now
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
