import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CountryDetails() {
  //1. param
  const { country } = useParams();
  //2. estado
  const [countryDetails, setCountryDetails] = useState();
  const [isFetching, setIsFetching] = useState(true);
  //3.useEffect
  useEffect(() => {
    getCountryDetails();
  }, [country]);

  //4. axios
  const getCountryDetails = async () => {
    const response = await axios(
      `https://ih-countries-api.herokuapp.com/countries/${country}`
    );
    setCountryDetails(response.data);
    setIsFetching(false);
  };

  // 5.clausula para rescribir info
  if (isFetching === true) {
    return <h2>...LOADING</h2>;
  }

  //6.renderizar
  return (
    <div class="col-7">
      <h1>{countryDetails.name.common}</h1>
      <table class="table">
        <thead></thead>
        <tbody>
          <tr>
            <td style={{ width: '30%' }}>Capital</td>
            <td>{countryDetails.capital}</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>
              {countryDetails.altSpellings.area}
              <sup>2</sup>
            </td>
          </tr>
          <tr>
            <td>Borders</td>
            <td>
              <ul>
                {countryDetails.borders.map((eachBorder) => {
                  return (
                    <li>
                      <Link to={`/${eachBorder}`}>{eachBorder}</Link>
                    </li>
                  );
                })}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CountryDetails;
