# WanderLust

WanderLust is a full-stack accommodation listing web application that allows users to explore properties, view listing details, create and manage their own listings, make bookings, and share reviews and ratings.

The application is built using Node.js, Express.js, MongoDB, Mongoose, EJS, Passport.js, and Bootstrap.

---

## Features

- User registration and login
- User authentication using Passport.js
- Create new accommodation listings
- Edit existing listings
- Delete listings
- View detailed listing information
- Listing image support
- Interactive location map
- Book Now functionality
- Add reviews and ratings
- Delete reviews
- Flash messages for user feedback
- Protected routes for authenticated users
- Owner-based listing management
- Custom error handling
- Responsive user interface
- MongoDB database integration

---

## Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- EJS
- Bootstrap 5
- Font Awesome

### Backend

- Node.js
- Express.js
- Mongoose
- Passport.js
- Express Session
- Connect Flash
- Method Override
- EJS-Mate

### Database

- MongoDB

### APIs and Services

- OpenStreetMap
- Nominatim

---

## Project Structure

```text
MajorProject/
│
├── init/
│   ├── data.js
│   └── index.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── public/
│   └── css/
│       └── style.css
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── utils/
│   └── ExpressError.js
│
├── views/
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── show.ejs
│   │
│   ├── users/
│   │   ├── login.ejs
│   │   └── signup.ejs
│   │
│   └── error.ejs
│
├── app.js
├── middleware.js
├── package.json
├── package-lock.json
└── README.md
