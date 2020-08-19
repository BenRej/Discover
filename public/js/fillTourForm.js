/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

export const fillTourForm = async id => {
  try {
    const res = await axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/v1/tours/${id}`
    });

    const tour = await res.data.data.data;
    // console.log(tour);

    document.getElementById('name').value = tour.name;
    document.getElementById('duration').value = tour.duration;
    document.getElementById('max-group-size').value = tour.maxGroupSize;
    const difficulties = document
      .querySelector('.difficulty')
      .querySelectorAll('option');
    // console.log(difficulties);

    // for.. of for async
    for (let difficulty of difficulties) {
      if (difficulty.value === tour.difficulty) {
        difficulty.setAttribute('selected', 'selected');
      }
    }
    document.getElementById('price').value = tour.price;
    document.getElementById('summary').value = tour.summary;
    document.getElementById('description').value = tour.description;

    // console.log(imageCover);

    //Add imageCover tag
    const imageCover = tour.imageCover;
    const parentImageCover = document.querySelector('.tags--image-cover');
    const tagImageCover = document.createElement('div');
    tagImageCover.className = 'tag';
    tagImageCover.title = tour.imageCover;
    tagImageCover.innerHTML = `
                    <div class="tag--description">${imageCover}</div>
                    <svg class="icon--close">
                      <use xlink:href="/img/icons.svg#icon-x-circle"></use></svg>`;

    parentImageCover.appendChild(tagImageCover);

    //Add image tag
    const images = tour.images;
    // console.log(images);
    const parentImages = document.querySelector('.tags--image');

    for (let image of images) {
      const tagImages = document.createElement('div');
      tagImages.className = 'tag';
      tagImages.title = image;
      tagImages.innerHTML = `
                    <div class="tag--description">${image}</div>
                    <svg class="icon--close">
                      <use xlink:href="/img/icons.svg#icon-x-circle"></use></svg>`;

      parentImages.appendChild(tagImages);
    }

    // convert isostring date to mm/dd/yyy
    const date = new Date(tour.startDates[0]);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    // Add start location tag
    document.getElementById('start-date').value = `${month}/${dt}/${year}`;
    document.getElementById('start-location-longitude').value =
      tour.startLocation.coordinates[0];
    document.getElementById('start-location-latitude').value =
      tour.startLocation.coordinates[1];
    document.getElementById('start-location-address').value =
      tour.startLocation.address;
    const description = tour.startLocation.description.split(', ');
    document.getElementById('start-location-town').value = description[0];
    document.getElementById('start-location-country').value = description[1];

    //Add location Tag
    const locations = tour.locations;
    const parentLocations = document.querySelector('.tags--location');
    // console.log(locations);

    for (let location of locations) {
      console.log(location);
      const tagLocation = document.createElement('div');
      tagLocation.className = 'tag';
      tagLocation.title = `
        LOCATION OVERVIEW:
        Location Longitude: ${location.coordinates[0]}
        Location Latitude: ${location.coordinates[1]}
        Location Description: ${location.description}
        Location Day: ${location.day}
        `;
      tagLocation.innerHTML = `
                        <div class="tag--description" data-longitude=${location.coordinates[0]} data-latitude=${location.coordinates[1]} data-description=${location.description} data-day=${location.day}> Tour Day ${location.day}</div>
                        <svg class="icon--close">
                          <use xlink:href="/img/icons.svg#icon-x-circle"></use></svg>`;
      parentLocations.appendChild(tagLocation);
    }

    //Add guide Tag
    const guides = tour.guides;
    const guidesParent = document.querySelector('.tags--guide');
    // console.log(guidesParent);

    for (let guide of guides) {
      //   console.log(guide);
      const tagGuide = document.createElement('div');
      tagGuide.className = 'tag';
      tagGuide.title = `
                Tour Guide: ${guide.name}
                Tour GuideId:${guide._id}
                `;
      tagGuide.innerHTML = `
                              <div class="tag--description" data-id=${guide._id}>${guide.name}</div>
                              <svg class="icon--close">
                                <use xlink:href="/img/icons.svg#icon-x-circle"></use></svg>`;
      guidesParent.appendChild(tagGuide);
    }

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
