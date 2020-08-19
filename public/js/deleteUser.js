/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const deleteUser = async id => {
  console.log(id);
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:3000/api/v1/users/${id}`
    });
    if (res.status === 204) {
      showAlert('success', 'USER DELETED succesfully!');
      window.setTimeout(() => {
        location.reload();
      }, 1000);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
