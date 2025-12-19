# Serenity - Luxury Hotel Management System

A full-stack, luxury-themed hotel management application built with the **PERN stack** (PostgreSQL, Express, React, Node.js). This application features a seamless booking experience for guests and a powerful real-time dashboard for administrators.

## 🚀 Features

### 🏨 Guest Interface (User)

* **Browse & Filter:** View luxury rooms with details. Filter by price, room type, and amenities.
* **Real-Time Availability:** Room status ("Available" or "Sold Out") updates automatically without refreshing.
* **Secure Booking:** Select dates, upload ID proof (Aadhaar Card), and simulate payments.
* **User Dashboard:** View booking history and status (Pending/Approved).
* **Rating System:** Rate and review rooms only after a completed/approved stay.
* **Responsive Design:** Fully optimized for mobile and desktop with a "Luxury Gold/Beige" theme.

### 🛡️ Admin Dashboard

* **Analytics:** Visual charts (Bar/Pie) for revenue, booking trends, and room popularity.
* **Room Management:** Add, edit, or delete rooms. **Quick Toggle** availability directly from the table.
* **Booking Management:** Approve or Cancel guest bookings.
* **Guest Records:** View guest details and inspect uploaded ID documents (with zoom).
* **Message Center:** Receive and reply to user inquiries.
* **Real-Time Updates:** The dashboard auto-refreshes when new bookings or messages arrive.

---

## 🛠️ Tech Stack

### **Frontend**

* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS (v4)
* **State Management:** Redux Toolkit
* **Animations:** Framer Motion
* **Charts:** Recharts
* **HTTP Client:** Axios

### **Backend**

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** PostgreSQL
* **ORM:** Sequelize
* **Authentication:** JSON Web Tokens (JWT) & Bcrypt
* **Email:** Nodemailer (Gmail & Ethereal support)

---

## ⚙️ Installation & Setup

### Prerequisites

* Node.js (v16+)
* PostgreSQL (Running locally or cloud)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/serenity-hotel.git
cd serenity-hotel

```

### 2. Backend Setup

Navigate to the backend folder and install dependencies.

```bash
cd luxury-hotel-backend-postgres
npm install

```

**Configure Environment Variables:**
Create a `.env` file in the backend root:

```env
PORT=5000
NODE_ENV=development

# Database Config
DB_HOST=localhost
DB_USER=postgres
DB_PASS=your_postgres_password
DB_NAME=luxury_hotel_db
DB_PORT=5432

# Security
JWT_SECRET=your_secret_key_here

# Admin credentials
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

# Email (Optional - Leave empty to use Demo Mode)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

```

**Seed the Database:**
This script creates the tables and adds sample rooms/users.

```bash
node seeder.js

```

**Start the Server:**

```bash
npm run dev

```

### 3. Frontend Setup

Open a new terminal, navigate to the frontend folder, and install dependencies.

```bash
cd luxury-hotel-frontend
npm install

```

**Start the Frontend:**

```bash
npm run dev

```

Access the app at `http://localhost:5173`.

---

## 🔑 Demo Credentials

Use these credentials to test the application features (data provided by `seeder.js`):

| Role | Email | Password | Access |
| --- | --- | --- | --- |
| **User** | `ritik@gmail.com` | `123` | Booking & Rating |

---

## 📂 Project Structure

```
serenity-hotel/
├── luxury-hotel-backend-postgres/  # Backend API
│   ├── config/       # Database connection
│   ├── controllers/  # Logic for Rooms, Bookings, Auth
│   ├── models/       # Sequelize Schemas (User, Room, Booking)
│   ├── routes/       # API Endpoints
│   ├── server.js     # Entry point
│   └── seeder.js     # Database population script
│
└── luxury-hotel-frontend/          # React Client
    ├── src/
    │   ├── app/      # Redux Store
    │   ├── components/ # Reusable UI (Navbar, Modals, Cards)
    │   ├── features/ # Redux Slices (Auth, Rooms, Bookings)
    │   ├── hooks/    # Custom Hooks (usePolling)
    │   ├── layouts/  # Admin & Main Layouts
    │   └── pages/    # User & Admin Pages
    └── index.css     # Tailwind imports

```

---

## 🐛 Troubleshooting

* **"Error saving room" / Payload Too Large:**
The backend is configured to accept large base64 images (50MB). Ensure you restarted the server after updating `server.js`.
* **Database Connection Failed:**
Check that your PostgreSQL service is running and the credentials in `.env` are correct.
* **Email Errors:**
If you haven't set up a real Gmail App Password, the system will log a "Demo Mode" message in the terminal. Bookings will still succeed.

---

## 📜 License

<<<<<<< HEAD
All rights are reserved by DMVCoreTech
=======
All rights are reserved by DMVCoreTech
>>>>>>> dbb37fb55d68e65b9ef004f031adcd0454111021
