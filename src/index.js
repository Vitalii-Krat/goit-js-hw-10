import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 500;

const refs = {
  imputSearchCountry: document.querySelector('input#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.imputSearchCountry.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
function onInput() { 
  deleteMarkup();
  fetchCountries(refs.imputSearchCountry.value.trim())
    .then(checkInputLength)

function checkInputLength(search) {
    if (search.length > 10) {
      Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (search.length >= 2 && search.length <= 10) {
      renderCountriesList(search);
    } else if (search.length === 1) {
      renderCountry(search);
    }
  }
}

// Рендер разметки для одной страны
function renderCountry(country) {  
  const markup = country
    .map((coutry) => {
      return `<li>
      <img class = "animation" src="${coutry.flags.svg}" alt="Flag" width = 40>
          <a href="https://en.wikipedia.org/wiki/${coutry.name.official}" target="_blank", rel="noopener noreferrer" class = "description country">${coutry.name.official}</a>
          <p class="capital"><b>Capital</b>: ${coutry.capital}</p>
          <p><b>Population</b>: ${coutry.population}</p>
          <p><b>Languages</b>: ${Object.values(coutry.languages)}</p>
        </li>`;
    })
    .join("");
  refs.countryList.innerHTML = markup; 
}

//Рендер списка для стран
function renderCountriesList(country) {
  const markup = country
    .map((coutry) => {
      return `<li>
       <img src="${coutry.flags.svg}" alt="Flag" width = 40>
        <p class = "description">${coutry.name.official}</p>
        </li>`;
    })
    .join("");
  refs.countryList.innerHTML = markup;
}

//Очистка списков
function deleteMarkup() {
  refs.countryList.innerHTML = '';
}
