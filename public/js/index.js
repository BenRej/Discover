/* eslint-disable */
import '@babel/polyfill';
import axios from 'axios';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { signup } from './signup';
import { updateSettings } from './updateSettings';
import { updateReview } from './updateReview';
import { bookTour } from './stripe';
import { rating, setRating } from './rating';
import { postReview } from './postReview';
import { postTour } from './postTour';
import { deleteTour } from './deleteTour';
import { deleteUser } from './deleteUser';
import { deleteReview } from './deleteReview';
import { deleteTourReviews } from './deleteTourReviews';
import { deleteTourBookings } from './deleteTourBookings';
import { deleteUserBookings } from './deleteUserBookings';
import { Confirm } from './confirmBoxAlerts';
import { selectedBox } from './selectedBox';
import { rangeSliders } from './rangeSliders';
import { inputAddFiles } from './inputAddFiles';
import { inputAddData } from './inputAddData';
import { inputSelect } from './inputSelect';
import { deleteTag } from './deleteTag';
import { deleteUserReviews } from './deleteUserReviews';
import { fillUserProfil } from './fillUserProfil';
import { fillTourForm } from './fillTourForm';
import { updateUser } from './updateUser';
import { updateTour } from './updateTour';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userReviewForm = document.querySelector('.form__edit-review');
const editUser = document.querySelector('.edit-user');
const adminUpdateTour = document.querySelector('.edit-tour');
const userPasswordForm = document.querySelector('.form-user-password');
const createTour = document.querySelector('.create-tour');
const adminDeleteTour = document.querySelectorAll('.delete-tour');
const adminDeleteUser = document.querySelectorAll('.delete-user');
const bookBtn = document.getElementById('book-tour');
const editRating = document.querySelector('.ratings');
const userPostReviewForm = document.querySelector('.form__create-review');
const userDeleteReview = document.querySelectorAll('.delete-review');
const destinationOption = document.querySelector('.filter');
const dateOption = document.querySelector('.datepicker');
// const priceOption = document.querySelector('p');
// const rangeSlider = document.getElementById('sliders');
const test = document.querySelector('.test');
// const search = document.querySelector('.filter__search ');
const btnSearchTour = document.getElementById('btn__search--tour');

const selectedDestination = document.getElementById('selected--destination');
const selectedDates = document.querySelector('.datepicker');
const selectedDifficulty = document.getElementById('selected--difficulty');

const today = new Date();
//padstart: complete string ex '5' -> padstart(2,0) -> '05'
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(
    document.getElementById('map').dataset.locations
  );
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    // VALUES
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    // VALUES
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(name, email, password, passwordConfirm);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm) {
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    // console.log(form);

    updateSettings(form, 'data');
  });
}

if (userReviewForm) {
  userReviewForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = {};
    data.review = document.getElementById('review').value;
    data.rating = parseInt(document.querySelector('.ratings').dataset.rating);
    const id = document.querySelector('.ratings').dataset.id;
    console.log(id);
    updateReview(data, id);
  });
}

if (userPostReviewForm) {
  userPostReviewForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = {};
    data.review = document.getElementById('review').value;
    data.rating = parseInt(document.querySelector('.ratings').dataset.rating);
    const id = document.querySelector('.form__create-review').dataset.id;

    postReview(data, id);
  });
}
if (userDeleteReview) {
  console.log(userDeleteReview);
  userDeleteReview.forEach(element => {
    element.addEventListener('click', e => {
      e.preventDefault();
      const { id, tourname } = e.currentTarget.dataset;
      Confirm.open({
        title: 'Delete Review',
        message: `Are you sure you want to delete your review on ${tourname} tour?`,
        onok: () => {
          deleteReview(id, tourname);
        }
      });
      // console.log(id);
      // deleteReview(id);
    });
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    document.querySelector('.btn--save-password').textContent = 'Save password';
    // document.querySelector('.btn--save-password').classList.remove('.btn--save-password')
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (bookBtn)
  bookBtn.addEventListener('click', e => {
    // data-tour-id -> tourId
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });

if (destinationOption) {
  // console.log('hello');
  selectedBox();
}

if (dateOption) {
  // $('.datepicker').datepicker({
  //   showButtonPanel: true,
  //   changeMonth: true,
  //   changeYear: true,
  //   autoSize: true
  // });
  $('.datepicker').datepicker({
    // showButtonPanel: true,
    changeMonth: true,
    changeYear: true,
    minDate: 0
    // autoSize: true
  });
  $('.datepicker').click(function() {
    var popup = $(this).offset();
    var popupTop = popup.top + 45;
    $('.ui-datepicker').css({
      top: popupTop
    });
  });
  // document.querySelector('div.ui-datepicker').style.top = 263 + 'px';
}

if (test) {
  rangeSliders();
}

if (btnSearchTour) {
  btnSearchTour.onclick = () => {
    let destination;
    let startDate;
    let difficulty;
    if (selectedDestination.textContent === 'Select Your Destination') {
      destination = 'all';
    } else {
      destination = selectedDestination.textContent;
    }

    if (selectedDates.value === '') {
      startDate = new Date(`${mm}/${dd}/${yyyy}`).toISOString();
    } else {
      startDate = new Date(selectedDates.value).toISOString();
    }
    console.log(startDate);
    if (selectedDifficulty.textContent === 'Select Difficulty') {
      difficulty = 'all';
    } else {
      difficulty = selectedDifficulty.textContent;
    }
    const priceMin = document.getElementById('input-left').value;
    const priceMax = document.getElementById('input-right').value;

    btnSearchTour.setAttribute(
      'href',
      `/tours/${destination}/${startDate}/${difficulty}/${priceMin}-${priceMax}`
    );
  };
}
if (createTour) {
  // document.getElementById('start-date').value =
  deleteTag();
  inputAddFiles();
  inputAddData();
  inputSelect();
  $('.datepicker--form').datepicker({
    // showButtonPanel: true,
    changeMonth: true,
    changeYear: true,
    autoSize: true,
    minDate: 0
  });
  $('.datepicker').click(function() {
    var popup = $(this).offset();
    var popupTop = popup.top + 45;
    $('.ui-datepicker').css({
      top: popupTop
    });
  });
  document.getElementById('start-date').value = `${mm}/${dd}/${yyyy}`;

  const submitBtn = document.querySelector('.btn--submit');
  submitBtn.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const duration = document.getElementById('duration').value;
    const maxGroupSize = document.getElementById('max-group-size').value;
    const difficulty = document.getElementById('difficulty').value;
    const price = document.getElementById('price').value;
    const summary = document.getElementById('summary').value;
    const description = document.getElementById('description').value;
    const imageCover = document
      .querySelector('.tags--image-cover')
      .querySelector('.tag--description').textContent;
    const images = Array.prototype.map.call(
      document
        .querySelector('.tags--image')
        .querySelectorAll('.tag--description'),
      e => {
        return e.textContent;
      }
    );

    // in futur remember to change this to get all starting dates ( with tag system etc )
    let startDates = [];
    if (document.getElementById('start-date').value === '') {
      startDates.push(new Date(`${mm}/${dd}/${yyyy}`).toISOString());
    } else {
      startDates.push(
        new Date(document.getElementById('start-date').value).toISOString()
      );
    }
    const startLocation = {};
    startLocation.coordinates = [
      document.getElementById('start-location-longitude').value,
      document.getElementById('start-location-latitude').value
    ];
    startLocation.address = document.getElementById(
      'start-location-address'
    ).value;

    startLocation.description = `${
      document.getElementById('start-location-town').value
    }, ${document.getElementById('start-location-country').value}`;
    const locations = [];
    const locationList = document
      .querySelector('.tags--location')
      .querySelectorAll('.tag--description');
    locationList.forEach(el => {
      let location = {};
      console.log('el dataset', el.dataset);
      const { longitude, latitude, address, description, day } = el.dataset;

      location.coordinates = [longitude, latitude];
      location.address = address;
      location.description = description;
      location.day = day;
      console.log(location);
      // location.coordinates = [el.dataset.longitude, el.dataset.latitude];
      // location.address = el.dataset.address;
      // location.description = el.dataset.description;
      // console.log(el.dataset.description);
      // location.day = el.dataset.day;
      locations.push(location);
    });
    console.log(locations);
    const guides = [];
    const guidesList = document
      .querySelector('.tags--guide')
      .querySelectorAll('.tag--description');
    // console.log('guidelist', guidesList);
    guidesList.forEach(el => {
      guides.push(el.dataset.id);
    });

    const data = {
      name,
      duration,
      maxGroupSize,
      difficulty,
      price,
      summary,
      description,
      imageCover,
      images,
      startDates,
      startLocation,
      locations,
      guides
    };
    console.log(data);
    postTour(data);
  });
}

if (adminDeleteTour) {
  adminDeleteTour.forEach(element => {
    element.addEventListener('click', e => {
      e.preventDefault();
      const { id, tourname } = e.currentTarget.dataset;
      console.log(tourname);
      Confirm.open({
        title: 'Delete Tour',
        message: `Are you sure you want to delete ${tourname} ?`,
        onok: () => {
          const deletingTour = async function() {
            await deleteTourReviews(id);
            await deleteTourBookings(id);

            await deleteTour(id);
          };
          deletingTour();
        }
      });
    });
  });
}
if (adminUpdateTour) {
  $('.datepicker--form').datepicker({
    // showButtonPanel: true,
    changeMonth: true,
    changeYear: true,
    autoSize: true,
    minDate: 0
  });
  $('.datepicker').click(function() {
    var popup = $(this).offset();
    var popupTop = popup.top + 45;
    $('.ui-datepicker').css({
      top: popupTop
    });
  });

  const id = document.querySelector('.edit-tour').dataset.id;
  const updateTourForm = async function() {
    await fillTourForm(id);
    deleteTag();
    inputAddFiles();
    inputAddData();
    inputSelect();
    adminUpdateTour.addEventListener('click', () => {
      const data = {};
      data.name = document.getElementById('name').value;
      data.duration = document.getElementById('duration').value;
      data.maxGroupSize = document.getElementById('max-group-size').value;
      data.difficulty = document.getElementById('difficulty').value;
      data.price = document.getElementById('price').value;
      data.summary = document.getElementById('summary').value;
      data.description = document.getElementById('description').value;
      images;
      data.imageCover = document
        .querySelector('.tags--image-cover')
        .querySelector('.tag--description').textContent;
      console.log(data.imageCover);
      data.images = [];
      // console.log(images);
      const images = document
        .querySelector('.tags--image')
        .querySelectorAll('.tag--description');
      for (let image of images) {
        // console.log('image', image);
        data.images.push(image.textContent);
      }
      const startDate = new Date(
        document.getElementById('start-date').value
      ).toISOString();
      data.startDates = [startDate];
      data.startLocation = {};

      data.startLocation.coordinates = [
        document.getElementById('start-location-longitude').value,
        document.getElementById('start-location-latitude').value
      ];
      data.startLocation.address = document.getElementById(
        'start-location-address'
      ).value;
      const startLocationTown = document.getElementById('start-location-town')
        .value;
      const startLocationCountry = document.getElementById(
        'start-location-country'
      ).value;
      data.startLocation.description = `${startLocationTown}, ${startLocationCountry}`;
      data.locations = [];
      const locations = document
        .querySelector('.tags--location')
        .querySelectorAll('.tag--description');
      for (let location of locations) {
        // console.log('hey');
        let loc = {};
        const { longitude, latitude, description, day } = location.dataset;
        loc.coordinates = [longitude, latitude];
        loc.description = description;
        loc.day = day;
        console.log(longitude, latitude, description, day);

        // console.log('hello', loc);
        data.locations.push(loc);
      }
      //Guides
      data.guides = [];
      const guides = document
        .querySelector('.tags--guide')
        .querySelectorAll('.tag--description');
      for (let guide of guides) {
        // console.log(guide);
        data.guides.push(guide.dataset.id);
      }
      console.log(data);

      updateTour(id, data);
    });
  };
  updateTourForm();
}
if (adminDeleteUser) {
  // console.log(userDeleteReview);
  adminDeleteUser.forEach(element => {
    element.addEventListener('click', e => {
      e.preventDefault();
      const { id, name } = e.currentTarget.dataset;
      Confirm.open({
        title: 'Delete User',
        message: `Are you sure you want to delete ${name} profil?`,
        onok: () => {
          const deletingUser = async function() {
            console.log(name);
            await deleteUserReviews(id, name);
            await deleteUserBookings(id, name);
            await deleteUser(id, name);
          };
          deletingUser();
        }
      });
      // console.log(id);
      // deleteReview(id);
    });
  });
}
if (editUser) {
  const userId = document.querySelector('.edit-user').dataset.id;
  const updateUserProfil = async function() {
    await fillUserProfil(userId);

    editUser.addEventListener('click', () => {
      const data = {};
      data.name = document.getElementById('name').value;
      data.email = document.getElementById('email').value;
      data.role = document.getElementById('user-role').value;
      data.photo = document.getElementById('photo').files[0];
      console.log(data);
      updateUser(data, userId);
    });
  };
  updateUserProfil();
}

if (editRating) {
  rating();
}

// if (priceOption) {
//   const price = document.querySelector('.filter__price');
//   // console.log(price.dataset.max);
//   $(function() {
//     // console.log($('#slider-range'));
//     $('#slider-range').slider({
//       range: true,
//       min: 0,
//       max: price.dataset.max,
//       values: [0, price.dataset.max],
//       slide: function(event, ui) {
//         $('#amount').val('$' + ui.values[0] + ' - $' + ui.values[1]);
//       }
//     });
//     $('#amount').val(
//       '$' +
//         $('#slider-range').slider('values', 0) +
//         ' - $' +
//         $('#slider-range').slider('values', 1)
//     );
//   });
// }

// if (rangeSlider) {
//   console.log('next');
//   const slider = new RangeSlider({
//     id: 'sliders',
//     range: { min: 100, max: 250 },
//     handles: [120, 220],
//     width: 300,
//     displayValues: true
//   });
//   console.log(slider);
// }
