/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const deleteReview = async (id, name) => {
  console.log(id);
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:3000/api/v1/reviews/${id}`
    });
    if (res.status === 204) {
      showAlert('success', `REVIEWS on ${name} DELETED succesfully!`);
      window.setTimeout(() => {
        location.reload();
      }, 1000);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
