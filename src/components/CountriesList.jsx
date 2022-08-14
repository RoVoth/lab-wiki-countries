import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function CountriesList() {
  //1. estado
  const [countries, setCountries] = useState();
  const [isFetching, setIsFetching] = useState(true);

  //2.useeffect
  useEffect(() => {
    getAllCountries();
  }, []);

  //3.axios
  const getAllCountries = async () => {
    const response = await axios(
      'https://ih-countries-api.herokuapp.com/countries'
    );
    console.log(response.data);
    setCountries(response.data);
    setIsFetching(false);
  };
  //4.clausula para rescribir info
  if (isFetching === true) {
    return <h2>...LOADING</h2>;
  }

  //5.renderizar
  return (
    <div class="col-5" style={{ maxheight: '90vh', overflow: 'scroll' }}>
      <div>
        {countries.map((eachCountry) => {
          return (
            <li>
              <Link to={`/${eachCountry.alpha3Code}`}>
                {eachCountry.name.common}
              </Link>
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default CountriesList;
