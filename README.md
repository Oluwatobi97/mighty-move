# Mighty Moves Frontend

A React-based frontend for the Mighty Moves multi-service platform, providing a modern and responsive user interface for booking moving, waste collection, and logistics services.

## 🚀 Features

- **User Authentication**: Registration and login with persistent sessions
- **Responsive Design**: Modern UI that works on desktop and mobile
- **Service Booking**: Book moving, waste collection, and logistics services
- **Dashboard**: User dashboard for managing bookings and profile
- **Admin Panel**: Admin dashboard for managing services and users
- **Real-time Updates**: Toast notifications and status updates

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running (see backend repository)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/mighty-moves-frontend.git
   cd mighty-moves-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables (optional)**
   Create a `.env` file in the root directory:

   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

   _Note: If not set, defaults to `http://localhost:5000`_

4. **Start the development server**

   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 📱 Pages & Features

### Public Pages

- **Marketing Page** (`/`) - Landing page with service overview
- **About** (`/about`) - Company information
- **Terms** (`/terms`) - Terms and conditions
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - User registration

### Protected Pages (Requires Login)

- **Home** (`/home`) - Main dashboard with service booking options
- **Dashboard** (`/dashboard`) - User's booking management
- **Profile** (`/profile`) - User profile and settings
- **Track** (`/track`) - Track booking status
- **Admin** (`/admin`) - Admin panel (if admin user)

### Service Booking Pages

- **Book a Move** (`/move`) - Moving service booking
- **Waste Pickup** (`/waste`) - Waste collection booking
- **Send Package** (`/logistics`) - Logistics service booking

## 🔧 Configuration

### Backend Connection

The frontend connects to the backend API. Make sure your backend is running on the correct port and update the API URL if needed:

```typescript
// src/utils/api.ts
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
  withCredentials: true,
});
```

### Environment Variables

| Variable            | Description     | Default                 |
| ------------------- | --------------- | ----------------------- |
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:5000` |

## 🎨 UI Components

- **Header**: Responsive navigation with authentication state
- **AuthForm**: Reusable authentication forms
- **ServiceForm**: Service booking forms
- **BookingCard**: Display booking information
- **StatsCard**: Statistics display
- **StatusBadge**: Status indicators

## 📦 Dependencies

### Core

- **react**: UI library
- **react-router-dom**: Routing
- **styled-components**: Styling
- **framer-motion**: Animations

### HTTP & State

- **axios**: HTTP client
- **react-toastify**: Notifications

### Development

- **typescript**: Type safety
- **@types/react**: TypeScript definitions

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Connect your GitHub repository
2. Vercel will automatically detect it's a React app
3. Set environment variables if needed
4. Deploy automatically

### Deploy to Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Set environment variables if needed

### Deploy to GitHub Pages

```bash
npm run build
npm run deploy
```

## 🔐 Authentication Flow

1. **Registration**: User creates account → redirected to home
2. **Login**: User authenticates → redirected to home
3. **Session Persistence**: Token stored in localStorage
4. **Logout**: Token removed → redirected to marketing page

## 🎯 Development Guidelines

- Use TypeScript for type safety
- Follow React hooks best practices
- Use styled-components for styling
- Implement responsive design
- Add proper error handling
- Use toast notifications for user feedback

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email support@mightymoves.co.uk or create an issue in this repository.
