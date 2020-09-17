import { Post, instance } from './axios';
import { Modal } from 'antd';

export const loginApi = (userDetails) => {

  const { email, password } = userDetails;

  return Post('/auth', { email, password })
    .then(res => {
      let { username, firstname, isAdmin, _id } = res.data;
      localStorage.setItem('token', res.headers['x-auth-token']);
      localStorage.setItem(
        'userdata',
        JSON.stringify({ username, firstname, isAdmin, _id }),
      );
      instance.defaults.headers['x-auth-token'] = res.headers['x-auth-token'];
      return res.data;
    })
    .catch(error => {
      Modal.error({
        title: 'This is a warning message',
        content: error,
      });
      return error;
    });
}