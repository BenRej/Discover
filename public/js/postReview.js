/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const postReview = async (data, id) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:3000/api/v1/tours/${id}/reviews`,
      data
    });

    if (res.data.status === 'succes') {
      showAlert('success', 'REVIEW CREATED succesfully!');
      window.setTimeout(() => {
        location.assign('/my-reviews');
      }, 1000);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
