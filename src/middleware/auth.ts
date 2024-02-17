import axios from 'axios';

const token = 'ваш_токен';
const url = 'ваш_url';

axios.get(url, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json', // Інші необхідні заголовки
  },
})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
