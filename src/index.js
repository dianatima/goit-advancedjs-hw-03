import SlimSelect from 'slim-select';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const refs = {
  select: document.querySelector('.breed-select'),
  card: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
};

refs.loader.classList.remove('hidden');

const iziToastMessage = {
  title: 'Error',
  message: 'Oops! Something went wrong! Try reloading the page!',
  position: 'center',
};

fetchBreeds()
  .then(res => {
    const data = [...res].map(item => ({ value: item.id, text: item.name }));
    refs.loader.classList.add('hidden');
    const slimSelect = new SlimSelect({
      select: document.querySelector('#selectElement'),
      data: data,
      option: {},
      settings: {
        placeholderText: 'Select Value',
      },
      events: {
        afterChange: handleBreed,
      },
    });
  })
  .catch(err => {
    refs.select.classList.add('hidden');
    refs.loader.classList.add('hidden');
    iziToast.error(iziToastMessage);
  });

function handleBreed(event) {
  refs.card.innerHTML = '';
  refs.loader.classList.remove('hidden');
  const selectedId = event[0].value;
  fetchCatByBreed(selectedId)
    .then(res => rendereMarkup(res))
    .catch(err => {
      refs.loader.classList.add('hidden');
      iziToast.error(iziToastMessage);
    });
}

function rendereMarkup(obj) {
  const { url } = obj;
  const { name, description, temperament } = obj.breeds[0];
  const markup = `
  <img src="${url}" alt="${name}" width="400px" height="300px">
  <div class="card-info">
    <h2>${name}</h2>
    <p>${description}</p>
    <p><b>Temperament: </b>${temperament}</p>
  </div>`;
  refs.loader.classList.add('hidden');
  refs.card.innerHTML = markup;
}
