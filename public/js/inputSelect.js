/* eslint-disable */
import { deleteTag } from './deleteTag';
import { initialFieldState } from './initialFieldState';

export const inputSelect = () => {
  Array.prototype.forEach.call(
    document.querySelectorAll('.btn--add-select'),
    function(button) {
      const hiddenSelect = button.parentElement.querySelector('.form__select');
      const label = button.parentElement.querySelector('.file__upload--label');
      console.log(label);
      const defaultLabelText = 'Nothing selected.';
      if (button.parentElement.querySelectorAll('.tag').length < 1) {
        label.textContent = defaultLabelText;
      }
      const tagParent = button.parentElement.querySelector('.tags');
      let id;
      let tagListDescriptions = [];
      let tagList = [];

      hiddenSelect.addEventListener('change', e => {
        id = e.target.options[e.target.selectedIndex].dataset.id;
        tagList = Array.from(tagParent.querySelectorAll('.tag--description'));
        tagListDescriptions = tagList.map(el => {
          return el.textContent;
        });
        if (tagListDescriptions.includes(hiddenSelect.value)) {
          console.log('error same entry');
          hiddenSelect.classList.remove('valid');
          hiddenSelect.classList.add('invalid');
        } else {
          hiddenSelect.classList.remove('invalid');
          hiddenSelect.classList.add('valid');
        }
      });

      button.addEventListener('click', e => {
        // console.log(hiddenSelect);
        // $('.form__select').click();
        // // hiddenSelect.classList.remove('.hide');
        // Create tag

        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.title = `
          Tour Guide: ${hiddenSelect.value}
          Tour GuideId:${id}
          `;
        tag.innerHTML = `
                        <div class="tag--description" data-id=${id}>${hiddenSelect.value}</div>
                        <svg class="icon--close">
                          <use xlink:href="/img/icons.svg#icon-x-circle"></use></svg>`;

        tagList = Array.from(tagParent.querySelectorAll('.tag--description'));
        tagListDescriptions = tagList.map(el => {
          return el.textContent;
        });

        // console.log('taglistdescription', tagListDescriptions);
        // console.log('selectvalue', hiddenSelect.value);
        // console.log('tagparent', tagParent);

        if (
          !tagListDescriptions.includes(hiddenSelect.value) &&
          hiddenSelect.value !== ''
        ) {
          tagParent.appendChild(tag);
          label.textContent = '';
        } else {
          console.log('same files was added');
        }
        const parent = button.parentElement;
        initialFieldState('select', parent);
        deleteTag();
      });
    }
  );
};

// var selection = document.getElementById("mySelect");

// selection.onchange = function(event){
//   var rc = event.target.options[event.target.selectedIndex].dataset.rc;
//   var clnc = event.target.options[event.target.selectedIndex].dataset.clnc;
//   console.log("rc: " + rc);
//   console.log("clnc: " + clnc);
// };
