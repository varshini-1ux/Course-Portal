# Course Portal

A full-stack course management system with Student and Admin functionality.

## Features

✅ **Student Login** - Secure authentication for students
✅ **Admin Login** - Admin panel for course management
✅ **Upload PDF/Notes** - Upload course materials
✅ **View Subject Cards** - Beautiful subject cards display
✅ **Download Files** - Download course materials
✅ **MongoDB Database** - Persistent data storage
✅ **Dashboard** - Simple and intuitive dashboard
✅ **Course Management**
  - Add courses
  - Edit courses
  - Update courses
  - Delete courses
✅ **Semester View** - Organize courses by semester
✅ **Sidebar Navigation** - Easy navigation
✅ **Responsive Design** - Mobile-friendly interface

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (File Upload)

### Frontend
- React
- React Router
- Axios
- CSS/Bootstrap

## Installation

### Backend Setup

1. Clone the repository
```bash
git clone https://github.com/varshini-1ux/Course-Portal.git
cd Course-Portal
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI and JWT secret

5. Start the server
```bash
npm run dev
```

### Frontend Setup

1. Navigate to client directory
```bash
cd client
```

2. Install dependencies
```bash
npm install
```

3. Start the frontend
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/semester/:semester` - Get courses by semester
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (Admin)
- `PUT /api/courses/:id` - Update course (Admin)
- `DELETE /api/courses/:id` - Delete course (Admin)

### Files
- `POST /api/files/upload/:courseId` - Upload file (Admin)
- `GET /api/files/download/:fileId` - Download file
- `GET /api/files/course/:courseId` - Get course files

## Database Schema

### User
- name
- email
- password (hashed)
- role (student/admin)
- enrolledCourses
- createdAt

### Course
- title
- description
- code
- semester
- instructor
- credits
- materials
- createdAt
- updatedAt

### File
- courseId
- filename
- filePath
- fileType
- size
- uploadedBy
- uploadedAt
- downloads

## Default Admin Credentials

You can create an admin account by registering with role 'admin'.

## License

MIT
