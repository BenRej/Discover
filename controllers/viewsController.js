const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const setNavParams = require('../utils/navSettings');
const AppError = require('../utils/appError');
const tableScrollCheck = require('../utils/tableCheck');
const APIFeatures = require('../utils/apiFeatures');
// const RangeSlider = require('../public/js/rangeSlider');
// const Handle = require('../utils/handle');

const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();
const currentDate = `${mm}/${dd}/${yyyy}`;

exports.getOverview = catchAsync(async (req, res, next) => {
  // // 1) Get tour data from collection
  // const tours = await Tour.find();
  // // 2) Build templated
  // // 3) Render that template using tour data from 1)
  // res.status(200).render('overview', {
  //   title: 'All Tours',
  //   tours
  // });

  const sortedPriceTours = new APIFeatures(Tour.find(), {
    sort: 'price'
  })
    .filter()
    .sorting();
  const tours = await sortedPriceTours.query;

  const toursArr = Object.values(tours);

  const difficulties = toursArr.map(el => {
    return (el = el.difficulty);
  });
  const uniqueDifficulties = [...new Set(difficulties)].sort();

  const maxToursPrice = toursArr[toursArr.length - 1].price;

  const locations = toursArr.map(el => {
    return (el = el.startLocation.description);
  });
  const uniqueLocations = [...new Set(locations)].sort();
  // console.log(maxToursPrice);
  // console.log(uniqueDifficulties);

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
    currentDate,
    maxToursPrice,
    uniqueDifficulties,
    uniqueLocations
  });
});

exports.getFilteredTours = catchAsync(async (req, res) => {
  const tourOptions = new APIFeatures(Tour.find(), {
    sort: 'price'
  })
    .filter()
    .sorting();

  //   const tours = await sortedPriceTours.query;
  // const toursArr = Object.values(tours);
  // FILTER OPTION................................................................
  const tourFilterOptions = await tourOptions.query;
  const tourFilterOptionsArr = Object.values(tourFilterOptions);
  console.log(tourFilterOptionsArr);
  // Destination Option
  const locations = tourFilterOptionsArr.map(el => {
    return (el = el.startLocation.description);
  });
  const uniqueLocations = [...new Set(locations)].sort();

  //Difficulty Option
  const difficulties = tourFilterOptionsArr.map(el => {
    return (el = el.difficulty);
  });
  const uniqueDifficulties = [...new Set(difficulties)].sort();

  //Price Option
  const maxToursPrice =
    tourFilterOptionsArr[tourFilterOptionsArr.length - 1].price;
  // console.log(maxToursPrice);

  //Construct FilterObj for filtering query................................
  const filterObjReq = {};
  let destination;

  // FilterObj Destination
  if (req.params.startLocation !== 'all') {
    destination = req.params.startLocation;
  }

  // FilterObj Date
  if (req.params.startDates === '') {
    filterObjReq.startDates = new Date(
      `${currentDate.month}/${currentDate.date}/${currentDate.year}`
    ).toISOString();
  }
  filterObjReq.startDates = { gte: `${req.params.startDates}` };

  // FilterObj Difficulty
  if (req.params.difficulty !== 'all') {
    filterObjReq.difficulty = req.params.difficulty;
  }

  // FilterObj Price
  const prices = req.params.price.split('-');
  filterObjReq.price = { gte: prices[0], lte: prices[1] };

  // Check FilterObj query
  // console.log(filterObjReq);

  // Query Filter Tour...................................

  let filteredTours;
  let tours;
  if (destination) {
    filteredTours = new APIFeatures(
      Tour.find({
        'startLocation.description': `${destination}`
      }),
      filterObjReq
    ).filter();

    tours = await filteredTours.query;
  } else {
    filteredTours = new APIFeatures(Tour.find(), filterObjReq)
      .filter()
      .sorting();
    tours = await filteredTours.query;
  }

  // console.log(tours);

  //EXAMPLE QUERY DESTINATION
  // const banfTour = await Tour.find({
  //   'startLocation.description': 'Banff, CAN'
  // });
  // console.log(banfTour);

  res.status(200).render('overview', {
    title: 'Filtered Tours',
    tours,
    currentDate,
    maxToursPrice,
    uniqueDifficulties,
    uniqueLocations
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });
  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }
  // 2) Build templated

  // Render template using data from 1)
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};
exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Register new account'
  });
};

exports.getAccount = (req, res) => {
  const settings = setNavParams('/me');
  res.status(200).render('account', {
    title: 'Your account',
    settings
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  const settings = setNavParams('/my-tours');
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });
  // console.log(bookings);
  // define scroll status
  const scrollStatus = tableScrollCheck(bookings, 5);
  // console.log('scrollStatus: ', scrollStatus);

  // 2) Find tours with the returned ids
  const tourIDs = bookings.map(el => el.tour);
  // 3) Define scrollStatus

  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('myBookings', {
    title: 'My Bookings',
    bookings,
    tours,
    settings,
    scrollStatus
  });
});

exports.getMyReviews = catchAsync(async (req, res, next) => {
  const settings = setNavParams('/my-reviews');
  // 1) Find all bookings
  const reviews = await Review.find({ user: req.user.id });
  // console.log('reviews:', reviews);

  // Define scroll status
  const scrollStatus = tableScrollCheck(reviews, 5);
  // console.log('scrollStatus: ', scrollStatus);
  // // 2) Find tours with the returned ids
  const tourIDs = reviews.map(el => el.tour);

  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('myReviews', {
    title: 'My Reviews',
    reviews,
    tours,
    settings,
    scrollStatus
  });
});

exports.getMyReview = catchAsync(async (req, res, next) => {
  let settings;
  if (req.user.role === 'user') {
    settings = setNavParams('/my-reviews');
  } else {
    settings = setNavParams('/manage-reviews');
  }
  const review = await Review.findOne({ _id: req.params.id });
  // console.log('review: ', review);
  res.status(200).render('myReview', {
    title: `Review on ${review.tour.name}`,
    review,
    settings
  });
});

exports.getEditReview = catchAsync(async (req, res, next) => {
  const settings = setNavParams('/my-reviews');
  const review = await Review.findOne({ _id: req.params.id });
  res.status(200).render('editReview', {
    title: `Edit Review on ${review.tour.name}`,
    review,
    settings
  });
});

exports.getCreateReview = catchAsync(async (req, res, next) => {
  const settings = setNavParams('/my-reviews');
  const tour = await Tour.findOne({ _id: req.params.id });
  res.status(200).render('createReview', {
    title: `Create Review on ${tour.name}`,
    tour,
    settings
  });
});

exports.getToursOverview = catchAsync(async (req, res, next) => {
  const settings = setNavParams('/manage-tours');
  // 1) Find all bookings
  const tours = await Tour.find();
  // console.log('reviews:', reviews);

  // Define scroll status
  const scrollStatus = tableScrollCheck(tours, 5);

  res.status(200).render('manageTours', {
    title: 'Manage Tours Overview',
    // reviews,
    tours,
    settings,
    scrollStatus
  });
});

exports.getCreateTour = catchAsync(async (req, res, next) => {
  const settings = setNavParams('/manage-tours');
  const guides = await User.find({ role: 'guide' });
  res.status(200).render('createTour', {
    title: `Create Tour`,
    settings,
    currentDate,
    guides
  });
});

exports.getUpdateTour = catchAsync(async (req, res, next) => {
  const settings = setNavParams('/manage-tours');
  // 1) Find all guides
  const guides = await User.find({ role: 'guide' });
  // 2) Find selected tour to update
  const tour = await Tour.findOne({ slug: req.params.slug });
  res.status(200).render('editTour', {
    title: `Edit ${tour.name}`,
    // reviews,
    tour,
    settings,
    currentDate,
    guides
  });
});

exports.getUsersOverview = catchAsync(async (req, res, next) => {
  const settings = setNavParams('/manage-users');
  // Find All users
  const users = await User.find();

  const scrollStatus = tableScrollCheck(users, 5);

  res.status(200).render('manageUsers', {
    title: `Manage Users Overview`,
    settings,
    scrollStatus,
    users
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const settings = setNavParams('/manage-users');
  const userProfil = await User.findOne({ _id: req.params.id });
  // console.log('review: ', review);
  res.status(200).render('user', {
    title: `${userProfil.name} Profil`,
    userProfil,
    settings
  });
});

exports.editUser = catchAsync(async (req, res, next) => {
  const settings = setNavParams('/manage-users');
  const userProfil = await User.findOne({ _id: req.params.id });
  // console.log('review: ', review);
  res.status(200).render('editUser', {
    title: `${userProfil.name} Profil`,
    userProfil,
    settings
  });
});

exports.getReviewsOverview = catchAsync(async (req, res, next) => {
  const settings = setNavParams('/manage-reviews');
  // 1) Find all bookings
  const reviews = await Review.find();
  // console.log('reviews:', reviews);

  // Define scroll status
  const scrollStatus = tableScrollCheck(reviews, 5);

  res.status(200).render('manageReviews', {
    title: 'Manage Users Overview',
    reviews,
    settings,
    scrollStatus
  });
});

// exports.updateReview = catchAsync(async (req, res) => {
//   const updatedReview = await Review.findByIdAndUpdate(
//     req.params.id,
//     {
//       review: req.body.review,
//       rating: req.body.rating
//     },
//     {
//       new: true,
//       runValidators: true
//     }
//   );
//   res.status(200).render('myReview', {
//     title: 'Your Review',
//     review: updatedReview
//   });
// });

exports.updateUserData = catchAsync(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );
  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});
