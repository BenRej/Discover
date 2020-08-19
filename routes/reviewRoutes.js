const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });
//POST /tour/263454/reviews
//POST /reviews
router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user', 'admin'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );
router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );
// router
//   .route('reviews?user=:id')
//   .delete(
//     authController.restrictTo('admin'),
//     reviewController.deleteSeveralReview
//   );

module.exports = router;
