# 🖥️ Modern MERN Blog Application (Backend API)

This is the robust Server-side API that powers the MERN Blog Application. Built with **Node.js**, **Express**, and **MongoDB**, it handles secure authentication, content management, and automated email services.

## 🛠️ Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (via Mongoose)
* **Authentication:** JSON Web Tokens (JWT) & Bcrypt for password hashing
* **Email Service:** Nodemailer (Gmail SMTP)
* **Middleware:** CORS, Body-Parser, Multer

## 🚀 Key Features
* **RESTful API:** Clean and structured endpoints for Blogs, Categories, and Comments.
* **OTP System:** Automated email verification for user registration and password recovery.
* **Security:** Protected routes using JWT-based authentication middleware.
* **Data Validation:** Schema-based validation using Mongoose to ensure data integrity.

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

---

Developed by **Vansh Jain**