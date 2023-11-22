import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_9NUgVYWpdpfaaw2AzOmcoNFnC3GMRs0Wi1mBjcPcwPAXuczeMoS1VMrV2oQZnY4E';

const BASE_URL = 'https://api.thecatapi.com/v1';
const END_POINT = 'breeds';

export async function fetchBreeds() {
  const response = await axios.get(`${BASE_URL}/${END_POINT}`);
  // console.log(response.data);
  if (response.status !== 200) {
    throw new Error(response.status);
  }
  return response.data;
}

export async function fetchCatByBreed(breedId) {
  const response = await axios.get(
    `${BASE_URL}/images/search?breed_ids=${breedId}`
  );
  //   console.log(response.data[0]);
  if (response.status !== 200) {
    throw new Error(response.status);
  }
  return response.data[0];
}
