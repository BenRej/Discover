/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async tourId => {
  try {
    const stripe = Stripe('pk_test_E7aeihBMzOzRYFGGutYYbwDe00yYfiehcf');
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (error) {
    console.log(error);
    showAlert('error', error);
  }
};
