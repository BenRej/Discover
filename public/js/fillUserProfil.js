/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const fillUserProfil = async id => {
  console.log(id);
  try {
    const res = await axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/v1/users/${id}`
    });

    const user = await res.data.data.data;
    // console.log(user.active);

    const userRoleOptions = document
      .querySelector('.user-role')
      .querySelectorAll('option');
    userRoleOptions.forEach(el => {
      if (el.value === user.role) el.setAttribute('selected', 'selected');
    });
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;

    // const userStatusOptions = document
    //   .querySelector('.user-status')
    //   .querySelectorAll('option');
    // userStatusOptions.forEach(el => {
    //   if (el.value === user.active) el.setAttribute('selected', 'selected');
    // });

    // console.log(userStatusOptions);
    // console.log(user);
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
