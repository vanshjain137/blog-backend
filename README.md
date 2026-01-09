# 🖥️ Modern MERN Blog Application (Backend API)

This is the robust Server-side API that powers the MERN Blog Application. Built with **Node.js**, **Express**, and **MongoDB**, it handles secure authentication, content management, and automated email services.

## 🔗 Project Links
* **Frontend Repository:** [https://github.com/vanshjain137/blog-frontend](https://github.com/vanshjain137/blog-frontend)
* **Live API Base URL:** [https://vansh-blog-backend.onrender.com](https://vansh-blog-backend.onrender.com)
* **Full Stack Architecture:** This repository contains the Backend logic. The React.js frontend is managed in a separate repository to maintain a clean MVC-style separation.

## 🛠️ Tech Stack
* **Core:** Node.js, Express.js, MongoDB Atlas
* **Security:** JWT (jsonwebtoken), Bcrypt.js, CORS
* **Media:** Cloudinary (for image handling logic)
* **Utilities:** Mongoose (ODM), Nodemailer, Multer

## 🚀 Key Features
* **RESTful API:** Clean and structured endpoints for Blogs, Categories, and Comments.
* **OTP System:** Automated email verification for user registration and password recovery.
* **Security:** Protected routes using JWT-based authentication middleware.
* **Data Validation:** Schema-based validation using Mongoose to ensure data integrity.
* **Image Management:** Server-side logic to handle image uploads directly to Cloudinary.

## 🔐 Security Implementation
* **JWT Authentication:** Implemented custom middleware to verify tokens on protected routes (like creating/deleting blogs).
* **Password Security:** Uses `bcryptjs` for salt-hashing passwords, ensuring user data is never stored in plain text.
* **OTP Flow:** Integrated `nodemailer` to generate and send time-sensitive 6-digit codes for secure account verification.
* **CORS Policy:** Configured Cross-Origin Resource Sharing to allow secure requests only from the authorized frontend domain.

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-backend-repo-link>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:** Create a file named `.env` in the root directory and add your credentials:


   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_random_secret_key
   EMAIL_USER=your_gmail_address
   EMAIL_PASS=your_gmail_app_password
   ```

4. **Start the server:**

   ```bash
   # For development (with nodemon)
   npm run dev

   # For production
   npm start
   ```

## 🛡️ Security Note

The `.env` file is excluded from version control using `.gitignore` to protect sensitive information like database strings and email passwords.

## 📡 Deployment Note

Hosted on Render (Free Tier). Please note that the server may experience a "cold start" delay of ~50 seconds if it has been inactive. The Frontend application includes a loading state to manage this behavior.

---

Developed by **Vansh Jain** [LinkedIn](www.linkedin.com/in/vansh-jain-b955a23a1)