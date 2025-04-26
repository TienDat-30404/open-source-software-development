# Music App - Role-Based Authentication Update

## 🚀 New Features

### Role-Based Authentication
- Implemented two default roles: `admin` and `user`
- Automatic role assignment (`user`) for new registrations
- Protected admin routes with middleware authentication
- Role-specific navigation and access control

### Admin Features
- Access to admin dashboard
- User management (View, Edit, Delete users)
- Content management (Songs, Albums, etc.)
- Protected admin routes (`/admin/*`)

### User Features
- Personalized home page with feature cards
- Profile management
- Settings customization
- Role-restricted access

## 🛠 Technical Implementation

### Backend Changes
1. **Middleware**
   - Added authentication middleware for role verification
   - Automatic token validation and role checking
   - Protected admin routes

2. **Database**
   - Added default roles migration
   - Updated user model with role relationship
   - Enhanced user serializers for role management

### Frontend Changes
1. **Authentication**
   - Added AuthContext for state management
   - Implemented PrivateRoute component
   - Role-based route protection

2. **User Interface**
   - New Navigation component with dynamic menu
   - User dashboard with feature cards
   - Profile management page
   - Settings configuration page

3. **Admin Interface**
   - Protected admin routes
   - User management interface
   - Role-based access control

## 📝 Usage Guide

### For Administrators

1. **Login**
   ```
   Email: [admin email]
   Password: [admin password]
   ```

2. **Access Admin Panel**
   - After login, you'll be redirected to `/admin/dashboard`
   - Use the admin navigation menu to access different sections

3. **Manage Users**
   - Go to `/admin/user`
   - View all users
   - Edit user information
   - Delete users
   - View user roles

### For Users

1. **Registration**
   - Navigate to `/signup/step1`
   - Complete the registration form
   - Automatically assigned 'user' role

2. **Login**
   - Use your email and password
   - Redirected to user home page

3. **Features**
   - **Home**: View feature cards and quick access
   - **Profile**: Update personal information
   - **Settings**: Customize preferences
     - Notifications
     - Privacy settings
     - Theme preferences
     - Language selection

## 🔧 Installation

1. **Clone and Install Dependencies**
   ```bash
   # Backend setup
   cd backend
   pip install -r requirements.txt
   python manage.py migrate

   # Frontend setup
   cd frontend
   npm install
   ```

2. **Run Migrations**
   ```bash
   cd backend
   python manage.py migrate roles
   ```

3. **Start Development Servers**
   ```bash
   # Backend
   cd backend
   python manage.py runserver

   # Frontend
   cd frontend
   npm run dev
   ```

## 🔒 Security Notes

- Admin routes are protected by middleware authentication
- JWT tokens are used for authentication
- Role verification is performed on both frontend and backend
- Passwords are properly hashed before storage
- API endpoints are protected based on user roles

## 🤝 Contributing

1. Create a new branch for your feature
2. Implement your changes
3. Test thoroughly
4. Submit a pull request

## ⚠️ Important Notes

- Default admin account should be created through Django admin panel
- All admin routes require authentication and admin role
- User data is protected and can only be modified by admins or the user themselves
- Keep your JWT tokens secure and never expose them in client-side code