/* eslint-disable */
export const selectedBox = () => {
  const selectedAll = document.querySelectorAll('.selected');

  selectedAll.forEach(selected => {
    const optionsContainer = selected.previousElementSibling;
    const searchBox = selected.nextElementSibling;
    const search = document.querySelector('.search');
    const searchDifficulty = document.querySelector('.search--difficulty');

    const optionsList = optionsContainer.querySelectorAll('.option');

    selected.addEventListener('click', () => {
      if (optionsContainer.classList.contains('active')) {
        optionsContainer.classList.remove('active');
      } else {
        let currentActive = document.querySelector('.options-container.active');

        if (currentActive) {
          currentActive.classList.remove('active');
        }

        optionsContainer.classList.add('active');
      }

      searchBox.value = '';
      filterList('');

      if (optionsContainer.classList.contains('active')) {
        searchBox.focus();
      }
    });

    document.addEventListener('click', e => {
      let targetElement = e.target;
      // console.log(targetElement);
      if (
        targetElement !== optionsContainer &&
        // targetElement != searchBox &&
        targetElement !== optionsList &&
        targetElement !== selected &&
        targetElement !== search &&
        targetElement !== searchDifficulty &&
        optionsContainer.classList.contains('active')
      ) {
        optionsContainer.classList.remove('active');
      }
    });

    optionsList.forEach(o => {
      o.addEventListener('click', () => {
        selected.innerHTML = o.querySelector('label').innerHTML;
        optionsContainer.classList.remove('active');
      });
    });

    searchBox.addEventListener('keyup', function(e) {
      filterList(e.target.value);
    });

    const filterList = searchTerm => {
      searchTerm = searchTerm.toLowerCase();
      optionsList.forEach(option => {
        let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
        if (label.indexOf(searchTerm) != -1) {
          option.style.display = 'block';
        } else {
          option.style.display = 'none';
        }
      });
    };
  });
};
