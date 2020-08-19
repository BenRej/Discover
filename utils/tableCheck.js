const tableScrollCheck = (arr, num) => {
  let status = '';
  console.log('arr length :', arr.length);
  if (arr.length > num) {
    status = 'scroll-active';
  }
  return status;
};

module.exports = tableScrollCheck;
