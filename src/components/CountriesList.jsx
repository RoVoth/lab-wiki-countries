import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function CountriesList() {
  const [countries, setCountries] = useState();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getAllCountries();
  }, []);

  const getAllCountries = async () => {
    const allCountries = await fetch(
      'https://ih-countries-api.herokuapp.com/countries'
    );
    const allCountriesJSON = await allCountries.json();
    setCountries(allCountriesJSON.results);
    setIsFetching(false);
  };

  if (isFetching) {
    return <h2>...LOADING</h2>;
  }

  return (
    <div class="col-5" style={{ maxheight: '90vh', overflow: 'scroll' }}>
      <div>
        {countries.map((eachCountry) => {
          return (
            <li>
              <Link to={`/${eachCountry.alpha3Code}`}>
                {eachCountry.name.official}
              </Link>
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default CountriesList;
