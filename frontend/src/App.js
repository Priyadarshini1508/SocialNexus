import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePostPage from './pages/CreatePostPage';
import { CssBaseline } from '@mui/material';

function App() {
    return (
        <Router>
            {/* CssBaseline kicks start an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />

            {/* The Navigation Bar stays at the top of every page */}
            <Navbar />

            {/* The Content changes based on the URL */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/create" element={<CreatePostPage />} />
            </Routes>
        </Router>
    );
}

export default App;