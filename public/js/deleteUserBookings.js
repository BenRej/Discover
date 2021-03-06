/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const deleteUserBookings = async (id, name) => {
  //   console.log(id);
  try {
    const res = await axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/v1/bookings?user=${id}`
    });

    const datas = await res.data.data.data;
    // console.log(datas);
    for (let data of datas) {
      // console.log(data);
      await deleteOne(data._id);
    }

    // if (res.status === 204) {
    //   showAlert('success', `BOOKINGS of ${name} DELETED succesfully!`);
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
      url: `http://127.0.0.1:3000/api/v1/bookings/${id}`
    });
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
