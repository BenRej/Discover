const setNavParams = route => {
  const settings = {
    user: {
      settingsActive: false,
      bookingsActive: false,
      reviewsActive: false,
      billingsActive: false
    },
    admin: {
      toursActive: false,
      usersActive: false,
      reviewsActive: false,
      billingsActive: false
    }
  };
  switch (route) {
    //USER
    case '/me':
      settings.user.settingsActive = true;
      break;
    case '/my-tours':
      settings.user.bookingsActive = true;
      break;
    case '/my-reviews':
      settings.user.reviewsActive = true;
      break;
    case '/my-billings':
      settings.user.billingsActive = true;
      break;
    //ADMIN
    case '/manage-tours':
      settings.admin.toursActive = true;
      break;
    case '/manage-users':
      settings.admin.usersActive = true;
      break;
    case '/manage-reviews':
      settings.admin.reviewsActive = true;
      break;
    case '/manage-bookings':
      settings.admin.billingsActive = true;
      break;
    default:
      break;
  }

  return settings;
};

module.exports = setNavParams;
