# 🛠️ Elderly Assistance Portal

A platform connecting elderly individuals with volunteers to offer assistance and support. The portal allows elderly users to request help and volunteers to accept or reject tasks while providing transparent communication and service tracking.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Project Structure](#project-structure)
- [Usage Instructions](#usage-instructions)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)

## ✅ Features

### 👤 User Authentication
- **Register**:
  - **Elderly**: Name, Age, Gender, Location, Contact, Health Conditions, Medical History (PDF Upload).
  - **Volunteer**: Name, Skills, Availability, Payment Rate, Contact.
- **Login**:
  - **Role-based redirection**:
    - Elderly → Dashboard
    - Volunteer → Task Dashboard
- **Session Management**:
  - Uses localStorage to store session information.
- **Logout**:
  - Clears session and redirects to the login page.

### 🧓 Elderly Dashboard
- **Profile Management**:
  - Update profile (Name, Age, Location, Contact, Health Conditions).
  - Upload a Profile Image (live preview).
- **Request Assistance**:
  - Submit service requests with:
    - Help Type, Urgency, Preferred Time, Location, Budget.
    - Upload Medical History (PDF).
- **Track Request Status**:
  - View the latest request status:
    - Pending – waiting for a volunteer to accept.
    - Accepted – request has been accepted by a volunteer (including contact information).
    - Rejected – includes the reason for rejection.

### 🧑‍🤝‍🧑 Volunteer Dashboard
- **View Available Tasks**:
  - Lists all Pending assistance requests with:
    - Help Needed, Urgency, Location, Budget.
    - Medical History (PDF Download).
- **Accept or Reject Requests**:
  - Accept: Updates the task and opens a Dial Pad with the elderly's contact number.
  - Reject: Updates the request without needing a reason.
- **Access Medical History**:
  - Volunteers can view/download Medical History PDFs for better assistance.

## 🛠️ Tech Stack
- **Frontend**: HTML, CSS (Responsive), JavaScript (Fetch API)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **File Storage**: Local (PDF Uploads)
- **Deployment**: Vercel/Render (for Frontend and Backend)

## 🚀 Setup and Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/elderly-assistance-portal.git
cd elderly-assistance-portal
```

### 2. Set Up the Backend
Navigate to the backend folder:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Set up .env file:
```bash
MONGO_URI=your_mongodb_uri
```

Start the server:
```bash
npx nodemon app.js
```

By default, the backend will run on http://localhost:3000.

### 3. Set Up the Frontend
Navigate to the frontend folder:
```bash
cd frontend
```

Open the project in your browser:
```bash
http://127.0.0.1:5500/pages/loginPage.html
```

## 📁 Project Structure
```
elderly-assistance-portal/
├── backend/
│   ├── uploads/             # Stores medical history PDFs
│   ├── models/
│   │     ├── User.js        # User model (Elderly/Volunteer)
│   │     └── Task.js        # Task model (Service requests)
│   ├── routes/
│   │     ├── loginRoutes.js
│   │     ├── registerRoutes.js
│   │     └── taskRoutes.js
│   ├── app.js               # Main Express server
│   └── package.json         # Backend dependencies
└── frontend/
    ├── pages/
    │     ├── loginPage.html # Login page (Elderly/Volunteer)
    │     ├── register.html  # Registration page
    │     ├── dashboard.html # Elderly Dashboard
    │     └── volunteer.html # Volunteer Dashboard
    ├── css/
    │     └── styles.css     # Global and component-specific styles
    ├── js/
    │     ├── dashboard.js   # Elderly dashboard logic
    │     └── volunteer.js   # Volunteer dashboard logic
    └── images/              # Logo and other assets
```

## 📊 Usage Instructions
- Register as either an Elderly or a Volunteer:
  - Elderly users can submit requests and track their status.
  - Volunteers can view, accept, or reject pending requests.
- Medical History Upload:
  - Elderly users can upload PDFs during request creation.
  - Volunteers can download and view the PDFs when reviewing requests.
- Session Management:
  - Users remain logged in unless they manually log out.
- Error Handling:
  - Descriptive error messages are shown on the UI.
  - Backend logs errors for better debugging.

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/register | Register a new Elderly or Volunteer |
| POST | /api/login | Authenticate and login a user |
| POST | /api/tasks | Create a new assistance request |
| GET | /api/tasks/pending | Fetch all pending tasks (for volunteers) |
| PUT | /api/tasks/:taskId/accept | Accept a task by a volunteer |
| PUT | /api/tasks/:taskId/reject | Reject a task by a volunteer |
| GET | /uploads/:filename | Serve medical history PDF |

## 📦 Deployment
- **Deploy Backend (Render/Vercel)**:
  - Ensure uploads folder is publicly accessible:
  ```js
  app.use('/uploads', express.static('uploads'));
  ```
- **Deploy Frontend (Vercel)**:
  - Ensure API calls point to the deployed backend (replace localhost with live URL).

## 📈 Future Improvements
- ✅ Real-time status updates via WebSockets.
- ✅ Admin dashboard for monitoring and user management.
- ✅ Payment integration for seamless volunteer compensation.
- ✅ Improved error reporting and user analytics.
