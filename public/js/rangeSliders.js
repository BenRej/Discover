/* eslint-disable */
export const rangeSliders = () => {
  const inputLeft = document.getElementById('input-left');
  const inputRight = document.getElementById('input-right');
  const thumbLeft = document.querySelector('.slider > .thumb.left');
  const thumbRight = document.querySelector('.slider > .thumb.right');
  const range = document.querySelector('.slider > .range');
  const selectedPrice = document.querySelector('.price');
  // const placeholder = document.querySelector('.range__price');
  const priceRange = document.querySelector('.price__range');
  const optionPrice = document.querySelector('.option--price__range');

  const optionsContainer = document.querySelector('.options-container--range');

  const setSelectedPrice = () => {
    selectedPrice.textContent = `From ${inputLeft.value} to ${inputRight.value}`;
  };

  const setMinMaxRange = () => {
    priceRange.innerHTML = `From $${inputLeft.value} to $${inputRight.value}`;
  };
  setMinMaxRange();

  const setLeftValue = () => {
    const _this = inputLeft,
      min = parseInt(_this.min),
      max = parseInt(_this.max);

    _this.value = Math.min(
      parseInt(_this.value),
      parseInt(inputRight.value) - 1
    );
    const percent = ((_this.value - min) / (max - min)) * 100;

    thumbLeft.style.left = percent + '%';
    range.style.left = percent + '%';
    setMinMaxRange();
  };
  setLeftValue();

  const setRightValue = () => {
    const _this = inputRight,
      min = parseInt(_this.min),
      max = parseInt(_this.max);

    _this.value = Math.max(
      parseInt(_this.value),
      parseInt(inputLeft.value) + 1
    );
    const percent = ((_this.value - min) / (max - min)) * 100;

    thumbRight.style.right = 100 - percent + '%';
    range.style.right = 100 - percent + '%';
    setMinMaxRange();
  };
  setRightValue();

  selectedPrice.addEventListener('click', e => {
    if (optionsContainer.classList.contains('active')) {
      optionsContainer.classList.remove('active');
    } else {
      let currentActive = document.querySelector('.options-container.active');
      if (currentActive) {
        currentActive.classList.remove('active');
      }
      optionsContainer.classList.add('active');
    }
  });

  document.addEventListener('click', e => {
    let targetElement = e.target;
    // console.log(targetElement);
    const testdate = new Date('07/20/2020').toISOString();
    console.log(testdate);
    if (
      targetElement != optionsContainer &&
      targetElement != optionPrice &&
      targetElement != selectedPrice &&
      targetElement != inputLeft &&
      targetElement != inputRight &&
      optionsContainer.classList.contains('active')
    ) {
      optionsContainer.classList.remove('active');
    }
  });

  inputLeft.addEventListener('input', () => {
    setLeftValue();
    setSelectedPrice();
  });
  inputRight.addEventListener('input', () => {
    setRightValue();
    setSelectedPrice();
  });
  inputLeft.addEventListener('mouseover', () => {
    thumbLeft.classList.add('hover');
  });
  inputLeft.addEventListener('mouseout', () => {
    thumbLeft.classList.remove('hover');
  });
  inputLeft.addEventListener('mousedown', () => {
    thumbLeft.classList.add('active');
  });
  inputLeft.addEventListener('mouseup', () => {
    thumbLeft.classList.remove('active');
  });
  inputRight.addEventListener('mouseover', () => {
    thumbRight.classList.add('hover');
  });
  inputRight.addEventListener('mouseout', () => {
    thumbRight.classList.remove('hover');
  });
  inputRight.addEventListener('mousedown', () => {
    thumbRight.classList.add('active');
  });
  inputRight.addEventListener('mouseup', () => {
    thumbRight.classList.remove('active');
  });
};
