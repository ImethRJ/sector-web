# Sector Education Institute Website

A modern, high-performance web application for Sector Education Institute, Panadura. This platform serves as the digital hub for students and parents to access information about tutors, class timetables, and institute notices.

## 🚀 Live Demo

[https://sector-institute.web.app](https://sector-institute.web.app)

## ✨ Features

- **Dynamic Content Management**: Admin dashboard to manage teachers, notices, and timetables in real-time.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS, ensuring a seamless experience across all devices.
- **Performance Optimized**:
  - Code splitting and lazy loading for faster initial page loads.
  - Client-side image compression for optimized storage and bandwidth usage.
- **SEO Friendly**: Server-Side Rendering (SSR) via Firebase Functions for better search engine visibility.
- **Real-time Updates**: Powered by Firebase Firestore for instant data synchronization.

## 🛠️ Technologies Used

### Frontend
- **[React](https://reactjs.org/)**: UI Library
- **[Vite](https://vitejs.dev/)**: Build tool and development server
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[React Router](https://reactrouter.com/)**: Client-side routing
- **[Lucide React](https://lucide.dev/)**: Icon library

### Backend & Services
- **[Firebase](https://firebase.google.com/)**:
  - **Hosting**: Fast and secure web hosting
  - **Firestore**: NoSQL cloud database
  - **Storage**: Cloud storage for images
  - **Functions**: Serverless backend logic (SSR, IndexNow)

### Key Libraries
- `browser-image-compression`: Efficient image optimization before upload
- `react-ga4`: Google Analytics 4 integration
- `react-helmet-async`: Document head management

## 📦 Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/ImethRJ/sector-web.git
   cd sector-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your Firebase configuration.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📝 License

This project is proprietary software of Sector Education Institute.
