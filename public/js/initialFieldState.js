/* eslint-disable */
// Type is either file / data /select
export const initialFieldState = (type, parent) => {
  if (type === 'file') {
    const files = parent.querySelectorAll('.file');

    // console.log('file', files);
    files.forEach(el => (el.value = ''));
  } else if (type === 'data') {
    const datas = parent.querySelectorAll('.data');

    // console.log('data', datas);
    datas.forEach(el => (el.value = ''));
  } else if (type === 'select') {
    const selects = parent.querySelectorAll('.select');

    // console.log('select', selects);
    selects.forEach(el => (el.value = ''));
  }
};
