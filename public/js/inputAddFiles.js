/* eslint-disable */

import { deleteTag } from './deleteTag';
import { initialFieldState } from './initialFieldState';

export const inputAddFiles = () => {
  Array.prototype.forEach.call(
    document.querySelectorAll('.btn--add-file'),
    function(button) {
      const hiddenInput = button.parentElement.querySelector(
        '.file__upload--input'
      );
      const label = button.parentElement.parentElement.querySelector(
        '.file__upload--label'
      );
      const defaultLabelText = 'Nothing selected.';

      //set default label text if no tags
      if (
        button.parentElement.parentElement.querySelectorAll('.tag').length < 1
      ) {
        label.textContent = defaultLabelText;
      }

      //trigger click event on the hidden input
      button.addEventListener('click', e => {
        hiddenInput.click();
      });
      // console.log(hiddenInput);
      hiddenInput.addEventListener('change', () => {
        const fileNameList = Array.from(hiddenInput.files).map(file => {
          return file.name;
        });
        const addTag = () => {
          const parent = button.parentElement.parentElement.querySelector(
            '.tags'
          );
          let tagList = Array.from(
            parent.querySelectorAll('.tag--description')
          ).map(el => {
            return el.textContent;
          });

          //limit = tag number limit
          const appendTag = limit => {
            // console.log(tagList);
            if (tagList.length < limit) {
              for (let i = 0; i < fileNameList.length; i++) {
                if (!tagList.includes(fileNameList[i])) {
                  const tag = document.createElement('div');
                  tag.className = 'tag';
                  tag.title = fileNameList[i];
                  tag.innerHTML = `
                    <div class="tag--description">${fileNameList[i]}</div>
                    <svg class="icon--close">
                      <use xlink:href="/img/icons.svg#icon-x-circle"></use></svg>`;

                  parent.appendChild(tag);
                } else {
                  console.log('same files was added');
                }
              }
            } else {
              console.log(tagList, 'error: limit exceeded');
            }
          };
          // limiting for single and triple tag
          if (parent.classList.contains('single--tag')) {
            appendTag(1);
          } else if (parent.classList.contains('triple--tag')) {
            appendTag(3);
          } else {
            //In case we don't want to limit(it's bad i know :D) we put Infinity as argument for testing
            appendTag(Infinity);
          }
          label.textContent = '';
          // fileNameList.forEach(el => {});
        };
        if (fileNameList.length > 0) {
          addTag();
        }
        const parent = button.parentElement.parentElement;
        initialFieldState('file', parent);
        deleteTag();
        // const deleteButton = document.querySelectorAll('.icon--close');
        // console.log(deleteButton);
        // deleteButton.forEach(el => {
        //   el.addEventListener('click', e => {
        //     console.log('hello');
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
        //       //TRICK: if a user select a single file and delete, allow him to select it again
        //       hiddenInput.value = '';
        //     }
        //   });
        // });
      });
    }
  );
  // const addButtons = document.querySelectorAll('.btn--add');

  // addButtons.forEach(button => {

  // });
};
