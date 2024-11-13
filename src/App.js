import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Correct imports for router

// Import all existing components
import TopNav from './components/topnav';
import SideNav from './components/sidenav';
import Hero from './components/hero';
import Features from './components/features';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Upload from './components/Upload';
import Browse from './components/Browse';
import DocumentView from './components/DocumentView';
import DocumentEditor from './components/DocumentEditor';
import VideoHub from './components/VideoHub';
import Editor from './components/Editor';
import Star from './components/starr';

import './App.css';

function App() {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  // Check if the user is authenticated
  const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');  // Returns true if token exists
  };

  // Close the sidenav if the user navigates to /signin, /signup or any unauthenticated page
  useEffect(() => {
    // We only want to close the sidenav if the user is navigating to login/signup, 
    // or the user is not authenticated and trying to access restricted pages.
    const closeNavOnAuthChange = () => {
      if (isAuthenticated()) {
        // User is authenticated, don't close the nav
        return;
      } else {
        setSideNavOpen(false);  // Close sidenav if not authenticated
      }
    };

    closeNavOnAuthChange(); // Trigger the check on component mount
  }, [isAuthenticated()]);  // Re-run the effect when authentication state changes

  const HomePage = () => (
    <div className="main-content">
      <Hero />
      <Features />
    </div>
  );

  return (
    // Wrapping with BrowserRouter
    <BrowserRouter>
      <div className="App">
        <TopNav toggleNav={toggleNav} />
        <SideNav isOpen={sideNavOpen} setIsOpen={setSideNavOpen} />
        <div className={`main-content ${sideNavOpen ? 'shifted' : ''}`}>
          <Routes>
            <Route path="/" element={HomePage()} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={isAuthenticated() ? <Profile /> : <Navigate to="/signin" />} />
            <Route path="/upload" element={isAuthenticated() ? <Upload /> : <Navigate to="/signin" />} />
            <Route path="/browse" element={isAuthenticated() ? <Browse /> : <Navigate to="/signin" />} />
            <Route path="/starred" element={isAuthenticated() ? <Star /> : <Navigate to="/signin" />} />
            <Route path="/videohub" element={isAuthenticated() ? <VideoHub /> : <Navigate to="/signin" />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/document" element={<DocumentView />} />
            <Route path="/documentedit" element={<DocumentEditor />} />
            <Route path="*" element={<div>404 Page Not Found</div>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
