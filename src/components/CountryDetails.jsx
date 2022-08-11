import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CountryDetails() {
  const { country } = useParams();
  const [countryDetails, setCountryDetails] = useState();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getCountryDetails();
  }, [country]);

  const getCountryDetails = async () => {
    const allCountries = await fetch(
      'https://ih-countries-api.herokuapp.com/countries/${country}'
    );
    const allCountriesJSON = await allCountries.json();
    setCountryDetails(allCountriesJSON.results);
    setIsFetching(false);
  };
  if (isFetching) {
    return <h2>...LOADING</h2>;
  }

  return (
    <div class="col-7">
      <h1>{countryDetails.name.official}</h1>
      <table class="table">
        <thead></thead>
        <tbody>
          <tr>
            <td style={{ width: '30%' }}>Capital</td>
            <td>Paris</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>
              551695 km
              <sup>2</sup>
            </td>
          </tr>
          <tr>
            <td>Borders</td>
            <td>
              <ul>
                <li></li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CountryDetails;
