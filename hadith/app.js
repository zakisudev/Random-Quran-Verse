import { hadithUrl, abd, mlk, msl, trmz, nse, ibnmjh } from './vars.js';

const books = document.getElementById('hadith_books');
const hadithPack = document.querySelector('hadith_verses');

const dropdownMenu = document.getElementById('hadith_kind');

function fetchHadith() {
  fetch(hadithUrl)
    .then((res) => res.json())
    .then((data) => {
      dropdownMenu.addEventListener('change', function () {
        const selectedOption = dropdownMenu.value;
        switch (selectedOption) {
          case 'abudawud':
            fetch(abd)
              .then((res) => res.json())
              .then((data) => {
                const entries = Object.entries(data.metadata.sections);
                entries.forEach(([key, value]) => {
                  if (value) {
                    return (books.innerHTML += `<option value=${key}>${value}</option>`);
                  }
                });
                if (books) {
                  let chld = `<li>${data.hadiths[0].text}</li>`;
                  hadithPack.appendChild(chld);
                }
              })
              .catch((e) => console.log(e));

            break;
          case 'bukhari':
            collEl.innerHTML = hadithBukhari.map((e, index) => {
              return `<option value=${index + 1}>${index + 1}</option>`;
            });

            break;
          case 'ibnmajah':
            collEl.innerHTML = hadithIbnmajah.map((e, index) => {
              return `<option value=${index + 1}>${index + 1}</option>`;
            });

            break;
          case 'malik':
            collEl.innerHTML = hadithMalik.map((e, index) => {
              return `<option value=${index + 1}>${index + 1}</option>`;
            });
            break;
          case 'muslim':
            collEl.innerHTML = hadithMuslim.map((e, index) => {
              return `<option value=${index + 1}>${index + 1}</option>`;
            });
            break;
          case 'nasai':
            collEl.innerHTML = hadithNasai.map((e, index) => {
              return `<option value=${index + 1}>${index + 1}</option>`;
            });
            break;
          case 'tirmidhi':
            collEl.innerHTML = hadithTirmidhi.map((e, index) => {
              return `<option value=${index + 1}>${index + 1}</option>`;
            });
            break;

          default:
            break;
        }
      });
    });
}

fetchHadith();
