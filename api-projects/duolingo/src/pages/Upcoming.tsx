import { useEffect, useState } from 'react';

import '../styles/Upcoming.css';
import { getAllCountries } from '../utils/countriesAPI';
import { useSidebar } from '../hooks/useSidebar.hook';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import CountryCard from '../components/upcoming/CountryCard';

const Upcoming = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<any[]>([]);
  const [filter, setFilter] = useState('');
  const { sidebarActive } = useSidebar();

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getAllCountries();
      setCountries(data.data);
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    setFilteredCountries(countries);
  }, [countries]);

  useEffect(() => {
    if (filter) {
      let newCountries = [];

      if (filter === 'A-G') {
        newCountries = countries.filter(
          (country) =>
            country.name[0].toLowerCase() >= 'a' &&
            country.name[0].toLowerCase() <= 'g'
        );
      }

      if (filter === 'H-P') {
        newCountries = countries.filter(
          (country) =>
            country.name[0].toLowerCase() >= 'h' &&
            country.name[0].toLowerCase() <= 'p'
        );
      }

      if (filter === 'Q-Z') {
        newCountries = countries.filter(
          (country) =>
            country.name[0].toLowerCase() >= 'q' &&
            country.name[0].toLowerCase() <= 'z'
        );
      }

      setFilteredCountries(newCountries);
    }
  }, [filter]);

  return (
    <div className={`section ${sidebarActive && 'active'}`}>
      <Header />
      <Sidebar />
      <section className='courses'>
        <h1 className='heading'>our courses</h1>

        <div className='filters'>
          <p
            className={`${filter === 'A-G' && 'active'}`}
            onClick={() => setFilter('A-G')}
          >
            A-G
          </p>
          <p
            className={`${filter === 'H-P' && 'active'}`}
            onClick={() => setFilter('H-P')}
          >
            H-P
          </p>
          <p
            className={`${filter === 'Q-Z' && 'active'}`}
            onClick={() => setFilter('Q-Z')}
          >
            Q-Z
          </p>
        </div>

        <div className='box-container'>
          {filteredCountries.map((country, index) => (
            <CountryCard key={index} flag={country.flag} name={country.name} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Upcoming;
