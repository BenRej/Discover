/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const updateUser = async (data, id) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/v1/users/${id}`,
      data
    });

    if (res.data.status === 'succes') {
      showAlert('success', `${data.name} Profil UPDATED succesfully!`);
      window.setTimeout(() => {
        location.reload();
      }, 1000);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
