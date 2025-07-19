import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import NewsletterPreview from './components/NewsletterPreview';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Testimonials />
      <NewsletterPreview />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
