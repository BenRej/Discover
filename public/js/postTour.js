/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const postTour = async data => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:3000/api/v1/tours`,
      data
    });

    if (res.data.status === 'succes') {
      showAlert('success', 'Tour CREATED succesfully!');
      window.setTimeout(() => {
        location.assign('/manage-tours');
      }, 1000);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
