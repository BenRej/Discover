# Discover

Welcome to Discover, the tour booking application on the theme of nature.

Tech:
------
NodeJs
MongoDB
Mongoose
Express
PUG
CSS
ESlint
Prettier
MVC architecture

Start Project:
--------------
npm install
npm start

in case you want to modify some JS files:
npm run watch:js

Features:
---------
In this app you be able as user to:
Register/Login/Logout
Search for a tour with filtering system ( only 10 tour right now, more to come soon to make the filtering system more relevant!)
Book a tour (use 4242 4242 4242 4242 as credit card number, it's a dev test version)
-Create/Read/Update/Delete a review on your booked tours
-Update your user information : name / email / password
-Read your bills ( work in progress)

as admin to:
-Read/Update/Delete users (except changing their password)
-Create/Read/Update/Delete reviews
-Create/Read/Update/Delete tours
-Read/Delete booking (work in progress)

other App features:
-Credit card payments with Stripe
-Resizing images with Sharp
-Upload images with Multer
-Map geolocation with Mapbox
-Sending email with Sendgrid
-Limiting requests with express-rate-limit
-Security http headers with Helmet
-Data sanatization against NoSQL injection with express-mongo-sanatize
-Data sanatization against XSS with xss-clean

For any question or to get an admin account please feel free to contact me.
Contact: benoitrejou@gmail.com

important note
this is a dev project, that's why you find in a config.env file.
In order to make the email system work with sendgrid, please enter your own api key and password in this config file ( to prevent spam )
In real life, this file wouldn't be in repo, instead you would find a config.env.sample file, for security reasons.
