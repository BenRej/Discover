/* eslint-disable */

export const deleteTag = () => {
  const deleteButton = document.querySelectorAll('.icon--close');
  //   console.log('deletebutton', deleteButton);
  deleteButton.forEach(el => {
    el.addEventListener('click', e => {
      //   console.log('element button', el)
      const target = e.currentTarget.parentElement;
      const tags = target.parentElement.parentElement.querySelector('.tags');
      const label = tags.parentElement.parentElement.querySelector(
        '.file__upload--label'
      );
      const defaultLabelText = 'Nothing selected.';
      //   const hiddenInput = tags.parentElement.parentElement.querySelector(
      //     '.file__upload--input'
      //   );
      //   console.log(hiddenInput);
      const tagArrLength = Array.from(
        tags.querySelectorAll('.tag--description')
      ).length;
      // console.log(target);
      target.parentElement.removeChild(target);

      //   console.log(tagArrLength);
      // console.log(hiddenInput.value);
      if (tagArrLength <= 1) {
        label.textContent = defaultLabelText;
        // console.log(hiddenInput);
        // hiddenInput.value = '';

        // const datas = tags.parentElement.parentElement.querySelectorAll(
        //   '.data'
        // );
        // const files = tags.parentElement.parentElement.querySelectorAll(
        //   '.file'
        // );
        // datas.forEach(el => (el.value = ''));
        // files.forEach(el => (el.value = ''));
      }
    });
  });
};
