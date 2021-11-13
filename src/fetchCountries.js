
  
import Notiflix from 'notiflix';
const MAIN_URL_SEARCH = 'https://restcountries.com/v3.1/name/';
const Params = new URLSearchParams({ fields: 'name,capital,flags,population,languages' });

export function fetchCountries(name) {
    return fetch(`${MAIN_URL_SEARCH}${name}?${Params}`)
    .then(response => {
      if (!response.ok) {
          Notiflix.Notify.failure('Oops, there is no country with that name');
      }
      return response.json();
    })
}