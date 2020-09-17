import Axios from 'axios';

const localURL = 'http://127.0.0.1:5000/api';

export const instance = Axios.create({
  baseURL: localURL,
  headers: { 'x-auth-token': localStorage.getItem('token') || null }
});

export const Get = (url, ...rest) => {
  return new Promise((resolve, reject) => {
    instance
      .get(url)
      .then(response => resolve(response))
      .catch(err => {
        if (err.response) reject(err.response.data)
        reject(err.message)
      });
  });
};

export const Post = (url, body, ...rest) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, body)
      .then(res => resolve(res))
      .catch(err => {
        if (err.response) reject(err.response.data)
        reject(err.message)
      });
  });
};
export const Put = (url, body, ...rest) => {
  return new Promise((resolve, reject) => {
    instance
      .put(url, body)
      .then(res => resolve(res))
      .catch(err => {
        if (err.response) reject(err.response.data)
        reject(err.message)
      });
  });
};
export const Delete = (url, ...rest) => {
  return new Promise((resolve, reject) => {
    instance
      .delete(url)
      .then(res => resolve(res))
      .catch(err => {
        if (err.response) reject(err.response.data)
        reject(err.message)
      });
  });
};
