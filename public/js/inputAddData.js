/* eslint-disable */

import { deleteTag } from './deleteTag';
import { initialFieldState } from './initialFieldState';

export const inputAddData = () => {
  Array.prototype.forEach.call(
    document.querySelectorAll('.btn--add-data'),
    function(button) {
      const label = button.parentElement.querySelector('.file__upload--label');
      const defaultLabelText = 'Nothing selected.';
      if (
        button.parentElement.parentElement.querySelectorAll('.tag').length < 1
      ) {
        label.textContent = defaultLabelText;
      }
      //   console.log(button);

      // Create tag on Add location click
      button.addEventListener('click', () => {
        // Get tour location tag attribute

        const location = {};
        location.longitude = button.parentElement.querySelector(
          '.location-longitude'
        ).value;
        location.latitude = button.parentElement.querySelector(
          '.location-latitude'
        ).value;
        location.address = button.parentElement.querySelector(
          '.location-address'
        ).value;
        location.description = button.parentElement.querySelector(
          '.location-description'
        ).value;
        location.day = button.parentElement.querySelector(
          '.location-day'
        ).value;
        console.log(location.description);

        // Create tag
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.title = `
      LOCATION OVERVIEW:
      Location Longitude: ${location.longitude}
      Location Latitude: ${location.latitude}
      Location Address: ${location.address}
      Location Description: ${location.description}
      Location Day: ${location.day}
      `;
        tag.innerHTML = `<div class="tag--description" data-longitude=${location.longitude} data-latitude=${location.latitude} data-address="${location.address}" data-description="${location.description}" data-day=${location.day}> Tour Day ${location.day}</div>
        <svg class="icon--close">
          <use xlink:href="/img/icons.svg#icon-x-circle"></use></svg>`;
        //   tag.innerHTML = `
        //             <div class="tag">
        //                 <div class="tag--description-drop">${location.day}</div>
        //                 <svg class="icon--close">
        //                   <use xlink:href="/img/icons.svg#icon-x-circle"></use></svg>
        //             </div>
        //             <div class= "tag--details">
        //                 <div class="tag__location--longitude">Location Longitude ${location.longitude}</div>
        //                 <div class="tag__location--latitude">Location latitude ${location.latitude}</div>
        //                 <div class="tag__location--address">Location Address${location.address}</div>
        //                 <div class="tag__location--town">Location Town ${location.town}</div>
        //                 <div class="tag__location--town">Location Town ${location.city}</div>
        //                 <div class="tag__location--town">Location Town ${location.day}</div>`;

        // Append tag
        const emptyFields = Object.values(location).every(
          value => value === ''
        );
        const emptyCoordinates = [location.longitude, location.latitude].every(
          value => value === ''
        );
        const checkCoordinates = [
          location.longitude,
          location.latitude
        ].includes('');
        // console.log(emptyCoordinates, checkCoordinates);
        // console.log('checkCoordinates', checkCoordinates);
        // console.log('object', location);

        // Prevent all fields are empty
        if (!emptyFields) {
          if (location.day !== '') {
            if (
              (emptyCoordinates && checkCoordinates) ||
              (!emptyCoordinates && !checkCoordinates)
            ) {
              const tags = button.parentElement.querySelector('.tags');
              tags.appendChild(tag);
              label.textContent = '';
            } else {
              console.log(
                'error: If you want to put some coordinates, please put both longitude and latitude'
              );
            }
          } else {
            console.log('error: You must define a tour day for this location!');
          }
        } else {
          console.log(
            'error: You cannot add a location without information on it!'
          );
        }
        console.log(tag);
        const parent = button.parentElement;
        initialFieldState('data', parent);
        deleteTag();
        // const deleteButton = document.querySelectorAll('.icon--close');
        // console.log('deletebutton', deleteButton);
        // deleteButton.forEach(el => {
        //   el.addEventListener('click', e => {
        //     console.log('hello');
        //     console.log('element button', el);
        //     const target = e.currentTarget.parentElement;
        //     const tags = button.parentElement.parentElement.querySelector(
        //       '.tags'
        //     );
        //     const tagArrLength = Array.from(
        //       tags.querySelectorAll('.tag--description')
        //     ).length;
        //     // console.log(target);
        //     target.parentElement.removeChild(target);

        //     console.log(tagArrLength);
        //     // console.log(hiddenInput.value);
        //     if (tagArrLength <= 1) {
        //       label.textContent = defaultLabelText;
        //     }
        //   });
        // });
      });
    }
  );
};
