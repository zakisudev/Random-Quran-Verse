import { hadithUrl, abd, bkr, ibnmjh, mlk, msl, trmz, nse } from './vars.js';

const books = document.getElementById('hadith_books');
const hadithPack = document.querySelector('.hadith_verses');
const disButton = document.querySelector('.display');
const dropdownMenu = document.getElementById('hadith_kind');

function fetchHadithBooks(kind) {
  let apiUrl = '';

  // Determine the appropriate API URL based on the selected kind.
  switch (kind) {
    case 'abudawud':
      apiUrl = abd;
      break;
    case 'bukhari':
      apiUrl = bkr;
      break;
    case 'ibnmajah':
      apiUrl = ibnmjh;
      break;
    case 'malik':
      apiUrl = mlk;
      break;
    case 'muslim':
      apiUrl = msl;
      break;
    case 'nasai':
      apiUrl = nse;
      break;
    case 'tirmidhi':
      apiUrl = trmz;
      break;
    // Handle other cases similarly.
    default:
      break;
  }

  // Fetch data for the selected kind.
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      // Clear existing options in the books select.
      books.innerHTML = '';

      // Add new options to the books select based on the fetched data.
      const entries = Object.entries(data.metadata.sections);
      entries.forEach(([key, value]) => {
        if (value) {
          const option = document.createElement('option');
          option.value = key;
          option.textContent = value;
          books.appendChild(option);
        }
      });
      function displayHadith() {
        const ab = data.hadiths.slice(0, 1000);
        const had = ab.map((e) => {
          return `<li>${e.text}</li>`;
        });
        const listHad = had.join('');
        console.log('here');
        hadithPack.innerHTML += listHad;
      }
      disButton.addEventListener('click', displayHadith);
    })
    .catch((e) => console.log(e));
}
// Add an event listener for the 'change' event on the dropdownMenu.
dropdownMenu.addEventListener('change', function () {
  const selectedKind = dropdownMenu.value;
  fetchHadithBooks(selectedKind);
});

// Initialize the books options based on the initial selected value of dropdownMenu.
const initialSelectedKind = dropdownMenu.value;
fetchHadithBooks(initialSelectedKind);
