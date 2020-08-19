/* eslint-disable */
export const rating = () => {
  console.log('in rating');
  document.addEventListener('DOMContentLoaded', function() {
    let stars = document.querySelectorAll('.fa-star-o');
    // console.log('stars: ', stars);
    stars.forEach(star => {
      star.addEventListener('click', setRating);
    });
    // console.log(stars);
    let rating = parseInt(
      document.querySelector('.ratings').getAttribute('data-rating')
    );
    console.log('rating: ', rating);
    let target = stars[rating - 1];
    target.dispatchEvent(new MouseEvent('click'));
  });
};

export const setRating = ev => {
  console.log('in setrating');
  let span = ev.currentTarget;
  console.log(span);
  let stars = document.querySelectorAll('.fa-star-o');
  let match = false;
  let num = 0;
  stars.forEach((star, i) => {
    if (match) {
      star.classList.remove('active');
      star.classList.add('inactive');
    } else {
      star.classList.remove('inactive');
      star.classList.add('active');
    }
    //Are we currently looking at the span that was clicked
    if (star === span) {
      match = true;
      num = i + 1;
    }
  });
  document.querySelector('.ratings').setAttribute('data-rating', num);
};
