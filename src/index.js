import './css/styles.css';
import SearchCountries from './fetchCountries';
import { debounce } from 'lodash';

const DEBOUNCE_DELAY = 300;
const searchForm = document.querySelector('#search-box')
const countryList = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')
const searchCountries = new SearchCountries();
let name = ""

searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch (e){
    name = e.target.value.trim();
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    if (name !== ""){
        console.log(name)
        searchCountries.fetchCountries(name).then(data => {
            createMarkup(data)
        })
    }
}

// country flag
function AddCountryList(data) {
    const markup = data.map((item) => {
        return `<li class="country-list-item">
        <img
          class="flag-list"
          src="${item.flags.svg}"
          alt="flag"
        />
        <h2 class="list-item-h2">${item.name.official}</h2>
      </li>`
    }).join("");
  countryList.insertAdjacentHTML("beforeend", markup);
}

// information about country
function AddCountryInfo(data){      
    const markup = data.map((item) => {
        return  `<div class="flag-country-wrap">
        <img
          class="flag"
          src="${item.flags.svg}"
          alt="flag"
        />
        <h1>${item.name.official}</h1>
      </div>
      <ul class="country-info-details">
        <li class="country-info-item">
          <h2>Capital:</h2>
          <p class="info-value">${item.capital}</p>
        </li>
        <li class="country-info-item">
          <h2>Population:</h2>
          <p class="info-value">${item.population}</p
          >
        </li>
        <li class="country-info-item">
          <h2>Languages:</h2>
          <p class="info-value">${Object.values(item.languages)}</p>
        </li>
      </ul>`
    }
    ).join("");
    countryInfo.insertAdjacentHTML("beforeend", markup)
}

function createMarkup(data) {
    clearCountryInfo();
    clearCountryList();
    if (data.length >= 2 && data.length < 10) {
        AddCountryList(data);
        return;
    }
    if(data.length === 1) {
        AddCountryInfo(data)
        return
    }
}
function clearCountryList() {
    countryList.innerHTML = '';
}
  function clearCountryInfo() {
    countryInfo.innerHTML = '';
}

