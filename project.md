# Gym Reservation System

## Description
The Gym Reservation System is an online platform that allows users to make reservations for various gym services, including fitness classes, personal trainer sessions, and equipment rentals. The system provides users with the ability to view available services, make reservations, and manage their reservation records. Administrators have the ability to manage gym classes, trainers, and equipment information.

## DB Schemas
Using MongoDB with Nodejs and Mongoose
#### User
```typescript
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required:true}
});
const User = mongoose.model('user', userSchema);
```

#### GymClass
```typescript
const gymClassSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: { type: String, required: true },
    capacity: { type: Number, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'review' }],
});

const GymClass = mongoose.model('gym_class', gymClassSchema);
```

#### Trainer
```typescript
const trainerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'review' }],
});

const Trainer = mongoose.model('trainer', trainerSchema);
```

#### Reservation
```typescript
const reservationSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'gym_class', required: true },
    trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'trainer' },
    date: { type: Date, required: true },
    time: { type: String, required: true },
});

const Reservation = mongoose.model('reservation', reservationSchema);
```

#### Review
```typescript
const reviewSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model('review', reviewSchema);
```

## Tasks
The following tasks should be implemented in the Gym Reservation System:
#### User Functionalities:
- Registration/Authentication: Users should be able to register for a new account and log in to an existing account. JWT authentication should be used to ensure account security.
- View Gym Services: Users should be able to view all available gym classes, trainers, and equipment information.
- Make Reservations: Users should be able to make reservations for gym classes, trainer sessions, and equipment.
- View and Manage Reservation Records: Users should be able to view their reservation records and cancel upcoming reservations.
#### Administrator Functionalities:
- Administrator Login: Administrators should be able to log in to the backend for information management.
- Manage Gym Services: Administrators should be able to add, edit, and delete gym class, trainer, and equipment information.

## Schedule
The development of the Gym Reservation System can be divided into the following stages:

#### Database Design and Setup:
- Design the database schemas based on the requirements.
- Set up the database and create the necessary tables.
- Establish the relationships between the tables using foreign keys.

#### Backend Development:
- Implement the backend using Express.js.
- Create API endpoints for user registration, authentication, and reservation management.
- Implement JWT authentication for secure user access.
- Develop the necessary API endpoints for administrator functionalities.

#### Frontend Development:
- Use Angular to develop the frontend application.
- Design and implement the user interface for user registration, login, and reservation functionalities.
- Create UI components to display gym services and reservation records.
- Implement the necessary UI for administrator login and gym service management.
- Integration and Testing:

#### Integrate the frontend and backend components.
- Test the system's functionality, including user registration, login, reservation creation, and cancellation.
- Conduct thorough testing of the administrator functionalities, such as gym service management.

## Member's Tasks

#### Wenhong Huang (616003):
- Frontend Development: Develop the user interface using Angular.
- Backend Development: Implement API endpoints and integrate frontend and backend components.
- MongoDB: Integration with MongoDB, including data retrieval and storage.

#### Qijun Zheng (615876):
- Frontend Development: Use angular for front-end development, call the api interface on the node.js platform, render the page according to the interface, and configure security measures in the request header
- Backend Development: Use the express framework and cooperate with typescript to realize an efficient api interface, so that the front end can be called conveniently and quickly, giving full play to the non-blocking properties of node.js
- MongoDB: Integration with MongoDB, including data retrieval and storage.

#### Xianhong Cai (615218):
- Frontend Development: Implement signin and signup functionality using Angular.
- Backend Development: Integration with the backend and implement necessary functionality.
- MongoDB: Design and set up the MongoDB database, establish the necessary collections and relationships.