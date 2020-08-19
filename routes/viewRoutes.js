const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewsController.getOverview
);
router.get(
  '/tours/:startLocation/:startDates/:difficulty/:price',
  authController.isLoggedIn,
  viewsController.getFilteredTours
);
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup', authController.isLoggedIn, viewsController.getSignupForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/my-tours', authController.protect, viewsController.getMyTours);
router.get('/my-reviews', authController.protect, viewsController.getMyReviews);
router.get(
  '/my-reviews/:id',
  authController.protect,
  viewsController.getMyReview
);
router.get(
  '/edit-review/:id',
  authController.protect,
  viewsController.getEditReview
);
router.get(
  '/create-review/:id',
  authController.protect,
  viewsController.getCreateReview
);

// Admin Routes
router.get(
  '/manage-tours',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getToursOverview
);

router.get(
  '/create-tour',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getCreateTour
);

router.get(
  '/edit-tour/:slug',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getUpdateTour
);

router.get(
  '/manage-users',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getUsersOverview
);
router.get(
  '/user/:id',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getUser
);
router.get(
  '/edit-user/:id',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.editUser
);

router.get(
  '/manage-reviews/',
  authController.protect,
  authController.restrictTo('admin'),
  viewsController.getReviewsOverview
);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
