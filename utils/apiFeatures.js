class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // const queryObj = { ...req.query };
    const queryObj = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    // console.log(queryStr);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    // console.log(queryStr);

    // let query = Tour.find(JSON.parse(queryStr));
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      // console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    // page=3&limit=10, 1-10, page1, 11-20, page2, 21-30, page3
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;

// console.log(req.query);

// BUILD THE QUERY
// 1A) Filtering
// const queryObj = { ...req.query };
// const excludeFields = ['page', 'sort', 'limit', 'fields'];
// excludeFields.forEach(el => delete queryObj[el]);

// // console.log(req.query, queryObj);

// //2B) Advanced filtering

// // { difficulty: 'easy', duration: { $gte: 5 } }
// // { difficulty: 'easy', duration: { gte: '5' } }
// let queryStr = JSON.stringify(queryObj);
// queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
// // console.log(JSON.parse(queryStr));
// let query = Tour.find(JSON.parse(queryStr));

// 2) Sorting
// if (req.query.sort) {
//   const sortBy = req.query.sort.split(',').join(' ');
//   // console.log(sortBy);
//   query = query.sort(sortBy);
// } else {
//   query = query.sort('-createdAt');
// }

// 3) Field limiting
// if (req.query.fields) {
//   const fields = req.query.fields.split(',').join(' ');
//   query = query.select(fields);
// } else {
//   query = query.select('-__v');
// }

// 4) Pagination
// const page = req.query.page * 1 || 1;
// const limit = req.query.limit * 1 || 100;
// const skip = (page - 1) * limit;
// // page=3&limit=10, 1-10, page1, 11-20, page2, 21-30, page3
// query = query.skip(skip).limit(limit);

// if (req.query.page) {
//   const numTours = await Tour.countDocuments();
//   // ex ( (4-1) * 3 >= 9 )
//   if (skip >= numTours) throw new Error('This page does not exist!');
// }
