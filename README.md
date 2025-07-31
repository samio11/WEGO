# 🚗 WEGO - Ride-Sharing Platform

Welcome to **WEGO**, a modern and scalable ride-sharing platform built with TypeScript, Express.js, and MongoDB. WEGO connects riders with drivers seamlessly, offering a robust system for user management, ride booking, and administrative control. Whether you're a rider looking for a convenient ride or a driver aiming to earn, WEGO has you covered!

---
![WeGO](https://github.com/user-attachments/assets/2de21ad3-f739-4199-823c-8418eaec0701)

## ✨ Features

- **User Management**:
  - Register as a Rider, Driver, or Admin with secure authentication (email/password & Google OAuth).
  - Role-based access control (Rider, Driver, Admin, Super Admin).
  - User blocking/unblocking and driver approval by admins.

- **Ride Management**:
  - Riders can request, view, and cancel rides.
  - Drivers can accept, pick up, transit, and complete rides.
  - Real-time ride status tracking with a detailed status history.

- **Driver Earnings**:
  - Track and update driver earnings automatically upon ride completion.
  - Toggle driver availability (ONLINE/OFFLINE).

- **Admin Dashboard**:
  - View all users with advanced filtering and pagination.
  - Approve or reject driver applications.
  - Block or unblock users for enhanced platform security.

- **Security & Scalability**:
  - JWT-based authentication with access and refresh tokens.
  - Transactional database operations for data consistency.
  - CORS and cookie-based secure API communication.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js (Local & Google OAuth)
- **API Testing**: Postman (Collection included)
- **Deployment**: Vercel (configurable via environment variables)
- **Others**: CORS, cookie-parser, custom error handling

---

## 📂 Project Structure

```plaintext
├── app/
│   ├── config/               # Configuration files (e.g., passport, environment)
│   ├── middlewares/          # Global error handling and not-found middleware
│   ├── routes/               # API route definitions
│   ├── modules/              # Core modules (user, rider, driver, admin, ride)
│   └── utils/                # Utility functions (e.g., QueryBuilder, token generation)
├── WEGO.postman_collection.json  # Postman collection for API testing
├── app.ts                    # Express app setup
├── package.json              # Project dependencies and scripts
└── README.md                 # Project documentation
```


## 🚀 Getting Started

Follow these steps to set up and run WEGO locally.

### Prerequisites

- Node.js (>= 16.x)
- MongoDB (local or cloud instance)
- Postman (for testing APIs)
- Vercel account (optional, for deployment)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/wego.git
   cd wego
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```plaintext
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   MONGODB_URI=mongodb://localhost:27017/wego
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:5000/api/v1/auth/google/callback
   ```

4. **Run the Application**:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`.

5. **Test APIs**:
   Import the `WEGO.postman_collection.json` into Postman to test the APIs. The collection includes endpoints for authentication, user management, ride operations, and admin tasks.

---

## 📚 API Documentation

### Authentication
- **POST /api/v1/auth/login**: Log in with email and password.
- **POST /api/v1/auth/logout**: Log out and clear cookies.
- **GET /api/v1/auth/google**: Initiate Google OAuth login.
- **GET /api/v1/auth/google/callback**: Google OAuth callback.

### User Management
- **POST /api/v1/user/create-rider**: Create a new rider.
- **POST /api/v1/user/create-driver**: Create a new driver with vehicle info.
- **POST /api/v1/user/create-admin**: Create a new admin.

### Ride Operations
- **POST /api/v1/ride/request**: Request a new ride.
- **POST /api/v1/ride/cancel-ride/:rideId**: Cancel a ride.
- **GET /api/v1/ride/me**: View all rides for a rider.

### Driver Operations
- **POST /api/v1/driver/accept-ride**: Accept a ride.
- **POST /api/v1/driver/pickedUp-ride**: Mark a ride as picked up.
- **POST /api/v1/driver/inTransmit-ride**: Mark a ride as in transit.
- **POST /api/v1/driver/complete-ride**: Complete a ride and update earnings.
- **GET /api/v1/driver/view-earning**: View total earnings.
- **PATCH /api/v1/driver/update-available**: Update driver availability.

### Admin Operations
- **GET /api/v1/admin**: View all users with filtering and pagination.
- **PATCH /api/v1/admin/updateStatus/:driverId**: Approve/reject a driver.
- **PATCH /api/v1/admin/block-user/:userId**: Block a user.
- **PATCH /api/v1/admin/unBlock-user/:userId**: Unblock a user.

For detailed request/response examples, refer to the `WEGO.postman_collection.json`.

---

## 🧪 Testing the APIs

1. Import the Postman collection (`WEGO.postman_collection.json`) into Postman.
2. Update the `Authorization` header with a valid JWT token obtained from the login endpoint.
3. Test endpoints for authentication, user creation, ride management, and admin operations.

---

## 🌟 Why WEGO?

- **Scalable Architecture**: Modular design with clean separation of concerns.
- **Secure**: JWT-based authentication, secure cookies, and transactional database operations.
- **Developer-Friendly**: TypeScript for type safety, comprehensive Postman collection for testing.
- **Extensible**: Easily add new features like payment integration or real-time tracking.

---

## 🤝 Contributing

We welcome contributions to WEGO! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

---



## 📬 Contact

For questions or support, reach out to the maintainers:
- Email: samiohasan6@gmail.com

---

**WEGO** - Ride the Future! 🚗💨
```

