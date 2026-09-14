# WanderLust

WanderLust is a full-stack accommodation listing web application where users can explore places, view listing details, create their own listings, Book Now option for listings, add reviews, and manage their listings.

The project is built using **Node.js, Express.js, MongoDB, Mongoose, EJS, Passport.js, and Bootstrap**.

---

## Features

* User Signup & Login
* Authentication using Passport.js
* Create new listings
* Edit existing listings
* Delete listings
* Book Now option for listings
* View listing location on an interactive map
* Add ratings and reviews
* Delete reviews
* Flash messages for user feedback
* Protected routes for authenticated users
* Listing images
* Responsive UI using Bootstrap
* Custom error handling
* MongoDB database integration

---

## Technologies Used

### Frontend

* HTML
* CSS
* EJS
* Bootstrap 5
* Font Awesome
* JavaScript

### Backend

* Node.js
* Express.js
* Mongoose
* Passport.js
* Express Session
* Connect Flash
* Method Override

### Database

* MongoDB

### Other

* OpenStreetMap / Nominatim for location and map functionality
* EJS-Mate for layouts

---

## Project Structure

```text
MajorProject/
│
├── controllers/
│
├── init/
│   ├── data.js
│   └── index.js
│
├── middleware.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── public/
│   ├── css/
│   └── js/
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
│   └── users/
│
├── app.js
├── middleware.js
├── package.json
└── README.md
```

## Authentication

WanderLust uses **Passport.js** for user authentication.

Users can:

* Sign up
* Log in
* Log out
* Create listings after logging in
* Edit/delete their own listings
* Add reviews to listings

Protected routes ensure that users must be authenticated before performing certain actions.

---

## Listings

Users can create accommodation listings containing:

* Title
* Description
* Price
* Location
* Country
* Image

Each listing has its own details page where users can view information, location, reviews, and available actions.

---

## Reviews & Ratings

Users can add reviews to listings with:

* Comment
* Rating from 1 to 5

Reviews can also be deleted when permitted.

---

## Map Integration

The project uses **OpenStreetMap** and **Nominatim** to find the location of a listing based on its location and country.

The location is displayed on the listing details page.

---

## Flash Messages

The application uses `connect-flash` to display messages such as:

* Login required
* Listing created successfully
* Listing updated successfully
* Listing deleted successfully
* Review added successfully
* Review deleted successfully
* Validation/error messages

---

## Error Handling

The project includes custom error handling using an `ExpressError` utility.

This helps display user-friendly error pages instead of exposing raw server errors.

---

## Author

**Anish**

Computer Science & Engineering

---

## License

This project is created for learning and educational purposes.
