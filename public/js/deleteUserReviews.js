/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const deleteUserReviews = async (id, name) => {
  console.log(id);
  try {
    const res = await axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/v1/reviews?user=${id}`
    });

    const datas = await res.data.data.data;
    for (let data of datas) {
      await deleteOne(data.id);
      console.log('deleted');
    }

    // if (res.status === 204) {
    //   showAlert('success', `REVIEWS of ${name} DELETED succesfully!`);
    //   window.setTimeout(() => {
    //     location.reload();
    //   }, 1000);
    // }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};

const deleteOne = async id => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:3000/api/v1/reviews/${id}`
    });
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
